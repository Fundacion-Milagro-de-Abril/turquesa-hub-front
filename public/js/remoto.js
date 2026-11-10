/* ============================================================
   TURQUESA HUB · ADAPTADOR HTTP DE SERVICIOS (producción)
   Implementa, contra la API de docs/API_CONTRACT.md, las operaciones de
   lectura (cargadores por espacio) y de escritura (mutaciones) de todos los
   módulos. TH.store actúa como caché de entidades: los cargadores la llenan
   antes de renderizar cada ruta y cada mutación la actualiza con la entidad
   que devuelve el servidor (upsert). Las vistas leen siempre de la caché y
   esperan (await) las mutaciones.

   Al cargar este archivo en entorno remoto (TH.config.esRemoto), las
   mutaciones de TH.api.* y de los servicios se sustituyen por las versiones
   HTTP definidas aquí; las implementaciones locales (mock-api.js, services/)
   quedan intactas para el entorno de desarrollo y las pruebas.
   ============================================================ */
window.TH = window.TH || {};

TH.remoto = (function () {
  const h = () => TH.http; const st = () => TH.store.get();
  const upsert = (lista, obj) => TH.util.upsert(lista, obj);
  const lista = (nombre, nuevos) => TH.store.update(s => { TH.util.reemplazarLista(s[nombre], nuevos || []); }, 'remoto');
  const cacheTiempos = {};
  function fresco(clave) { const t = cacheTiempos[clave]; return t && (Date.now() - t) < TH.config.api.cacheSegundos * 1000; }
  function marcar(clave) { cacheTiempos[clave] = Date.now(); }
  function invalidar(clave) { if (clave) delete cacheTiempos[clave]; else Object.keys(cacheTiempos).forEach(k => delete cacheTiempos[k]); }

  /* ---------- Fusión de respuestas en la caché ---------- */
  function fusionar(r) {
    if (!r || !r.ok) return r;
    TH.store.update(s => {
      if (r.organizacion) upsert(s.organizaciones, r.organizacion);
      if (r.organizaciones) TH.util.reemplazarLista(s.organizaciones, r.organizaciones);
      if (r.usuario) upsert(s.usuarios, r.usuario);
      if (r.usuarios) r.usuarios.forEach(u => upsert(s.usuarios, u));
      if (r.diagnostico) { const i = s.diagnosticos.findIndex(d => d.orgId === r.diagnostico.orgId); if (i >= 0) s.diagnosticos[i] = r.diagnostico; else s.diagnosticos.push(r.diagnostico); }
      if (r.diagnosticosArchivados) { const org = r.diagnosticosArchivados[0] && r.diagnosticosArchivados[0].orgId; if (org) s.diagnosticosArchivados = s.diagnosticosArchivados.filter(d => d.orgId !== org); r.diagnosticosArchivados.forEach(d => s.diagnosticosArchivados.push(d)); }
      if (r.diagnosticos) TH.util.reemplazarLista(s.diagnosticos, r.diagnosticos);
      if (r.plan) { const i = s.planes.findIndex(p => p.orgId === r.plan.orgId); if (i >= 0) s.planes[i] = r.plan; else s.planes.push(r.plan); }
      if (r.planes) TH.util.reemplazarLista(s.planes, r.planes);
      if (r.evidencia) upsert(s.evidencias, r.evidencia);
      if (r.evidencias) { const org = r.orgId || (r.evidencias[0] && r.evidencias[0].orgId); if (org) s.evidencias = s.evidencias.filter(e => e.orgId !== org); r.evidencias.forEach(e => s.evidencias.push(e)); }
      if (r.invitacion) upsert(s.invitaciones, r.invitacion);
      if (r.invitaciones) { const org = r.orgId || (r.invitaciones[0] && r.invitaciones[0].orgId); if (org) s.invitaciones = s.invitaciones.filter(i => i.orgId !== org); r.invitaciones.forEach(i => s.invitaciones.push(i)); }
      if (r.progreso) { const i = s.progresoFormativo.findIndex(p => p.id === r.progreso.id || (p.userId === r.progreso.userId && p.moduloId === r.progreso.moduloId)); if (i >= 0) s.progresoFormativo[i] = r.progreso; else s.progresoFormativo.push(r.progreso); }
      if (r.progresos) { if (r.orgId) s.progresoFormativo = s.progresoFormativo.filter(p => p.orgId !== r.orgId); else if (r.userId) s.progresoFormativo = s.progresoFormativo.filter(p => p.userId !== r.userId); else s.progresoFormativo.length = 0; r.progresos.forEach(p => s.progresoFormativo.push(p)); }
      if (r.contenido) upsert(s.contenidos, r.contenido);
      if (r.contenidos) TH.util.reemplazarLista(s.contenidos, r.contenidos);
      if (r.modulo) upsert(s.modulos, r.modulo);
      if (r.modulos) TH.util.reemplazarLista(s.modulos, r.modulos);
      if (r.documento) upsert(s.documentosLegales, r.documento);
      if (r.documentosLegales) TH.util.reemplazarLista(s.documentosLegales, r.documentosLegales);
      if (r.interes) upsert(s.interesesSello, r.interes);
      if (r.intereses) TH.util.reemplazarLista(s.interesesSello, r.intereses);
      if (r.historial) TH.util.reemplazarLista(s.historial, r.historial);
      if (r.configuracion) s.configuracion = Object.assign(s.configuracion || {}, r.configuracion);
      if (r.instrumentoVersiones) s.instrumentoVersiones = r.instrumentoVersiones;
      if (r.instrumento && r.instrumento.alcance) { s.configuracion = s.configuracion || {}; s.configuracion.instrumentoAlcance = r.instrumento.alcance; }
      if (r.participacionAgregada) s.participacionAgregada = r.participacionAgregada;
    }, 'remoto');
    return r;
  }
  async function pedir(ruta) { return fusionar(await h().get(ruta)); }
  async function mutar(metodo, ruta, cuerpo) { const r = fusionar(await h().llamar(metodo, ruta, cuerpo)); if (r.ok) invalidar(); return r; }

  /* ---------- Cargadores por espacio (antes de renderizar) ---------- */
  const cargadores = {
    /** La configuración pública (documentos jurídicos vigentes) no bloquea las páginas públicas: si el servicio no
     *  responde, se renderizan con un aviso y el formulario de registro no recoge datos (sin base de información publicada en caché). */
    async publico() { if (fresco('publico')) return { ok: true }; const r = await pedir('/configuracion/publica'); TH.remoto.ultimoError = r.ok ? null : r.error; if (r.ok) marcar('publico'); return { ok: true, degradado: !r.ok, error: r.error }; },
    async organizacion() {
      if (fresco('organizacion')) return { ok: true };
      const rs = await Promise.all(['/organizaciones/mia', '/organizaciones/mia/diagnostico', '/organizaciones/mia/plan', '/organizaciones/mia/evidencias', '/organizaciones/mia/invitaciones', '/organizaciones/mia/colaboradores', '/contenidos?publico=organizacion', '/modulos', '/organizaciones/mia/sello/intereses', '/configuracion/publica'].map(pedir));
      const fallo = rs.find(r => !r.ok && r.codigo !== 'NO_ENCONTRADO'); if (fallo) return fallo; marcar('organizacion'); return { ok: true };
    },
    async colaborador() {
      if (fresco('colaborador')) return { ok: true };
      const rs = await Promise.all(['/colaboradores/mi', '/colaboradores/mi/modulos', '/contenidos?publico=colaborador', '/configuracion/publica'].map(pedir));
      const fallo = rs.find(r => !r.ok); if (fallo) return fallo; marcar('colaborador'); return { ok: true };
    },
    async fma() {
      if (fresco('fma')) return { ok: true };
      const rs = await Promise.all(['/admin/organizaciones', '/admin/usuarios', '/admin/diagnosticos', '/admin/planes', '/admin/evidencias', '/admin/invitaciones', '/admin/progreso', '/admin/contenidos', '/admin/modulos', '/admin/documentos-legales', '/admin/sello/intereses', '/admin/auditoria', '/admin/configuracion', '/admin/instrumento/versiones'].map(pedir));
      const fallo = rs.find(r => !r.ok && r.codigo !== 'PROHIBIDO'); if (fallo) return fallo; marcar('fma'); return { ok: true };
    }
  };
  async function cargar(ctx) {
    if (!TH.config.esRemoto) return { ok: true };
    const rol = TH.auth.rol();
    if (!rol) return cargadores.publico();
    const r = await cargadores[rol === 'fma' ? 'fma' : rol === 'colaborador' ? 'colaborador' : 'organizacion']();
    return r;
  }

  /* ---------- Mutaciones HTTP (misma firma y retorno que las locales) ---------- */
  const http = {
    organizaciones: {
      async actualizar(id, cambios) { return mutar('PATCH', '/organizaciones/mia', cambios); },
      async marcarOnboarding(id, paso) { return mutar('PATCH', '/organizaciones/mia/onboarding', { paso }); },
      async cambiarEstado(id, estado, motivo) { return mutar('POST', '/admin/organizaciones/' + encodeURIComponent(id) + '/estado', { estado, motivo }); }
    },
    usuarios: {
      async actualizar(id, cambios) { const rol = TH.auth.rol(); return mutar('PATCH', rol === 'fma' ? '/admin/usuarios/' + encodeURIComponent(id) : rol === 'colaborador' ? '/colaboradores/mi' : '/organizaciones/mia/usuarios/' + encodeURIComponent(id), cambios); },
      async crearInterno(datos) { return mutar('POST', '/admin/usuarios', datos); }
    },
    invitaciones: {
      async crear(orgId, datos) { return mutar('POST', '/organizaciones/mia/invitaciones', datos); },
      async reenviar(invId) { return mutar('POST', '/organizaciones/mia/invitaciones/' + encodeURIComponent(invId) + '/reenviar'); },
      async asignarModulos(invId, modulos) { return mutar('PATCH', '/organizaciones/mia/invitaciones/' + encodeURIComponent(invId) + '/modulos', { modulos }); },
      async anular(invId) { return mutar('POST', '/organizaciones/mia/invitaciones/' + encodeURIComponent(invId) + '/anular'); },
      async desvincular(orgId, userId) { return mutar('POST', '/organizaciones/mia/colaboradores/' + encodeURIComponent(userId) + '/desvincular'); }
    },
    evidencias: {
      async registrar(orgId, datos) {
        const r = fusionar(await h().subir('/organizaciones/mia/evidencias', { accionId: datos.accionId, preguntaId: datos.preguntaId || '', nombre: datos.nombre, tipo: datos.tipo, descripcion: datos.descripcion || '' }, datos.archivoFile || null, 'archivo'));
        if (r.ok) invalidar(); return r;
      },
      async eliminar(orgId, id) { const r = await mutar('DELETE', '/organizaciones/mia/evidencias/' + encodeURIComponent(id)); if (r.ok) TH.store.update(s => { s.evidencias = s.evidencias.filter(e => e.id !== id); }, 'remoto'); return r; }
    },
    contenidos: {
      async crear(datos) { return mutar('POST', '/admin/contenidos', datos); },
      async editar(id, datos) { return mutar('PUT', '/admin/contenidos/' + encodeURIComponent(id), datos); },
      async cambiarEstado(id, estado, nota) { return mutar('POST', '/admin/contenidos/' + encodeURIComponent(id) + '/estado', { estado, nota }); },
      async registrarRevision(id, tipo, resultado, observaciones) { return mutar('POST', '/admin/contenidos/' + encodeURIComponent(id) + '/revisiones', { tipo, resultado, observaciones }); }
    },
    modulos: {
      async crearVersion(moduloId, nota) { return mutar('POST', '/admin/modulos/' + encodeURIComponent(moduloId) + '/versiones', { nota }); },
      async editar(id, datos) { return mutar('PUT', '/admin/modulos/versiones/' + encodeURIComponent(id), datos); },
      async cambiarEstado(id, estado, nota) { return mutar('POST', '/admin/modulos/versiones/' + encodeURIComponent(id) + '/estado', { estado, nota }); },
      async registrarRevision(id, tipo, resultado, observaciones) { return mutar('POST', '/admin/modulos/versiones/' + encodeURIComponent(id) + '/revisiones', { tipo, resultado, observaciones }); }
    },
    documentosLegales: {
      async crearVersion(tipo, datos) { return mutar('POST', '/admin/documentos-legales', Object.assign({ tipo }, datos || {})); },
      async editar(id, datos) { return mutar('PUT', '/admin/documentos-legales/' + encodeURIComponent(id), datos); },
      async enviarARevision(id) { return mutar('POST', '/admin/documentos-legales/' + encodeURIComponent(id) + '/revision'); },
      async aprobar(id, resultado, nota) { return mutar('POST', '/admin/documentos-legales/' + encodeURIComponent(id) + '/aprobacion', { resultado, nota }); },
      async publicar(id, opciones) { return mutar('POST', '/admin/documentos-legales/' + encodeURIComponent(id) + '/publicacion', opciones || {}); },
      /** Aceptación o acuse de una versión publicada por la persona con sesión (organización o colaborador). */
      async registrarAceptacion(documentoId, modo) { return mutar('POST', '/documentos-legales/' + encodeURIComponent(documentoId) + '/aceptacion', { modo: modo || 'aceptacion' }); }
    },
    configuracion: {
      async guardar(cambios) { return mutar('PATCH', '/admin/configuracion', cambios); },
      async cambiarAlcancePregunta(preguntaId, alcance) { return mutar('PATCH', '/admin/instrumento/preguntas/' + encodeURIComponent(preguntaId) + '/alcance', { alcance }); },
      async crearVersionInstrumento(nota) { return mutar('POST', '/admin/instrumento/versiones', { nota }); }
    },
    diagnostico: {
      async iniciar(orgId) { return mutar('POST', '/organizaciones/mia/diagnostico', {}); },
      async reiniciar(orgId) { return mutar('POST', '/organizaciones/mia/diagnostico', { nuevoCiclo: true }); },
      async responder(orgId, preguntaId, opcion, justificacion) { return mutar('PUT', '/organizaciones/mia/diagnostico/respuestas/' + encodeURIComponent(preguntaId), { opcion, justificacion: justificacion || '' }); },
      async finalizar(orgId) { return mutar('POST', '/organizaciones/mia/diagnostico/finalizar', {}); }
    },
    plan: {
      async crearDesdeDiagnostico(orgId, seleccion) { return mutar('POST', '/organizaciones/mia/plan', { seleccion: seleccion || [] }); },
      async incorporarSugeridas(orgId, seleccion) { return mutar('POST', '/organizaciones/mia/plan/incorporar', { seleccion: seleccion || [] }); },
      async agregarAccion(orgId, datos) { return mutar('POST', '/organizaciones/mia/plan/acciones', datos); },
      async actualizarAccion(orgId, accionId, cambios) { return mutar('PATCH', '/organizaciones/mia/plan/acciones/' + encodeURIComponent(accionId), cambios); },
      async eliminarAccion(orgId, accionId) { return mutar('DELETE', '/organizaciones/mia/plan/acciones/' + encodeURIComponent(accionId)); },
      /** El servidor calcula los vencimientos; en remoto no se altera la caché. */
      async actualizarVencidas() { return { ok: true }; }
    },
    formacion: {
      async asignarModulosUsuario(userId, modulos) { return mutar('PATCH', '/organizaciones/mia/colaboradores/' + encodeURIComponent(userId) + '/modulos', { modulos }); },
      async iniciar(userId, orgId, moduloId) { const p = TH.api.formacion.progreso(userId, moduloId); if (p) return { ok: true, progreso: p }; return mutar('POST', '/colaboradores/mi/progreso/' + encodeURIComponent(moduloId), {}); },
      async marcarLeccion(userId, moduloId, leccionId) { return mutar('POST', '/colaboradores/mi/progreso/' + encodeURIComponent(moduloId) + '/lecciones/' + encodeURIComponent(leccionId), {}); },
      async responderQuiz(userId, moduloId, preguntaId, opcionId) { return mutar('PUT', '/colaboradores/mi/progreso/' + encodeURIComponent(moduloId) + '/respuestas/' + encodeURIComponent(preguntaId), { opcion: opcionId }); },
      async finalizar(userId, moduloId) { return mutar('POST', '/colaboradores/mi/progreso/' + encodeURIComponent(moduloId) + '/finalizar', {}); },
      async reintentar(userId, moduloId) { return mutar('POST', '/colaboradores/mi/progreso/' + encodeURIComponent(moduloId) + '/reintentar', {}); }
    },
    sello: {
      async manifestarInteres(datos) { const r = await mutar('POST', '/sello/intereses', datos); if (r.ok) r.enviada = true; return r; },
      async gestionarInteres(id, estado, nota) { return mutar('POST', '/admin/sello/intereses/' + encodeURIComponent(id) + '/gestion', { estado, nota }); }
    }
  };

  /** Sustituye las mutaciones locales por las HTTP (solo en entorno remoto). */
  function activar() {
    Object.keys(http).forEach(dominio => {
      const destino = dominio === 'diagnostico' ? TH.api.diagnostico : dominio === 'plan' ? TH.api.plan : TH.api[dominio];
      if (!destino) return;
      Object.keys(http[dominio]).forEach(m => { destino['_local_' + m] = destino[m]; destino[m] = http[dominio][m]; });
    });
    TH.remoto.activo = true;
  }
  return { http, cargadores, cargar, invalidar, fusionar, activar, activo: false, ultimoError: null };
})();
