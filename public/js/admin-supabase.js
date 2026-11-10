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
    { grupo: 'Sistema' },
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
    const accion = (o) => '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-invitar" data-id="' + esc(o.id) + '" data-nombre="' + esc(o.nombre) + '">Invitar responsable</button> ' +
      (o.estado === 'activa'
        ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-estado" data-id="' + esc(o.id) + '" data-estado="suspendida" data-nombre="' + esc(o.nombre) + '">Suspender</button>'
        : '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-org-estado" data-id="' + esc(o.id) + '" data-estado="activa" data-nombre="' + esc(o.nombre) + '">Reactivar</button>');
    const nombreOrg = (id) => { const o = datos.orgs.find(x => x.id === id); return o ? o.nombre : '—'; };
    return TH.ui.encabezado('Organizaciones', 'Crea organizaciones e invita a su responsable. Nadie se registra sin invitación.', '<button type="button" class="btn btn--primario" data-action="fma-org-nueva">Nueva organización</button>') +
      TH.ui.tabla([
        { titulo: 'Organización', render: o => '<strong>' + esc(o.nombre) + '</strong>' },
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

  TH.router.registrarVarias({
    '/fma/inicio': { roles: ROLES, titulo: 'Tablero general', render: inicio },
    '/fma/organizaciones': { roles: ROLES, titulo: 'Organizaciones', render: organizaciones, ancho: true },
    '/fma/auditoria': { roles: ROLES, titulo: 'Trazabilidad', render: auditoria, ancho: true }
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

  const MENSAJES_RPC = [[/Ya existe una cuenta/, 'Ya existe una cuenta con ese correo.'], [/invitación vigente/, 'Ya hay una invitación vigente para ese correo: anúlala para crear otra.'], [/Correo no válido/, 'El correo no es válido.'], [/suspendida|no encontrada/i, 'La organización no existe o está suspendida.'], [/Sin acceso|permission|42501/, 'No tienes permiso para esta operación.']];
  const msg = (e) => { const t = (e && (e.message || '')) + ' ' + (e && e.code || ''); const m = MENSAJES_RPC.find(x => x[0].test(t)); return m ? m[1] : 'No fue posible completar la operación.'; };
  const refrescar = () => TH.router.recargar();

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
    async 'fma-copiar'(el) {
      try { await navigator.clipboard.writeText(el.dataset.texto); TH.ui.toast('Enlace copiado.', 'exito'); }
      catch (_) { const i = document.getElementById('enlace-inv'); if (i) { i.select(); TH.ui.toast('Selecciona y copia el enlace.', 'info'); } }
    }
  });

  Object.assign(TH.formularios, {
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
