/* ============================================================
   TURQUESA HUB · ESPACIO DE LA ORGANIZACIÓN (adaptador Supabase)
   Conecta el AUTODIAGNÓSTICO a la base de datos. Las pantallas son las de rc4; aquí solo cambia de dónde salen y a dónde van los datos:
     - Lectura:   tabla diagnosticos (RLS: cada organización ve solo los suyos).
     - Escritura: funciones iniciar_diagnostico, guardar_respuesta, finalizar_diagnostico y nuevo_ciclo_diagnostico.
                  La organización la toma la base de datos de la sesión: el navegador nunca la envía.
   El resultado se calcula aquí (misma fórmula de rc4) y la base valida que el diagnóstico esté completo (decisión V3).
   Se ejecuta solo con el adaptador 'supabase'. Plan y formación siguen «próximamente» (F03 y F04).
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
    { ruta: '/organizacion/diagnostico/resultados', texto: 'Resultados y brechas', icono: 'reporte' });

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

  /* ---------- Carga de datos antes de pintar ---------- */
  async function cargar() {
    const r = await sb.from('diagnosticos').select('*').order('ciclo', { ascending: false });
    if (r.error) throw r.error;
    const filas = (r.data || []).map(mapear);
    TH.store.update(s => {
      TH.util.reemplazarLista(s.diagnosticos, filas.filter(d => d.orgId === TH.auth.orgId() && !(r.data.find(x => x.id === d.id) || {}).archivado));
      s.diagnosticosArchivados = filas.filter(d => (r.data.find(x => x.id === d.id) || {}).archivado);
    }, 'remoto');
  }
  ['/organizacion/inicio', '/organizacion/diagnostico', '/organizacion/diagnostico/resultados'].forEach(ruta => { TH.supabaseCargadores[ruta] = cargar; });

  /* ---------- Operaciones (reemplazan a las locales de rc4) ---------- */
  Object.assign(D, {
    async iniciar() {
      const r = await sb.rpc('iniciar_diagnostico'); if (r.error) return fallo(r.error);
      return { ok: true, diagnostico: guardarEnCache(r.data) };
    },
    async reiniciar() {
      const r = await sb.rpc('nuevo_ciclo_diagnostico'); if (r.error) return fallo(r.error);
      await cargar(); return { ok: true };
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

  /* ---------- Inicio de la organización ---------- */
  function inicio(ctx) {
    const org = ctx.org; const d = D.obtener(TH.auth.orgId()); const total = D.preguntas().length;
    let estado;
    if (!d) estado = TH.ui.siguientePaso('Empieza con tu autodiagnóstico', 'Son ' + total + ' preguntas en seis dimensiones. Se guarda solo y puedes retomarlo cuando quieras. Tiempo estimado: 20 min.', '/organizacion/diagnostico', 'Comenzar');
    else if (d.estado === 'en-curso') { const n = Object.keys(d.respuestas).length; estado = TH.ui.siguientePaso('Continúa tu autodiagnóstico', 'Llevas ' + n + ' de ' + total + ' preguntas (ciclo ' + d.ciclo + ').', '/organizacion/diagnostico', 'Continuar'); }
    else estado = TH.ui.siguientePaso('Tu autodiagnóstico está completo', 'Ciclo ' + d.ciclo + ' completado el ' + TH.util.fecha(d.fechaFin) + '. Revisa tus resultados y brechas.', '/organizacion/diagnostico/resultados', 'Ver resultados');
    return TH.ui.encabezado('Hola, ' + ((ctx.usuario && ctx.usuario.nombre) || ''), org ? esc(org.nombre) : '') + estado +
      TH.ui.alerta('info', 'Próximamente', 'El plan de acción y la formación de colaboradores se habilitarán en las próximas semanas. Tu autodiagnóstico quedará como punto de partida.');
  }
  TH.router.registrar('/organizacion/inicio', { roles: ['organizacion'], titulo: 'Inicio', render: inicio });

  /* ---------- Pantallas de rc4 que ya funcionan con la base de datos ---------- */
  TH.supabaseHabilitar('/organizacion/diagnostico');
  TH.supabaseHabilitar('/organizacion/diagnostico/resultados');
})();
