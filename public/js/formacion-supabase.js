/* ============================================================
   TURQUESA HUB · FORMACIÓN Y PERSONAS (adaptador Supabase) — F04
   - Catálogo: los TEXTOS de módulos y biblioteca están en js/data/; la base dice qué está PUBLICADO
     (tablas modulos y contenidos) y es quien califica el ejercicio.
   - Colaborador: usa las pantallas de rc4 (Mi formación, módulo, progreso, recursos, cuenta). Sus avances van
     a funciones de la base (marcar_leccion, responder_ejercicio, finalizar_modulo, reintentar_modulo).
     Sus respuestas son privadas: solo él las lee.
   - Organización: pantalla «Colaboradores» (personas, invitaciones con módulos, avance sin respuestas)
     y la biblioteca. La organización recibe resumen_formacion(): estados, fechas y puntaje, nunca respuestas.
   Se ejecuta solo con el adaptador 'supabase'.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase' || !TH.sb) return;
  const sb = TH.sb; const esc = TH.util.esc; const F = TH.api.formacion; const UI = TH.supabaseUI;
  const lanzar = (r) => { if (r.error) throw r.error; return r.data; };
  const yo = () => TH.auth.usuario();

  /* ---------- Catálogo publicado (todos los roles) ---------- */
  async function cargarCatalogo() {
    const [m, c] = await Promise.all([sb.from('modulos').select('id, estado'), sb.from('contenidos').select('id, estado, publico')]);
    const em = {}; (lanzar(m) || []).forEach(x => { em[x.id] = x.estado; });
    const ec = {}; (lanzar(c) || []).forEach(x => { ec[x.id] = x; });
    TH.store.update(s => {
      // Módulos con la forma de rc4 (versión publicada de cada módulo). Lo que la base no devuelve queda en borrador.
      s.modulos = TH.data.modulos.map(md => Object.assign(JSON.parse(JSON.stringify(md)), { id: 'modv-' + md.id, moduloId: md.id, version: '1.0', estado: em[md.id] || 'borrador' }));
      s.contenidos = TH.data.contenidos.map(ct => Object.assign(JSON.parse(JSON.stringify(ct)), { estado: ec[ct.id] ? ec[ct.id].estado : 'borrador', publico: ec[ct.id] ? ec[ct.id].publico : (ct.publico || []) }));
    }, 'remoto');
  }
  TH.cargarCatalogo = cargarCatalogo;

  /* =====================================================================
     COLABORADOR
     ===================================================================== */
  const mapProgreso = (p) => ({ id: p.id, userId: p.user_id, orgId: p.organizacion_id, moduloId: p.modulo_id, leccionesVistas: p.lecciones_vistas || [], respuestasQuiz: p.respuestas || {}, puntaje: p.puntaje, estado: p.estado, fechaInicio: String(p.fecha_inicio || '').slice(0, 10), fechaFin: p.fecha_fin ? String(p.fecha_fin).slice(0, 10) : null });
  const guardarProgreso = (fila) => { const p = mapProgreso(fila); TH.store.update(s => { const i = s.progresoFormativo.findIndex(x => x.moduloId === p.moduloId && x.userId === p.userId); if (i >= 0) s.progresoFormativo[i] = p; else s.progresoFormativo.push(p); }, 'formacion'); return p; };

  async function cargarColaborador() {
    await cargarCatalogo();
    const [a, p] = await Promise.all([sb.from('asignaciones_modulo').select('modulo_id'), sb.from('progreso').select('*')]);
    const asignados = (lanzar(a) || []).map(x => x.modulo_id);
    TH.store.update(s => {
      const u = s.usuarios.find(x => x.id === TH.auth.sesion().userId); if (u) u.modulosAsignados = asignados;
      s.progresoFormativo = (lanzar(p) || []).map(mapProgreso);
    }, 'remoto');
  }
  ['/colaborador/inicio', '/colaborador/formacion', '/colaborador/formacion/modulo', '/colaborador/mi-progreso', '/colaborador/recursos', '/colaborador/perfil']
    .forEach(r => { TH.supabaseCargadores[r] = cargarColaborador; TH.supabaseHabilitar(r); });

  const MSG = [[/no está asignado/, 'Este módulo no está asignado a tu perfil.'], [/Completa todas/, 'Completa todas las lecciones y el ejercicio antes de finalizar.'], [/Reintentar/, 'El módulo ya está completado: usa «Reintentar» para responder de nuevo.'], [/42501|permission/, 'No tienes permiso para esta operación.']];
  const fallo = (e) => { const t = ((e && e.message) || '') + ' ' + ((e && e.code) || ''); const m = MSG.find(x => x[0].test(t)); return { ok: false, error: m ? m[1] : 'No fue posible guardar. Intenta de nuevo.' }; };

  Object.assign(F, {
    async iniciar() { return { ok: true }; },   // el progreso nace con la primera lección o respuesta
    async marcarLeccion(userId, moduloId, leccionId) {
      const r = await sb.rpc('marcar_leccion', { p_modulo: moduloId, p_leccion: leccionId }); if (r.error) return fallo(r.error);
      return { ok: true, progreso: guardarProgreso(r.data) };
    },
    async responderQuiz(userId, moduloId, preguntaId, opcionId) {
      const m = F.modulo(moduloId); const q = m && m.quiz.find(x => x.id === preguntaId);
      if (!q) return { ok: false, error: 'Pregunta no disponible.' };
      const r = await sb.rpc('responder_ejercicio', { p_modulo: moduloId, p_pregunta: preguntaId, p_opcion: opcionId }); if (r.error) return fallo(r.error);
      const correcta = !!r.data.correcta; const fila = Object.assign({}, r.data); delete fila.correcta;
      return { ok: true, correcta, retro: correcta ? q.retro.ok : q.retro.no, progreso: guardarProgreso(fila) };
    },
    async finalizar(userId, moduloId) {
      const r = await sb.rpc('finalizar_modulo', { p_modulo: moduloId }); if (r.error) return fallo(r.error);
      const p = guardarProgreso(r.data); const m = F.modulo(moduloId);
      const aciertos = m ? m.quiz.filter(q => p.respuestasQuiz[q.id] === q.correcta).length : 0;
      return { ok: true, puntaje: p.puntaje, aciertos, total: m ? m.quiz.length : 0 };   // el puntaje lo calcula la base
    },
    async reintentar(userId, moduloId) {
      const r = await sb.rpc('reintentar_modulo', { p_modulo: moduloId }); if (r.error) return fallo(r.error);
      guardarProgreso(r.data); return { ok: true };
    }
  });

  // «Mi cuenta» del colaborador: sus datos personales (la base impide cambiar rol, organización o estado).
  const actualizarLocal = TH.api.usuarios.actualizar;
  TH.api.usuarios.actualizar = async function (userId, cambios) {
    if (!TH.auth.sesion() || userId !== TH.auth.sesion().userId) return actualizarLocal.apply(this, arguments);
    const fila = {}; if (cambios.nombre != null) fila.nombre = String(cambios.nombre).trim(); if (cambios.area != null) fila.area = String(cambios.area).trim();
    if (fila.nombre === '') return { ok: false, error: 'Escribe tu nombre.' };
    const r = await sb.from('perfiles').update(fila).eq('id', userId).select('id').single(); if (r.error) return fallo(r.error);
    TH.store.update(s => { const u = s.usuarios.find(x => x.id === userId); if (u) Object.assign(u, fila); }, 'usuario');
    return { ok: true };
  };

  // Menú del colaborador: el de rc4 completo (todo está conectado).
  TH.layout.menus.colaborador.splice(0, TH.layout.menus.colaborador.length,
    { ruta: '/colaborador/inicio', texto: 'Inicio', icono: 'inicio' },
    { ruta: '/colaborador/formacion', texto: 'Mi formación', icono: 'formacion' },
    { ruta: '/colaborador/mi-progreso', texto: 'Mi progreso', icono: 'reporte' },
    { ruta: '/colaborador/recursos', texto: 'Recursos', icono: 'biblioteca' },
    { ruta: '/colaborador/perfil', texto: 'Mi cuenta', icono: 'persona' });

  /* =====================================================================
     ORGANIZACIÓN: Colaboradores (personas, invitaciones, avance) y biblioteca
     ===================================================================== */
  const datos = { personas: [], invitaciones: [], asignaciones: [], resumen: [] };
  async function cargarColaboradoresOrg() {
    await cargarCatalogo();
    const [p, i, a, r] = await Promise.all([
      sb.rpc('listar_personas'),
      sb.from('invitaciones').select('id, email, rol, estado, modulos, vence_en, creada_en').eq('rol', 'colaborador').order('creada_en', { ascending: false }),
      sb.from('asignaciones_modulo').select('user_id, modulo_id'),
      sb.rpc('resumen_formacion')
    ]);
    datos.personas = lanzar(p) || []; datos.invitaciones = lanzar(i) || []; datos.asignaciones = lanzar(a) || []; datos.resumen = lanzar(r) || [];
  }
  TH.supabaseCargadores['/organizacion/colaboradores'] = cargarColaboradoresOrg;
  TH.supabaseCargadores['/organizacion/biblioteca'] = cargarCatalogo;
  TH.supabaseHabilitar('/organizacion/biblioteca');

  const ui = { tab: 'personas' };
  const publicados = () => F.modulos();
  const nombreModulo = (id) => { const m = TH.data.modulos.find(x => x.id === id); return m ? 'M' + m.orden + ' · ' + m.titulo : id; };
  const badgeEstado = (e) => e === 'activo' ? TH.ui.badge('Activo', 'exito') : e === 'suspendido' ? TH.ui.badge('Suspendido', 'error') : TH.ui.badge('Desvinculado', 'neutro');
  const vigente = (i) => i.estado === 'pendiente' && new Date(i.vence_en) > new Date();
  const checksModulos = (marcados) => {
    const ms = publicados();
    if (!ms.length) return TH.ui.alerta('info', 'Sin módulos publicados', 'La Fundación Milagro de Abril aún no ha publicado módulos. Podrás asignarlos cuando estén disponibles.');
    return '<fieldset><legend class="texto-sm">Módulos a asignar</legend>' + ms.map(m => TH.ui.check('modulos', 'Módulo ' + m.orden + ': ' + esc(m.titulo) + ' <span class="texto-2">(' + esc(m.duracion) + ')</span>', marcados ? marcados.includes(m.id) : true, m.id)).join('') + '</fieldset>';
  };

  function colaboradores() {
    const yoId = TH.auth.sesion().userId;
    const colabs = datos.personas.filter(p => p.rol === 'colaborador');
    const responsables = datos.personas.filter(p => p.rol === 'organizacion');
    const pendientes = datos.invitaciones.filter(vigente).length;
    const completados = datos.resumen.filter(r => r.estado === 'completado').length;
    const asignadas = datos.resumen.filter(r => r.asignado).length;
    const tabs = TH.ui.tabs([{ id: 'personas', texto: 'Personas', n: datos.personas.length }, { id: 'invitaciones', texto: 'Invitaciones', n: datos.invitaciones.length }, { id: 'avance', texto: 'Avance de formación', n: completados }], ui.tab, 'sb-colab-tab');
    let cuerpo = '';
    if (ui.tab === 'personas') {
      const modsDe = (id) => datos.asignaciones.filter(a => a.user_id === id).map(a => a.modulo_id);
      cuerpo = '<h2 style="font-size:var(--th-t-lg)">Colaboradores</h2>' + TH.ui.tabla([
        { titulo: 'Persona', render: p => '<strong>' + esc(p.nombre) + '</strong><div class="texto-xs texto-2">' + esc(p.email) + (p.area ? ' · ' + esc(p.area) : '') + '</div>' },
        { titulo: 'Módulos', render: p => { const ms = modsDe(p.id); return ms.length ? ms.map(m => TH.ui.badge(nombreModulo(m).split(' · ')[0], 'naranja')).join(' ') : TH.ui.badge('Sin asignar', 'alerta'); } },
        { titulo: 'Estado', render: p => badgeEstado(p.estado) },
        { titulo: 'Último acceso', render: p => esc(UI.fecha(p.ultimo_acceso)) },
        { titulo: '', clase: 'acciones', render: p => p.estado === 'desvinculado' ? '' :
          '<button type="button" class="btn btn--terciario btn--sm" data-action="sb-colab-modulos" data-id="' + esc(p.id) + '" data-nombre="' + esc(p.nombre) + '">Módulos</button> ' +
          (p.estado === 'activo' ? '<button type="button" class="btn btn--terciario btn--sm" data-action="sb-persona-estado" data-id="' + esc(p.id) + '" data-estado="suspendido" data-nombre="' + esc(p.nombre) + '">Suspender</button> '
                                 : '<button type="button" class="btn btn--terciario btn--sm" data-action="sb-persona-estado" data-id="' + esc(p.id) + '" data-estado="activo" data-nombre="' + esc(p.nombre) + '">Reactivar</button> ') +
          '<button type="button" class="btn btn--terciario btn--sm" data-action="sb-persona-estado" data-id="' + esc(p.id) + '" data-estado="desvinculado" data-nombre="' + esc(p.nombre) + '">Desvincular</button>' }
      ], colabs, { caption: 'Colaboradores', vacioTitulo: 'Aún no hay colaboradores', vacioTexto: 'Crea una invitación para que tu equipo acceda a los módulos.' }) +
        '<h2 class="mt-5" style="font-size:var(--th-t-lg)">Responsables de la organización</h2><p class="texto-sm texto-2">Para sumar o retirar responsables, escribe a la Fundación Milagro de Abril.</p>' +
        TH.ui.tabla([
          { titulo: 'Persona', render: p => '<strong>' + esc(p.nombre) + (p.id === yoId ? ' (tú)' : '') + '</strong><div class="texto-xs texto-2">' + esc(p.email) + '</div>' },
          { titulo: 'Estado', render: p => badgeEstado(p.estado) },
          { titulo: 'Último acceso', render: p => esc(UI.fecha(p.ultimo_acceso)) }
        ], responsables, { caption: 'Responsables' });
    } else if (ui.tab === 'invitaciones') {
      cuerpo = '<p class="texto-sm texto-2">El enlace de cada invitación se muestra una sola vez, al crearla. Dura 7 días y solo sirve con el correo indicado.</p>' + TH.ui.tabla([
        { titulo: 'Correo', campo: 'email' },
        { titulo: 'Módulos', render: i => (i.modulos || []).length ? i.modulos.map(m => TH.ui.badge(nombreModulo(m).split(' · ')[0], 'naranja')).join(' ') : TH.ui.badge('Sin asignar', 'alerta') },
        { titulo: 'Estado', render: i => i.estado === 'usada' ? TH.ui.badge('Activada', 'exito') : i.estado === 'anulada' ? TH.ui.badge('Anulada', 'neutro') : vigente(i) ? TH.ui.badge('Pendiente', 'info') : TH.ui.badge('Vencida', 'error') },
        { titulo: 'Vence', render: i => esc(UI.fecha(i.vence_en)) },
        { titulo: '', clase: 'acciones', render: i => vigente(i) ? '<button type="button" class="btn btn--terciario btn--sm" data-action="sb-colab-anular" data-id="' + esc(i.id) + '">Anular</button>' : '' }
      ], datos.invitaciones, { caption: 'Invitaciones', vacioTitulo: 'Sin invitaciones', vacioTexto: 'Crea la primera con «Invitar colaborador».' });
    } else {
      cuerpo = TH.ui.tabla([
        { titulo: 'Colaborador', render: r => esc(r.nombre) + (r.estado_persona !== 'activo' ? ' ' + badgeEstado(r.estado_persona) : '') },
        { titulo: 'Módulo', render: r => esc(nombreModulo(r.modulo_id)) + (r.asignado ? '' : ' <span class="texto-xs texto-3">(ya no asignado)</span>') },
        { titulo: 'Estado', render: r => r.estado === 'completado' ? TH.ui.badge('Completado', 'exito') : r.estado === 'en-curso' ? TH.ui.badge('En curso', 'info') : TH.ui.badge('Pendiente', 'neutro') },
        { titulo: 'Resultado', render: r => r.puntaje == null ? '—' : r.puntaje + ' %' },
        { titulo: 'Terminó', render: r => esc(r.fecha_fin ? UI.fecha(r.fecha_fin) : '—') }
      ], datos.resumen, { caption: 'Avance de formación', vacioTitulo: 'Sin avance todavía', vacioTexto: 'Aparecerá cuando tus colaboradores empiecen sus módulos.' }) +
        '<p class="texto-xs texto-3 mt-3">Por protección de datos solo ves estados y resultados. Las respuestas de los ejercicios son individuales y nunca se muestran a la organización.</p>';
    }
    return TH.ui.encabezado('Colaboradores', 'Invita a tu equipo, asigna módulos de sensibilización y sigue su avance.', '<button type="button" class="btn btn--primario" data-action="sb-colab-invitar">' + TH.ui.icono('mas') + ' Invitar colaborador</button>') +
      '<div class="grid grid-4 mb-4">' + TH.ui.kpi('Colaboradores activos', String(colabs.filter(c => c.estado === 'activo').length), pendientes + ' invitaciones pendientes') +
      TH.ui.kpi('Módulos completados', String(completados), 'de ' + asignadas + ' asignados', true) + TH.ui.kpi('Cobertura', TH.util.pct(completados, asignadas) + '%', 'de los módulos asignados') + TH.ui.kpi('Módulos publicados', String(publicados().length), 'disponibles para asignar') + '</div>' + tabs + cuerpo;
  }
  TH.router.registrar('/organizacion/colaboradores', { roles: ['organizacion'], titulo: 'Colaboradores', render: colaboradores, ancho: true });

  Object.assign(TH.acciones, {
    'sb-colab-tab'(el) { ui.tab = el.dataset.tab; TH.router.refrescar(); },
    'sb-colab-invitar'() {
      TH.ui.modal({ titulo: 'Invitar colaborador', cuerpo: '<form id="form-sb-inv" data-form="sb-colab-invitar" novalidate>' + TH.ui.campo({ name: 'email', label: 'Correo de la persona', tipo: 'email', required: true, ayuda: 'La invitación queda atada a este correo.' }) + checksModulos(null) + '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-sb-inv" class="btn btn--primario">Crear invitación</button>' });
    },
    'sb-colab-modulos'(el) {
      const actuales = datos.asignaciones.filter(a => a.user_id === el.dataset.id).map(a => a.modulo_id);
      TH.ui.modal({ titulo: 'Módulos · ' + el.dataset.nombre, cuerpo: '<form id="form-sb-mod" data-form="sb-colab-modulos" data-id="' + esc(el.dataset.id) + '" novalidate>' + checksModulos(actuales) + '<p class="texto-xs texto-2">Si quitas un módulo, la persona deja de verlo; su avance se conserva en tu resumen.</p><div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-sb-mod" class="btn btn--primario">Guardar</button>' });
    },
    async 'sb-persona-estado'(el) {
      const e = el.dataset.estado; const n = el.dataset.nombre;
      const textos = { suspendido: ['Suspender acceso', n + ' no podrá entrar hasta que lo reactives.', 'Suspender'], activo: ['Reactivar acceso', n + ' podrá volver a entrar.', 'Reactivar'], desvinculado: ['Desvincular colaborador', n + ' perderá el acceso de forma definitiva. Su avance se conserva en tu resumen.', 'Desvincular'] }[e];
      if (!(await TH.ui.confirmar({ titulo: textos[0], texto: esc(textos[1]), peligro: e !== 'activo', aceptar: textos[2] }))) return;
      const r = await sb.from('perfiles').update({ estado: e }).eq('id', el.dataset.id).select('id');
      if (r.error || !(r.data || []).length) { TH.ui.toast(r.error ? UI.msg(r.error) : 'No fue posible cambiar el estado.', 'error', 5000); return; }
      TH.ui.toast('Listo.', 'exito'); TH.router.recargar();
    },
    async 'sb-colab-anular'(el) {
      if (!(await TH.ui.confirmar({ titulo: 'Anular invitación', texto: 'El enlace dejará de servir.', peligro: true, aceptar: 'Anular' }))) return;
      const r = await sb.rpc('anular_invitacion', { p_id: el.dataset.id }); if (r.error) { TH.ui.toast(UI.msg(r.error), 'error', 5000); return; }
      TH.ui.toast('Invitación anulada.', 'exito'); TH.router.recargar();
    }
  });
  Object.assign(TH.formularios, {
    async 'sb-colab-invitar'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form); const mods = [].concat(d.modulos || []);
      TH.ui.ocupado(form, true, 'Creando…');
      // Sin organización: la base usa la del responsable que invita.
      const r = await sb.rpc('crear_invitacion', { p_email: d.email.trim(), p_rol: 'colaborador', p_modulos: mods });
      TH.ui.ocupado(form, false);
      if (r.error) { TH.ui.mostrarErrores(form, { general: UI.msg(r.error) }); return; }
      TH.ui.cerrarModal(); ui.tab = 'invitaciones'; UI.mostrarEnlace(r.data, d.email.trim(), null); TH.router.recargar();
    },
    async 'sb-colab-modulos'(form) {
      const d = TH.ui.datosFormulario(form); const mods = [].concat(d.modulos || []);
      TH.ui.ocupado(form, true, 'Guardando…');
      const r = await sb.rpc('asignar_modulos', { p_usuario: form.dataset.id, p_modulos: mods });
      TH.ui.ocupado(form, false);
      if (r.error) { TH.ui.mostrarErrores(form, { general: UI.msg(r.error) }); return; }
      TH.ui.cerrarModal(); TH.ui.toast('Módulos actualizados.', 'exito'); TH.router.recargar();
    }
  });

  // Menú de la organización: se suman Colaboradores y Biblioteca.
  TH.layout.menus.organizacion.push(
    { grupo: 'Personas' },
    { ruta: '/organizacion/colaboradores', texto: 'Colaboradores', icono: 'personas' },
    { ruta: '/organizacion/biblioteca', texto: 'Biblioteca', icono: 'biblioteca' });
})();
