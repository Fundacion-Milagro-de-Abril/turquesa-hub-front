/* F08 · Editor de contenidos en la plataforma, con Supabase simulado (sin red).
   Recorre con las pantallas editoriales de rc4: nueva versión de un módulo → editar → revisiones → aprobar → publicar
   (sustituye a la anterior) y un contenido de la biblioteca hasta publicarlo. Verifica que cada cambio se guarde con
   guardar_version_modulo / guardar_contenido, en el orden correcto, y que un rechazo de la base deshaga lo local.
   Las reglas reales (publicar sin aprobación, inmutabilidad, catálogo y calificación) se prueban en pgTAP. */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h; const TH = await h.listo();
  const llamadas = []; let rechazar = null;
  const tablas = {
    perfiles: [{ id: 'u-adm', organizacion_id: null, rol: 'admin_fma', nombre: 'Admin', estado: 'activo' }],
    modulo_versiones: TH.data.modulos.map(m => ({ id: 'modv-' + m.id + '-1', modulo_id: m.id, estado: m.id === 'mod-1' ? 'publicado' : 'en-revision-tecnica',
      datos: Object.assign(JSON.parse(JSON.stringify(m)), { version: '1.0', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', revisiones: [], historial: [] }) })),
    contenidos: TH.data.contenidos.map(c => ({ id: c.id, estado: c.estado, publico: c.publico, datos: Object.assign(JSON.parse(JSON.stringify(c)), { historial: c.historial || [] }) }))
  };
  const rpc = async (n, a) => {
    llamadas.push({ rpc: n, args: a });
    if (n === 'registrar_inicio_sesion') return { error: null };
    if (rechazar && n === rechazar.rpc) { const r = rechazar; rechazar = null; return { error: { message: r.mensaje, code: '42501' } }; }
    if (n === 'guardar_version_modulo') { const d = a.p_datos; const f = tablas.modulo_versiones.find(v => v.id === d.id); if (f) Object.assign(f, { estado: d.estado, datos: d }); else tablas.modulo_versiones.push({ id: d.id, modulo_id: d.moduloId, estado: d.estado, datos: d }); return { error: null }; }
    if (n === 'guardar_contenido') { const d = a.p_datos; const f = tablas.contenidos.find(v => v.id === d.id); if (f) Object.assign(f, { estado: d.estado, publico: d.publico, datos: d }); else tablas.contenidos.push({ id: d.id, estado: d.estado, publico: d.publico, datos: d }); return { error: null }; }
    return { data: [], error: null };
  };
  const consulta = (tabla) => { const q = { f: [] }; const b = { select() { return b; }, order() { return b; }, eq(k, v) { q.f.push([k, v]); return b; }, maybeSingle() { q.uno = true; return b; }, single() { q.uno = true; return b; },
    then(okf, fail) { llamadas.push('select ' + tabla); const f = (tablas[tabla] || []).filter(r => q.f.every(([k, v]) => r[k] === v)); return Promise.resolve({ data: q.uno ? (f[0] || null) : JSON.parse(JSON.stringify(f)), error: null }).then(okf, fail); } }; return b; };
  let sesion = null;
  const cliente = { auth: { async signInWithPassword(c) { sesion = { user: { id: 'u-adm', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; }, async getSession() { return { data: { session: sesion } }; }, async signOut() { sesion = null; return { error: null }; } }, from: consulta, rpc };
  Object.keys(cliente).forEach(k => { TH.sb[k] = cliente[k]; });
  await TH.authAdaptadores.supabase.ingresar('adm@fma.test', 'Clave12345*');
  const M = TH.api.modulos; const C = TH.api.contenidos;
  const guardados = (n) => llamadas.filter(l => l.rpc === n);

  console.log('[Módulos]');
  await h.ir('/fma/formacion');
  ok(JSON.stringify(h.nav()) === JSON.stringify(['/fma/inicio', '/fma/organizaciones', '/fma/formacion', '/fma/contenidos', '/fma/equipo', '/fma/auditoria']), 'Menú FMA: formación y contenidos en el grupo editorial');
  ok(/Gestión editorial de los módulos/.test(h.texto()) && M.ultimas().length === 4, 'Formación: pantalla editorial de rc4 con los 4 módulos leídos de la base');
  ok(TH.auth.tienePermiso('formacion:revisar-juridica') && TH.auth.tienePermiso('contenidos:revisar-psicosocial'), 'admin_fma tiene los permisos de revisión (MVP: un solo rol)');

  let r = await M.crearVersion('mod-1', 'Ajustes de redacción');
  const nueva = r.modulo;
  ok(r.ok && nueva.estado === 'borrador' && nueva.version === '1.1', 'Nueva versión: v1.1 en borrador a partir de la publicada');
  ok(guardados('guardar_version_modulo').length === 1 && guardados('guardar_version_modulo')[0].args.p_datos.id === nueva.id, 'La nueva versión se guarda en la base');
  ok((await M.crearVersion('mod-1', '')).ok === false, 'Solo una versión en edición por módulo');

  const lecciones = JSON.parse(JSON.stringify(nueva.lecciones)); lecciones[0].titulo = 'Título corregido';
  r = await M.editar(nueva.id, { lecciones });
  ok(r.ok && guardados('guardar_version_modulo').pop().args.p_datos.lecciones[0].titulo === 'Título corregido', 'Editar: el cambio se guarda en la base');

  for (const t of ['tecnica', 'juridica', 'psicosocial']) await M.registrarRevision(nueva.id, t, 'aprobada', 'OK ' + t);
  const v = M.obtenerVersion(nueva.id);
  ok(v.revisionTecnica === 'aprobada' && v.revisionJuridica === 'aprobada' && v.revisionPsicosocial === 'aprobada', 'Las tres revisiones quedan registradas');
  r = await M.cambiarEstado(nueva.id, 'aprobado'); ok(r.ok && M.obtenerVersion(nueva.id).estado === 'aprobado', 'Aprobar');

  const antes = guardados('guardar_version_modulo').length;
  r = await M.cambiarEstado(nueva.id, 'publicado');
  const envios = guardados('guardar_version_modulo').slice(antes).map(l => l.args.p_datos);
  ok(r.ok && envios.length === 2 && envios[0].id === 'modv-mod-1-1' && envios[0].estado === 'archivado' && envios[1].id === nueva.id && envios[1].estado === 'publicado', 'Publicar: primero se archiva la anterior y luego se publica la nueva (una sola publicada)');
  ok(M.publicado('mod-1').id === nueva.id, 'La versión publicada ahora es la 1.1');

  // Un rechazo de la base deshace lo local
  const otra = (await M.crearVersion('mod-1', '')).modulo;
  rechazar = { rpc: 'guardar_version_modulo', mensaje: 'Solo se publica una versión aprobada' };
  r = await M.editar(otra.id, { titulo: 'Cambio que la base rechaza' });
  ok(!r.ok && /aprobada/.test(r.error), 'Si la base rechaza, se informa el error');
  ok(M.obtenerVersion(otra.id).titulo !== 'Cambio que la base rechaza', 'Y la caché vuelve a lo que hay en la base');

  await h.ir('/fma/formacion/version?id=' + nueva.id);
  ok(/Versión 1.1/.test(h.texto()) && /Título corregido/.test(h.texto()), 'La pantalla de la versión muestra el contenido guardado');

  console.log('[Biblioteca]');
  await h.ir('/fma/contenidos');
  ok(/Contenidos|Biblioteca/.test(h.texto()), 'Contenidos: pantalla editorial de rc4');
  r = await C.crear({ titulo: 'Guía nueva', categoria: TH.data.catalogos.categoriasContenido[0], tema: 'General', descripcion: 'd', cuerpo: 'Párrafo', publico: ['organizacion'], aplicaJuridica: false, aplicaPsicosocial: false });
  const nuevo = r.contenido;
  ok(r.ok && guardados('guardar_contenido').pop().args.p_datos.id === nuevo.id, 'Crear contenido: se guarda en la base en borrador');
  await C.registrarRevision(nuevo.id, 'tecnica', 'aprobada', 'ok');
  await C.cambiarEstado(nuevo.id, 'aprobado');
  r = await C.cambiarEstado(nuevo.id, 'publicado');
  ok(r.ok && tablas.contenidos.find(c => c.id === nuevo.id).estado === 'publicado', 'Revisión técnica (las demás no aplican) → aprobado → publicado, guardado en la base');
  r = await C.editar(nuevo.id, { titulo: 'Guía nueva v2', categoria: nuevo.categoria, tema: 'General', descripcion: 'd2', publico: ['organizacion'] });
  ok(r.ok && tablas.contenidos.find(c => c.id === nuevo.id).estado === 'en-revision-tecnica', 'Editar un contenido publicado lo devuelve a revisión (deja de verse hasta publicarse otra vez)');

  ok(!llamadas.some(l => l.args && JSON.stringify(l.args).includes('organizacion_id')), 'Ninguna operación editorial envía datos de organización');
  ok(w.localStorage.length === 0, 'Nada en localStorage');
  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
