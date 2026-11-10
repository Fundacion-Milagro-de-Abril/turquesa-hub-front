/* Pruebas de integración · Turquesa Hub 1.0.0-rc4 · entorno de PRODUCCIÓN contra una API simulada.
   El cliente se carga con config/env.produccion.js (sin semilla, adaptador HTTP, sin localStorage) y su `fetch`
   apunta al servidor simulado (tests/lib/servidor-simulado.js), que implementa docs/API_CONTRACT.md sobre la
   misma capa de dominio. Se ejecuta el escenario completo (tests/lib/escenario.js) y se verifica que cada módulo
   se comunica con la API: autenticación por cookie, carga de datos por espacio, mutaciones y respuestas del servidor.
   Ejecutar: node tests/api-simulada.js */
const { crear } = require('./lib/entorno'); const { crearServidorSimulado } = require('./lib/servidor-simulado'); const escenario = require('./lib/escenario');
(async () => {
  const servidor = crearServidorSimulado(); await servidor.listo;
  const h = crear({ entorno: 'produccion', fetch: servidor.fetch }); const TH = await h.listo(); const { w, ok } = h;
  console.log('\n[Servidor · requisitos de información y autorización antes de recoger datos]');
  const cuerpoRegistro = { nombre: 'Intento Directo S.A.S.', tipoIdentificacion: 'NIT', identificacion: '901.000.000-5', sector: 'Comercio', tamano: '11-50', departamento: 'Caldas', municipio: 'Manizales', emailInstitucional: 'info@intento.test', responsable: 'Persona Prueba', cargo: 'gerencia', email: 'persona@intento.test', clave: 'ClaveSegura2026', claveConfirmacion: 'ClaveSegura2026', aceptaDatos: true, documentoDatosId: 'doc-aviso-registro-2026-11-v1' };
  const post = async (ruta, cuerpo) => { const r = await servidor.fetch('/api/v1' + ruta, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) }); return Object.assign({ status: r.status }, await r.json()); };
  let rd = await post('/organizaciones', cuerpoRegistro);
  ok(rd.status === 409 && rd.error && rd.error.codigo === 'INFORMACION_NO_PUBLICADA' && !servidor.estado().organizaciones.some(o => o.nombre === 'Intento Directo S.A.S.'), 'Sin aviso publicado, el servidor rechaza el registro (409 INFORMACION_NO_PUBLICADA) aunque el cliente envíe la autorización: el aviso preparado sin validar no cuenta');
  rd = await post('/auth/invitaciones/activar', { codigo: 'ABCD-1234', nombre: 'X', clave: 'ClaveSegura2026', aceptaDatos: true, documentoDatosId: 'doc-aviso-registro-2026-11-v1' });
  ok(rd.status === 409 && rd.error.codigo === 'INFORMACION_NO_PUBLICADA', 'Sin aviso publicado, el servidor tampoco activa invitaciones');
  const datos = await escenario(h, { remoto: true, estado: servidor.estado });
  rd = await post('/organizaciones', Object.assign({}, cuerpoRegistro, { aceptaDatos: false }));
  ok(rd.status === 400 && rd.error.campos && rd.error.campos.aceptaDatos, 'Con base publicada, el servidor exige la autorización expresa (400 con error de campo)');
  rd = await post('/organizaciones', Object.assign({}, cuerpoRegistro, { documentoDatosId: 'doc-aviso-registro-2026-11-v1' }));
  ok(rd.status === 400 && rd.error.codigo === 'VERSION_DOCUMENTO', 'Autorización referida a una versión sustituida (aviso) cuando ya rige la política definitiva: rechazada (VERSION_DOCUMENTO)');
  console.log('\n[Comunicación con la API]');
  const L = servidor.llamadas; const hubo = (m, re) => L.some(l => l.metodo === m && re.test(l.ruta));
  ok(L.every(l => l.credentials === 'include'), 'Todas las peticiones (' + L.length + ') envían credenciales (cookie de sesión)');
  ok(hubo('POST', /^\/auth\/login$/) && hubo('POST', /^\/auth\/logout$/) && hubo('GET', /^\/auth\/me$/) && hubo('POST', /^\/auth\/clave$/), 'Autenticación: login, logout, me, cambio de contraseña');
  ok(hubo('POST', /^\/organizaciones$/) && hubo('POST', /^\/auth\/verificacion\/confirmar$/) && hubo('POST', /^\/auth\/invitaciones\/activar$/), 'Registro, verificación de correo y activación de invitación por API');
  ok(hubo('GET', /^\/organizaciones\/mia$/) && hubo('PATCH', /^\/organizaciones\/mia$/) && hubo('PATCH', /^\/organizaciones\/mia\/onboarding$/), 'Organizaciones: carga y edición de perfil');
  ok(hubo('POST', /^\/organizaciones\/mia\/diagnostico$/) && hubo('PUT', /^\/organizaciones\/mia\/diagnostico\/respuestas\/q/) && hubo('POST', /^\/organizaciones\/mia\/diagnostico\/finalizar$/), 'Diagnóstico: inicio, respuestas y finalización');
  ok(hubo('POST', /^\/organizaciones\/mia\/plan$/) && hubo('POST', /^\/organizaciones\/mia\/plan\/acciones$/) && hubo('PATCH', /^\/organizaciones\/mia\/plan\/acciones\//), 'Plan: creación, acción propia y edición');
  ok(L.some(l => l.metodo === 'POST' && /^\/organizaciones\/mia\/evidencias$/.test(l.ruta) && l.cuerpo === '[multipart]'), 'Evidencias: carga multipart con archivo');
  ok(hubo('POST', /^\/organizaciones\/mia\/invitaciones$/) && hubo('GET', /^\/organizaciones\/mia\/colaboradores$/), 'Colaboradores: invitaciones y agregados');
  ok(hubo('GET', /^\/colaboradores\/mi\/modulos$/) && hubo('POST', /^\/colaboradores\/mi\/progreso\/mod-1\/lecciones\//) && hubo('PUT', /^\/colaboradores\/mi\/progreso\/mod-1\/respuestas\//) && hubo('POST', /^\/colaboradores\/mi\/progreso\/mod-1\/finalizar$/), 'Formación: módulos, lecciones, respuestas y finalización');
  ok(hubo('GET', /^\/contenidos\?publico=organizacion$/) && hubo('GET', /^\/contenidos\?publico=colaborador$/) && hubo('GET', /^\/modulos$/), 'Biblioteca y módulos publicados por público');
  ok(hubo('POST', /^\/admin\/contenidos\/[^/]+\/revisiones$/) && hubo('POST', /^\/admin\/contenidos\/[^/]+\/estado$/) && hubo('PUT', /^\/admin\/modulos\/versiones\//) && hubo('POST', /^\/admin\/modulos\/versiones\/[^/]+\/revisiones$/) && hubo('POST', /^\/admin\/modulos\/[^/]+\/versiones$/), 'Editorial: revisiones y estados de contenidos; edición, revisiones y versiones de módulos');
  ok(hubo('POST', /^\/admin\/documentos-legales\/[^/]+\/aprobacion$/) && hubo('POST', /^\/admin\/documentos-legales\/[^/]+\/publicacion$/) && hubo('GET', /^\/configuracion\/publica$/) && hubo('POST', /^\/documentos-legales\/[^/]+\/aceptacion$/) && L.some(l => l.metodo === 'POST' && /\/publicacion$/.test(l.ruta) && l.cuerpo && l.cuerpo.requiereNuevaAutorizacion === true), 'Documentos jurídicos: aprobación, publicación (con opción de nueva autorización), consulta pública y aceptaciones posteriores por API');
  ok(hubo('GET', /^\/admin\/organizaciones$/) && hubo('POST', /^\/admin\/organizaciones\/[^/]+\/estado$/) && hubo('POST', /^\/admin\/usuarios$/) && hubo('PATCH', /^\/admin\/instrumento\/preguntas\/q22\/alcance$/) && hubo('POST', /^\/admin\/sello\/intereses\/[^/]+\/gestion$/) && hubo('GET', /^\/admin\/auditoria$/), 'Administración: organizaciones, usuarios, instrumento, Sello y auditoría');
  const sospechosas = L.filter(l => typeof l.cuerpo === 'object' && l.cuerpo && ('orgId' in l.cuerpo || 'rol' in l.cuerpo || 'permisos' in l.cuerpo) && !/^\/admin\/usuarios/.test(l.ruta)); if (sospechosas.length) console.log('    · ', JSON.stringify(sospechosas.slice(0, 3)));
  ok(!L.some(l => typeof l.cuerpo === 'object' && l.cuerpo && ('orgId' in l.cuerpo || 'rol' in l.cuerpo || 'permisos' in l.cuerpo) && !/^\/admin\/usuarios/.test(l.ruta)), 'Las peticiones de organización y colaborador no envían orgId, rol ni permisos (los decide el servidor)');
  ok(w.localStorage.length === 0 && !JSON.stringify(w.sessionStorage.getItem('th-sesion') || '').includes('Turquesa2026'), 'Producción: localStorage vacío y sin contraseñas en el cliente');
  ok(!JSON.stringify(TH.store.get().usuarios).includes('"credencial"'), 'El servidor no expone credenciales al cliente');
  process.exit(h.resumen());
})().catch(e => { console.error('ERROR FATAL', e); process.exit(1); });
