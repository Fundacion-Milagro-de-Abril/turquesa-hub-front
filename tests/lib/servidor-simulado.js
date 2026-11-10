/* Servidor simulado de la API (docs/API_CONTRACT.md) para pruebas de integración del frontend en modo producción.
   Implementa cada endpoint sobre una instancia independiente de la capa de dominio de Turquesa Hub (mock-api.js y
   servicios, con datos de prueba), de modo que las reglas de negocio del servidor y del cliente son las mismas que
   deberá implementar el backend real. Autoriza por cookie de sesión (token opaco → usuario), por rol y por
   organización; devuelve las entidades actualizadas con la forma que espera TH.remoto.fusionar.
   NO es un backend: es un doble de pruebas en memoria. */
const { crear } = require('./entorno');

function crearServidorSimulado() {
  const srv = crear({ entorno: 'desarrollo', url: 'http://servidor-simulado.local/' });
  const sesiones = {}; // token → userId
  const llamadas = [];
  let cookieActual = null;
  const listo = srv.listo();
  const TH = () => srv.w.TH;
  /* El servidor solo reconoce bases de información publicadas (aviso transitorio validado o política definitiva); nunca borradores. */
  listo.then(() => { srv.w.TH.api.documentosLegales.exigirPublicado = true; });

  const json = (status, datos) => ({ ok: status < 400, status, headers: { get: () => null }, json: async () => datos });
  const error = (status, codigo, mensaje, campos) => json(status, { error: { codigo, mensaje, campos } });
  const st = () => TH().store.get();
  const sinCred = (u) => { if (!u) return u; const c = Object.assign({}, u); delete c.credencial; delete c.cuentaDePrueba; return c; };
  const orgData = (orgId) => ({ organizacion: st().organizaciones.find(o => o.id === orgId) || null, usuarios: st().usuarios.filter(u => u.orgId === orgId).map(sinCred) });

  function resultado(r, extra) {
    if (!r || r.ok === false) { const status = /permiso|autorizad/i.test(r.error || '') ? 403 : /no encontrad|no existe/i.test(r.error || '') ? 404 : /ya existe/i.test(r.error || '') ? 409 : 400; return error(status, status === 403 ? 'PROHIBIDO' : status === 404 ? 'NO_ENCONTRADO' : status === 409 ? 'DUPLICADO' : 'VALIDACION', r.error, r.errores); }
    return json(200, Object.assign({}, r, extra || {}));
  }

  async function manejar(metodo, ruta, cuerpo, token) {
    const T = TH(); const api = T.api; const m = metodo.toUpperCase();
    const [path, qs] = ruta.split('?'); const query = {}; (qs || '').split('&').filter(Boolean).forEach(p => { const [k, v] = p.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
    const seg = path.split('/').filter(Boolean);
    const s = token && sesiones[token] ? (T.auth._sesionDePrueba(sesiones[token]), T.auth.sesion()) : null;
    const fin = () => T.auth._limpiarSesion();
    try {
      /* ---------- Público ---------- */
      if (m === 'GET' && path === '/configuracion/publica') return json(200, { documentosLegales: st().documentosLegales.filter(d => d.estado === 'publicado'), configuracion: { contactoSello: (st().configuracion || {}).contactoSello || '', diasInvitacion: (st().configuracion || {}).diasInvitacion || 30 } });
      if (m === 'POST' && path === '/auth/login') {
        return await T.authAdaptadores.local.ingresar(cuerpo.email, cuerpo.clave).then(r => {
          if (!r.ok) { T.auth._limpiarSesion(); return error(r.codigo === 'CORREO_NO_VERIFICADO' ? 403 : /suspendid/i.test(r.error) ? 403 : 401, r.codigo || 'CREDENCIALES', r.error); }
          const tok = 'tok-' + Math.random().toString(36).slice(2); sesiones[tok] = r.usuario.id; cookieActual = tok; T.auth._limpiarSesion();
          return json(200, { usuario: sinCred(r.usuario) });
        });
      }
      if (m === 'POST' && path === '/auth/logout') { if (token) delete sesiones[token]; cookieActual = null; return json(204, {}); }
      if (m === 'GET' && path === '/auth/me') { if (!s) return error(401, 'NO_AUTORIZADO', 'Sin sesión.'); return json(200, { usuario: sinCred(st().usuarios.find(u => u.id === s.userId)) }); }
      if (m === 'POST' && path === '/organizaciones') {
        return await T.authAdaptadores.local.registrarOrganizacion(cuerpo).then(r => {
          if (!r.ok) return error(r.codigo === 'INFORMACION_NO_PUBLICADA' ? 409 : r.errores ? 400 : 409, r.codigo || (r.errores ? 'VALIDACION' : 'DUPLICADO'), r.error, r.errores);
          T.store.update(x => { const u = x.usuarios.find(z => z.id === r.usuario.id); u.correoVerificado = false; u.estado = 'pendiente-verificacion'; u.tokenVerificacion = 'verif-' + u.id; }, 'test');
          return json(201, { usuario: { id: r.usuario.id }, org: { id: r.org.id }, verificacion: 'pendiente' });
        });
      }
      if (m === 'POST' && path === '/auth/verificacion/solicitar') return json(200, {});
      if (m === 'POST' && path === '/auth/verificacion/confirmar') { let okv = false; T.store.update(x => { const u = x.usuarios.find(z => z.tokenVerificacion === cuerpo.token); if (u) { u.correoVerificado = true; u.estado = 'activo'; delete u.tokenVerificacion; okv = true; } }, 'test'); return okv ? json(200, {}) : error(400, 'VALIDACION', 'Token inválido o caducado.'); }
      if (m === 'POST' && path === '/auth/recuperacion/solicitar') return json(200, {});
      if (m === 'POST' && path === '/auth/recuperacion/restablecer') return error(400, 'VALIDACION', 'Token inválido o caducado.');
      if (m === 'POST' && path === '/auth/invitaciones/activar') {
        return await T.authAdaptadores.local.activarInvitacion(cuerpo.codigo, cuerpo).then(r => { if (!r.ok) return error(r.codigo === 'INFORMACION_NO_PUBLICADA' || /ya existe/i.test(r.error) ? 409 : 400, r.codigo || (/ya existe/i.test(r.error) ? 'DUPLICADO' : 'VALIDACION'), r.error, r.errores); const tok = 'tok-' + Math.random().toString(36).slice(2); sesiones[tok] = r.usuario.id; cookieActual = tok; return json(201, { usuario: sinCred(r.usuario) }); });
      }
      if (m === 'POST' && path === '/sello/intereses') { const r = api.sello._local_manifestarInteres ? api.sello._local_manifestarInteres(cuerpo) : api.sello.manifestarInteres(cuerpo); return await Promise.resolve(r).then(x => { if (!x.ok) return error(400, 'VALIDACION', x.error); T.store.update(y => { const i = y.interesesSello.find(z => z.id === x.interes.id); i.estado = 'recibida'; if (s && s.orgId) i.orgId = s.orgId; }, 'test'); return json(201, { id: x.interes.id, interes: st().interesesSello.find(z => z.id === x.interes.id) }); }); }
      if (m === 'GET' && path === '/contenidos') return json(200, { contenidos: api.contenidos.visibles(query.publico || 'organizacion') });
      if (m === 'GET' && path === '/modulos') return json(200, { modulos: api.modulos.publicados() });
      if (m === 'GET' && path === '/fuentes') return json(200, { fuentes: T.data.fuentes });
      if (!s) return error(401, 'NO_AUTORIZADO', 'Sin sesión.');
      if (m === 'POST' && path === '/auth/clave') return await T.authAdaptadores.local.cambiarClave(cuerpo.actual, cuerpo.nueva).then(resultado);
      if (m === 'POST' && seg[0] === 'documentos-legales' && seg[2] === 'aceptacion') { const r = api.documentosLegales.registrarAceptacion(seg[1], cuerpo.modo); return resultado(r.ok ? { ok: true, consentimiento: r.consentimiento, usuario: sinCred(r.usuario) } : r); }

      /* ---------- Organización (rol organizacion; orgId de la sesión, nunca del cliente) ---------- */
      if (seg[0] === 'organizaciones' && seg[1] === 'mia') {
        if (s.rol !== 'organizacion') return error(403, 'PROHIBIDO', 'Solo organizaciones.');
        const orgId = s.orgId; const resto = seg.slice(2);
        if (m === 'GET' && resto.length === 0) return json(200, Object.assign(orgData(orgId), { resumen: api.organizaciones.resumen(orgId) }));
        if (m === 'PATCH' && resto.length === 0) { const r = api.organizaciones.actualizar(orgId, cuerpo); return resultado(r, orgData(orgId)); }
        if (m === 'PATCH' && resto[0] === 'onboarding') { api.organizaciones.marcarOnboarding(orgId, cuerpo.paso); return json(200, orgData(orgId)); }
        if (m === 'GET' && resto[0] === 'exportacion') return json(200, { organizacion: orgData(orgId).organizacion, diagnostico: api.diagnostico.obtener(orgId), plan: api.plan.obtener(orgId), evidencias: api.evidencias.listar(orgId) });
        if (resto[0] === 'diagnostico') {
          const d = () => ({ diagnostico: api.diagnostico.obtener(orgId), diagnosticosArchivados: (st().diagnosticosArchivados || []).filter(x => x.orgId === orgId) });
          if (m === 'GET' && resto.length === 1) return api.diagnostico.obtener(orgId) ? json(200, d()) : error(404, 'NO_ENCONTRADO', 'Sin diagnóstico.');
          if (m === 'POST' && resto.length === 1) { const r = cuerpo.nuevoCiclo ? api.diagnostico.reiniciar(orgId) : api.diagnostico.iniciar(orgId); return resultado(r, d()); }
          if (m === 'PUT' && resto[1] === 'respuestas') { const r = api.diagnostico.responder(orgId, resto[2], cuerpo.opcion, cuerpo.justificacion); return resultado(r, d()); }
          if (m === 'POST' && resto[1] === 'finalizar') { const r = api.diagnostico.finalizar(orgId); return resultado(r, d()); }
        }
        if (resto[0] === 'plan') {
          const p = () => ({ plan: api.plan.obtener(orgId) });
          if (m === 'GET' && resto.length === 1) { api.plan.actualizarVencidas(orgId); return api.plan.obtener(orgId) ? json(200, p()) : error(404, 'NO_ENCONTRADO', 'Sin plan.'); }
          if (m === 'GET' && resto[1] === 'sugeridas') { const dg = api.diagnostico.obtener(orgId); return json(200, { sugeridas: dg ? api.plan.generarSugeridas(dg) : [] }); }
          if (m === 'POST' && resto.length === 1) { if (api.plan.obtener(orgId)) return error(409, 'DUPLICADO', 'La organización ya tiene un plan.'); const r = api.plan.crearDesdeDiagnostico(orgId, cuerpo.seleccion); return resultado(r, p()); }
          if (m === 'POST' && resto[1] === 'incorporar') { const r = api.plan.incorporarSugeridas(orgId, cuerpo.seleccion); return resultado(r, p()); }
          if (m === 'POST' && resto[1] === 'acciones') { const r = api.plan.agregarAccion(orgId, cuerpo); return resultado(r, p()); }
          if ((m === 'PATCH' || m === 'DELETE') && resto[1] === 'acciones') {
            const plan = api.plan.obtener(orgId); if (!plan || !plan.acciones.some(a => a.id === resto[2])) return error(404, 'NO_ENCONTRADO', 'La acción no existe o no pertenece a tu organización.');
            if (m === 'PATCH') { const r = api.plan.actualizarAccion(orgId, resto[2], cuerpo); return resultado(r, p()); }
            api.plan.eliminarAccion(orgId, resto[2]); return json(200, Object.assign(p(), { evidencias: api.evidencias.listar(orgId), orgId }));
          }
        }
        if (resto[0] === 'evidencias') {
          if (m === 'GET') return json(200, { evidencias: api.evidencias.listar(orgId), orgId });
          if (m === 'POST') {
            const fd = cuerpo; const get = k => (fd && typeof fd.get === 'function') ? fd.get(k) : (fd || {})[k]; const archivo = get('archivo');
            const plan = api.plan.obtener(orgId); if (get('accionId') && (!plan || !plan.acciones.some(a => a.id === get('accionId')))) return error(404, 'NO_ENCONTRADO', 'La acción no existe o no pertenece a tu organización.');
            const r = api.evidencias.registrar(orgId, { accionId: get('accionId') || null, preguntaId: get('preguntaId') || null, nombre: get('nombre'), tipo: get('tipo'), descripcion: get('descripcion') || '', archivo: archivo ? { nombre: archivo.name, tamano: archivo.size, mime: archivo.type } : null });
            if (r.ok && archivo) T.store.update(x => { const e = x.evidencias.find(z => z.id === r.evidencia.id); e.archivo.estado = 'cargado'; e.archivo.clave = 'evidencias/' + orgId + '/' + e.id; }, 'test');
            return resultado(r, { evidencia: st().evidencias.find(z => r.evidencia && z.id === r.evidencia.id) });
          }
          if (m === 'DELETE') { if (!api.evidencias.listar(orgId).some(e => e.id === resto[1])) return error(404, 'NO_ENCONTRADO', 'Evidencia no encontrada.'); api.evidencias.eliminar(orgId, resto[1]); return json(200, { evidencias: api.evidencias.listar(orgId), orgId }); }
        }
        if (resto[0] === 'invitaciones') {
          const inv = () => ({ invitaciones: api.invitaciones.listar(orgId), orgId });
          if (m === 'GET') return json(200, inv());
          if (m === 'POST' && resto.length === 1) { const r = api.invitaciones.crear(orgId, cuerpo); return resultado(r, inv()); }
          const i = api.invitaciones.listar(orgId).find(x => x.id === resto[1]); if (!i) return error(404, 'NO_ENCONTRADO', 'Invitación no encontrada.');
          if (m === 'POST' && resto[2] === 'reenviar') { api.invitaciones.reenviar(i.id); return json(200, inv()); }
          if (m === 'PATCH' && resto[2] === 'modulos') { api.invitaciones.asignarModulos(i.id, cuerpo.modulos); return json(200, inv()); }
          if (m === 'POST' && resto[2] === 'anular') { api.invitaciones.anular(i.id); return json(200, inv()); }
        }
        if (resto[0] === 'colaboradores') {
          const col = () => ({ usuarios: st().usuarios.filter(u => u.orgId === orgId).map(sinCred), invitaciones: api.invitaciones.listar(orgId), progresos: st().progresoFormativo.filter(p => p.orgId === orgId).map(p => Object.assign({}, p, { respuestasQuiz: {} })), orgId });
          if (m === 'GET' && resto.length === 1) return json(200, col());
          const u = st().usuarios.find(x => x.id === resto[1] && x.orgId === orgId); if (!u) return error(404, 'NO_ENCONTRADO', 'Colaborador no encontrado.');
          if (m === 'PATCH' && resto[2] === 'modulos') { api.formacion.asignarModulosUsuario(u.id, cuerpo.modulos); return json(200, col()); }
          if (m === 'POST' && resto[2] === 'desvincular') { api.invitaciones.desvincular(orgId, u.id); return json(200, col()); }
        }
        if (resto[0] === 'usuarios' && m === 'PATCH') { const u = st().usuarios.find(x => x.id === resto[1] && x.orgId === orgId); if (!u) return error(404, 'NO_ENCONTRADO', 'Usuario no encontrado.'); api.usuarios.actualizar(u.id, { nombre: cuerpo.nombre, area: cuerpo.area, cargo: cuerpo.cargo, telefono: cuerpo.telefono }); return json(200, orgData(orgId)); }
        if (resto[0] === 'sello' && resto[1] === 'intereses' && m === 'GET') return json(200, { intereses: api.sello.interesesDeOrganizacion(orgId) });
        if (resto[0] === 'reporte' && m === 'GET') return json(200, { reporte: api.reportes.organizacion(orgId) });
      }

      /* ---------- Colaborador ---------- */
      if (seg[0] === 'colaboradores' && seg[1] === 'mi') {
        if (s.rol !== 'colaborador') return error(403, 'PROHIBIDO', 'Solo colaboradores.');
        const u = st().usuarios.find(x => x.id === s.userId); const resto = seg.slice(2);
        if (m === 'GET' && resto.length === 0) return json(200, { usuario: sinCred(u), organizacion: st().organizaciones.find(o => o.id === u.orgId) || null, invitaciones: st().invitaciones.filter(i => i.userId === u.id), orgId: u.orgId });
        if (m === 'PATCH' && resto.length === 0) { api.usuarios.actualizar(u.id, { nombre: cuerpo.nombre, area: cuerpo.area }); return json(200, { usuario: sinCred(st().usuarios.find(x => x.id === u.id)) }); }
        if (m === 'GET' && resto[0] === 'modulos') return json(200, { modulos: api.modulos.publicados(), progresos: st().progresoFormativo.filter(p => p.userId === u.id), userId: u.id, invitaciones: st().invitaciones.filter(i => i.userId === u.id) });
        if (resto[0] === 'progreso') {
          const mod = resto[1]; if (!api.formacion.asignados(u.id).some(x => x.id === mod)) return error(403, 'PROHIBIDO', 'Este módulo no está asignado a tu perfil.');
          const pr = () => ({ progreso: api.formacion.progreso(u.id, mod) });
          if (m === 'POST' && resto.length === 2) { api.formacion.iniciar(u.id, u.orgId, mod); return json(200, pr()); }
          if (m === 'POST' && resto[2] === 'lecciones') { const r = api.formacion.marcarLeccion(u.id, mod, resto[3]); return resultado(r, pr()); }
          if (m === 'PUT' && resto[2] === 'respuestas') { const r = api.formacion.responderQuiz(u.id, mod, resto[3], cuerpo.opcion); return resultado(r, pr()); }
          if (m === 'POST' && resto[2] === 'finalizar') { const r = api.formacion.finalizar(u.id, mod); return resultado(r, pr()); }
          if (m === 'POST' && resto[2] === 'reintentar') { api.formacion.reintentar(u.id, mod); return json(200, pr()); }
        }
      }

      /* ---------- Administración FMA ---------- */
      if (seg[0] === 'admin') {
        if (s.rol !== 'fma') return error(403, 'PROHIBIDO', 'Solo personal de la Fundación.');
        const tiene = p => T.auth.tienePermiso(p); const resto = seg.slice(1);
        const colecciones = { organizaciones: () => ({ organizaciones: st().organizaciones, usuarios: st().usuarios.filter(u => u.rol !== 'fma').map(sinCred) }), usuarios: () => ({ usuarios: st().usuarios.map(sinCred) }), diagnosticos: () => ({ diagnosticos: st().diagnosticos, diagnosticosArchivados: st().diagnosticosArchivados || [] }), planes: () => ({ planes: st().planes }), evidencias: () => ({ evidencias: st().evidencias }), invitaciones: () => ({ invitaciones: st().invitaciones }), progreso: () => ({ progresos: st().progresoFormativo.map(p => Object.assign({}, p, { respuestasQuiz: {} })), participacionAgregada: st().participacionAgregada }), contenidos: () => ({ contenidos: st().contenidos }), modulos: () => ({ modulos: st().modulos }), 'documentos-legales': () => ({ documentosLegales: st().documentosLegales }), auditoria: () => ({ historial: st().historial }), configuracion: () => ({ configuracion: st().configuracion, instrumentoVersiones: st().instrumentoVersiones }) };
        if (m === 'GET' && resto.length === 1 && colecciones[resto[0]]) return json(200, colecciones[resto[0]]());
        if (m === 'GET' && resto[0] === 'sello' && resto[1] === 'intereses') return json(200, { intereses: st().interesesSello });
        if (m === 'GET' && resto[0] === 'instrumento' && resto[1] === 'versiones') return json(200, { instrumentoVersiones: st().instrumentoVersiones, instrumento: { alcance: (st().configuracion || {}).instrumentoAlcance || {} } });
        if (resto[0] === 'organizaciones' && m === 'POST' && resto[2] === 'estado') { if (!tiene('*')) return error(403, 'PROHIBIDO', 'Sin permiso.'); const r = api.organizaciones.cambiarEstado(resto[1], cuerpo.estado, cuerpo.motivo); return resultado(r, { organizacion: st().organizaciones.find(o => o.id === resto[1]) }); }
        if (resto[0] === 'usuarios' && m === 'POST') { const r = api.usuarios.crearInterno(cuerpo); return resultado(r, r.ok ? { usuario: sinCred(r.usuario) } : {}); }
        if (resto[0] === 'usuarios' && m === 'PATCH') { if (!tiene('usuarios:gestionar')) return error(403, 'PROHIBIDO', 'Sin permiso.'); if (resto[1] === s.userId && cuerpo.permisos) return error(400, 'VALIDACION', 'No puedes modificar tus propios permisos.'); api.usuarios.actualizar(resto[1], cuerpo); return json(200, { usuario: sinCred(st().usuarios.find(u => u.id === resto[1])) }); }
        if (resto[0] === 'contenidos') {
          const c = id => ({ contenido: api.contenidos.obtener(id) });
          if (m === 'POST' && resto.length === 1) { const r = api.contenidos.crear(cuerpo); return resultado(r, r.ok ? c(r.contenido.id) : {}); }
          if (m === 'PUT') { const r = api.contenidos.editar(resto[1], cuerpo); return resultado(r, c(resto[1])); }
          if (m === 'POST' && resto[2] === 'estado') { const r = api.contenidos.cambiarEstado(resto[1], cuerpo.estado, cuerpo.nota); return resultado(r, c(resto[1])); }
          if (m === 'POST' && resto[2] === 'revisiones') { const r = api.contenidos.registrarRevision(resto[1], cuerpo.tipo, cuerpo.resultado, cuerpo.observaciones); return resultado(r, c(resto[1])); }
        }
        if (resto[0] === 'modulos') {
          const mods = () => ({ modulos: st().modulos });
          if (m === 'POST' && resto[2] === 'versiones') { const r = api.modulos.crearVersion(resto[1], cuerpo.nota); return resultado(r, mods()); }
          if (resto[1] === 'versiones') {
            if (m === 'PUT') { const r = api.modulos.editar(resto[2], cuerpo); return resultado(r, mods()); }
            if (m === 'POST' && resto[3] === 'estado') { const r = api.modulos.cambiarEstado(resto[2], cuerpo.estado, cuerpo.nota); return resultado(r, mods()); }
            if (m === 'POST' && resto[3] === 'revisiones') { const r = api.modulos.registrarRevision(resto[2], cuerpo.tipo, cuerpo.resultado, cuerpo.observaciones); return resultado(r, mods()); }
          }
        }
        if (resto[0] === 'documentos-legales') {
          const docs = () => ({ documentosLegales: st().documentosLegales });
          if (m === 'POST' && resto.length === 1) { const r = api.documentosLegales.crearVersion(cuerpo.tipo, cuerpo); return resultado(r, docs()); }
          if (m === 'PUT') { const r = api.documentosLegales.editar(resto[1], cuerpo); return resultado(r, docs()); }
          if (m === 'POST' && resto[2] === 'revision') { const r = api.documentosLegales.enviarARevision(resto[1]); return resultado(r, docs()); }
          if (m === 'POST' && resto[2] === 'aprobacion') { const r = api.documentosLegales.aprobar(resto[1], cuerpo.resultado, cuerpo.nota); return resultado(r, docs()); }
          if (m === 'POST' && resto[2] === 'publicacion') { const r = api.documentosLegales.publicar(resto[1], cuerpo || {}); return resultado(r, docs()); }
        }
        if (resto[0] === 'sello' && resto[1] === 'intereses' && m === 'POST' && resto[3] === 'gestion') { const r = api.sello.gestionarInteres(resto[2], cuerpo.estado, cuerpo.nota); return resultado(r, { intereses: st().interesesSello }); }
        if (resto[0] === 'configuracion' && m === 'PATCH') { if (!tiene('*')) return error(403, 'PROHIBIDO', 'Sin permiso.'); api.configuracion.guardar(cuerpo); return json(200, { configuracion: st().configuracion }); }
        if (resto[0] === 'instrumento' && resto[1] === 'preguntas' && m === 'PATCH') { const r = api.configuracion.cambiarAlcancePregunta(resto[2], cuerpo.alcance); return resultado(r, { instrumento: { alcance: (st().configuracion || {}).instrumentoAlcance || {} } }); }
        if (resto[0] === 'instrumento' && resto[1] === 'versiones' && m === 'POST') { api.configuracion.crearVersionInstrumento(cuerpo.nota); return json(200, { instrumentoVersiones: st().instrumentoVersiones }); }
        if (resto[0] === 'reportes' && m === 'GET') return json(200, { tablero: api.reportes.tableroFMA() });
      }
      return error(404, 'NO_ENCONTRADO', 'Ruta no implementada en el servidor simulado: ' + m + ' ' + path);
    } finally { fin(); }
  }

  /** fetch(url, opts) compatible con TH.http: la cookie de sesión se simula con un token por cliente. */
  async function fetch(url, opts) {
    await listo;
    const o = opts || {}; const metodo = (o.method || 'GET').toUpperCase(); const ruta = String(url).replace(/^https?:\/\/[^/]+/, '').replace(/^\/api\/v1/, '');
    let cuerpo = {}; if (o.body && typeof o.body === 'string') { try { cuerpo = JSON.parse(o.body); } catch (_) { cuerpo = {}; } } else if (o.body) cuerpo = o.body;
    llamadas.push({ metodo, ruta, cuerpo: typeof o.body === 'string' ? cuerpo : (o.body ? '[multipart]' : undefined), credentials: o.credentials });
    if (o.credentials !== 'include') return json(401, { error: { codigo: 'NO_AUTORIZADO', mensaje: 'Petición sin credenciales.' } });
    const r = await manejar(metodo, ruta, cuerpo, cookieActual);
    return r;
  }
  return { fetch, llamadas, sesiones, estado: () => srv.w.TH.store.get(), api: () => srv.w.TH.api, TH: () => srv.w.TH, listo, cerrarSesion: () => { cookieActual = null; } };
}
module.exports = { crearServidorSimulado };
