/* Pruebas del adaptador de Supabase (producción). Sin red: se sustituye supabase-js por un cliente simulado.
   Verifica: adaptador activo, nada en localStorage, mapeo de rol, mensajes iguales ante credenciales erróneas,
   que el alta envía código y versión del aviso en los metadatos, que no se envía organizacion_id y que las rutas privadas
   no operan con datos sin guardar. */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h;
  const llamadas = [];
  const perfil = { id: 'u-1', organizacion_id: 'o-1', rol: 'organizacion', nombre: 'Ana', estado: 'activo' };
  const org = { id: 'o-1', nombre: 'Org Uno', estado: 'activa', tipo_identificacion: 'NIT', identificacion: '900' };
  let sesion = null; let falloLogin = false; let falloAlta = null;
  const consulta = (tabla) => ({
    select() { return this; }, eq() { return this; },
    async maybeSingle() { llamadas.push('select ' + tabla); return { data: tabla === 'perfiles' ? perfil : tabla === 'organizaciones' ? org : { version: 'v1', titulo: 'Aviso', texto: 'Texto' }, error: null }; }
  });
  const cliente = {
    auth: {
      async signInWithPassword(c) { llamadas.push('login'); if (falloLogin) return { data: null, error: { code: 'invalid_credentials', message: 'x' } }; sesion = { user: { id: 'u-1', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; },
      async getSession() { return { data: { session: sesion } }; },
      async signOut() { sesion = null; return { error: null }; },
      async signUp(c) { llamadas.push({ signUp: c }); return falloAlta ? { data: null, error: { message: falloAlta } } : { data: { session: null, user: {} }, error: null }; },
      async resetPasswordForEmail(e) { llamadas.push('reset ' + e); return { error: null }; },
      async updateUser() { return { error: null }; },
      async resend() { return { error: null }; }
    },
    from: consulta,
    async rpc(n) { llamadas.push('rpc ' + n); return { error: null }; }
  };
  // Se inyecta el cliente simulado antes de que cargue js/supabase.js.
  const TH = await h.listo();

  ok(TH.config.entorno === 'produccion' && TH.config.auth.adaptador === 'supabase', 'Con supabaseUrl el adaptador activo es supabase');
  ok(/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(TH.config.supabase.url) && /^sb_publishable_/.test(TH.config.supabase.key), 'Solo hay URL y clave publishable en el frontend');
  ok(!/sb_secret_|service_role/.test(JSON.stringify(TH.config)), 'No hay clave secreta ni service_role en la configuración');
  ok(TH.sb && typeof TH.sb.from === 'function', 'Cliente de Supabase creado');

  // Sustituir el cliente por el simulado para el resto de las pruebas.
  const original = TH.sb; Object.keys(cliente).forEach(k => { original[k] = cliente[k]; });
  const A = TH.authAdaptadores.supabase;

  let r = await A.ingresar('ana@org.test', 'Clave12345*');
  ok(r.ok && r.usuario.rol === 'organizacion' && r.usuario.orgId === 'o-1', 'Ingreso: rol y organización salen de la base de datos');
  ok(TH.auth.orgId() === 'o-1' && TH.store.get().organizaciones.some(o => o.id === 'o-1'), 'La organización se carga en la caché desde la base');
  ok(llamadas.includes('rpc registrar_inicio_sesion'), 'El ingreso queda en la auditoría');
  perfil.rol = 'admin_fma'; perfil.organizacion_id = null;
  r = await A.ingresar('admin@fma.test', 'Clave12345*');
  ok(r.ok && r.usuario.rol === 'fma' && r.usuario.permisos.includes('*'), 'admin_fma se presenta como fma con permisos completos');
  perfil.rol = 'organizacion'; perfil.organizacion_id = 'o-1';

  falloLogin = true;
  const r1 = await A.ingresar('no@existe.test', 'x'); const r2 = await A.ingresar('ana@org.test', 'mala');
  ok(!r1.ok && r1.error === r2.error, 'Credenciales erróneas: mismo mensaje exista o no el correo');
  falloLogin = false;

  perfil.estado = 'suspendido';
  r = await A.ingresar('ana@org.test', 'Clave12345*');
  ok(!r.ok && !TH.auth.sesion(), 'Perfil suspendido: no entra y no queda sesión');
  perfil.estado = 'activo';

  r = await A.registrarOrganizacion({});
  ok(!r.ok, 'No hay registro abierto de organizaciones');

  r = await A.activarInvitacion('COD123', { email: 'nuevo@org.test', nombre: 'Nuevo', clave: 'Clave12345*', aceptaDatos: true });
  const su = llamadas.find(l => l && l.signUp).signUp;
  ok(r.ok && r.verificacion === 'pendiente', 'Alta: queda pendiente de verificar el correo');
  ok(su.options.data.codigo_invitacion === 'COD123' && su.options.data.version_aviso === 'v1' && su.options.data.nombre === 'Nuevo', 'Alta: código, versión del aviso y nombre viajan en los metadatos');
  ok(!JSON.stringify(su).includes('organizacion_id') && !JSON.stringify(su).includes('rol'), 'Alta: no se envía organización ni rol');
  r = await A.activarInvitacion('COD123', { email: 'nuevo@org.test', nombre: 'Nuevo', clave: 'Clave12345*', aceptaDatos: false });
  ok(!r.ok, 'Alta: sin aceptar el aviso no se envía nada');
  falloAlta = 'INVITACION_INVALIDA: x';
  r = await A.activarInvitacion('MAL', { email: 'nuevo@org.test', nombre: 'Nuevo', clave: 'Clave12345*', aceptaDatos: true });
  ok(!r.ok && r.codigo === 'INVITACION_INVALIDA', 'Alta: el rechazo de la base se traduce a un mensaje claro');
  falloAlta = 'REGISTRO_NO_DISPONIBLE: x';
  r = await A.activarInvitacion('X', { email: 'n@o.test', nombre: 'N', clave: 'Clave12345*', aceptaDatos: true });
  ok(!r.ok && r.codigo === 'INFORMACION_NO_PUBLICADA', 'Alta: sin aviso publicado se informa que no está habilitada');

  await A.ingresar('ana@org.test', 'Clave12345*');
  w.location.hash = '#/organizacion/plan-accion'; await sleep(400);
  const texto = w.document.getElementById('app').textContent;
  ok(/se habilitarán próximamente/.test(texto), 'Las rutas privadas informan que el módulo se habilita próximamente');
  await A.salir();
  ok(!TH.auth.sesion() && TH.store.get().usuarios.length === 0, 'Cerrar sesión vacía la sesión y la caché');
  let guardado = false; try { guardado = w.localStorage.length > 0; } catch (_) { }
  ok(!guardado, 'Nada en localStorage');

  const { fallos, pasos } = h.cuenta;
  console.log('\n' + pasos + ' verificaciones · ' + fallos + ' fallos'); process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
