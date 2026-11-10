/* ============================================================
   TURQUESA HUB · ADMINISTRACIÓN MÍNIMA DE FMA (adaptador Supabase)
   Pantallas del rol «fma» (admin_fma en la base de datos):
     - Tablero:        resumen de organizaciones e invitaciones.
     - Organizaciones: crear una organización con la invitación de su responsable, suspender o reactivar,
                       invitar de nuevo y anular invitaciones.
     - Trazabilidad:   registro de auditoría.
   Toda la seguridad la impone la base de datos (RLS y funciones): estas pantallas solo la usan.
   El código de invitación se muestra UNA vez; la base solo guarda su hash.
   Se ejecuta solo con el adaptador 'supabase'. Mientras los demás módulos no estén conectados, el menú se reduce a lo que funciona.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase' || !TH.sb) return;
  const sb = TH.sb; const esc = TH.util.esc; const ROLES = ['fma'];
  const datos = { orgs: [], invs: [], aud: [], nombres: {} };
  const fecha = (iso) => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }); };
  const enlaceActivacion = (codigo) => location.origin + location.pathname.replace(/index\.html$/, '') + '#/activar-invitacion?codigo=' + encodeURIComponent(codigo);
  const lanzar = (r) => { if (r.error) throw r.error; return r.data; };

  /* ---------- Menú reducido a lo que está conectado ---------- */
  const menus = TH.layout.menus;
  menus.fma.splice(0, menus.fma.length,
    { grupo: 'Plataforma' },
    { ruta: '/fma/inicio', texto: 'Tablero general', icono: 'tablero' },
    { ruta: '/fma/organizaciones', texto: 'Organizaciones', icono: 'edificio' },
    { grupo: 'Editorial' },
    { ruta: '/fma/formacion', texto: 'Formación', icono: 'formacion' },
    { ruta: '/fma/contenidos', texto: 'Contenidos', icono: 'biblioteca' },
    { grupo: 'Sistema' },
    { ruta: '/fma/equipo', texto: 'Equipo FMA', icono: 'personas' },
    { ruta: '/fma/auditoria', texto: 'Trazabilidad', icono: 'historial' });
  menus.organizacion.splice(0, menus.organizacion.length, { ruta: '/organizacion/inicio', texto: 'Inicio', icono: 'inicio' });
  menus.colaborador.splice(0, menus.colaborador.length, { ruta: '/colaborador/inicio', texto: 'Inicio', icono: 'inicio' });

  /* ---------- Cargadores ---------- */
  async function cargarOrgs() {
    const [o, i] = await Promise.all([
      sb.from('organizaciones').select('*').order('creado_en', { ascending: false }),
      sb.from('invitaciones').select('id, organizacion_id, email, rol, estado, vence_en, creada_en').order('creada_en', { ascending: false })
    ]);
    datos.orgs = lanzar(o) || []; datos.invs = lanzar(i) || [];
  }
  TH.supabaseCargadores['/fma/inicio'] = cargarOrgs;
  TH.supabaseCargadores['/fma/organizaciones'] = cargarOrgs;
  TH.supabaseCargadores['/fma/auditoria'] = async function () {
    const [a, p] = await Promise.all([
      sb.from('auditoria').select('*').order('id', { ascending: false }).limit(200),
      sb.from('perfiles').select('id, nombre')
    ]);
    datos.aud = lanzar(a) || []; datos.nombres = {};
    (lanzar(p) || []).forEach(x => { datos.nombres[x.id] = x.nombre; });
  };

  /* ---------- Vistas ---------- */
  const vigente = (i) => i.estado === 'pendiente' && new Date(i.vence_en) > new Date();
  const estadoInv = (i) => i.estado === 'usada' ? TH.ui.badge('Usada', 'exito') : i.estado === 'anulada' ? TH.ui.badge('Anulada', 'neutro') : vigente(i) ? TH.ui.badge('Pendiente', 'info') : TH.ui.badge('Vencida', 'error');

  function inicio() {
    const act = datos.orgs.filter(o => o.estado === 'activa').length; const sus = datos.orgs.length - act;
    const pend = datos.invs.filter(vigente).length;
    return TH.ui.encabezado('Tablero general', 'Resumen de la plataforma.', '<a class="btn btn--primario" href="#/fma/organizaciones">Gestionar organizaciones</a>') +
      '<div class="grid grid--3">' + TH.ui.kpi('Organizaciones activas', act, '', 'turquesa') + TH.ui.kpi('Organizaciones suspendidas', sus, '', 'coral') + TH.ui.kpi('Invitaciones pendientes', pend, 'Vigentes y sin usar', 'violeta') + '</div>' +
      TH.ui.alerta('info', 'Módulos en construcción', 'El autodiagnóstico, el plan de acción y la formación se habilitarán próximamente. Por ahora puedes crear organizaciones e invitar a sus responsables.');
  }

  function organizaciones() {
    const accion = (o) => '<a class="btn btn--terciario btn--sm" href="#/fma/organizaciones/detalle?id=' + esc(o.id) + '">Ver</a> <button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-invitar" data-id="' + esc(o.id) + '" data-nombre="' + esc(o.nombre) + '">Invitar responsable</button> ' +
      (o.estado === 'activa'
        ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-estado" data-id="' + esc(o.id) + '" data-estado="suspendida" data-nombre="' + esc(o.nombre) + '">Suspender</button>'
        : '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-estado" data-id="' + esc(o.id) + '" data-estado="activa" data-nombre="' + esc(o.nombre) + '">Reactivar</button>');
    const nombreOrg = (id) => { const o = datos.orgs.find(x => x.id === id); return o ? o.nombre : '—'; };
    return TH.ui.encabezado('Organizaciones', 'Crea organizaciones e invita a su responsable. Nadie se registra sin invitación.', '<button type="button" class="btn btn--primario" data-action="fma-org-nueva">Nueva organización</button>') +
      TH.ui.tabla([
        { titulo: 'Organización', render: o => '<a href="#/fma/organizaciones/detalle?id=' + esc(o.id) + '"><strong>' + esc(o.nombre) + '</strong></a>' },
        { titulo: 'Identificación', render: o => esc((o.tipo_identificacion || '') + ' ' + (o.identificacion || '')) },
        { titulo: 'Estado', render: o => TH.ui.badgeEstadoOrg(o.estado) },
        { titulo: 'Creada', render: o => esc(fecha(o.creado_en)) },
        { titulo: 'Acciones', render: accion }
      ], datos.orgs, { caption: 'Organizaciones', vacioTitulo: 'Aún no hay organizaciones', vacioTexto: 'Crea la primera con «Nueva organización».' }) +
      '<h2 class="mt-5">Invitaciones</h2><p class="texto-2">El código se muestra una sola vez al crearla; por eso aquí no aparece. Dura 7 días.</p>' +
      TH.ui.tabla([
        { titulo: 'Correo', campo: 'email' },
        { titulo: 'Organización', render: i => esc(nombreOrg(i.organizacion_id)) },
        { titulo: 'Rol', render: i => esc(i.rol === 'organizacion' ? 'Responsable' : i.rol === 'colaborador' ? 'Colaborador' : 'Administración FMA') },
        { titulo: 'Estado', render: estadoInv },
        { titulo: 'Vence', render: i => esc(fecha(i.vence_en)) },
        { titulo: 'Acciones', render: i => vigente(i) ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-inv-anular" data-id="' + esc(i.id) + '">Anular</button>' : '' }
      ], datos.invs, { caption: 'Invitaciones', vacioTitulo: 'Sin invitaciones', vacioTexto: 'Aparecerán aquí cuando invites a alguien.' });
  }

  const ETIQUETAS = { 'sesion.inicio': 'Inicio de sesión', 'cuenta.activada': 'Cuenta activada', 'organizacion.crear': 'Organización creada', 'organizacion.estado': 'Estado de organización', 'invitacion.crear': 'Invitación creada', 'invitacion.anular': 'Invitación anulada', 'perfil.cambio': 'Cambio en un perfil' };
  function auditoria() {
    const orgNombre = (id) => { const o = datos.orgs.find(x => x.id === id); return o ? o.nombre : (id ? id.slice(0, 8) : '—'); };
    return TH.ui.encabezado('Trazabilidad', 'Últimos 200 eventos. Nadie puede modificar ni borrar este registro.') +
      TH.ui.tabla([
        { titulo: 'Fecha', render: a => esc(fecha(a.creado_en)) },
        { titulo: 'Evento', render: a => esc(ETIQUETAS[a.accion] || a.accion) },
        { titulo: 'Quién', render: a => esc(datos.nombres[a.actor_id] || (a.actor_id ? a.actor_id.slice(0, 8) : 'Sistema')) },
        { titulo: 'Detalle', render: a => '<code class="texto-xs">' + esc(JSON.stringify(a.detalle || {})) + '</code>' }
      ], datos.aud, { caption: 'Registro de auditoría', vacioTitulo: 'Sin eventos', vacioTexto: 'Aún no hay actividad registrada.' });
  }


  /* ---------- Equipo FMA ---------- */
  const badgePersona = (e) => e === 'activo' ? TH.ui.badge('Activo', 'exito') : e === 'suspendido' ? TH.ui.badge('Suspendido', 'error') : TH.ui.badge('Desvinculado', 'neutro');
  const botonEstado = (p, yoId) => p.id === yoId || p.estado === 'desvinculado' ? '' : (p.estado === 'activo'
    ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-persona-estado" data-id="' + esc(p.id) + '" data-estado="suspendido" data-nombre="' + esc(p.nombre) + '">Suspender</button>'
    : '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-persona-estado" data-id="' + esc(p.id) + '" data-estado="activo" data-nombre="' + esc(p.nombre) + '">Reactivar</button>');
  const tablaPersonas = (lista, caption) => { const yoId = TH.auth.sesion().userId; return TH.ui.tabla([
    { titulo: 'Persona', render: p => '<strong>' + esc(p.nombre) + (p.id === yoId ? ' (tú)' : '') + '</strong><div class="texto-xs texto-2">' + esc(p.email) + '</div>' },
    { titulo: 'Rol', render: p => esc(p.rol === 'admin_fma' ? 'Administración FMA' : p.rol === 'organizacion' ? 'Responsable' : 'Colaborador') },
    { titulo: 'Estado', render: p => badgePersona(p.estado) },
    { titulo: 'Alta', render: p => esc(fecha(p.creado_en)) },
    { titulo: 'Último acceso', render: p => esc(fecha(p.ultimo_acceso)) },
    { titulo: '', clase: 'acciones', render: p => botonEstado(p, yoId) }
  ], lista, { caption, vacioTitulo: 'Sin personas', vacioTexto: 'Aún no hay cuentas activadas.' }); };

  TH.supabaseCargadores['/fma/equipo'] = async function () {
    const [p, i] = await Promise.all([sb.rpc('listar_personas', { p_organizacion_id: null }),
      sb.from('invitaciones').select('id, email, rol, estado, vence_en, creada_en').eq('rol', 'admin_fma').order('creada_en', { ascending: false })]);
    datos.equipo = lanzar(p) || []; datos.invsEquipo = lanzar(i) || [];
  };
  function equipo() {
    return TH.ui.encabezado('Equipo FMA', 'Personas con acceso de administración. Todas tienen los mismos permisos: invita solo a quien deba tenerlos.', '<button type="button" class="btn btn--primario" data-action="fma-admin-invitar">Invitar administrador</button>') +
      TH.ui.alerta('info', 'Protecciones', 'Nadie puede suspenderse a sí mismo y la plataforma nunca queda sin un administrador activo. Cada cambio queda en la trazabilidad.') +
      tablaPersonas(datos.equipo || [], 'Equipo FMA') +
      '<h2 class="mt-5">Invitaciones de administración</h2>' + TH.ui.tabla([
        { titulo: 'Correo', campo: 'email' }, { titulo: 'Estado', render: estadoInv }, { titulo: 'Vence', render: i => esc(fecha(i.vence_en)) },
        { titulo: '', clase: 'acciones', render: i => vigente(i) ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-inv-anular" data-id="' + esc(i.id) + '">Anular</button>' : '' }
      ], datos.invsEquipo || [], { caption: 'Invitaciones de administración', vacioTitulo: 'Sin invitaciones', vacioTexto: '' });
  }

  /* ---------- Detalle de organización ---------- */
  TH.supabaseCargadores['/fma/organizaciones/detalle'] = async function (ctx) {
    const id = ctx.params.id;
    const [o, p, i, d, pl, ac, f] = await Promise.all([
      sb.from('organizaciones').select('*').eq('id', id).maybeSingle(),
      sb.rpc('listar_personas', { p_organizacion_id: id }),
      sb.from('invitaciones').select('id, email, rol, estado, vence_en, creada_en').eq('organizacion_id', id).order('creada_en', { ascending: false }),
      sb.from('diagnosticos').select('ciclo, estado, resultado, fecha_fin, respuestas, preguntas, archivado').eq('organizacion_id', id).order('ciclo', { ascending: false }),
      sb.from('planes').select('id, creado_en').eq('organizacion_id', id).maybeSingle(),
      sb.from('acciones').select('estado, avance, fecha_objetivo').eq('organizacion_id', id),
      sb.rpc('resumen_formacion_fma')
    ]);
    datos.detalle = { org: lanzar(o), personas: lanzar(p) || [], invs: lanzar(i) || [], diags: lanzar(d) || [], plan: lanzar(pl), acciones: lanzar(ac) || [], formacion: (lanzar(f) || []).find(x => x.organizacion_id === id) || null };
  };
  function detalle() {
    const D = datos.detalle || {}; const o = D.org;
    if (!o) return TH.ui.vacio('Organización no encontrada', '', '<a class="btn btn--primario" href="#/fma/organizaciones">Volver</a>');
    const dg = D.diags.find(x => !x.archivado) || null; const hoy = TH.util.hoy();
    const diagTxt = !dg ? 'Aún no ha iniciado el autodiagnóstico.' : dg.estado === 'completado'
      ? 'Ciclo ' + dg.ciclo + ' completado el ' + fecha(dg.fecha_fin) + '. Resultado global: ' + ((dg.resultado || {}).global != null ? dg.resultado.global + ' %' : '—') + '.'
      : 'Ciclo ' + dg.ciclo + ' en curso: ' + Object.keys(dg.respuestas || {}).length + ' de ' + (dg.preguntas || []).length + ' preguntas respondidas.';
    const ac = D.acciones; const avance = ac.length ? Math.round(ac.reduce((t, a) => t + a.avance, 0) / ac.length) : 0;
    const vencidas = ac.filter(a => ['pendiente', 'en-ejecucion'].includes(a.estado) && a.fecha_objetivo < hoy).length;
    const planTxt = !D.plan ? 'Aún no tiene plan de acción.' : ac.length + ' acciones · avance global ' + avance + ' % · ' + ac.filter(a => a.estado === 'completada').length + ' completadas' + (vencidas ? ' · ' + vencidas + ' vencidas' : '') + '.';
    const fm = D.formacion; const formTxt = fm ? fm.colaboradores + ' colaboradores activos · ' + fm.completados + ' de ' + fm.asignaciones + ' módulos asignados completados.' : '—';
    const responsables = D.personas.filter(p => p.rol === 'organizacion'); const colabs = D.personas.filter(p => p.rol === 'colaborador');
    return TH.ui.migas([{ texto: 'Organizaciones', ruta: '/fma/organizaciones' }, { texto: o.nombre }]) +
      TH.ui.encabezado(o.nombre, esc((o.tipo_identificacion || '') + ' ' + (o.identificacion || '')) + ' · ' + (o.estado === 'activa' ? 'Activa' : 'Suspendida'),
        '<button type="button" class="btn btn--primario" data-action="fma-org-invitar" data-id="' + esc(o.id) + '" data-nombre="' + esc(o.nombre) + '">Invitar responsable</button>') +
      '<div class="grid grid-3 mb-4">' +
        '<div class="card"><h3 class="card__titulo">Autodiagnóstico</h3><p class="texto-sm">' + esc(diagTxt) + '</p></div>' +
        '<div class="card"><h3 class="card__titulo">Plan de acción</h3><p class="texto-sm">' + esc(planTxt) + '</p></div>' +
        '<div class="card"><h3 class="card__titulo">Formación</h3><p class="texto-sm">' + esc(formTxt) + '</p><p class="texto-xs texto-3 mb-0">Solo conteos: las respuestas de los colaboradores son privadas.</p></div></div>' +
      '<h2>Responsables</h2>' + tablaPersonas(responsables, 'Responsables') +
      '<h2 class="mt-5">Colaboradores</h2>' + tablaPersonas(colabs, 'Colaboradores') +
      '<h2 class="mt-5">Invitaciones</h2>' + TH.ui.tabla([
        { titulo: 'Correo', campo: 'email' }, { titulo: 'Rol', render: i => esc(i.rol === 'organizacion' ? 'Responsable' : 'Colaborador') },
        { titulo: 'Estado', render: estadoInv }, { titulo: 'Vence', render: i => esc(fecha(i.vence_en)) },
        { titulo: '', clase: 'acciones', render: i => vigente(i) ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-inv-anular" data-id="' + esc(i.id) + '">Anular</button>' : '' }
      ], D.invs, { caption: 'Invitaciones', vacioTitulo: 'Sin invitaciones', vacioTexto: '' });
  }

  TH.router.registrarVarias({
    '/fma/inicio': { roles: ROLES, titulo: 'Tablero general', render: inicio },
    '/fma/organizaciones': { roles: ROLES, titulo: 'Organizaciones', render: organizaciones, ancho: true },
    '/fma/auditoria': { roles: ROLES, titulo: 'Trazabilidad', render: auditoria, ancho: true },
    '/fma/equipo': { roles: ROLES, titulo: 'Equipo FMA', render: equipo, ancho: true },
    '/fma/organizaciones/detalle': { roles: ROLES, titulo: 'Organización', render: detalle, ancho: true }
  });

  /* ---------- Acciones ---------- */
  function mostrarEnlace(codigo, email, nombreOrg) {
    const enlace = enlaceActivacion(codigo);
    TH.ui.modal({
      titulo: 'Invitación creada',
      cuerpo: '<p>Copia este enlace y compártelo con <strong>' + esc(email) + '</strong>' + (nombreOrg ? ' (' + esc(nombreOrg) + ')' : '') + '. <strong>Se muestra una sola vez</strong> y dura 7 días.</p>' +
        '<div class="campo"><label class="campo__label" for="enlace-inv">Enlace de activación</label><input class="input" id="enlace-inv" readonly value="' + esc(enlace) + '"></div>' +
        TH.ui.alerta('info', 'Importante', 'La persona debe registrarse con ese mismo correo (' + esc(email) + '); si usa otro, la invitación no sirve.'),
      pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cerrar</button><button type="button" class="btn btn--primario" data-action="fma-copiar" data-texto="' + esc(enlace) + '">Copiar enlace</button>'
    });
  }

  const MENSAJES_RPC = [[/último administrador/, 'No se puede suspender al último administrador activo.'], [/propio estado/, 'No puedes cambiar tu propio estado.'], [/no está publicado|no existe o no está publicado/, 'Algún módulo no está publicado.'], [/Ya existe una cuenta/, 'Ya existe una cuenta con ese correo.'], [/invitación vigente/, 'Ya hay una invitación vigente para ese correo: anúlala para crear otra.'], [/Correo no válido/, 'El correo no es válido.'], [/suspendida|no encontrada/i, 'La organización no existe o está suspendida.'], [/Sin acceso|permission|42501/, 'No tienes permiso para esta operación.']];
  const msg = (e) => { const t = (e && (e.message || '')) + ' ' + (e && e.code || ''); const m = MENSAJES_RPC.find(x => x[0].test(t)); return m ? m[1] : 'No fue posible completar la operación.'; };
  const refrescar = () => TH.router.recargar();
  /** Ayudas compartidas con las pantallas de la organización (formacion-supabase.js). */
  TH.supabaseUI = { mostrarEnlace, fecha, msg };

  Object.assign(TH.acciones, {
    'fma-org-nueva'() {
      TH.ui.modal({
        titulo: 'Nueva organización', grande: true,
        cuerpo: '<form id="form-org-nueva" data-form="fma-org-nueva" novalidate>' +
          TH.ui.campo({ name: 'nombre', label: 'Nombre de la organización', required: true }) +
          '<div class="form-fila">' + TH.ui.campo({ name: 'tipo', label: 'Tipo de identificación', tipo: 'select', required: true, opciones: ['NIT', 'Cédula', 'Otro'], valor: 'NIT' }) +
          TH.ui.campo({ name: 'identificacion', label: 'Número de identificación', required: true, ayuda: 'Para NIT incluye el dígito de verificación. No se puede repetir.' }) + '</div>' +
          TH.ui.campo({ name: 'responsable', label: 'Nombre de la persona responsable', required: true }) +
          TH.ui.campo({ name: 'email', label: 'Correo del responsable', tipo: 'email', required: true, ayuda: 'Es el correo al que queda atada la invitación.' }) +
          '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-org-nueva" class="btn btn--primario">Crear e invitar</button>'
      });
    },
    'fma-org-invitar'(el) {
      TH.ui.modal({
        titulo: 'Invitar responsable · ' + el.dataset.nombre,
        cuerpo: '<form id="form-org-invitar" data-form="fma-org-invitar" data-id="' + esc(el.dataset.id) + '" data-nombre="' + esc(el.dataset.nombre) + '" novalidate>' +
          TH.ui.campo({ name: 'email', label: 'Correo del responsable', tipo: 'email', required: true }) +
          '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-org-invitar" class="btn btn--primario">Crear invitación</button>'
      });
    },
    async 'fma-org-estado'(el) {
      const suspender = el.dataset.estado === 'suspendida';
      const si = await TH.ui.confirmar({
        titulo: suspender ? 'Suspender organización' : 'Reactivar organización', peligro: suspender, aceptar: suspender ? 'Suspender' : 'Reactivar',
        texto: suspender ? 'Todas las cuentas de <strong>' + esc(el.dataset.nombre) + '</strong> perderán el acceso de inmediato.' : 'Las cuentas de <strong>' + esc(el.dataset.nombre) + '</strong> recuperarán el acceso.'
      });
      if (!si) return;
      const r = await sb.from('organizaciones').update({ estado: el.dataset.estado }).eq('id', el.dataset.id).select('id');
      if (r.error || !(r.data || []).length) { TH.ui.toast('No fue posible cambiar el estado.', 'error', 5000); return; }
      TH.ui.toast(suspender ? 'Organización suspendida.' : 'Organización reactivada.', 'exito'); refrescar();
    },
    async 'fma-inv-anular'(el) {
      const si = await TH.ui.confirmar({ titulo: 'Anular invitación', peligro: true, aceptar: 'Anular', texto: 'El enlace dejará de servir. Podrás crear otra invitación para ese correo.' });
      if (!si) return;
      const r = await sb.rpc('anular_invitacion', { p_id: el.dataset.id });
      if (r.error) { TH.ui.toast(msg(r.error), 'error', 5000); return; }
      TH.ui.toast('Invitación anulada.', 'exito'); refrescar();
    },
    'fma-admin-invitar'() {
      TH.ui.modal({
        titulo: 'Invitar administrador de FMA',
        cuerpo: '<form id="form-admin-invitar" data-form="fma-admin-invitar" novalidate>' + TH.ui.alerta('alerta', 'Acceso completo', 'Esta persona podrá crear organizaciones, invitar administradores, suspender cuentas y publicar contenidos.') +
          TH.ui.campo({ name: 'email', label: 'Correo institucional', tipo: 'email', required: true }) + '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-admin-invitar" class="btn btn--primario">Crear invitación</button>'
      });
    },
    async 'fma-persona-estado'(el) {
      const suspender = el.dataset.estado === 'suspendido';
      const si = await TH.ui.confirmar({ titulo: suspender ? 'Suspender acceso' : 'Reactivar acceso', peligro: suspender, aceptar: suspender ? 'Suspender' : 'Reactivar',
        texto: esc(el.dataset.nombre) + (suspender ? ' no podrá entrar hasta que se reactive.' : ' podrá volver a entrar.') });
      if (!si) return;
      const r = await sb.from('perfiles').update({ estado: el.dataset.estado }).eq('id', el.dataset.id).select('id');
      if (r.error || !(r.data || []).length) { TH.ui.toast(r.error ? msg(r.error) : 'No fue posible cambiar el estado.', 'error', 6000); return; }
      TH.ui.toast(suspender ? 'Acceso suspendido.' : 'Acceso reactivado.', 'exito'); refrescar();
    },
    async 'fma-copiar'(el) {
      try { await navigator.clipboard.writeText(el.dataset.texto); TH.ui.toast('Enlace copiado.', 'exito'); }
      catch (_) { const i = document.getElementById('enlace-inv'); if (i) { i.select(); TH.ui.toast('Selecciona y copia el enlace.', 'info'); } }
    }
  });

  Object.assign(TH.formularios, {
    async 'fma-admin-invitar'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form);
      TH.ui.ocupado(form, true, 'Creando…');
      const c = await sb.rpc('crear_invitacion', { p_email: d.email.trim(), p_rol: 'admin_fma' });
      TH.ui.ocupado(form, false);
      if (c.error) { TH.ui.mostrarErrores(form, { general: msg(c.error) }); return; }
      TH.ui.cerrarModal(); mostrarEnlace(c.data, d.email.trim(), 'Equipo FMA'); refrescar();
    },
    async 'fma-org-nueva'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form);
      TH.ui.ocupado(form, true, 'Creando…');
      const o = await sb.from('organizaciones').insert({ nombre: d.nombre.trim(), tipo_identificacion: d.tipo, identificacion: d.identificacion.trim(), responsable: d.responsable.trim(), email_institucional: d.email.trim() }).select('id, nombre').single();
      if (o.error) {
        TH.ui.ocupado(form, false);
        TH.ui.mostrarErrores(form, o.error.code === '23505' ? { identificacion: 'Ya existe una organización con ese número de identificación.' } : { general: msg(o.error) }); return;
      }
      const c = await sb.rpc('crear_invitacion', { p_email: d.email.trim(), p_rol: 'organizacion', p_organizacion_id: o.data.id });
      TH.ui.ocupado(form, false);
      if (c.error) {
        TH.ui.cerrarModal(); TH.ui.toast('La organización se creó, pero la invitación falló: ' + msg(c.error) + ' Usa «Invitar responsable».', 'error', 8000); refrescar(); return;
      }
      TH.ui.cerrarModal(); mostrarEnlace(c.data, d.email.trim(), o.data.nombre); refrescar();
    },
    async 'fma-org-invitar'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form);
      TH.ui.ocupado(form, true, 'Creando…');
      const c = await sb.rpc('crear_invitacion', { p_email: d.email.trim(), p_rol: 'organizacion', p_organizacion_id: form.dataset.id });
      TH.ui.ocupado(form, false);
      if (c.error) { TH.ui.mostrarErrores(form, { general: msg(c.error) }); return; }
      TH.ui.cerrarModal(); mostrarEnlace(c.data, d.email.trim(), form.dataset.nombre); refrescar();
    }
  });
})();
