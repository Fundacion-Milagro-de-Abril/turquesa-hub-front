/* F09 · Registro por enlace y código de 6 números, con Supabase simulado (sin red).
   Público: sin enlace no hay formulario; enlace vencido no pide datos; el formulario envía el código del enlace y los datos de la
   organización en los metadatos de signUp (nunca organización, rol ni estado); el código se confirma con verifyOtp; una
   organización pendiente ve «en revisión» y no queda con sesión.
   FMA: menú y tablero, crear y copiar enlaces, anular, aprobar y rechazar, todo escapado.
   Las reglas reales (enlace vigente, cupos, identificación repetida, pendiente sin acceso) se prueban en pgTAP (07_f09_registro). */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep, q } = h; const TH = await h.listo();
  const llamadas = []; const ultima = (pred) => llamadas.filter(pred).pop();
  const XSS = '<img src=x onerror="window.__xss=1">';
  const ahora = Date.now(); const iso = (d) => new Date(ahora + d * 864e5).toISOString();
  const tablas = {
    perfiles: [], organizaciones: [],
    avisos: [{ version: 'v1', titulo: 'Aviso', texto: 'Texto del aviso', estado: 'publicado' }],
    invitaciones: [],
    convocatorias: [
      { id: 'c-1', nombre: 'Encuentro ' + XSS, codigo: 'abc123abc123abc123abc123abc123ab', max_registros: 20, registros: 3, vence_en: iso(10), estado: 'activa', creada_en: iso(-1) },
      { id: 'c-2', nombre: 'Viejo', codigo: 'ffff0000ffff0000ffff0000ffff0000', max_registros: 5, registros: 1, vence_en: iso(-1), estado: 'activa', creada_en: iso(-30) }
    ]
  };
  const registros = [
    { organizacion_id: 'o-p', nombre: 'Colectivo ' + XSS, tipo_identificacion: 'NIT', identificacion: '900123456-8', sector: 'Comercio', tamano: 'micro', departamento: 'Caldas', municipio: 'Manizales', estado: 'pendiente', creado_en: iso(0), convocatoria: 'Encuentro', responsable: 'Rosa', cargo: 'Otro', email: 'rosa@colectivo.test', correo_confirmado: false },
    { organizacion_id: 'o-r', nombre: 'Org Revisada', tipo_identificacion: 'sin-identificacion', identificacion: 'SIN-ID-1234', estado: 'activa', creado_en: iso(-2), convocatoria: 'Encuentro', responsable: 'Luis', email: 'luis@r.test', correo_confirmado: true }
  ];
  let vigente = true; let falloAlta = null; let identidades = [{}]; let otpOk = true; let estadoReg = 'pendiente'; let sesion = null; let confirmado = true;

  const consulta = (tabla) => {
    const st = { op: 'select', f: [], payload: null, uno: false };
    const filas = () => (tablas[tabla] || []).filter(r => st.f.every(([k, v]) => r[k] === v));
    const b = {
      select() { return b; }, order() { return b; }, limit() { return b; },
      eq(k, v) { st.f.push([k, v]); return b; }, maybeSingle() { st.uno = true; return b; }, single() { st.uno = true; return b; },
      update(p) { st.op = 'update'; st.payload = p; return b; },
      then(okf, fail) {
        let data;
        if (st.op === 'update') { llamadas.push({ update: tabla, payload: st.payload, filtros: st.f }); data = [{ id: (st.f[0] || [])[1] }]; }
        else { const f = filas(); data = st.uno ? (f[0] || null) : JSON.parse(JSON.stringify(f)); }
        return Promise.resolve({ data, error: null }).then(okf, fail);
      }
    };
    return b;
  };
  const cliente = {
    auth: {
      async signUp(c) { llamadas.push({ signUp: c }); if (falloAlta) return { data: null, error: { message: falloAlta } }; return { data: { session: null, user: { id: 'u-n', identities: identidades } }, error: null }; },
      async verifyOtp(c) { llamadas.push({ verifyOtp: c }); if (!otpOk) return { data: null, error: { message: 'Token has expired or is invalid' } }; sesion = { user: { id: 'u-n', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; },
      async signInWithPassword(c) { llamadas.push('login'); if (!confirmado) return { data: null, error: { code: 'email_not_confirmed', message: 'Email not confirmed' } }; sesion = { user: { id: c.email === 'adm@fma.test' ? 'u-adm' : 'u-n', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; },
      async getSession() { return { data: { session: sesion } }; },
      async signOut() { llamadas.push('signOut'); sesion = null; return { error: null }; },
      async resend(c) { llamadas.push({ resend: c }); return { error: null }; }
    },
    from: consulta,
    async rpc(n, a) {
      llamadas.push({ rpc: n, args: a });
      if (n === 'convocatoria_vigente') return { data: vigente && a.p_codigo === 'abc123abc123abc123abc123abc123ab', error: null };
      if (n === 'estado_mi_registro') return { data: estadoReg, error: null };
      if (n === 'listar_registros') return { data: JSON.parse(JSON.stringify(registros)), error: null };
      if (n === 'crear_convocatoria') return { data: 'nuevo0000nuevo0000nuevo0000nuevo', error: null };
      if (n === 'resumen_formacion_fma') return { data: [], error: null };
      return { data: null, error: null };
    }
  };
  Object.keys(cliente).forEach(k => { TH.sb[k] = cliente[k]; });
  const llenar = (f, d) => Object.keys(d).forEach(k => { const el = f.elements[k]; if (!el) return; if (el.type === 'checkbox') el.checked = !!d[k]; else { el.value = d[k]; el.dispatchEvent(new w.Event('change', { bubbles: true })); } });

  console.log('[Enlace de registro]');
  await h.ir('/registro');
  ok(!q('form') && /enlace de registro/.test(h.texto()), 'Sin enlace: explica cómo acceder y no muestra formulario');
  await h.ir('/registro?c=ffff0000ffff0000ffff0000ffff0000');
  ok(!q('form') && /ya no está disponible/.test(h.texto()), 'Enlace vencido o lleno: avisa y no pide datos');
  ok(ultima(l => l.rpc === 'convocatoria_vigente').args.p_codigo === 'ffff0000ffff0000ffff0000ffff0000', 'Se consulta a la base si el enlace sirve antes de mostrar el formulario');
  await h.ir('/registro?c=abc123abc123abc123abc123abc123ab');
  let f = q('form[data-form=registro-enlace]');
  ok(f && f.elements.convocatoria.value === 'abc123abc123abc123abc123abc123ab' && f.elements.aceptaDatos && /Texto del aviso/.test(h.texto()), 'Enlace vigente: formulario con el código del enlace y el aviso de datos vigente');
  ok(/código de 6 números/.test(h.texto()) && /revisará el registro/.test(h.texto()), 'Explica los pasos: código al correo y aprobación de la Fundación');

  const datos = { nombre: 'Fundación Prueba', tipoIdentificacion: 'NIT', identificacion: '900123456-8', sector: 'Comercio', tamano: 'micro', departamento: 'Caldas',
    responsable: 'Rosa Pérez', cargo: 'Otro', email: 'rosa@prueba.test', clave: 'Clave12345x', claveConfirmacion: 'Clave12345x', aceptaDatos: true };
  llenar(f, datos); await sleep(50); llenar(f, { municipio: 'Manizales' });
  f.elements.identificacion.value = '900123456-1'; await h.submit(f);
  ok(!llamadas.some(l => l.signUp) && /dígito de verificación|NIT/.test(f.querySelector('[data-campo=identificacion]').textContent), 'NIT con dígito de verificación equivocado: no se envía nada y se marca el campo');
  f.elements.identificacion.value = '900123456-8'; f.elements.aceptaDatos.checked = false; await h.submit(f);
  ok(!llamadas.some(l => l.signUp), 'Sin autorizar el tratamiento de datos: no se envía nada');
  f.elements.aceptaDatos.checked = true; await h.submit(f); await sleep(200);
  const su = ultima(l => l.signUp); const md = su && su.signUp.options.data;
  ok(md && md.codigo_convocatoria === 'abc123abc123abc123abc123abc123ab' && md.version_aviso === 'v1' && md.nombre === 'Rosa Pérez' && md.org_nombre === 'Fundación Prueba' && md.org_identificacion === '900123456-8' && md.org_municipio === 'Manizales',
     'Registro: el código del enlace, el aviso aceptado y los datos de la organización viajan en los metadatos');
  ok(!/organizacion_id|"rol"|"estado"/.test(JSON.stringify(su.signUp)), 'Registro: el navegador no envía organización, rol ni estado (los decide la base)');
  ok(/#\/verificar-correo\?email=rosa%40prueba\.test$/.test(w.location.hash), 'Tras registrarse pasa a escribir el código');

  console.log('[Rechazos de la base]');
  const intentar = async (mensaje) => { falloAlta = mensaje; await h.ir('/registro?c=abc123abc123abc123abc123abc123ab'); f = q('form[data-form=registro-enlace]'); llenar(f, datos); await sleep(50); llenar(f, { municipio: 'Manizales' }); await h.submit(f); await sleep(150); falloAlta = null; return f; };
  f = await intentar('CONVOCATORIA_INVALIDA: x');
  ok(/ya no sirve/.test(f.querySelector('[data-campo=general]').textContent), 'Enlace que venció mientras llenaba: mensaje claro');
  f = await intentar('ORGANIZACION_EXISTENTE: x');
  ok(/ya está registrada/.test(f.querySelector('[data-campo=identificacion]').textContent), 'Identificación repetida: se marca el campo');
  identidades = []; f = await intentar(null); identidades = [{}];
  ok(/Ya existe una cuenta/.test(f.querySelector('[data-campo=general]').textContent) && !/verificar-correo/.test(w.location.hash), 'Correo con cuenta ya existente: lo informa y no pasa al código');

  console.log('[Código de 6 números]');
  await h.ir('/verificar-correo?email=rosa%40prueba.test');
  f = q('form[data-form=verificar-codigo]');
  ok(f && f.elements.codigo.getAttribute('inputmode') === 'numeric' && f.elements.codigo.getAttribute('autocomplete') === 'one-time-code', 'El campo del código abre el teclado numérico y acepta el autocompletado del celular');
  f.elements.codigo.value = '12345'; await h.submit(f);
  ok(!llamadas.some(l => l.verifyOtp) && /6 números/.test(f.textContent), 'Código incompleto: no se envía');
  otpOk = false; f.elements.codigo.value = '111111'; await h.submit(f); otpOk = true;
  ok(/no es correcto o ya venció/.test(f.textContent) && !sesion, 'Código equivocado: mensaje claro y sin sesión');
  f.elements.codigo.value = '123 456'; await h.submit(f); await sleep(200);
  const vo = ultima(l => l.verifyOtp).verifyOtp;
  ok(vo.token === '123456' && vo.type === 'signup' && vo.email === 'rosa@prueba.test', 'Código correcto: se confirma con verifyOtp (se ignoran espacios)');
  ok(/Registro recibido/.test(h.texto()) && /en revisión/.test(h.texto()) && !TH.auth.sesion() && !sesion, 'Organización pendiente: ve «Registro recibido, en revisión» y no queda con sesión');

  await h.ir('/'); await h.ir('/verificar-correo?email=rosa%40prueba.test');
  q('[data-action=reenviar-codigo]').click(); await sleep(300);
  ok(ultima(l => l.resend).resend.type === 'signup' && ultima(l => l.resend).resend.email === 'rosa@prueba.test', 'Enviar otro código: lo pide a Supabase para ese correo');

  console.log('[Ingreso de una organización pendiente o rechazada]');
  let r = await TH.authAdaptadores.supabase.ingresar('rosa@prueba.test', 'Clave12345x');
  ok(!r.ok && /en revisión/.test(r.error) && !TH.auth.sesion() && !sesion, 'Pendiente: al ingresar le dice que está en revisión y no queda sesión');
  estadoReg = 'rechazada'; r = await TH.authAdaptadores.supabase.ingresar('rosa@prueba.test', 'Clave12345x');
  ok(!r.ok && /no aprobó/.test(r.error), 'Rechazada: se le informa y se le da el contacto');
  confirmado = false; await h.login('rosa@prueba.test', 'Clave12345x'); confirmado = true;
  ok(/#\/verificar-correo\?email=/.test(w.location.hash), 'Sin confirmar el correo: el ingreso lleva a escribir el código');

  console.log('[Activación por invitación]');
  await h.ir('/activar-invitacion?codigo=COD-1');
  f = q('form[data-form=activar-invitacion]');
  llenar(f, { email: 'col@org.test', nombre: 'Col', clave: 'Clave12345x', claveConfirmacion: 'Clave12345x', aceptaDatos: true }); await h.submit(f); await sleep(200);
  ok(/#\/verificar-correo\?email=col%40org\.test$/.test(w.location.hash), 'Invitación: tras crear la cuenta también pide el código de 6 números');

  console.log('[FMA: registros y enlaces]');
  tablas.perfiles.push({ id: 'u-adm', organizacion_id: null, rol: 'admin_fma', nombre: 'Admin', estado: 'activo' });
  tablas.organizaciones.push({ id: 'o-p', nombre: 'Colectivo', estado: 'pendiente', creado_en: iso(0) }, { id: 'o-a', nombre: 'Activa', estado: 'activa', creado_en: iso(-5) });
  r = await TH.authAdaptadores.supabase.ingresar('adm@fma.test', 'Clave12345x');
  ok(r.ok && r.usuario.rol === 'fma', 'Ingresa la administración');
  await h.ir('/fma/inicio');
  ok(/1 registro por revisar/.test(h.texto()) && !!q('#app a[href="#/fma/registros"]'), 'Tablero: avisa cuántos registros esperan aprobación');
  ok(h.nav().includes('/fma/registros'), 'Menú FMA: incluye Registros');
  await h.ir('/fma/organizaciones');
  ok(!!q('#app a[href="#/fma/registros"].btn') && /Pendiente de aprobación/.test(h.texto()), 'Organizaciones: la pendiente se marca y lleva a revisarla');

  await h.ir('/fma/registros');
  ok(/Por revisar \(1\)/.test(h.texto()) && /rosa@colectivo\.test/.test(h.texto()) && /Sin confirmar/.test(h.texto()), 'Registros: lista los pendientes con su responsable y si confirmó el correo');
  ok(!!q('[data-action=fma-registro-resolver][data-estado=activa][data-id=o-p]') && !q('[data-action=fma-registro-resolver][data-id=o-r]'), 'Solo los pendientes tienen Aprobar / Rechazar');
  ok(/Sin identificación tributaria/.test(h.texto()), 'Las organizaciones sin identificación tributaria se muestran claro');
  const copiar = [...w.document.querySelectorAll('[data-action=fma-copiar]')].map(b => b.dataset.texto);
  ok(copiar.length === 1 && /#\/registro\?c=abc123abc123abc123abc123abc123ab$/.test(copiar[0]), 'Enlaces: el activo se puede copiar; el vencido no');
  ok(/3 de 20/.test(h.texto()) && /Vencido/.test(h.texto()), 'Enlaces: muestra cupos usados y estado');
  ok(!w.__xss && !q('#app img[src="x"]') && /<img src=x/.test(h.texto()), 'Nombres de organizaciones y enlaces se muestran escapados');

  await h.click('[data-action=fma-registro-resolver][data-estado=activa][data-id=o-p]');
  ok(/aún no ha confirmado el correo/.test(q('.modal').textContent), 'Aprobar: advierte si el responsable no ha confirmado el correo');
  await h.click('[data-confirmar]'); await sleep(300);
  let up = ultima(l => l.update === 'organizaciones');
  ok(up && up.payload.estado === 'activa' && JSON.stringify(up.payload) === '{"estado":"activa"}' && up.filtros[0][1] === 'o-p', 'Aprobar: cambia solo el estado de esa organización (la base valida que sea admin_fma)');
  await h.ir('/fma/registros');
  await h.click('[data-action=fma-registro-resolver][data-estado=rechazada][data-id=o-p]'); await h.click('[data-confirmar]'); await sleep(300);
  up = ultima(l => l.update === 'organizaciones');
  ok(up.payload.estado === 'rechazada', 'Rechazar: guarda el estado rechazada');

  await h.ir('/fma/registros');
  await h.click('[data-action=fma-enlace-nuevo]');
  f = q('form[data-form=fma-enlace-nuevo]'); f.elements.nombre.value = 'Taller Chinchiná'; f.elements.maximo.value = '600'; await h.submit(f);
  ok(!llamadas.some(l => l.rpc === 'crear_convocatoria') && /Entre 1 y 500/.test(f.textContent), 'Crear enlace: máximo fuera de rango no se envía');
  f.elements.maximo.value = '15'; f.elements.dias.value = '20'; await h.submit(f); await sleep(200);
  const cc = ultima(l => l.rpc === 'crear_convocatoria');
  ok(cc && cc.args.p_nombre === 'Taller Chinchiná' && cc.args.p_max_registros === 15 && cc.args.p_dias === 20, 'Crear enlace: envía nombre, máximo y vigencia');
  const campo = w.document.getElementById('enlace-inv');
  ok(campo && /#\/registro\?c=nuevo0000nuevo0000nuevo0000nuevo$/.test(campo.value), 'Crear enlace: muestra el enlace listo para copiar');
  q('[data-modal-cerrar]').click(); await sleep(100);
  await h.ir('/fma/registros');
  await h.click('[data-action=fma-enlace-anular][data-id=c-1]'); await h.click('[data-confirmar]'); await sleep(300);
  ok(ultima(l => l.rpc === 'anular_convocatoria').args.p_id === 'c-1', 'Anular enlace: llama a la base con ese enlace');

  await h.recorrer(['/fma/registros', '/registro', '/verificar-correo'], 'F09');
  process.exit(h.resumen());
})().catch(e => { console.error(e); process.exit(1); });
