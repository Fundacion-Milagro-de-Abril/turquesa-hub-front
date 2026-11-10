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
  const tablas = {
    perfiles: [perfil], organizaciones: [org],
    avisos: [{ version: 'v1', titulo: 'Aviso', texto: 'Texto', estado: 'publicado' }],
    invitaciones: [{ id: 'i-1', organizacion_id: 'o-1', email: 'pend@org.test', rol: 'organizacion', estado: 'pendiente', vence_en: '2999-01-01T00:00:00Z', creada_en: '2026-11-10T00:00:00Z' }],
    auditoria: [{ id: 1, actor_id: 'u-1', organizacion_id: 'o-1', accion: 'sesion.inicio', detalle: {}, creado_en: '2026-11-10T00:00:00Z' }]
  };
  const consulta = (tabla) => {
    const q = { op: 'select', filtros: [], payload: null, uno: false };
    const filas = () => (tablas[tabla] || []).filter(r => q.filtros.every(([k, v]) => r[k] === v));
    const b = {
      select() { return b; }, order() { return b; }, limit() { return b; },
      eq(k, v) { q.filtros.push([k, v]); return b; },
      insert(p) { q.op = 'insert'; q.payload = p; llamadas.push({ insert: tabla, payload: p }); return b; },
      update(p) { q.op = 'update'; q.payload = p; llamadas.push({ update: tabla, payload: p, filtros: q.filtros }); return b; },
      single() { q.uno = true; return b; }, maybeSingle() { q.uno = true; return b; },
      then(ok, fail) {
        let data;
        if (q.op === 'insert') { const fila = Object.assign({ id: 'nuevo-1' }, q.payload); (tablas[tabla] = tablas[tabla] || []).push(fila); data = fila; }
        else if (q.op === 'update') { const f = filas(); f.forEach(r => Object.assign(r, q.payload)); data = f; }
        else { llamadas.push('select ' + tabla); const f = filas(); data = q.uno ? (f[0] || null) : f; }
        return Promise.resolve({ data, error: null }).then(ok, fail);
      }
    };
    return b;
  };
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
    async rpc(n, args) { llamadas.push('rpc ' + n); llamadas.push({ rpc: n, args }); return { data: n === 'crear_invitacion' ? 'COD-NUEVO' : null, error: null }; }
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

  // ---------- Administración mínima de FMA ----------
  perfil.rol = 'admin_fma'; perfil.organizacion_id = null;
  await A.ingresar('admin@fma.test', 'Clave12345*');
  await h.ir('/fma/organizaciones');
  ok(JSON.stringify(h.nav()) === JSON.stringify(['/fma/inicio', '/fma/organizaciones', '/fma/auditoria']), 'FMA: el menú muestra solo lo que está conectado');
  ok(/Org Uno/.test(h.texto()) && /pend@org\.test/.test(h.texto()), 'FMA: lista organizaciones e invitaciones desde la base');
  ok(!/COD-|codigo_hash/.test(h.texto()), 'FMA: la lista nunca muestra códigos de invitación');

  await h.click('[data-action="fma-org-nueva"]');
  h.w.document.getElementById('nombre').value = 'Org Nueva'; h.w.document.getElementById('identificacion').value = '900.555.666-1';
  h.w.document.getElementById('responsable').value = 'Rosa'; h.w.document.getElementById('email').value = 'rosa@nueva.test';
  await h.submit('#form-org-nueva'); await sleep(300);
  const ins = llamadas.find(l => l && l.insert === 'organizaciones');
  ok(ins && ins.payload.nombre === 'Org Nueva' && !('organizacion_id' in ins.payload) && !('estado' in ins.payload), 'Crear organización: solo envía datos de la organización (sin id, estado ni rol)');
  const rpc = llamadas.find(l => l && l.rpc === 'crear_invitacion');
  ok(rpc && rpc.args.p_rol === 'organizacion' && rpc.args.p_email === 'rosa@nueva.test' && rpc.args.p_organizacion_id === 'nuevo-1', 'Crear organización: la invitación va al correo del responsable, atada a la organización creada');
  const campoEnlace = h.w.document.getElementById('enlace-inv');
  ok(campoEnlace && /#\/activar-invitacion\?codigo=COD-NUEVO$/.test(campoEnlace.value), 'El enlace de activación se muestra al crear (una sola vez)');
  h.w.document.querySelector('[data-modal-cerrar]').click(); await sleep(100);

  const antes = llamadas.length;
  await h.click('[data-action="fma-org-estado"][data-id="o-1"]');
  await h.click('[data-confirmar]'); await sleep(300);
  const upd = llamadas.slice(antes).find(l => l && l.update === 'organizaciones');
  ok(upd && upd.payload.estado === 'suspendida' && upd.filtros[0][1] === 'o-1', 'Suspender: cambia solo el estado de esa organización (la base valida el permiso)');

  await h.ir('/fma/auditoria');
  ok(/Inicio de sesión/.test(h.texto()), 'Trazabilidad: muestra eventos con nombre legible');
  perfil.rol = 'organizacion'; perfil.organizacion_id = 'o-1'; org.estado = 'activa';   // se restablece el escenario

  await A.ingresar('ana@org.test', 'Clave12345*');
  w.location.hash = '#/organizacion/colaboradores'; await sleep(400);
  const texto = w.document.getElementById('app').textContent;
  ok(/se habilitarán próximamente/.test(texto), 'Las rutas privadas informan que el módulo se habilita próximamente');
  await A.salir();
  ok(!TH.auth.sesion() && TH.store.get().usuarios.length === 0, 'Cerrar sesión vacía la sesión y la caché');
  let guardado = false; try { guardado = w.localStorage.length > 0; } catch (_) { }
  ok(!guardado, 'Nada en localStorage');

  const { fallos, pasos } = h.cuenta;
  console.log('\n' + pasos + ' verificaciones · ' + fallos + ' fallos'); process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
