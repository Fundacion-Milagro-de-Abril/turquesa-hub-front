/* ============================================================
   TURQUESA HUB · SERVICIO DE PLAN DE ACCIÓN Y SEGUIMIENTO
   Recomendaciones generadas desde el autodiagnóstico, selección y
   priorización, acciones propias, responsables, fechas, metas,
   indicadores, evidencias, estados, avance, vencimientos y exportación.
   Producción: docs/API_CONTRACT.md §5.
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

TH.api.plan = {
  obtener(orgId) { return TH.store.get().planes.find(p => p.orgId === orgId) || null; },
  listar() { return TH.store.get().planes; },

  /**
   * Regla determinista de recomendación (documentada en el instrumento):
   *  "No implementado" y "No sé" → acción con la prioridad de la plantilla ("No sé" → acción de verificación).
   *  "Parcialmente"               → prioridad reducida un nivel.
   *  "Sí" y "No aplica"           → no genera acción.
   * Plazos sugeridos: alta +60 días, media +120, baja +180.
   */
  generarSugeridas(diag) {
    const hoy = TH.util.hoy(); const bajar = { alta: 'media', media: 'baja', baja: 'baja' }; const dias = { alta: 60, media: 120, baja: 180 };
    const acciones = [];
    TH.api.diagnostico.preguntas().forEach(p => {
      const r = diag.respuestas[p.id]; if (!r || r.opcion === 'si' || r.opcion === 'na') return;
      const prioridad = r.opcion === 'parcial' ? bajar[p.accion.prioridad] : p.accion.prioridad;
      const base = p.texto.replace(/^¿/, '').replace(/\?$/, '');
      const situacion = r.opcion === 'nose' ? 'Sin información suficiente sobre: ' + base : (r.opcion === 'parcial' ? 'Implementación parcial: ' : 'No implementado: ') + base;
      const accionTexto = r.opcion === 'nose' ? 'Verificar con las áreas responsables el estado real de este criterio y documentarlo; según el resultado: ' + p.accion.accion : p.accion.accion;
      acciones.push({ id: 'sug-' + p.id, dim: p.dim, preguntaId: p.id, situacion, objetivo: p.accion.objetivo, accion: accionTexto, prioridad, responsable: p.accion.responsableSugerido, responsableSugerido: p.accion.responsableSugerido, fechaObjetivo: TH.util.sumarDias(hoy, dias[prioridad]), indicador: p.accion.indicador, meta: p.accion.meta, evidencia: p.accion.evidencia, estado: 'pendiente', avance: 0, observaciones: '', origen: 'sugerida', fuentes: p.fuentes || [] });
    });
    const orden = { alta: 0, media: 1, baja: 2 };
    return acciones.sort((a, b) => orden[a.prioridad] - orden[b.prioridad]);
  },

  /** Crea el plan a partir de las recomendaciones seleccionadas por la organización (ids de las sugeridas). */
  crearDesdeDiagnostico(orgId, seleccionIds) {
    const diag = TH.api.diagnostico.obtener(orgId);
    if (!diag || diag.estado !== 'completado') return { ok: false, error: 'Primero completa el autodiagnóstico.' };
    if (this.obtener(orgId)) return { ok: false, error: 'La organización ya tiene un plan de acción.' };
    const sugeridas = this.generarSugeridas(diag);
    const acciones = (seleccionIds && seleccionIds.length ? sugeridas.filter(a => seleccionIds.includes(a.id)) : sugeridas).map(a => Object.assign({}, a, { id: TH.util.id('acc') }));
    if (!acciones.length) return { ok: false, error: 'Selecciona al menos una recomendación o añade una acción propia.' };
    const plan = { id: TH.util.id('plan'), orgId, diagnosticoId: diag.id, fechaCreacion: TH.util.hoy(), acciones, historial: [{ fecha: TH.util.hoy(), accion: 'Plan creado con ' + acciones.length + ' acciones a partir del autodiagnóstico.' }] };
    TH.store.update(s => { s.planes.push(plan); const o = s.organizaciones.find(z => z.id === orgId); if (o) { o.onboarding = o.onboarding || {}; o.onboarding.plan = true; } TH.api.historial.registrar(s, 'Plan de acción creado (' + acciones.length + ' acciones)', 'plan', plan.id); }, 'plan');
    return { ok: true, plan };
  },
  /** Añade al plan existente recomendaciones del diagnóstico que no fueron incluidas inicialmente. */
  incorporarSugeridas(orgId, seleccionIds) {
    const diag = TH.api.diagnostico.obtener(orgId); const plan = this.obtener(orgId);
    if (!diag || !plan) return { ok: false, error: 'No hay diagnóstico o plan.' };
    const existentes = new Set(plan.acciones.map(a => a.preguntaId).filter(Boolean));
    const nuevas = this.generarSugeridas(diag).filter(a => seleccionIds.includes(a.id) && !existentes.has(a.preguntaId)).map(a => Object.assign({}, a, { id: TH.util.id('acc') }));
    TH.store.update(s => { const p = s.planes.find(x => x.orgId === orgId); nuevas.forEach(a => p.acciones.push(a)); p.historial.push({ fecha: TH.util.hoy(), accion: nuevas.length + ' recomendaciones incorporadas.' }); }, 'plan');
    return { ok: true, agregadas: nuevas.length };
  },
  validarAccion(d) {
    const e = {};
    if (!d.objetivo || !d.objetivo.trim()) e.objetivo = 'Escribe el objetivo.';
    if (!d.accion || !d.accion.trim()) e.accion = 'Describe la acción concreta.';
    if (!d.dim) e.dim = 'Selecciona la dimensión.';
    if (!d.responsable || !d.responsable.trim()) e.responsable = 'Asigna un responsable.';
    if (!d.fechaObjetivo || !/^\d{4}-\d{2}-\d{2}$/.test(d.fechaObjetivo)) e.fechaObjetivo = 'Define la fecha objetivo.';
    if (!d.indicador || !d.indicador.trim()) e.indicador = 'Define el indicador.';
    if (!d.meta || !d.meta.trim()) e.meta = 'Define la meta.';
    return e;
  },
  agregarAccion(orgId, datos) {
    const errores = this.validarAccion(datos); if (Object.keys(errores).length) return { ok: false, error: 'Revisa los campos marcados.', errores };
    const a = { id: TH.util.id('acc'), dim: datos.dim, preguntaId: datos.preguntaId || null, situacion: (datos.situacion || 'Acción definida por la organización.').trim(), objetivo: datos.objetivo.trim(), accion: datos.accion.trim(), prioridad: datos.prioridad || 'media', responsable: datos.responsable.trim(), fechaObjetivo: datos.fechaObjetivo, indicador: datos.indicador.trim(), meta: datos.meta.trim(), evidencia: (datos.evidencia || '').trim(), estado: 'pendiente', avance: 0, observaciones: (datos.observaciones || '').trim(), origen: 'propia', creadoEn: TH.util.hoy() };
    TH.store.update(s => { const p = s.planes.find(x => x.orgId === orgId); if (!p) { s.planes.push({ id: TH.util.id('plan'), orgId, diagnosticoId: null, fechaCreacion: TH.util.hoy(), acciones: [a], historial: [{ fecha: TH.util.hoy(), accion: 'Plan creado con una acción propia.' }] }); } else { p.acciones.push(a); } TH.api.historial.registrar(s, 'Acción añadida al plan', 'accion', a.id); }, 'plan');
    return { ok: true, accion: a };
  },
  actualizarAccion(orgId, accionId, cambios) {
    const permitidos = ['dim', 'situacion', 'objetivo', 'accion', 'prioridad', 'responsable', 'fechaObjetivo', 'indicador', 'meta', 'evidencia', 'estado', 'avance', 'observaciones'];
    TH.store.update(s => {
      const p = s.planes.find(x => x.orgId === orgId); if (!p) return;
      const a = p.acciones.find(x => x.id === accionId); if (!a) return;
      const antes = { estado: a.estado, avance: a.avance, fechaObjetivo: a.fechaObjetivo, responsable: a.responsable };
      Object.keys(cambios).forEach(k => { if (permitidos.includes(k)) a[k] = cambios[k]; });
      a.avance = TH.util.clamp(parseInt(a.avance, 10) || 0, 0, 100);
      if (a.estado === 'completada') { a.avance = 100; a.fechaCierre = a.fechaCierre || TH.util.hoy(); } else delete a.fechaCierre;
      if (a.avance === 100 && a.estado !== 'completada' && a.estado !== 'en-revision') a.estado = 'en-revision';
      if (['pendiente', 'en-ejecucion'].includes(a.estado) && a.fechaObjetivo < TH.util.hoy()) a.estado = 'atrasada';
      if (a.estado === 'atrasada' && a.fechaObjetivo >= TH.util.hoy()) a.estado = a.avance > 0 ? 'en-ejecucion' : 'pendiente';
      a.actualizadoEn = TH.util.hoy(); a.actualizadoPor = (TH.auth.sesion() || {}).userId;
      a.bitacora = a.bitacora || []; a.bitacora.push({ fecha: TH.util.hoy(), cambios: Object.keys(cambios).filter(k => permitidos.includes(k)), antes });
      TH.api.historial.registrar(s, 'Acción actualizada', 'accion', accionId, Object.keys(cambios));
    }, 'plan');
    return { ok: true };
  },
  eliminarAccion(orgId, accionId) { TH.store.update(s => { const p = s.planes.find(x => x.orgId === orgId); if (p) p.acciones = p.acciones.filter(a => a.id !== accionId); TH.api.historial.registrar(s, 'Acción eliminada', 'accion', accionId); }, 'plan'); return { ok: true }; },
  /** Marca como atrasadas las acciones abiertas con fecha vencida (regla aplicada al cargar el plan). */
  actualizarVencidas(orgId) {
    const hoy = TH.util.hoy(); let n = 0;
    TH.store.update(s => { const p = s.planes.find(x => x.orgId === orgId); if (!p) return; p.acciones.forEach(a => { if (['pendiente', 'en-ejecucion'].includes(a.estado) && a.fechaObjetivo < hoy) { a.estado = 'atrasada'; n++; } }); }, 'plan-vencidas');
    return n;
  },
  resumen(plan) {
    const acciones = plan ? plan.acciones : []; const hoy = TH.util.hoy();
    const porEstado = {}; TH.data.catalogos.estadosAccion.forEach(e => { porEstado[e.id] = acciones.filter(a => a.estado === e.id).length; });
    const avance = acciones.length ? Math.round(acciones.reduce((t, a) => t + (a.avance || 0), 0) / acciones.length) : 0;
    const porDim = TH.data.instrumento.dimensiones.map(d => { const as = acciones.filter(a => a.dim === d.id); return { dim: d, total: as.length, completadas: as.filter(a => a.estado === 'completada').length, avance: as.length ? Math.round(as.reduce((t, a) => t + (a.avance || 0), 0) / as.length) : 0 }; });
    const evidencias = plan ? TH.api.evidencias.listar(plan.orgId) : [];
    return { total: acciones.length, porEstado, avance, porDim, atrasadas: porEstado.atrasada, completadas: porEstado.completada,
      vencidas: acciones.filter(a => a.estado !== 'completada' && a.fechaObjetivo < hoy),
      proximas: acciones.filter(a => a.estado !== 'completada' && a.fechaObjetivo >= hoy && a.fechaObjetivo <= TH.util.sumarDias(hoy, 30)),
      conEvidencia: acciones.filter(a => evidencias.some(e => e.accionId === a.id)).length, evidencias: evidencias.length };
  },
  aCSV(plan) {
    const cab = ['Dimensión', 'Situación', 'Objetivo', 'Acción', 'Prioridad', 'Responsable', 'Fecha objetivo', 'Indicador', 'Meta', 'Evidencia esperada', 'Estado', 'Avance %', 'Evidencias registradas', 'Observaciones'];
    const q = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const ev = plan ? TH.api.evidencias.listar(plan.orgId) : [];
    const filas = (plan ? plan.acciones : []).map(a => [TH.util.nombreCatalogo(TH.data.instrumento.dimensiones, a.dim), a.situacion, a.objetivo, a.accion, TH.util.nombreCatalogo(TH.data.catalogos.prioridades, a.prioridad), a.responsable, a.fechaObjetivo, a.indicador, a.meta, a.evidencia, TH.util.nombreCatalogo(TH.data.catalogos.estadosAccion, a.estado), a.avance, ev.filter(e => e.accionId === a.id).length, a.observaciones].map(q).join(';'));
    return '﻿' + cab.map(q).join(';') + '\n' + filas.join('\n');
  }
};
