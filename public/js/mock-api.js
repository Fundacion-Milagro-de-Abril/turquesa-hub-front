/* ============================================================
   TURQUESA HUB · CAPA DE SERVICIOS TRANSVERSALES
   Las vistas consumen datos solo a través de TH.api.*; ninguna vista toca
   TH.store directamente. En producción, cada método se reemplaza por la
   llamada HTTP correspondiente (docs/API_CONTRACT.md) conservando firma y
   estructura de respuesta: { ok, error?, ...datos }.

   Este archivo implementa el adaptador LOCAL (estado en memoria/localStorage
   en desarrollo). Ver también js/services/*.js.
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

/* ---------- Auditoría / historial ---------- */
TH.api.historial = {
  registrar(estado, accion, entidad, entidadId, detalle) {
    const s = TH.auth.sesion();
    estado.historial.unshift({ id: TH.util.id('log'), fecha: new Date().toISOString(), actorId: s ? s.userId : 'sistema', accion, entidad, entidadId, detalle: detalle || null });
    if (estado.historial.length > 1000) estado.historial.length = 1000;
  },
  listar(filtro) {
    const f = filtro || {};
    return TH.store.get().historial.filter(h => (!f.entidad || h.entidad === f.entidad) && (!f.entidadId || h.entidadId === f.entidadId) && (!f.actorId || h.actorId === f.actorId));
  }
};

/* ---------- Organizaciones ---------- */
TH.api.organizaciones = {
  listar(filtros) {
    const f = filtros || {};
    return TH.store.get().organizaciones.filter(o =>
      (!f.q || TH.util.buscar(o.nombre + ' ' + o.municipio + ' ' + o.sector + ' ' + o.responsable + ' ' + (o.identificacion || ''), f.q)) &&
      (!f.estado || o.estado === f.estado) && (!f.sector || o.sector === f.sector));
  },
  obtener(id) { return TH.store.get().organizaciones.find(o => o.id === id) || null; },
  /** Validación de registro compartida por el formulario y el adaptador local. */
  validarRegistro(d) {
    const errores = {};
    if (!d.nombre || !d.nombre.trim()) errores.nombre = 'Escribe la razón social o denominación.';
    if (!d.tipoIdentificacion) errores.tipoIdentificacion = 'Selecciona el tipo de identificación.';
    if (d.tipoIdentificacion === 'NIT') { const e = TH.util.validarNIT(d.identificacion); if (e) errores.identificacion = e; }
    else if (d.tipoIdentificacion && d.tipoIdentificacion !== 'sin-identificacion' && !(d.identificacion || '').trim()) errores.identificacion = 'Escribe el número de identificación.';
    if (!d.sector) errores.sector = 'Selecciona el sector.';
    if (!d.tamano) errores.tamano = 'Selecciona el tamaño.';
    if (!d.departamento) errores.departamento = 'Selecciona el departamento.';
    if (!d.municipio) errores.municipio = 'Selecciona el municipio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.emailInstitucional || '')) errores.emailInstitucional = 'Escribe un correo institucional válido.';
    if (d.telefono && !/^[\d\s+()-]{7,20}$/.test(d.telefono)) errores.telefono = 'Escribe un teléfono válido.';
    if (!d.responsable || !d.responsable.trim()) errores.responsable = 'Escribe el nombre de la persona responsable.';
    if (!d.cargo) errores.cargo = 'Selecciona el cargo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '')) errores.email = 'Escribe un correo válido.';
    const ec = TH.auth.validarClave(d.clave); if (ec) errores.clave = ec;
    if (d.clave !== d.claveConfirmacion) errores.claveConfirmacion = 'Las contraseñas no coinciden.';
    if (TH.api.documentosLegales.publicado('condiciones-uso') && !d.aceptaCondiciones) errores.aceptaCondiciones = 'Debes aceptar las condiciones de uso.';
    if (!d.aceptaDatos) errores.aceptaDatos = 'Debes autorizar el tratamiento de datos personales.';
    return errores;
  },
  registrar(datos) {
    /* Requisito mínimo antes de recoger datos personales: que exista una base de información y autorización
       (aviso transitorio o política definitiva; ver TH.api.documentosLegales.baseRegistro) y que la persona la autorice.
       No depende de que existan las políticas definitivas. */
    const base = TH.api.documentosLegales.baseRegistro();
    if (!base) return { ok: false, codigo: 'INFORMACION_NO_PUBLICADA', error: 'El registro aún no está habilitado: la Fundación Milagro de Abril no ha publicado el aviso de información y autorización de datos personales.' };
    const vd = TH.api.documentosLegales.verificarVersiones(datos); if (vd) return vd;
    const errores = this.validarRegistro(datos);
    if (Object.keys(errores).length) return { ok: false, error: 'Revisa los campos marcados.', errores };
    const st = TH.store.get();
    if (st.usuarios.some(u => (u.email || '').toLowerCase() === datos.email.trim().toLowerCase())) return { ok: false, error: 'Ya existe una cuenta con ese correo. Ingresa o recupera tu contraseña.', errores: { email: 'Ya existe una cuenta con este correo.' } };
    if (datos.tipoIdentificacion === 'NIT' && st.organizaciones.some(o => (o.identificacion || '').replace(/[.\s-]/g, '') === datos.identificacion.replace(/[.\s-]/g, ''))) return { ok: false, error: 'Ya existe una organización registrada con ese NIT. Contacta a la Fundación Milagro de Abril si necesitas acceso.', errores: { identificacion: 'NIT ya registrado.' } };
    const hoy = TH.util.hoy(); const ahora = new Date().toISOString();
    const org = { id: TH.util.id('org'), nombre: datos.nombre.trim(), tipoIdentificacion: datos.tipoIdentificacion, identificacion: (datos.identificacion || '').trim(), sector: datos.sector, tamano: datos.tamano, departamento: datos.departamento, municipio: datos.municipio, emailInstitucional: datos.emailInstitucional.trim(), telefono: (datos.telefono || '').trim(), responsable: datos.responsable.trim(), cargo: datos.cargo, email: datos.email.trim(), estado: 'activa', fechaRegistro: hoy, onboarding: { bienvenida: false, perfil: true }, acompanamiento: '' };
    const usuario = { id: TH.util.id('usr-org'), nombre: org.responsable, email: org.email, rol: 'organizacion', orgId: org.id, cargo: org.cargo, estado: 'pendiente-verificacion', correoVerificado: false, fechaCreacion: hoy,
      consentimientos: TH.api.documentosLegales.consentimientosParaRegistro() };
    TH.store.update(s => { s.organizaciones.push(org); s.usuarios.push(usuario); TH.api.historial.registrar(s, 'Registro de organización', 'organizacion', org.id); }, 'registro');
    return { ok: true, org, usuario };
  },
  actualizar(id, cambios) {
    const permitidos = ['nombre', 'identificacion', 'tipoIdentificacion', 'sector', 'tamano', 'departamento', 'municipio', 'emailInstitucional', 'telefono', 'responsable', 'cargo', 'acompanamiento', 'preferencias', 'onboarding'];
    TH.store.update(s => { const o = s.organizaciones.find(x => x.id === id); if (!o) return; Object.keys(cambios).forEach(k => { if (permitidos.includes(k)) o[k] = cambios[k]; }); TH.api.historial.registrar(s, 'Datos de la organización actualizados', 'organizacion', id); }, 'organizacion');
    return { ok: true };
  },
  cambiarEstado(id, estado, motivo) {
    TH.store.update(s => { const o = s.organizaciones.find(x => x.id === id); if (!o) return; o.estado = estado; o.estadoMotivo = motivo || ''; TH.api.historial.registrar(s, 'Organización ' + (estado === 'activa' ? 'activada' : 'suspendida'), 'organizacion', id, motivo); }, 'organizacion');
    return { ok: true };
  },
  marcarOnboarding(id, paso) { TH.store.update(s => { const o = s.organizaciones.find(x => x.id === id); if (o) { o.onboarding = o.onboarding || {}; o.onboarding[paso] = true; } }, 'onboarding'); },
  resumen(orgId) {
    const st = TH.store.get();
    const diag = st.diagnosticos.find(d => d.orgId === orgId) || null;
    const plan = st.planes.find(p => p.orgId === orgId) || null;
    const colaboradores = st.usuarios.filter(u => u.rol === 'colaborador' && u.orgId === orgId);
    const invitaciones = st.invitaciones.filter(i => i.orgId === orgId);
    const progreso = st.progresoFormativo.filter(p => p.orgId === orgId);
    const agregado = st.participacionAgregada && st.participacionAgregada[orgId];
    const acciones = plan ? plan.acciones : [];
    const completadas = acciones.filter(a => a.estado === 'completada').length;
    const vigentes = TH.api.diagnostico.preguntas();
    const diagResp = diag ? vigentes.filter(p => diag.respuestas[p.id]).length : 0;
    const evidencias = st.evidencias.filter(e => e.orgId === orgId);
    const hoy = TH.util.hoy();
    return {
      diag, plan, colaboradores, invitaciones, progreso, evidencias,
      diagnosticoPct: diag ? TH.util.pct(diagResp, vigentes.length) : 0,
      diagnosticoEstado: diag ? diag.estado : 'no-iniciado',
      accionesTotal: acciones.length, accionesCompletadas: completadas,
      accionesVencidas: acciones.filter(a => !['completada'].includes(a.estado) && a.fechaObjetivo && a.fechaObjetivo < hoy).length,
      planPct: acciones.length ? Math.round(acciones.reduce((t, a) => t + (a.avance || 0), 0) / acciones.length) : 0,
      colaboradoresActivos: agregado ? agregado.colaboradoresActivos : colaboradores.length,
      colaboradoresInvitados: agregado ? agregado.colaboradoresInvitados : invitaciones.length,
      modulosCompletados: agregado ? agregado.modulosCompletados : progreso.filter(p => p.estado === 'completado').length,
      evidenciasTotal: evidencias.length,
      interesSello: (st.interesesSello || []).some(i => i.orgId === orgId)
    };
  }
};

