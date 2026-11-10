/* ============================================================
   TURQUESA HUB · SERVICIO DE AUTODIAGNÓSTICO
   Cuestionario guiado, guardado de progreso, reanudación y cálculo
   orientativo de resultados. Los resultados son declarados por la
   organización; se marcan "con evidencia" cuando una acción del plan
   vinculada a la pregunta tiene evidencias registradas.
   Producción: docs/API_CONTRACT.md §4 (el cálculo debe replicarse en
   servidor y persistirse como snapshot al finalizar).
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

TH.api.diagnostico = {
  instrumento() { return TH.data.instrumento; },
  /** Preguntas activas en la versión vigente. La administración puede cambiar el alcance (configuracion.instrumentoAlcance). */
  preguntas() {
    const cfg = (TH.store.get().configuracion || {}).instrumentoAlcance || {};
    return TH.data.instrumento.preguntas.filter(p => (cfg[p.id] || p.alcance) === 'activa');
  },
  todas() { return TH.data.instrumento.preguntas; },
  obtener(orgId) { return TH.store.get().diagnosticos.find(d => d.orgId === orgId) || null; },
  listar() { return TH.store.get().diagnosticos; },

  iniciar(orgId) {
    const existente = this.obtener(orgId);
    if (existente) return { ok: true, diagnostico: existente };
    const d = { id: TH.util.id('diag'), orgId, instrumentoVersion: TH.data.instrumento.version, preguntasVersion: this.preguntas().map(p => p.id), estado: 'en-curso', respuestas: {}, preguntaActual: 0, fechaInicio: TH.util.hoy(), fechaFin: null, ciclo: 1 };
    TH.store.update(s => { s.diagnosticos.push(d); TH.api.historial.registrar(s, 'Autodiagnóstico iniciado', 'diagnostico', d.id); }, 'diagnostico');
    return { ok: true, diagnostico: d };
  },
  reiniciar(orgId) {
    TH.store.update(s => {
      const idx = s.diagnosticos.findIndex(d => d.orgId === orgId);
      let ciclo = 1;
      if (idx >= 0) { const previo = s.diagnosticos[idx]; ciclo = (previo.ciclo || 1) + 1; s.diagnosticosArchivados = s.diagnosticosArchivados || []; s.diagnosticosArchivados.push(previo); s.diagnosticos.splice(idx, 1); }
      s.diagnosticos.push({ id: TH.util.id('diag'), orgId, instrumentoVersion: TH.data.instrumento.version, preguntasVersion: TH.api.diagnostico.preguntas().map(p => p.id), estado: 'en-curso', respuestas: {}, preguntaActual: 0, fechaInicio: TH.util.hoy(), fechaFin: null, ciclo });
      TH.api.historial.registrar(s, 'Nuevo ciclo de autodiagnóstico (' + ciclo + ')', 'diagnostico', orgId);
    }, 'diagnostico');
    return { ok: true };
  },
  responder(orgId, preguntaId, opcion, justificacion) {
    const pregunta = TH.data.instrumento.preguntas.find(p => p.id === preguntaId);
    if (!pregunta) return { ok: false, error: 'Pregunta no encontrada.' };
    if (!TH.data.instrumento.opciones.some(o => o.id === opcion)) return { ok: false, error: 'Opción no válida.' };
    if (opcion === 'na' && !pregunta.permiteNA) return { ok: false, error: 'Esta pregunta no admite "No aplica".' };
    if (opcion === 'na' && !(justificacion || '').trim()) return { ok: false, error: 'La opción "No aplica" requiere una justificación breve.' };
    TH.store.update(s => {
      const d = s.diagnosticos.find(x => x.orgId === orgId); if (!d) return;
      d.respuestas[preguntaId] = { opcion, justificacion: opcion === 'na' ? justificacion.trim() : undefined, fecha: TH.util.hoy(), autorId: (TH.auth.sesion() || {}).userId };
      d.ultimoGuardado = new Date().toISOString();
    }, 'diagnostico');
    return { ok: true };
  },
  irA(orgId, indice) { TH.store.update(s => { const d = s.diagnosticos.find(x => x.orgId === orgId); if (d) d.preguntaActual = TH.util.clamp(indice, 0, this.preguntas().length - 1); }, 'diagnostico-nav'); },
  pendientes(diag) { return this.preguntas().filter(p => !diag || !diag.respuestas[p.id]); },
  finalizar(orgId) {
    const d = this.obtener(orgId); const pend = this.pendientes(d);
    if (pend.length) return { ok: false, error: 'Faltan ' + pend.length + ' preguntas por responder.', pendientes: pend };
    const resultado = this.calcular(d);
    TH.store.update(s => {
      const x = s.diagnosticos.find(z => z.orgId === orgId); x.estado = 'completado'; x.fechaFin = TH.util.hoy();
      x.resultadoSnapshot = { global: resultado.global, dimensiones: resultado.dimensiones.map(dm => ({ dim: dm.dim.id, puntaje: dm.puntaje })), fecha: x.fechaFin, version: x.instrumentoVersion };
      const o = s.organizaciones.find(z => z.id === orgId); if (o) { o.onboarding = o.onboarding || {}; o.onboarding.diagnostico = true; }
      TH.api.historial.registrar(s, 'Autodiagnóstico completado', 'diagnostico', x.id);
    }, 'diagnostico');
    return { ok: true };
  },
  /** Indica si una pregunta tiene evidencia registrada a través del plan de acción. */
  evidenciaDePregunta(orgId, preguntaId) {
    const st = TH.store.get(); const plan = st.planes.find(p => p.orgId === orgId); if (!plan) return [];
    const accionesIds = plan.acciones.filter(a => a.preguntaId === preguntaId).map(a => a.id);
    return st.evidencias.filter(e => e.orgId === orgId && (accionesIds.includes(e.accionId) || e.preguntaId === preguntaId));
  },
  /**
   * Cálculo orientativo (ver instrumento.reglaCalculo). Devuelve por dimensión puntaje, lectura,
   * respondidas y aplicables; listas de fortalezas declaradas, brechas, sin información, y
   * cuántas respuestas afirmativas cuentan con evidencia registrada.
   */
  calcular(diag) {
    const instr = TH.data.instrumento; const vigentes = this.preguntas();
    const resultado = { dimensiones: [], global: 0, nivelGlobal: null, fortalezas: [], brechas: [], sinInformacion: [], completadoPct: 0, respondidas: 0, total: vigentes.length, conEvidencia: 0 };
    if (!diag) return resultado;
    resultado.respondidas = vigentes.filter(p => diag.respuestas[p.id]).length;
    resultado.completadoPct = TH.util.pct(resultado.respondidas, resultado.total);
    let suma = 0, n = 0;
    instr.dimensiones.forEach(dim => {
      const pregs = vigentes.filter(p => p.dim === dim.id);
      let puntos = 0, aplicables = 0, respondidas = 0;
      pregs.forEach(p => {
        const r = diag.respuestas[p.id]; if (!r) return;
        respondidas++;
        const opt = instr.opciones.find(o => o.id === r.opcion);
        if (!opt || opt.valor === null) return;
        aplicables++; puntos += opt.valor;
        const ev = this.evidenciaDePregunta(diag.orgId, p.id);
        if (r.opcion === 'si') { resultado.fortalezas.push({ pregunta: p, dim, evidencias: ev.length }); if (ev.length) resultado.conEvidencia++; }
        else if (r.opcion === 'nose') resultado.sinInformacion.push({ pregunta: p, dim });
        else resultado.brechas.push({ pregunta: p, dim, opcion: r.opcion, evidencias: ev.length });
      });
      const puntaje = aplicables ? Math.round((puntos / aplicables) * 100) : null;
      const nivel = puntaje === null ? null : instr.niveles.find(nv => puntaje >= nv.min && puntaje <= nv.max);
      resultado.dimensiones.push({ dim, puntaje, nivel, respondidas, total: pregs.length, aplicables });
      if (puntaje !== null) { suma += puntaje; n++; }
    });
    resultado.global = n ? Math.round(suma / n) : 0;
    resultado.nivelGlobal = instr.niveles.find(nv => resultado.global >= nv.min && resultado.global <= nv.max) || instr.niveles[0];
    return resultado;
  },
  recomendaciones(resultado) {
    const textos = {
      d1: 'Formalizar el compromiso directivo y designar un responsable con funciones: sin esto, las demás acciones pierden sostenibilidad.',
      d2: 'Identificar con participación de los trabajadores los factores organizacionales de riesgo y revisar las prácticas cotidianas de respeto e igualdad.',
      d3: 'Priorizar la política y el protocolo interno con revisión jurídica, y verificar la conformación del Comité de Convivencia Laboral conforme a la Resolución 3461 de 2025.',
      d4: 'Iniciar la sensibilización con los módulos de Turquesa Hub, comenzando por directivos, mandos medios e integrantes del Comité.',
      d5: 'Definir canales internos confidenciales, construir el directorio de autoridades competentes y formar a quienes orientan.',
      d6: 'Definir indicadores básicos, organizar las evidencias con protección de datos y establecer una revisión semestral en instancia directiva.'
    };
    return resultado.dimensiones.filter(d => d.puntaje !== null).sort((a, b) => a.puntaje - b.puntaje).slice(0, 3).map(d => ({ dim: d.dim, puntaje: d.puntaje, texto: textos[d.dim.id] }));
  }
};
