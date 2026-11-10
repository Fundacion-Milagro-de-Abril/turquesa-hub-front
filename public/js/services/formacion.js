/* ============================================================
   TURQUESA HUB · SERVICIO DE FORMACIÓN / SENSIBILIZACIÓN
   Asignación de módulos (vía invitaciones), progreso por colaborador,
   comprobación de ejercicios y agregados por organización.
   Nunca expone respuestas individuales a la organización: solo estados.
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

TH.api.formacion = {
  /** Catálogo disponible para organizaciones y colaboradores: solo versiones publicadas (TH.api.modulos). */
  modulos() { return TH.api.modulos.publicados().map(m => Object.assign({}, m, { id: m.moduloId, versionId: m.id })); },
  modulo(moduloId) { const m = TH.api.modulos.publicado(moduloId); return m ? Object.assign({}, m, { id: m.moduloId, versionId: m.id }) : null; },

  /** Módulos asignados a un colaborador (por su invitación; si no hay, todos) */
  asignados(userId) {
    const st = TH.store.get();
    const inv = st.invitaciones.find(i => i.userId === userId);
    const u = st.usuarios.find(x => x.id === userId);
    // Solo módulos asignados por la organización a través de la invitación (o asignación posterior en el usuario).
    const ids = (u && u.modulosAsignados && u.modulosAsignados.length) ? u.modulosAsignados : (inv && inv.modulos && inv.modulos.length ? inv.modulos : []);
    return this.modulos().filter(m => ids.includes(m.id));
  },

  progreso(userId, moduloId) {
    return TH.store.get().progresoFormativo.find(p => p.userId === userId && p.moduloId === moduloId) || null;
  },
  progresoUsuario(userId) { return TH.store.get().progresoFormativo.filter(p => p.userId === userId); },

  asignarModulosUsuario(userId, modulos) {
    TH.store.update(s => { const u = s.usuarios.find(x => x.id === userId); if (u) u.modulosAsignados = modulos; const i = s.invitaciones.find(x => x.userId === userId); if (i) i.modulos = modulos; TH.api.historial.registrar(s, 'Módulos asignados a colaborador', 'usuario', userId, modulos); }, 'formacion');
    return { ok: true };
  },
  estadoModulo(userId, moduloId) {
    const p = this.progreso(userId, moduloId);
    if (!p) return 'pendiente';
    return p.estado;
  },

  /** Porcentaje de avance en un módulo: lecciones vistas + ejercicio */
  avanceModulo(userId, moduloId) {
    const m = this.modulo(moduloId); const p = this.progreso(userId, moduloId);
    if (!m || !p) return 0;
    const pasos = m.lecciones.length + 1;
    const hechos = p.leccionesVistas.length + (p.estado === 'completado' ? 1 : 0);
    return TH.util.pct(hechos, pasos);
  },

  iniciar(userId, orgId, moduloId) {
    if (this.progreso(userId, moduloId)) return { ok: true };
    TH.store.update(s => {
      s.progresoFormativo.push({ id: TH.util.id('prog'), userId, orgId, moduloId, leccionesVistas: [], respuestasQuiz: {}, puntaje: null, estado: 'en-curso', fechaInicio: TH.util.hoy(), fechaFin: null });
    }, 'formacion');
    return { ok: true };
  },

  _asegurarProgreso(s, userId, moduloId) {
    let p = s.progresoFormativo.find(x => x.userId === userId && x.moduloId === moduloId);
    if (!p) { const u = s.usuarios.find(x => x.id === userId); p = { id: TH.util.id('prog'), userId, orgId: u ? u.orgId : null, moduloId, leccionesVistas: [], respuestasQuiz: {}, puntaje: null, estado: 'en-curso', fechaInicio: TH.util.hoy(), fechaFin: null }; s.progresoFormativo.push(p); }
    return p;
  },
  marcarLeccion(userId, moduloId, leccionId) {
    if (!this.modulo(moduloId)) return { ok: false, error: 'Módulo no disponible.' };
    if (!this.asignados(userId).some(m => m.id === moduloId)) return { ok: false, error: 'Este módulo no está asignado a tu perfil.' };
    TH.store.update(s => { const p = TH.api.formacion._asegurarProgreso(s, userId, moduloId); if (!p.leccionesVistas.includes(leccionId)) p.leccionesVistas.push(leccionId); }, 'formacion');
    return { ok: true, progreso: this.progreso(userId, moduloId) };
  },

  /** Comprueba una respuesta del ejercicio y la registra (retroalimentación inmediata) */
  responderQuiz(userId, moduloId, preguntaId, opcionId) {
    const m = this.modulo(moduloId); const q = m && m.quiz.find(x => x.id === preguntaId);
    if (!q) return { ok: false, error: 'Pregunta no disponible.' };
    if (!this.asignados(userId).some(x => x.id === moduloId)) return { ok: false, error: 'Este módulo no está asignado a tu perfil.' };
    const correcta = q.correcta === opcionId;
    TH.store.update(s => { const p = TH.api.formacion._asegurarProgreso(s, userId, moduloId); p.respuestasQuiz[preguntaId] = opcionId; }, 'formacion');
    return { ok: true, correcta, retro: correcta ? q.retro.ok : q.retro.no, progreso: this.progreso(userId, moduloId) };
  },

  finalizar(userId, moduloId) {
    const m = this.modulo(moduloId); const p = this.progreso(userId, moduloId);
    if (!m || !p) return { ok: false, error: 'No hay progreso registrado.' };
    const faltanLecciones = m.lecciones.filter(l => !p.leccionesVistas.includes(l.id));
    const faltanQuiz = m.quiz.filter(q => !p.respuestasQuiz[q.id]);
    if (faltanLecciones.length || faltanQuiz.length) return { ok: false, error: 'Completa todas las lecciones y el ejercicio antes de finalizar.' };
    const aciertos = m.quiz.filter(q => p.respuestasQuiz[q.id] === q.correcta).length;
    const puntaje = TH.util.pct(aciertos, m.quiz.length);
    TH.store.update(s => {
      const x = s.progresoFormativo.find(z => z.userId === userId && z.moduloId === moduloId);
      x.estado = 'completado'; x.puntaje = puntaje; x.fechaFin = TH.util.hoy();
      TH.api.historial.registrar(s, 'Módulo completado: ' + m.titulo, 'formacion', x.id);
    }, 'formacion');
    return { ok: true, puntaje, aciertos, total: m.quiz.length };
  },

  reintentar(userId, moduloId) {
    TH.store.update(s => {
      const p = s.progresoFormativo.find(x => x.userId === userId && x.moduloId === moduloId); if (!p) return;
      p.respuestasQuiz = {}; p.estado = 'en-curso'; p.puntaje = null; p.fechaFin = null;
    }, 'formacion');
    return { ok: true };
  },

  /** Agregados para la organización: participación por módulo y por colaborador (solo estados, sin respuestas) */
  agregadosOrganizacion(orgId) {
    const st = TH.store.get();
    const colaboradores = st.usuarios.filter(u => u.rol === 'colaborador' && u.orgId === orgId);
    const invitaciones = st.invitaciones.filter(i => i.orgId === orgId);
    const progreso = st.progresoFormativo.filter(p => p.orgId === orgId);
    const porModulo = this.modulos().map(m => {
      const asignados = invitaciones.filter(i => i.modulos.includes(m.id)).length || colaboradores.length;
      const completados = progreso.filter(p => p.moduloId === m.id && p.estado === 'completado').length;
      const enCurso = progreso.filter(p => p.moduloId === m.id && p.estado === 'en-curso').length;
      return { modulo: m, asignados, completados, enCurso, pendientes: Math.max(0, asignados - completados - enCurso), pct: TH.util.pct(completados, asignados) };
    });
    const porColaborador = colaboradores.map(c => {
      const inv = invitaciones.find(i => i.userId === c.id);
      const mods = inv && inv.modulos.length ? inv.modulos : this.modulos().map(m => m.id);
      const completados = progreso.filter(p => p.userId === c.id && p.estado === 'completado').length;
      const enCurso = progreso.filter(p => p.userId === c.id && p.estado === 'en-curso').length;
      return { usuario: c, asignados: mods.length, completados, enCurso, pendientes: mods.length - completados - enCurso, pct: TH.util.pct(completados, mods.length) };
    });
    const totalAsignaciones = porColaborador.reduce((t, c) => t + c.asignados, 0);
    const totalCompletados = porColaborador.reduce((t, c) => t + c.completados, 0);
    return { colaboradores: colaboradores.length, invitacionesPendientes: invitaciones.filter(i => i.estado === 'pendiente').length, porModulo, porColaborador, coberturaPct: TH.util.pct(totalCompletados, totalAsignaciones), totalCompletados, totalAsignaciones,
      colaboradoresConAlMenosUno: porColaborador.filter(c => c.completados > 0).length };
  },

  /** Totales globales para la FMA */
  totales() {
    const st = TH.store.get();
    const agregados = st.participacionAgregada || {};
    let completados = 0, participantes = 0;
    st.organizaciones.forEach(o => {
      if (agregados[o.id]) { completados += agregados[o.id].modulosCompletados; participantes += agregados[o.id].colaboradoresActivos; return; }
      const prog = st.progresoFormativo.filter(p => p.orgId === o.id);
      completados += prog.filter(p => p.estado === 'completado').length;
      participantes += new Set(prog.map(p => p.userId)).size;
    });
    return { completados, participantes };
  }
};