/* ---------- Usuarios ---------- */
TH.api.usuarios = {
  listar(filtro) { const f = filtro || {}; return TH.store.get().usuarios.filter(u => (!f.rol || u.rol === f.rol) && (!f.orgId || u.orgId === f.orgId)); },
  obtener(id) { return TH.store.get().usuarios.find(u => u.id === id) || null; },
  actualizar(id, cambios) {
    const permitidos = ['nombre', 'area', 'cargo', 'estado', 'permisos', 'telefono'];
    TH.store.update(s => { const u = s.usuarios.find(x => x.id === id); if (!u) return; Object.keys(cambios).forEach(k => { if (permitidos.includes(k)) u[k] = cambios[k]; }); TH.api.historial.registrar(s, 'Usuario actualizado', 'usuario', id); }, 'usuario');
    return { ok: true };
  },
  internos() { return TH.store.get().usuarios.filter(u => u.rol === 'fma'); },
  /** Las cuentas internas solo las crea un administrador FMA con permiso 'usuarios:gestionar'; nunca el registro público. */
  crearInterno(datos) {
    if (!TH.auth.tienePermiso('usuarios:gestionar')) return { ok: false, error: 'No tienes permiso para gestionar usuarios internos.' };
    const st = TH.store.get();
    if (st.usuarios.some(u => (u.email || '').toLowerCase() === (datos.email || '').trim().toLowerCase())) return { ok: false, error: 'Ya existe una cuenta con ese correo.' };
    const u = { id: TH.util.id('usr-fma'), nombre: datos.nombre.trim(), email: datos.email.trim(), rol: 'fma', orgId: null, cargo: datos.cargo || '', permisos: datos.permisos || [], estado: 'pendiente-activacion', correoVerificado: false, fechaCreacion: TH.util.hoy() };
    TH.store.update(s => { s.usuarios.push(u); TH.api.historial.registrar(s, 'Usuario interno creado (pendiente de activación por correo)', 'usuario', u.id, { permisos: u.permisos }); }, 'usuario');
    return { ok: true, usuario: u };
  },
  perfilesPermiso() {
    return [
      { id: 'administracion', nombre: 'Administración integral', permisos: ['*'] },
      { id: 'revision-tecnica', nombre: 'Revisión técnica de contenidos y módulos', permisos: ['contenidos:ver', 'contenidos:editar', 'contenidos:revisar-tecnica', 'formacion:ver', 'formacion:editar', 'formacion:revisar-tecnica', 'instrumento:ver', 'documentos:ver', 'documentos:editar'] },
      { id: 'revision-juridica', nombre: 'Revisión jurídica (contenidos, módulos y documentos jurídicos)', permisos: ['contenidos:ver', 'contenidos:revisar-juridica', 'formacion:ver', 'formacion:revisar-juridica', 'instrumento:ver', 'documentos:ver', 'documentos:aprobar'] },
      { id: 'revision-psicosocial', nombre: 'Revisión psicológica y psicosocial', permisos: ['contenidos:ver', 'contenidos:revisar-psicosocial', 'formacion:ver', 'formacion:revisar-psicosocial', 'instrumento:ver', 'instrumento:revisar'] },
      { id: 'publicacion', nombre: 'Control de publicaciones', permisos: ['contenidos:ver', 'contenidos:aprobar', 'contenidos:publicar', 'formacion:ver', 'formacion:aprobar', 'formacion:publicar', 'instrumento:publicar', 'documentos:ver', 'documentos:publicar'] },
      { id: 'consulta', nombre: 'Consulta', permisos: ['organizaciones:ver', 'reportes:ver', 'contenidos:ver'] }
    ];
  }
};

