/* ============================================================
   TURQUESA HUB · ESPACIO DE LA ORGANIZACIÓN (adaptador Supabase)
   Conecta el AUTODIAGNÓSTICO (F02) y el PLAN DE ACCIÓN (F03) a la base de datos. Las pantallas son las de rc4;
   aquí solo cambia de dónde salen y a dónde van los datos:
     - Lectura:   tablas diagnosticos, planes y acciones (RLS: cada organización ve solo lo suyo).
     - Escritura: funciones iniciar_diagnostico, guardar_respuesta, finalizar_diagnostico, nuevo_ciclo_diagnostico,
                  crear_plan e incorporar_acciones; y las acciones se editan con permisos por columna (el navegador no
                  puede escribir organización, bitácora ni fecha de cierre).
                  La organización la toma la base de datos de la sesión: el navegador nunca la envía.
   El resultado del diagnóstico y las acciones sugeridas se calculan aquí (reglas de rc4); la base valida forma y
   completitud (decisión V3). «Atrasada» no se guarda: se calcula al leer.
   Se ejecuta solo con el adaptador 'supabase'. La formación sigue «próximamente» (F04).
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase' || !TH.sb) return;
  const sb = TH.sb; const esc = TH.util.esc; const D = TH.api.diagnostico;

  /* ---------- Menú de la organización: solo lo conectado ---------- */
  const menu = TH.layout.menus.organizacion;
  menu.splice(0, menu.length,
    { ruta: '/organizacion/inicio', texto: 'Inicio', icono: 'inicio' },
    { grupo: 'Diagnóstico' },
    { ruta: '/organizacion/diagnostico', texto: 'Autodiagnóstico', icono: 'diagnostico' },
    { ruta: '/organizacion/diagnostico/resultados', texto: 'Resultados y brechas', icono: 'reporte' },
    { grupo: 'Plan' },
    { ruta: '/organizacion/plan-accion', texto: 'Plan de acción', icono: 'plan' },
    { ruta: '/organizacion/plan-accion/seguimiento', texto: 'Seguimiento', icono: 'tablero' });

  /* ---------- Fila de la base → forma que esperan las vistas de rc4 ---------- */
  const dia = (iso) => iso ? String(iso).slice(0, 10) : null;
  function mapear(r) {
    return {
      id: r.id, orgId: r.organizacion_id, instrumentoVersion: r.instrumento_version, preguntasVersion: r.preguntas || [],
      estado: r.estado, respuestas: r.respuestas || {}, preguntaActual: r.pregunta_actual || 0, ciclo: r.ciclo,
      fechaInicio: dia(r.fecha_inicio), fechaFin: dia(r.fecha_fin), ultimoGuardado: r.ultimo_guardado,
      resultadoSnapshot: r.resultado || undefined
    };
  }
  const guardarEnCache = (fila, conservarPosicion) => {
    const nuevo = mapear(fila);
    TH.store.update(s => {
      const i = s.diagnosticos.findIndex(d => d.orgId === nuevo.orgId);
      // La vista avanza con preguntaActual del caché: se conserva para no saltar preguntas (la base guarda su propia posición para reanudar).
      if (i >= 0) { if (conservarPosicion) nuevo.preguntaActual = s.diagnosticos[i].preguntaActual; s.diagnosticos[i] = nuevo; }
      else s.diagnosticos.push(nuevo);
    }, 'diagnostico');
    return nuevo;
  };
  const MENSAJES = [[/Faltan (\d+) preguntas/, (m) => 'Faltan ' + m[1] + ' preguntas por responder.'], [/ya está completado/, () => 'El autodiagnóstico ya está completado.'], [/Completa el autodiagnóstico/, () => 'Completa el autodiagnóstico actual antes de iniciar un ciclo nuevo.'], [/No hay un autodiagnóstico/, () => 'Aún no has iniciado el autodiagnóstico.'], [/No aplica/, () => 'La opción «No aplica» requiere una justificación breve y solo se admite en algunas preguntas.'], [/Solo el responsable|permission|42501/, () => 'No tienes permiso para esta operación.']];
  const fallo = (e) => { const t = (e && e.message) || ''; const m = MENSAJES.map(x => [x[0].exec(t), x[1]]).find(x => x[0]); return { ok: false, error: m ? m[1](m[0]) : 'No fue posible completar la operación. Intenta de nuevo.' }; };

  /* ---------- Plan de acción: filas de la base → forma de rc4 ---------- */
  const NOMBRE_CAMPO = { fecha_objetivo: 'fechaObjetivo', evidencia_esperada: 'evidencia' };
  const vencida = (a) => ['pendiente', 'en-ejecucion'].includes(a.estado) && a.fecha_objetivo < TH.util.hoy();
  function mapearAccion(r) {
    return {
      id: r.id, dim: r.dim, preguntaId: r.pregunta_id || null, origen: r.origen, situacion: r.situacion, objetivo: r.objetivo,
      accion: r.accion, prioridad: r.prioridad, responsable: r.responsable, fechaObjetivo: r.fecha_objetivo,
      fechaCierre: r.fecha_cierre || undefined, indicador: r.indicador, meta: r.meta, evidencia: r.evidencia_esperada,
      // «Atrasada» se calcula al leer (no se guarda): acción abierta con fecha objetivo vencida.
      estado: vencida(r) ? 'atrasada' : r.estado, avance: r.avance, observaciones: r.observaciones,
      bitacora: (r.bitacora || []).map(b => ({ fecha: b.fecha, cambios: (b.cambios || []).map(c => NOMBRE_CAMPO[c] || c), antes: b.antes })),
      actualizadoEn: dia(r.actualizado_en), creadoEn: dia(r.creado_en)
    };
  }
  function mapearPlan(p, acciones) {
    return { id: p.id, orgId: p.organizacion_id, diagnosticoId: p.diagnostico_id, fechaCreacion: dia(p.creado_en), acciones: acciones.map(mapearAccion), historial: p.historial || [] };
  }
  async function cargarPlan() {
    const [p, a] = await Promise.all([sb.from('planes').select('*'), sb.from('acciones').select('*').order('creado_en', { ascending: true })]);
    if (p.error) throw p.error; if (a.error) throw a.error;
    const filas = (p.data || []).filter(x => x.organizacion_id === TH.auth.orgId());
    TH.store.update(s => { TH.util.reemplazarLista(s.planes, filas.map(x => mapearPlan(x, (a.data || []).filter(y => y.plan_id === x.id)))); }, 'remoto');
  }

  /* ---------- Carga de datos antes de pintar ---------- */
  async function cargarDiagnostico() {
    const r = await sb.from('diagnosticos').select('*').order('ciclo', { ascending: false });
    if (r.error) throw r.error;
    const filas = (r.data || []).map(mapear);
    TH.store.update(s => {
      TH.util.reemplazarLista(s.diagnosticos, filas.filter(d => d.orgId === TH.auth.orgId() && !(r.data.find(x => x.id === d.id) || {}).archivado));
      s.diagnosticosArchivados = filas.filter(d => (r.data.find(x => x.id === d.id) || {}).archivado);
    }, 'remoto');
  }
  const cargar = () => Promise.all([cargarDiagnostico(), cargarPlan()]);
  ['/organizacion/inicio', '/organizacion/diagnostico', '/organizacion/diagnostico/resultados',
   '/organizacion/plan-accion', '/organizacion/plan-accion/seguimiento', '/organizacion/plan-accion/detalle'].forEach(ruta => { TH.supabaseCargadores[ruta] = cargar; });

  /* ---------- Operaciones (reemplazan a las locales de rc4) ---------- */
  Object.assign(D, {
    async iniciar() {
      const r = await sb.rpc('iniciar_diagnostico'); if (r.error) return fallo(r.error);
      return { ok: true, diagnostico: guardarEnCache(r.data) };
    },
    async reiniciar() {
      const r = await sb.rpc('nuevo_ciclo_diagnostico'); if (r.error) return fallo(r.error);
      await cargarDiagnostico(); return { ok: true };
    },
    async responder(orgId, preguntaId, opcion, justificacion) {
      const pregunta = D.todas().find(p => p.id === preguntaId);
      if (!pregunta) return { ok: false, error: 'Pregunta no encontrada.' };
      if (!TH.data.instrumento.opciones.some(o => o.id === opcion)) return { ok: false, error: 'Opción no válida.' };
      if (opcion === 'na' && !pregunta.permiteNA) return { ok: false, error: 'Esta pregunta no admite "No aplica".' };
      if (opcion === 'na' && !(justificacion || '').trim()) return { ok: false, error: 'La opción "No aplica" requiere una justificación breve.', errores: { justificacion: 'Escribe una justificación breve.' } };
      const idx = D.preguntas().findIndex(p => p.id === preguntaId);
      const r = await sb.rpc('guardar_respuesta', { p_pregunta: preguntaId, p_opcion: opcion, p_justificacion: opcion === 'na' ? justificacion.trim() : null, p_siguiente: idx + 1 });
      if (r.error) return fallo(r.error);
      guardarEnCache(r.data, true);
      return { ok: true };
    },
    async finalizar(orgId) {
      const d = D.obtener(orgId); const pend = D.pendientes(d);
      if (pend.length) return { ok: false, error: 'Faltan ' + pend.length + ' preguntas por responder.', pendientes: pend };
      const res = D.calcular(d);
      const snapshot = { global: res.global, dimensiones: res.dimensiones.map(x => ({ dim: x.dim.id, puntaje: x.puntaje })), fecha: TH.util.hoy(), version: d.instrumentoVersion };
      const r = await sb.rpc('finalizar_diagnostico', { p_resultado: snapshot }); if (r.error) return fallo(r.error);
      guardarEnCache(r.data);
      return { ok: true };
    }
  });

  /* ---------- Plan de acción: operaciones (reemplazan a las locales de rc4) ---------- */
  const P = TH.api.plan;
  const aPayload = (a) => ({ dim: a.dim, pregunta_id: a.preguntaId || null, origen: a.origen || 'propia', situacion: a.situacion || '', objetivo: a.objetivo, accion: a.accion,
    prioridad: a.prioridad || 'media', responsable: a.responsable, fecha_objetivo: a.fechaObjetivo, indicador: a.indicador, meta: a.meta,
    evidencia_esperada: a.evidencia || '', observaciones: a.observaciones || '' });
  const MSG_PLAN = [[/Primero completa/, () => 'Primero completa el autodiagnóstico.'], [/ya tiene un plan/, () => 'La organización ya tiene un plan de acción.'], [/Selecciona al menos/, () => 'Selecciona al menos una recomendación o añade una acción propia.'], [/Revisa los campos/, () => 'Revisa los campos marcados.'], [/Aún no hay un plan/, () => 'Aún no hay un plan de acción.'], [/Solo el responsable|42501|permission/, () => 'No tienes permiso para esta operación.'], [/violates check|23514/, () => 'Algún valor no es válido: revisa el estado, el avance (0 a 100) y que los textos no estén vacíos.']];
  const falloPlan = (e) => { const t = ((e && e.message) || '') + ' ' + ((e && e.code) || ''); const m = MSG_PLAN.map(x => [x[0].exec(t), x[1]]).find(x => x[0]); return { ok: false, error: m ? m[1](m[0]) : 'No fue posible completar la operación. Intenta de nuevo.' }; };
  const sugeridasDe = (orgId) => { const d = D.obtener(orgId); return d && d.estado === 'completado' ? P.generarSugeridas(d) : []; };

  Object.assign(P, {
    async crearDesdeDiagnostico(orgId, seleccion) {
      const d = D.obtener(orgId);
      if (!d || d.estado !== 'completado') return { ok: false, error: 'Primero completa el autodiagnóstico.' };
      if (P.obtener(orgId)) return { ok: false, error: 'La organización ya tiene un plan de acción.' };
      const acciones = sugeridasDe(orgId).filter(a => (seleccion || []).includes(a.id));
      if (!acciones.length) return { ok: false, error: 'Selecciona al menos una recomendación o añade una acción propia.' };
      const r = await sb.rpc('crear_plan', { p_acciones: acciones.map(aPayload) }); if (r.error) return falloPlan(r.error);
      await cargarPlan(); return { ok: true, plan: P.obtener(orgId) };
    },
    async incorporarSugeridas(orgId, seleccion) {
      const plan = P.obtener(orgId); if (!plan) return { ok: false, error: 'Aún no hay un plan de acción.' };
      const existentes = new Set(plan.acciones.map(a => a.preguntaId).filter(Boolean));
      const nuevas = sugeridasDe(orgId).filter(a => (seleccion || []).includes(a.id) && !existentes.has(a.preguntaId));
      if (!nuevas.length) return { ok: true, agregadas: 0 };
      const r = await sb.rpc('incorporar_acciones', { p_acciones: nuevas.map(aPayload) }); if (r.error) return falloPlan(r.error);
      await cargarPlan(); return { ok: true, agregadas: r.data };
    },
    async agregarAccion(orgId, datos) {
      const errores = P.validarAccion(datos); if (Object.keys(errores).length) return { ok: false, error: 'Revisa los campos marcados.', errores };
      const plan = P.obtener(orgId); if (!plan) return { ok: false, error: 'Primero completa el autodiagnóstico y crea tu plan de acción.' };
      const fila = Object.assign(aPayload(Object.assign({}, datos, { origen: 'propia' })), { plan_id: plan.id });
      delete fila.observaciones; fila.observaciones = (datos.observaciones || '').trim();
      ['objetivo', 'accion', 'responsable', 'indicador', 'meta'].forEach(k => { fila[k] = (fila[k] || '').trim(); });
      const r = await sb.from('acciones').insert(fila).select().single(); if (r.error) return falloPlan(r.error);
      await cargarPlan(); return { ok: true, accion: mapearAccion(r.data) };
    },
    async actualizarAccion(orgId, accionId, cambios) {
      const campos = { dim: 'dim', situacion: 'situacion', objetivo: 'objetivo', accion: 'accion', prioridad: 'prioridad', responsable: 'responsable',
        fechaObjetivo: 'fecha_objetivo', indicador: 'indicador', meta: 'meta', evidencia: 'evidencia_esperada', estado: 'estado', avance: 'avance', observaciones: 'observaciones' };
      const fila = {};
      Object.keys(cambios || {}).forEach(k => {
        if (!campos[k]) return;
        if (k === 'estado' && cambios[k] === 'atrasada') return;   // derivado de la fecha: no se guarda
        fila[campos[k]] = k === 'avance' ? Math.max(0, Math.min(100, parseInt(cambios[k], 10) || 0)) : cambios[k];
      });
      if (!Object.keys(fila).length) return { ok: true };
      const r = await sb.from('acciones').update(fila).eq('id', accionId).select().single(); if (r.error) return falloPlan(r.error);
      await cargarPlan(); return { ok: true };
    },
    async eliminarAccion(orgId, accionId) {
      const r = await sb.from('acciones').delete().eq('id', accionId).select('id'); if (r.error) return falloPlan(r.error);
      if (!(r.data || []).length) return { ok: false, error: 'No fue posible eliminar la acción.' };
      await cargarPlan(); return { ok: true };
    },
    /** «Atrasada» se calcula al leer (mapearAccion): no hay nada que guardar. */
    actualizarVencidas() { return 0; }
  });

  /* ---------- Inicio de la organización ---------- */
  function inicio(ctx) {
    const org = ctx.org; const d = D.obtener(TH.auth.orgId()); const plan = P.obtener(TH.auth.orgId()); const total = D.preguntas().length;
    let estado;
    if (!d) estado = TH.ui.siguientePaso('Empieza con tu autodiagnóstico', 'Son ' + total + ' preguntas en seis dimensiones. Se guarda solo y puedes retomarlo cuando quieras. Tiempo estimado: 20 min.', '/organizacion/diagnostico', 'Comenzar');
    else if (d.estado === 'en-curso') { const n = Object.keys(d.respuestas).length; estado = TH.ui.siguientePaso('Continúa tu autodiagnóstico', 'Llevas ' + n + ' de ' + total + ' preguntas (ciclo ' + d.ciclo + ').', '/organizacion/diagnostico', 'Continuar'); }
    else if (!plan) estado = TH.ui.siguientePaso('Construye tu plan de acción', 'Tu autodiagnóstico está completo. Convierte las brechas en compromisos con responsables, fechas y metas.', '/organizacion/plan-accion', 'Crear el plan');
    else { const r = P.resumen(plan); estado = TH.ui.siguientePaso('Sigue tu plan de acción', 'Avance global ' + r.avance + ' % · ' + r.completadas + ' de ' + r.total + ' acciones completadas' + (r.vencidas.length ? ' · ' + r.vencidas.length + ' vencidas' : '') + '.', '/organizacion/plan-accion', 'Ver el plan'); }
    return TH.ui.encabezado('Hola, ' + ((ctx.usuario && ctx.usuario.nombre) || ''), org ? esc(org.nombre) : '') + estado +
      TH.ui.alerta('info', 'Próximamente', 'La formación de colaboradores se habilitará en las próximas semanas.');
  }
  TH.router.registrar('/organizacion/inicio', { roles: ['organizacion'], titulo: 'Inicio', render: inicio });

  /* ---------- Pantallas de rc4 que ya funcionan con la base de datos ---------- */
  TH.supabaseHabilitar('/organizacion/diagnostico');
  TH.supabaseHabilitar('/organizacion/diagnostico/resultados');
  ['/organizacion/plan-accion', '/organizacion/plan-accion/seguimiento', '/organizacion/plan-accion/detalle'].forEach(TH.supabaseHabilitar);
})();