/* ---------- Invitaciones de colaboradores ---------- */
TH.api.invitaciones = {
  listar(orgId) { return TH.store.get().invitaciones.filter(i => i.orgId === orgId); },
  crear(orgId, datos) {
    const email = (datos.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Escribe un correo válido.' };
    const st = TH.store.get();
    if (st.invitaciones.some(i => i.orgId === orgId && i.email.toLowerCase() === email && i.estado === 'pendiente')) return { ok: false, error: 'Ya existe una invitación pendiente para ese correo.' };
    if (st.usuarios.some(u => (u.email || '').toLowerCase() === email && u.orgId === orgId)) return { ok: false, error: 'Esa persona ya está vinculada a la organización.' };
    const org = TH.api.organizaciones.obtener(orgId);
    const prefijo = (org ? org.nombre : 'TH').replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'TH';
    const inv = { id: TH.util.id('inv'), orgId, codigo: prefijo + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(), nombre: (datos.nombre || '').trim(), email, area: (datos.area || '').trim(), modulos: datos.modulos || [], estado: 'pendiente', fecha: TH.util.hoy(), expira: TH.util.sumarDias(TH.util.hoy(), 30), userId: null, envio: TH.config.auth.adaptador === 'http' ? 'pendiente' : 'no-enviado-en-desarrollo' };
    TH.store.update(s => { s.invitaciones.push(inv); TH.api.historial.registrar(s, 'Invitación creada', 'invitacion', inv.id); }, 'invitacion');
    return { ok: true, invitacion: inv };
  },
  reenviar(invId) { TH.store.update(s => { const i = s.invitaciones.find(x => x.id === invId); if (i) { i.expira = TH.util.sumarDias(TH.util.hoy(), 30); i.reenvios = (i.reenvios || 0) + 1; } }, 'invitacion'); return { ok: true }; },
  asignarModulos(invId, modulos) { TH.store.update(s => { const i = s.invitaciones.find(x => x.id === invId); if (i) i.modulos = modulos; }, 'invitacion'); return { ok: true }; },
  anular(invId) { TH.store.update(s => { const i = s.invitaciones.find(x => x.id === invId); if (i && i.estado === 'pendiente') i.estado = 'anulada'; }, 'invitacion'); return { ok: true }; },
  desvincular(orgId, userId) {
    TH.store.update(s => { const u = s.usuarios.find(x => x.id === userId && x.orgId === orgId && x.rol === 'colaborador'); if (!u) return; u.estado = 'desvinculado'; u.orgId = null; TH.api.historial.registrar(s, 'Colaborador desvinculado', 'usuario', userId); }, 'usuario');
    return { ok: true };
  }
};

/* ---------- Evidencias institucionales (vinculadas a acciones del plan) ---------- */
TH.api.evidencias = {
  listar(orgId, filtro) { const f = filtro || {}; return TH.store.get().evidencias.filter(e => e.orgId === orgId && (!f.accionId || e.accionId === f.accionId)); },
  registrar(orgId, datos) {
    if (!datos.nombre || !datos.nombre.trim()) return { ok: false, error: 'Escribe el nombre del documento.' };
    const e = { id: TH.util.id('evi'), orgId, accionId: datos.accionId || null, preguntaId: datos.preguntaId || null, nombre: datos.nombre.trim(), tipo: datos.tipo || 'Otro documento', descripcion: (datos.descripcion || '').trim(), fecha: TH.util.hoy(), registradoPor: (TH.auth.usuario() || {}).id,
      archivo: datos.archivo ? { nombre: datos.archivo.nombre, tamano: datos.archivo.tamano, mime: datos.archivo.mime, estado: TH.config.auth.adaptador === 'http' ? 'pendiente-carga' : 'referencia-sin-archivo' } : null };
    TH.store.update(s => { s.evidencias.push(e); TH.api.historial.registrar(s, 'Evidencia registrada', 'evidencia', e.id); }, 'evidencia');
    return { ok: true, evidencia: e };
  },
  eliminar(orgId, id) { TH.store.update(s => { s.evidencias = s.evidencias.filter(e => !(e.id === id && e.orgId === orgId)); }, 'evidencia'); return { ok: true }; }
};

/* ---------- Contenidos y control editorial ---------- */
TH.api.contenidos = {
  estados: ['borrador', 'en-revision-tecnica', 'en-revision-juridica', 'en-revision-psicosocial', 'aprobado', 'publicado', 'archivado'],
  listar(filtro) {
    const f = filtro || {};
    return TH.store.get().contenidos.filter(c =>
      (!f.q || TH.util.buscar(c.titulo + ' ' + c.descripcion + ' ' + c.tema + ' ' + c.categoria, f.q)) &&
      (!f.categoria || c.categoria === f.categoria) && (!f.estado || c.estado === f.estado) && (!f.tema || c.tema === f.tema) &&
      (!f.publico || (c.publico || []).includes(f.publico)));
  },
  publicados(publico, filtro) { return this.listar(Object.assign({}, filtro || {}, { estado: 'publicado', publico })); },
  /** Regla fija: organizaciones y colaboradores solo ven contenidos PUBLICADOS para su público. Los borradores y
   *  las versiones en revisión existen únicamente en el espacio editorial FMA. */
  esVisible(c, publico) { return !!c && c.estado === 'publicado' && (c.publico || []).includes(publico); },
  visibles(publico, filtro) { return this.listar(Object.assign({}, filtro || {}, { publico })).filter(c => this.esVisible(c, publico)); },
  obtener(id) { return TH.store.get().contenidos.find(c => c.id === id) || null; },
  temas() { return [...new Set(TH.store.get().contenidos.map(c => c.tema))].sort(); },
  crear(datos) {
    if (!TH.auth.tienePermiso('contenidos:editar')) return { ok: false, error: 'Sin permiso para crear contenidos.' };
    const u = TH.auth.usuario();
    const c = { id: TH.util.id('rec'), titulo: datos.titulo, categoria: datos.categoria, tema: datos.tema || 'General', descripcion: datos.descripcion || '', objetivo: datos.objetivo || '', secciones: datos.secciones || [{ titulo: 'Desarrollo técnico', cuerpo: (datos.cuerpo || '').split('\n').filter(Boolean) }], referencias: datos.referencias || [],
      autor: u ? u.nombre : 'FMA', fecha: TH.util.hoy(), version: '0.1', estado: 'borrador', revisionTecnica: 'pendiente', revisionJuridica: datos.aplicaJuridica ? 'pendiente' : 'no-aplica', revisionPsicosocial: datos.aplicaPsicosocial ? 'pendiente' : 'no-aplica', referencial: !!datos.referencial, publico: datos.publico || ['organizacion'], tiempoLectura: datos.tiempoLectura || 10,
      revision: { fecha: TH.util.hoy(), responsable: u ? u.nombre : 'FMA' }, historial: [{ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Creación', version: '0.1' }] };
    TH.store.update(s => { s.contenidos.unshift(c); TH.api.historial.registrar(s, 'Contenido creado', 'contenido', c.id); }, 'contenido');
    return { ok: true, contenido: c };
  },
  editar(id, datos) {
    if (!TH.auth.tienePermiso('contenidos:editar')) return { ok: false, error: 'Sin permiso para editar contenidos.' };
    const u = TH.auth.usuario();
    TH.store.update(s => {
      const c = s.contenidos.find(x => x.id === id); if (!c) return;
      const partes = c.version.split('.'); partes[1] = String((parseInt(partes[1] || '0', 10) || 0) + 1);
      Object.assign(c, { titulo: datos.titulo, categoria: datos.categoria, tema: datos.tema, descripcion: datos.descripcion, referencial: !!datos.referencial, publico: datos.publico || c.publico });
      if (datos.objetivo != null) c.objetivo = datos.objetivo;
      if (datos.secciones) c.secciones = datos.secciones;
      c.version = partes.join('.'); c.fecha = TH.util.hoy();
      // Toda edición de contenido publicado o aprobado vuelve a revisión: la aprobación no se hereda.
      if (['publicado', 'aprobado', 'en-revision-juridica', 'en-revision-psicosocial'].includes(c.estado)) { c.estado = 'en-revision-tecnica'; c.revisionTecnica = 'pendiente'; if (c.revisionJuridica !== 'no-aplica') c.revisionJuridica = 'pendiente'; if (c.revisionPsicosocial !== 'no-aplica') c.revisionPsicosocial = 'pendiente'; }
      c.historial.unshift({ fecha: c.fecha, actor: u ? u.nombre : 'FMA', accion: 'Edición de contenido. Nueva versión; vuelve a revisión.', version: c.version });
      TH.api.historial.registrar(s, 'Contenido editado (v' + c.version + ')', 'contenido', id);
    }, 'contenido');
    return { ok: true };
  },
  /** Flujo editorial: borrador → en-revision-tecnica → (en-revision-juridica) → (en-revision-psicosocial) → aprobado → publicado → archivado */
  cambiarEstado(id, nuevoEstado, nota) {
    const u = TH.auth.usuario(); let error = null;
    const permisoNecesario = { 'en-revision-tecnica': 'contenidos:editar', 'en-revision-juridica': 'contenidos:revisar-tecnica', 'en-revision-psicosocial': 'contenidos:revisar-tecnica', aprobado: 'contenidos:aprobar', publicado: 'contenidos:publicar', archivado: 'contenidos:publicar', borrador: 'contenidos:editar' }[nuevoEstado];
    if (permisoNecesario && !TH.auth.tienePermiso(permisoNecesario)) return { ok: false, error: 'No tienes permiso para esta transición (' + permisoNecesario + ').' };
    TH.store.update(s => {
      const c = s.contenidos.find(x => x.id === id); if (!c) return;
      const juridicaOk = c.revisionJuridica === 'no-aplica' || c.revisionJuridica === 'aprobada';
      const psicoOk = c.revisionPsicosocial === 'no-aplica' || c.revisionPsicosocial === 'aprobada';
      if (nuevoEstado === 'aprobado' && (c.revisionTecnica !== 'aprobada' || !juridicaOk || !psicoOk)) { error = 'Para aprobar, las revisiones técnica, jurídica y psicosocial aplicables deben estar registradas como aprobadas por las personas autorizadas.'; return; }
      if (nuevoEstado === 'publicado' && c.estado !== 'aprobado') { error = 'Solo puede publicarse un contenido en estado "aprobado".'; return; }
      c.estado = nuevoEstado;
      c.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Cambio de estado a: ' + TH.util.nombreCatalogo(TH.data.catalogos.estadosContenido, nuevoEstado) + (nota ? ' · ' + nota : ''), version: c.version });
      TH.api.historial.registrar(s, 'Contenido → ' + nuevoEstado, 'contenido', id, nota || null);
    }, 'contenido');
    return error ? { ok: false, error } : { ok: true };
  },
  /** Registro de una revisión por la persona autorizada. tipo: tecnica | juridica | psicosocial. */
  registrarRevision(id, tipo, resultado, observaciones) {
    const permiso = { tecnica: 'contenidos:revisar-tecnica', juridica: 'contenidos:revisar-juridica', psicosocial: 'contenidos:revisar-psicosocial' }[tipo];
    if (!permiso || !TH.auth.tienePermiso(permiso)) return { ok: false, error: 'Esta revisión solo puede registrarla la persona autorizada para ' + tipo + '.' };
    const u = TH.auth.usuario();
    TH.store.update(s => {
      const c = s.contenidos.find(x => x.id === id); if (!c) return;
      const campo = { tecnica: 'revisionTecnica', juridica: 'revisionJuridica', psicosocial: 'revisionPsicosocial' }[tipo];
      c[campo] = resultado;
      c.revisiones = c.revisiones || []; c.revisiones.push({ tipo, resultado, observaciones: (observaciones || '').trim(), revisor: u ? u.nombre : '', revisorId: u ? u.id : null, fecha: new Date().toISOString(), version: c.version });
      if (resultado === 'cambios-requeridos') c.estado = 'borrador';
      else if (c.estado === 'borrador' && tipo === 'tecnica') c.estado = 'en-revision-tecnica';
      c.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Revisión ' + tipo + ': ' + TH.util.nombreCatalogo(TH.data.catalogos.estadosRevision, resultado), version: c.version });
      TH.api.historial.registrar(s, 'Revisión ' + tipo + ' registrada: ' + resultado, 'contenido', id);
    }, 'contenido');
    return { ok: true };
  }
};

/* ---------- Configuración e instrumento ---------- */
TH.api.configuracion = {
  obtener() { return TH.store.get().configuracion || {}; },
  guardar(cambios) { TH.store.update(s => { s.configuracion = Object.assign(s.configuracion || {}, cambios); TH.api.historial.registrar(s, 'Configuración actualizada', 'configuracion', 'general', Object.keys(cambios)); }, 'config'); return { ok: true }; },
  versionesInstrumento() { return TH.store.get().instrumentoVersiones || []; },
  /** Cambia el alcance (activa/reserva) de una pregunta de la versión vigente. Los diagnósticos completados conservan su snapshot. */
  cambiarAlcancePregunta(preguntaId, alcance) {
    if (!TH.auth.tienePermiso('instrumento:editar') && !TH.auth.tienePermiso('*')) return { ok: false, error: 'Sin permiso para editar el instrumento.' };
    TH.store.update(s => { s.configuracion = s.configuracion || {}; s.configuracion.instrumentoAlcance = s.configuracion.instrumentoAlcance || {}; s.configuracion.instrumentoAlcance[preguntaId] = alcance; TH.api.historial.registrar(s, 'Alcance de pregunta ' + preguntaId + ' → ' + alcance, 'instrumento', preguntaId); }, 'config');
    return { ok: true };
  },
  crearVersionInstrumento(nota) {
    TH.store.update(s => {
      s.instrumentoVersiones = s.instrumentoVersiones || [];
      const ultima = s.instrumentoVersiones[0] || { version: TH.data.instrumento.version };
      const partes = String(ultima.version).split('.'); partes[1] = String(parseInt(partes[1] || '0', 10) + 1);
      s.instrumentoVersiones.unshift({ version: partes.join('.'), estado: 'borrador', fecha: TH.util.hoy(), nota: nota || 'Nueva versión en preparación.', preguntasActivas: TH.api.diagnostico.preguntas().length, revision: { tecnica: 'pendiente', psicosocial: 'pendiente', juridica: 'pendiente' } });
      TH.api.historial.registrar(s, 'Versión del instrumento creada (borrador)', 'instrumento', partes.join('.'));
    }, 'config');
    return { ok: true };
  }
};

/* ---------- Módulos formativos: catálogo publicado y flujo editorial con versiones ----------
   Cada registro es una VERSIÓN de un módulo (moduloId estable, id de versión propio). Solo la versión en estado
   'publicado' se entrega a organizaciones y colaboradores. Editar una versión publicada crea una nueva versión en
   borrador; al publicarla, la anterior pasa a 'archivado' (sustitución). 'retirado' saca el módulo del catálogo. */
TH.api.modulos = {
  estados: ['borrador', 'en-revision-tecnica', 'en-revision-juridica', 'en-revision-psicosocial', 'aprobado', 'publicado', 'archivado', 'retirado'],
  listar() { return TH.store.get().modulos || []; },
  obtenerVersion(id) { return this.listar().find(m => m.id === id) || null; },
  versiones(moduloId) { return this.listar().filter(m => m.moduloId === moduloId).sort((a, b) => (b.version > a.version ? 1 : -1)); },
  /** Versión publicada de un módulo (la que ven colaboradores y organizaciones). */
  publicado(moduloId) { return this.listar().find(m => m.moduloId === moduloId && m.estado === 'publicado') || null; },
  publicados() { return this.listar().filter(m => m.estado === 'publicado').sort((a, b) => a.orden - b.orden); },
  /** Última versión de cada módulo (para el panel FMA). */
  ultimas() { const map = {}; this.listar().forEach(m => { if (!map[m.moduloId] || m.version > map[m.moduloId].version) map[m.moduloId] = m; }); return Object.values(map).sort((a, b) => a.orden - b.orden); },
  _siguienteVersion(moduloId) { const vs = this.versiones(moduloId); const ultima = vs[0] ? String(vs[0].version) : '0.0'; const p = ultima.split('.'); p[1] = String((parseInt(p[1] || '0', 10) || 0) + 1); return p.join('.'); },
  /** Crea una nueva versión en borrador a partir de la última (o de la publicada). */
  crearVersion(moduloId, nota) {
    if (!TH.auth.tienePermiso('formacion:editar')) return { ok: false, error: 'Sin permiso para editar módulos formativos.' };
    const base = this.publicado(moduloId) || this.versiones(moduloId)[0]; if (!base) return { ok: false, error: 'Módulo no encontrado.' };
    if (this.versiones(moduloId).some(v => !['publicado', 'archivado', 'retirado'].includes(v.estado))) return { ok: false, error: 'Ya existe una versión en edición o revisión para este módulo. Trabaja sobre ella.' };
    const u = TH.auth.usuario(); const version = this._siguienteVersion(moduloId);
    const nueva = JSON.parse(JSON.stringify(base));
    Object.assign(nueva, { id: TH.util.id('modv'), version, estado: 'borrador', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', revisiones: [], fecha: TH.util.hoy(), autor: u ? u.nombre : 'FMA', basadaEn: base.id,
      revision: { fecha: TH.util.hoy(), responsable: u ? u.nombre : 'FMA', estadoPsicosocial: 'pendiente', estadoJuridico: 'pendiente' },
      historial: [{ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Nueva versión ' + version + ' creada a partir de la ' + base.version + (nota ? ' · ' + nota : ''), version }] });
    TH.store.update(s => { s.modulos.push(nueva); TH.api.historial.registrar(s, 'Módulo ' + moduloId + ': versión ' + version + ' creada', 'modulo', nueva.id); }, 'modulo');
    return { ok: true, modulo: nueva };
  },
  /** Edita los campos editables de una versión no publicada. Una versión publicada no se edita: se crea otra. */
  editar(id, datos) {
    if (!TH.auth.tienePermiso('formacion:editar')) return { ok: false, error: 'Sin permiso para editar módulos formativos.' };
    const m = this.obtenerVersion(id); if (!m) return { ok: false, error: 'Versión no encontrada.' };
    if (['publicado', 'archivado', 'retirado'].includes(m.estado)) return { ok: false, error: 'Esta versión está publicada o cerrada. Crea una nueva versión para modificarla.' };
    const u = TH.auth.usuario(); const permitidos = ['titulo', 'resumen', 'duracion', 'objetivos', 'lecciones', 'quiz', 'recursos', 'bibliografia'];
    const errores = {};
    if (datos.bibliografia && datos.bibliografia.some(f => !TH.data.fuentes[f])) errores.bibliografia = 'Hay códigos de fuente no registrados.';
    if (datos.lecciones && (!datos.lecciones.length || datos.lecciones.some(l => !l.titulo || !l.cuerpo || !l.cuerpo.length))) errores.lecciones = 'Cada lección necesita título y al menos un párrafo.';
    if (datos.quiz && datos.quiz.some(q => !q.texto || q.opciones.length < 2 || !q.opciones.some(o => o.id === q.correcta))) errores.quiz = 'Cada pregunta necesita enunciado, al menos dos opciones y una respuesta correcta válida.';
    if (Object.keys(errores).length) return { ok: false, error: 'Revisa los campos marcados.', errores };
    TH.store.update(s => {
      const x = s.modulos.find(z => z.id === id); Object.keys(datos).forEach(k => { if (permitidos.includes(k)) x[k] = datos[k]; });
      x.fecha = TH.util.hoy();
      // Toda edición invalida las revisiones registradas sobre el texto anterior.
      if (['en-revision-tecnica', 'en-revision-juridica', 'en-revision-psicosocial', 'aprobado'].includes(x.estado)) { x.estado = 'borrador'; }
      x.revisionTecnica = 'pendiente'; x.revisionJuridica = 'pendiente'; x.revisionPsicosocial = 'pendiente';
      x.historial.unshift({ fecha: x.fecha, actor: u ? u.nombre : 'FMA', accion: 'Contenido editado; revisiones reiniciadas', version: x.version });
      TH.api.historial.registrar(s, 'Módulo ' + x.moduloId + ' v' + x.version + ' editado', 'modulo', id);
    }, 'modulo');
    return { ok: true };
  },
  /** Transiciones editoriales con permisos (mismo esquema que los contenidos). */
  cambiarEstado(id, nuevoEstado, nota) {
    const u = TH.auth.usuario(); let error = null;
    const permisoNecesario = { 'en-revision-tecnica': 'formacion:editar', 'en-revision-juridica': 'formacion:revisar-tecnica', 'en-revision-psicosocial': 'formacion:revisar-tecnica', aprobado: 'formacion:aprobar', publicado: 'formacion:publicar', retirado: 'formacion:publicar', archivado: 'formacion:publicar', borrador: 'formacion:editar' }[nuevoEstado];
    if (!permisoNecesario) return { ok: false, error: 'Estado no válido.' };
    if (!TH.auth.tienePermiso(permisoNecesario)) return { ok: false, error: 'No tienes permiso para esta transición (' + permisoNecesario + ').' };
    TH.store.update(s => {
      const m = s.modulos.find(x => x.id === id); if (!m) { error = 'Versión no encontrada.'; return; }
      if (nuevoEstado === 'aprobado' && (m.revisionTecnica !== 'aprobada' || m.revisionJuridica !== 'aprobada' || m.revisionPsicosocial !== 'aprobada')) { error = 'Para aprobar un módulo deben estar registradas como aprobadas las revisiones técnica, jurídica y psicosocial por las personas autorizadas.'; return; }
      if (nuevoEstado === 'publicado') {
        if (m.estado !== 'aprobado') { error = 'Solo puede publicarse una versión en estado "aprobado".'; return; }
        s.modulos.forEach(x => { if (x.moduloId === m.moduloId && x.id !== m.id && x.estado === 'publicado') { x.estado = 'archivado'; x.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Archivada: sustituida por la versión ' + m.version, version: x.version }); } });
        m.publicacion = { fecha: TH.util.hoy(), por: u ? u.nombre : 'FMA' };
      }
      if (nuevoEstado === 'retirado' && m.estado !== 'publicado') { error = 'Solo puede retirarse una versión publicada.'; return; }
      m.estado = nuevoEstado;
      m.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Cambio de estado a: ' + TH.util.nombreCatalogo(TH.data.catalogos.estadosModulo, nuevoEstado) + (nota ? ' · ' + nota : ''), version: m.version });
      TH.api.historial.registrar(s, 'Módulo ' + m.moduloId + ' v' + m.version + ' → ' + nuevoEstado, 'modulo', id, nota || null);
    }, 'modulo');
    return error ? { ok: false, error } : { ok: true };
  },
  /** Revisión registrada por la persona autorizada. tipo: tecnica | juridica | psicosocial. Nunca automática. */
  registrarRevision(id, tipo, resultado, observaciones) {
    const permiso = { tecnica: 'formacion:revisar-tecnica', juridica: 'formacion:revisar-juridica', psicosocial: 'formacion:revisar-psicosocial' }[tipo];
    if (!permiso || !TH.auth.tienePermiso(permiso)) return { ok: false, error: 'Esta revisión solo puede registrarla la persona autorizada para la revisión ' + tipo + '.' };
    const u = TH.auth.usuario(); let error = null;
    TH.store.update(s => {
      const m = s.modulos.find(x => x.id === id); if (!m) { error = 'Versión no encontrada.'; return; }
      if (['publicado', 'archivado', 'retirado'].includes(m.estado)) { error = 'Esta versión ya está publicada o cerrada.'; return; }
      const campo = { tecnica: 'revisionTecnica', juridica: 'revisionJuridica', psicosocial: 'revisionPsicosocial' }[tipo];
      m[campo] = resultado; m.revisiones = m.revisiones || [];
      m.revisiones.push({ tipo, resultado, observaciones: (observaciones || '').trim(), revisor: u ? u.nombre : '', revisorId: u ? u.id : null, fecha: new Date().toISOString(), version: m.version });
      if (m.revision) { if (tipo === 'juridica') m.revision.estadoJuridico = resultado; if (tipo === 'psicosocial') m.revision.estadoPsicosocial = resultado; }
      if (resultado === 'cambios-requeridos') m.estado = 'borrador'; else if (m.estado === 'borrador' && tipo === 'tecnica') m.estado = 'en-revision-tecnica';
      m.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Revisión ' + tipo + ': ' + TH.util.nombreCatalogo(TH.data.catalogos.estadosRevision, resultado), version: m.version });
      TH.api.historial.registrar(s, 'Módulo ' + m.moduloId + ' v' + m.version + ': revisión ' + tipo + ' ' + resultado, 'modulo', id);
    }, 'modulo');
    return error ? { ok: false, error } : { ok: true };
  }
};

/* ---------- Documentos jurídicos: aviso transitorio de registro, condiciones de uso y tratamiento de datos ----------
   Versionados. Solo una versión 'publicado' por tipo. La aprobación (validación) la registra únicamente la persona con
   'documentos:aprobar' (perfil jurídico); la publicación, quien tiene 'documentos:publicar'.
   Base de información y autorización para registrar datos personales (orden de preferencia):
     1. política de tratamiento de datos publicada (definitiva);
     2. aviso de registro publicado (transitorio, validado por la FMA);
     3. solo en desarrollo (nunca cuando exigirPublicado = true): el aviso preparado sin validar, para datos ficticios.
   Las condiciones de uso se aceptan únicamente cuando existe una versión publicada; nunca se exige aceptar borradores. */
TH.api.documentosLegales = {
  tipos: ['aviso-registro', 'condiciones-uso', 'tratamiento-datos'],
  /** true en el servidor: solo cuenta lo publicado. El cliente en producción también lo exige (TH.config.esRemoto). */
  exigirPublicado: false,
  listar() { return TH.store.get().documentosLegales || []; },
  obtener(id) { return this.listar().find(d => d.id === id) || null; },
  publicado(tipo) { return this.listar().find(d => d.tipo === tipo && d.estado === 'publicado') || null; },
  ultima(tipo) { return this.listar().filter(d => d.tipo === tipo).sort((a, b) => (b.fecha > a.fecha ? 1 : (b.fecha < a.fecha ? -1 : (b.id > a.id ? 1 : -1))))[0] || null; },
  /** Versión que se muestra en las páginas públicas: la publicada; si no hay, la más reciente con aviso de borrador. */
  vigenteOUltima(tipo) { return this.publicado(tipo) || this.ultima(tipo); },
  /** Base de información y autorización con la que se registra hoy: { documento, origen: 'politica' | 'aviso' | 'aviso-preparado' } o null. */
  baseRegistro() {
    const pol = this.publicado('tratamiento-datos'); if (pol) return { documento: pol, origen: 'politica' };
    const av = this.publicado('aviso-registro'); if (av) return { documento: av, origen: 'aviso' };
    if (this.exigirPublicado || TH.config.esRemoto) return null;
    const prep = this.ultima('aviso-registro'); return prep ? { documento: prep, origen: 'aviso-preparado' } : null;
  },
  /** ¿Puede registrarse una organización o activarse una invitación? Requiere una base de información (no las políticas definitivas). */
  registroHabilitado() { return !!this.baseRegistro(); },
  versionesVigentes() { const r = {}; this.tipos.forEach(t => { const d = this.publicado(t); if (d) r[t] = { id: d.id, version: d.version, fechaPublicacion: d.publicacion && d.publicacion.fecha }; }); return r; },
  /** Comprueba que los identificadores enviados por el formulario corresponden a las versiones con las que se registra hoy (evita aceptar una versión sustituida mientras el formulario estaba abierto). */
  verificarVersiones(datos) {
    const base = this.baseRegistro(); const cond = this.publicado('condiciones-uso');
    if (base && datos.documentoDatosId && datos.documentoDatosId !== base.documento.id) return { ok: false, codigo: 'VERSION_DOCUMENTO', error: 'La versión del aviso de información cambió mientras completabas el formulario. Recarga la página y revisa la versión vigente.', errores: { aceptaDatos: 'Versión actualizada: vuelve a leer y autorizar.' } };
    if (cond && datos.documentoCondicionesId && datos.documentoCondicionesId !== cond.id) return { ok: false, codigo: 'VERSION_DOCUMENTO', error: 'Las condiciones de uso cambiaron mientras completabas el formulario. Recarga la página y revisa la versión vigente.', errores: { aceptaCondiciones: 'Versión actualizada: vuelve a leer y aceptar.' } };
    return null;
  },
  /** Consentimientos que se registran al aceptar: documento base (aviso o política) y, si está publicada, condiciones de uso. Cada uno con identificador, versión, fecha y si es transitorio/validado. */
  consentimientosParaRegistro() {
    const ahora = new Date().toISOString(); const base = this.baseRegistro(); const lista = [];
    if (base) lista.push({ tipo: base.documento.tipo, documentoId: base.documento.id, version: base.documento.version, fecha: ahora, modo: 'aceptacion', transitorio: base.origen !== 'politica', validado: base.documento.estado === 'publicado' });
    const cond = this.publicado('condiciones-uso'); if (cond) lista.push({ tipo: 'condiciones-uso', documentoId: cond.id, version: cond.version, fecha: ahora, modo: 'aceptacion', transitorio: false, validado: true });
    return lista;
  },
  /** Documentos publicados que una persona registrada aún no ha aceptado o conocido. Devuelve [{ documento, requiereAutorizacion }]. */
  pendientesAceptacion(usuario) {
    if (!usuario || !['organizacion', 'colaborador'].includes(usuario.rol)) return [];
    const cons = usuario.consentimientos || [];
    return ['tratamiento-datos', 'condiciones-uso'].map(t => this.publicado(t)).filter(Boolean)
      .filter(d => !cons.some(c => c.documentoId === d.id))
      .map(d => ({ documento: d, requiereAutorizacion: !!(d.publicacion && d.publicacion.requiereNuevaAutorizacion) }));
  },
  /** La persona con sesión acepta (o se da por informada de) una versión publicada. Se añade al historial de consentimientos; nunca se reescriben aceptaciones anteriores. */
  registrarAceptacion(documentoId, modo) {
    const u = TH.auth.usuario(); if (!u) return { ok: false, error: 'Sin sesión.' };
    const d = this.obtener(documentoId); if (!d || d.estado !== 'publicado') return { ok: false, error: 'Solo puede aceptarse una versión publicada.' };
    const pend = this.pendientesAceptacion(u).find(p => p.documento.id === documentoId); if (!pend) return { ok: false, error: 'Esta versión ya está registrada para tu cuenta.' };
    if (pend.requiereAutorizacion && modo !== 'aceptacion') return { ok: false, error: 'Esta versión requiere tu autorización expresa.' };
    const entrada = { tipo: d.tipo, documentoId: d.id, version: d.version, fecha: new Date().toISOString(), modo: pend.requiereAutorizacion ? 'aceptacion' : (modo || 'informado'), transitorio: false, validado: true };
    TH.store.update(s => { const x = s.usuarios.find(z => z.id === u.id); if (!x) return; x.consentimientos = (x.consentimientos || []).concat([entrada]); TH.api.historial.registrar(s, 'Documento jurídico ' + d.tipo + ' ' + d.version + ': ' + entrada.modo, 'documento-legal', d.id); }, 'consentimiento');
    return { ok: true, consentimiento: entrada, usuario: TH.store.get().usuarios.find(z => z.id === u.id) };
  },
  /** Cuántas personas registradas han aceptado/conocido una versión y cuántas siguen pendientes (para la administración). */
  estadisticasAceptacion(documentoId) {
    const d = this.obtener(documentoId); const us = (TH.store.get().usuarios || []).filter(u => ['organizacion', 'colaborador'].includes(u.rol));
    const con = us.filter(u => (u.consentimientos || []).some(c => c.documentoId === documentoId));
    return { registradas: us.length, aceptaciones: con.length, pendientes: d && d.estado === 'publicado' ? us.length - con.length : 0 };
  },
  crearVersion(tipo, datos) {
    if (!TH.auth.tienePermiso('documentos:editar')) return { ok: false, error: 'Sin permiso para editar documentos jurídicos.' };
    if (!this.tipos.includes(tipo)) return { ok: false, error: 'Tipo de documento no válido.' };
    if (this.listar().some(d => d.tipo === tipo && ['borrador', 'en-revision-juridica', 'aprobado'].includes(d.estado))) return { ok: false, error: 'Ya hay una versión de este documento en edición, revisión o aprobada sin publicar.' };
    const base = this.vigenteOUltima(tipo); const u = TH.auth.usuario();
    const n = this.listar().filter(d => d.tipo === tipo).length + 1;
    const doc = { id: TH.util.id('doc'), tipo, version: (datos && datos.version) || (TH.util.hoy().slice(0, 7) + '-v' + n), titulo: (datos && datos.titulo) || (base ? base.titulo : ''), estado: 'borrador', autor: u ? u.nombre : 'FMA', fecha: TH.util.hoy(), aprobacion: null, publicacion: null, secciones: (datos && datos.secciones) || (base ? JSON.parse(JSON.stringify(base.secciones)) : []), historial: [{ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Nueva versión creada' + (base ? ' a partir de ' + base.version : ''), version: (datos && datos.version) || '' }] };
    TH.store.update(s => { s.documentosLegales.push(doc); TH.api.historial.registrar(s, 'Documento jurídico ' + tipo + ': versión creada', 'documento-legal', doc.id); }, 'documento');
    return { ok: true, documento: doc };
  },
  editar(id, datos) {
    if (!TH.auth.tienePermiso('documentos:editar')) return { ok: false, error: 'Sin permiso para editar documentos jurídicos.' };
    const d = this.obtener(id); if (!d) return { ok: false, error: 'Documento no encontrado.' };
    if (!['borrador', 'en-revision-juridica'].includes(d.estado)) return { ok: false, error: 'Solo se editan versiones en borrador o en revisión; una versión aprobada o publicada no cambia (crea otra).' };
    const u = TH.auth.usuario();
    TH.store.update(s => { const x = s.documentosLegales.find(z => z.id === id); if (datos.titulo) x.titulo = datos.titulo; if (datos.version) x.version = datos.version; if (datos.secciones) x.secciones = datos.secciones; x.fecha = TH.util.hoy(); x.estado = 'borrador'; x.aprobacion = null; x.historial.unshift({ fecha: x.fecha, actor: u ? u.nombre : 'FMA', accion: 'Texto editado; vuelve a borrador', version: x.version }); TH.api.historial.registrar(s, 'Documento jurídico editado', 'documento-legal', id); }, 'documento');
    return { ok: true };
  },
  enviarARevision(id) {
    if (!TH.auth.tienePermiso('documentos:editar')) return { ok: false, error: 'Sin permiso.' };
    const u = TH.auth.usuario(); let error = null;
    TH.store.update(s => { const x = s.documentosLegales.find(z => z.id === id); if (!x) { error = 'No encontrado.'; return; } if (x.estado !== 'borrador') { error = 'Solo un borrador puede enviarse a revisión jurídica.'; return; } x.estado = 'en-revision-juridica'; x.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Enviado a revisión jurídica', version: x.version }); TH.api.historial.registrar(s, 'Documento jurídico → revisión jurídica', 'documento-legal', id); }, 'documento');
    return error ? { ok: false, error } : { ok: true };
  },
  /** Aprobación jurídica: solo quien tiene 'documentos:aprobar'. Queda registrada con nombre, fecha y versión. */
  aprobar(id, resultado, nota) {
    if (!TH.auth.tienePermiso('documentos:aprobar')) return { ok: false, error: 'La aprobación jurídica solo puede registrarla la persona autorizada (permiso documentos:aprobar).' };
    const u = TH.auth.usuario(); let error = null;
    TH.store.update(s => {
      const x = s.documentosLegales.find(z => z.id === id); if (!x) { error = 'No encontrado.'; return; }
      if (!['en-revision-juridica', 'borrador'].includes(x.estado)) { error = 'Esta versión no está en revisión.'; return; }
      if (resultado === 'aprobada') { x.estado = 'aprobado'; x.aprobacion = { por: u ? u.nombre : '', porId: u ? u.id : null, fecha: new Date().toISOString(), nota: (nota || '').trim(), version: x.version }; }
      else { x.estado = 'borrador'; x.aprobacion = null; }
      x.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Revisión jurídica: ' + (resultado === 'aprobada' ? 'aprobada' : 'cambios requeridos') + (nota ? ' · ' + nota : ''), version: x.version });
      TH.api.historial.registrar(s, 'Documento jurídico: revisión jurídica ' + resultado, 'documento-legal', id);
    }, 'documento');
    return error ? { ok: false, error } : { ok: true };
  },
  /** Publicación: solo desde 'aprobado'; archiva la versión publicada anterior del mismo tipo. */
  publicar(id, opciones) {
    if (!TH.auth.tienePermiso('documentos:publicar')) return { ok: false, error: 'Sin permiso para publicar documentos jurídicos.' };
    const u = TH.auth.usuario(); let error = null; const o = opciones || {};
    TH.store.update(s => {
      const x = s.documentosLegales.find(z => z.id === id); if (!x) { error = 'No encontrado.'; return; }
      if (x.estado !== 'aprobado' || !x.aprobacion) { error = 'Solo puede publicarse una versión con aprobación jurídica registrada.'; return; }
      s.documentosLegales.forEach(d => { if (d.tipo === x.tipo && d.id !== x.id && d.estado === 'publicado') { d.estado = 'archivado'; d.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Archivada: sustituida por la versión ' + x.version, version: d.version }); } });
      x.estado = 'publicado'; x.publicacion = { fecha: TH.util.hoy(), por: u ? u.nombre : 'FMA', requiereNuevaAutorizacion: x.tipo !== 'aviso-registro' && !!o.requiereNuevaAutorizacion, nota: (o.nota || '').trim() };
      x.historial.unshift({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', accion: 'Publicada' + (x.publicacion.requiereNuevaAutorizacion ? ' · requiere nueva autorización de las personas registradas' : (x.tipo !== 'aviso-registro' ? ' · se informa a las personas registradas' : '')), version: x.version });
      TH.api.historial.registrar(s, 'Documento jurídico publicado: ' + x.tipo + ' ' + x.version, 'documento-legal', id);
    }, 'documento');
    return error ? { ok: false, error } : { ok: true };
  }
};
