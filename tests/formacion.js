/* Pruebas de F04 (formación y gestión de personas) con Supabase simulado (sin red).
   Las reglas reales (asignación, calificación, privacidad, último administrador) se prueban en pgTAP
   (supabase/tests/04_f04_formacion_personas.test.sql). Aquí: que el front use las funciones correctas, no envíe
   lo que debe poner la base y muestre a cada rol solo lo suyo. */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h; const TH = await h.listo();
  const llamadas = [];
  const M1 = TH.data.modulos.find(m => m.id === 'mod-1');
  const tablas = {
    perfiles: [
      { id: 'u-col', organizacion_id: 'o-1', rol: 'colaborador', nombre: 'Laura', area: 'Producción', estado: 'activo' },
      { id: 'u-org', organizacion_id: 'o-1', rol: 'organizacion', nombre: 'Ana', estado: 'activo' },
      { id: 'u-adm', organizacion_id: null, rol: 'admin_fma', nombre: 'Admin', estado: 'activo' }],
    organizaciones: [{ id: 'o-1', nombre: 'Org Uno', estado: 'activa', tipo_identificacion: 'NIT', identificacion: '900' }],
    // Lo publicado que devuelve la base (RLS): versiones 1.0 de mod-1 y mod-2; mod-3 y mod-4 siguen en revisión y no llegan.
    modulo_versiones: TH.data.modulos.filter(m => ['mod-1', 'mod-2'].includes(m.id)).map(m => ({ id: 'modv-' + m.id + '-1', modulo_id: m.id, estado: 'publicado', datos: Object.assign(JSON.parse(JSON.stringify(m)), { version: '1.0' }) })),
    contenidos: [{ id: 'rec-prevencion', estado: 'publicado', publico: ['organizacion', 'colaborador'], datos: JSON.parse(JSON.stringify(TH.data.contenidos.find(c => c.id === 'rec-prevencion'))) }],
    asignaciones_modulo: [{ user_id: 'u-col', modulo_id: 'mod-1' }],
    progreso: [], invitaciones: [], diagnosticos: [], planes: [], acciones: []
  };
  let actual = null;
  const personas = [
    { id: 'u-org', nombre: 'Ana', email: 'ana@org.test', rol: 'organizacion', estado: 'activo', organizacion_id: 'o-1', creado_en: '2026-11-01T00:00:00Z', ultimo_acceso: '2026-11-10T00:00:00Z' },
    { id: 'u-org2', nombre: 'Beto', email: 'beto@org.test', rol: 'organizacion', estado: 'activo', organizacion_id: 'o-1', creado_en: '2026-11-01T00:00:00Z', ultimo_acceso: null },
    { id: 'u-col', nombre: 'Laura', email: 'laura@org.test', rol: 'colaborador', estado: 'activo', area: 'Producción', organizacion_id: 'o-1', creado_en: '2026-11-02T00:00:00Z', ultimo_acceso: null }];
  const progresoFila = () => tablas.progreso.find(p => p.user_id === actual && p.modulo_id === 'mod-1');
  const rpc = async (n, a) => {
    llamadas.push({ rpc: n, args: a || null });
    switch (n) {
      case 'registrar_inicio_sesion': return { error: null };
      case 'marcar_leccion': { let p = progresoFila(); if (!p) { p = { id: 'pr-1', user_id: actual, organizacion_id: 'o-1', modulo_id: a.p_modulo, lecciones_vistas: [], respuestas: {}, puntaje: null, estado: 'en-curso', fecha_inicio: '2026-11-10T00:00:00Z' }; tablas.progreso.push(p); } if (!p.lecciones_vistas.includes(a.p_leccion)) p.lecciones_vistas.push(a.p_leccion); return { data: p, error: null }; }
      case 'responder_ejercicio': { const p = progresoFila(); p.respuestas[a.p_pregunta] = a.p_opcion; const q = M1.quiz.find(x => x.id === a.p_pregunta); return { data: Object.assign({}, p, { correcta: q.correcta === a.p_opcion }), error: null }; }
      case 'finalizar_modulo': { const p = progresoFila(); p.estado = 'completado'; p.puntaje = 80; p.fecha_fin = '2026-11-10T01:00:00Z'; return { data: p, error: null }; }
      case 'reintentar_modulo': { const p = progresoFila(); p.respuestas = {}; p.estado = 'en-curso'; p.puntaje = null; return { data: p, error: null }; }
      case 'listar_personas': return { data: a && a.p_organizacion_id === null ? [{ id: 'u-adm', nombre: 'Admin', email: 'adm@fma.test', rol: 'admin_fma', estado: 'activo', creado_en: '2026-11-01T00:00:00Z' }, { id: 'u-adm2', nombre: 'Otra', email: 'otra@fma.test', rol: 'admin_fma', estado: 'activo', creado_en: '2026-11-03T00:00:00Z' }] : personas, error: null };
      case 'resumen_formacion': return { data: [{ usuario_id: 'u-col', nombre: 'Laura', estado_persona: 'activo', modulo_id: 'mod-1', asignado: true, estado: 'completado', puntaje: 80, lecciones: 4, fecha_inicio: '2026-11-10T00:00:00Z', fecha_fin: '2026-11-10T01:00:00Z' }], error: null };
      case 'resumen_formacion_fma': return { data: [{ organizacion_id: 'o-1', colaboradores: 1, asignaciones: 1, completados: 1 }], error: null };
      case 'crear_invitacion': return { data: 'COD-' + a.p_rol.toUpperCase(), error: null };
      case 'asignar_modulos': case 'anular_invitacion': case 'publicar_catalogo': return { data: null, error: null };
    }
    return { error: { message: 'rpc desconocida ' + n } };
  };
  const consulta = (tabla) => {
    const q = { op: 'select', f: [] }; const filas = () => (tablas[tabla] || []).filter(r => q.f.every(([k, v]) => r[k] === v));
    const b = { select() { return b; }, order() { return b; }, limit() { return b; }, eq(k, v) { q.f.push([k, v]); return b; },
      update(p) { q.op = 'update'; q.p = p; llamadas.push({ update: tabla, payload: p, filtros: q.f }); return b; },
      insert(p) { q.op = 'insert'; llamadas.push({ insert: tabla, payload: p }); return b; },
      single() { q.uno = true; return b; }, maybeSingle() { q.uno = true; return b; },
      then(okf, fail) {
        let data;
        if (q.op === 'update') { const f = filas(); if (tabla === 'perfiles' && !f.length) data = [{ id: q.f[0][1] }]; else { f.forEach(r => Object.assign(r, q.p)); data = q.uno ? f[0] : f; } }
        else { llamadas.push('select ' + tabla); const f = filas(); data = q.uno ? (f[0] || null) : f; }
        return Promise.resolve({ data, error: null }).then(okf, fail);
      } }; return b;
  };
  let sesion = null;
  const cliente = { auth: { async signInWithPassword(c) { sesion = { user: { id: actual, email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; }, async getSession() { return { data: { session: sesion } }; }, async signOut() { sesion = null; return { error: null }; } }, from: consulta, rpc };
  Object.keys(cliente).forEach(k => { TH.sb[k] = cliente[k]; });
  const A = TH.authAdaptadores.supabase;
  const entrar = async (id) => { if (sesion) await A.salir(); actual = id; await A.ingresar(id + '@x.test', 'Clave12345*'); };
  const sinOrg = (l) => !JSON.stringify(l.args || l.payload || {}).includes('organizacion_id');

  /* ---------- Colaborador ---------- */
  console.log('[Colaborador]');
  await entrar('u-col');
  await h.ir('/colaborador/inicio');
  ok(JSON.stringify(h.nav()) === JSON.stringify(['/colaborador/inicio', '/colaborador/formacion', '/colaborador/mi-progreso', '/colaborador/recursos', '/colaborador/perfil']), 'Menú del colaborador: inicio, formación, progreso, recursos y cuenta');
  ok(!/se habilitarán próximamente/.test(h.texto()) && /Hola, Laura/.test(h.texto()), 'Inicio del colaborador: pantalla de rc4 conectada');
  await h.ir('/colaborador/formacion');
  ok(/Comprender las violencias/.test(h.texto()) && !new RegExp(TH.data.modulos.find(m => m.id === 'mod-2').titulo.slice(0, 20)).test(h.texto()), 'Mi formación: solo el módulo asignado (no el publicado sin asignar)');
  ok(TH.api.formacion.modulos().map(m => m.id).join() === 'mod-1,mod-2', 'Catálogo: solo los módulos publicados (mod-3 y mod-4 siguen en borrador)');
  await h.ir('/colaborador/formacion/modulo?id=mod-2');
  ok(/no está asignado/.test(h.texto()), 'Un módulo publicado pero no asignado no se puede abrir');
  await h.ir('/colaborador/formacion/modulo?id=mod-1');
  await h.click('[data-action="col-leccion-vista"]'); await sleep(200);
  const ml = llamadas.find(l => l.rpc === 'marcar_leccion');
  ok(ml && ml.args.p_modulo === 'mod-1' && ml.args.p_leccion === M1.lecciones[0].id && Object.keys(ml.args).length === 2, 'Marcar lección: solo módulo y lección (la persona la toma la base)');
  for (const l of M1.lecciones.slice(1)) await TH.api.formacion.marcarLeccion('u-col', 'mod-1', l.id);
  const r1 = await TH.api.formacion.responderQuiz('u-col', 'mod-1', M1.quiz[0].id, M1.quiz[0].correcta);
  ok(r1.ok && r1.correcta === true && r1.retro === M1.quiz[0].retro.ok, 'Responder: acierto con la retroalimentación del módulo');
  const mala = M1.quiz[1].opciones.find(o => o.id !== M1.quiz[1].correcta).id;
  const r2 = await TH.api.formacion.responderQuiz('u-col', 'mod-1', M1.quiz[1].id, mala);
  ok(r2.ok && r2.correcta === false && r2.retro === M1.quiz[1].retro.no, 'Responder: error con su retroalimentación');
  for (const q of M1.quiz.slice(2)) await TH.api.formacion.responderQuiz('u-col', 'mod-1', q.id, q.correcta);
  const fin = await TH.api.formacion.finalizar('u-col', 'mod-1');
  ok(fin.ok && fin.puntaje === 80 && TH.api.formacion.estadoModulo('u-col', 'mod-1') === 'completado', 'Finalizar: el puntaje viene de la base y el módulo queda completado');
  await h.ir('/colaborador/mi-progreso');
  ok(/Comprender las violencias/.test(h.texto()), 'Mi progreso: muestra el módulo');
  const re = await TH.api.formacion.reintentar('u-col', 'mod-1');
  ok(re.ok && TH.api.formacion.estadoModulo('u-col', 'mod-1') === 'en-curso', 'Reintentar: vuelve a en curso');
  const pf = await TH.api.usuarios.actualizar('u-col', { nombre: 'Laura G.', area: 'Calidad' });
  const up = llamadas.filter(l => l.update === 'perfiles').pop();
  ok(pf.ok && JSON.stringify(Object.keys(up.payload).sort()) === '["area","nombre"]', 'Mi cuenta: solo envía nombre y área');
  await h.ir('/colaborador/recursos');
  ok(/Recursos|biblioteca/i.test(h.texto()), 'Recursos: la biblioteca del colaborador carga');
  ok(llamadas.filter(l => l.rpc).every(sinOrg), 'Ninguna llamada del colaborador envía la organización');

  /* ---------- Organización ---------- */
  console.log('[Organización]');
  await entrar('u-org'); const desdeOrg = llamadas.length;
  await h.ir('/organizacion/colaboradores');
  ok(/Laura/.test(h.texto()) && /Beto/.test(h.texto()), 'Colaboradores: lista colaboradores y responsables');
  ok(!!h.q('[data-action="sb-persona-estado"][data-id="u-col"]') && !h.q('[data-action="sb-persona-estado"][data-id="u-org2"]'), 'Se puede suspender a un colaborador, no a otro responsable (lo gestiona FMA)');
  await h.click('[data-action="sb-colab-invitar"]');
  const fi = h.q('form[data-form="sb-colab-invitar"]');
  ok(fi.querySelectorAll('input[name=modulos]').length === 2, 'Invitar: ofrece solo los módulos publicados');
  fi.elements.email.value = 'nuevo@org.test'; [...fi.querySelectorAll('input[name=modulos]')].forEach((c, i) => { c.checked = i === 0; });
  await h.submit(fi); await sleep(300);
  const ci = llamadas.find(l => l.rpc === 'crear_invitacion');
  ok(ci && ci.args.p_rol === 'colaborador' && JSON.stringify(ci.args.p_modulos) === '["mod-1"]' && !('p_organizacion_id' in ci.args), 'Invitar: rol colaborador con sus módulos y sin indicar la organización');
  const enlace = h.w.document.getElementById('enlace-inv');
  ok(enlace && /activar-invitacion\?codigo=COD-COLABORADOR$/.test(enlace.value), 'El enlace se muestra una vez al crear');
  h.w.document.querySelector('[data-modal-cerrar]').click(); await sleep(100);
  ok(/nuevo@org\.test|Invitaciones/.test(h.texto()), 'Tras invitar se muestra la pestaña de invitaciones');
  await h.click('[data-action="sb-colab-tab"][data-tab="personas"]');
  await h.click('[data-action="sb-colab-modulos"][data-id="u-col"]');
  const fm = h.q('form[data-form="sb-colab-modulos"]'); [...fm.querySelectorAll('input[name=modulos]')].forEach(c => { c.checked = true; });
  await h.submit(fm); await sleep(300);
  const am = llamadas.find(l => l.rpc === 'asignar_modulos');
  ok(am && am.args.p_usuario === 'u-col' && JSON.stringify(am.args.p_modulos) === '["mod-1","mod-2"]', 'Asignar módulos: reemplaza la lista del colaborador');
  await h.click('[data-action="sb-persona-estado"][data-id="u-col"][data-estado="suspendido"]'); await h.click('[data-confirmar]'); await sleep(300);
  const sus = llamadas.filter(l => l.update === 'perfiles').pop();
  ok(sus.payload.estado === 'suspendido' && Object.keys(sus.payload).length === 1 && sus.filtros[0][1] === 'u-col', 'Suspender: cambia solo el estado de esa persona');
  await h.click('[data-action="sb-colab-tab"][data-tab="avance"]');
  ok(/80 %/.test(h.texto()) && /Completado/.test(h.texto()) && /nunca se muestran/.test(h.texto()), 'Avance: estado y resultado, con el aviso de privacidad');
  ok(!llamadas.slice(desdeOrg).includes('select progreso') && llamadas.slice(desdeOrg).some(l => l.rpc === 'resumen_formacion'), 'La organización no consulta la tabla de progreso: usa resumen_formacion');
  await h.ir('/organizacion/biblioteca');
  ok(TH.api.contenidos.visibles('organizacion').length === 1, 'Biblioteca: solo el contenido publicado');

  /* ---------- FMA ---------- */
  console.log('[FMA]');
  await entrar('u-adm');
  await h.ir('/fma/equipo');
  ok(/Otra/.test(h.texto()) && !h.q('[data-action="fma-persona-estado"][data-id="u-adm"]') && !!h.q('[data-action="fma-persona-estado"][data-id="u-adm2"]'), 'Equipo FMA: lista el equipo; no ofrece suspenderse a sí mismo');
  await h.click('[data-action="fma-admin-invitar"]');
  const fa = h.q('form[data-form="fma-admin-invitar"]'); fa.elements.email.value = 'nueva@fma.test'; await h.submit(fa); await sleep(300);
  const ia = llamadas.filter(l => l.rpc === 'crear_invitacion').pop();
  ok(ia.args.p_rol === 'admin_fma' && !('p_organizacion_id' in ia.args) && /COD-ADMIN_FMA$/.test(h.w.document.getElementById('enlace-inv').value), 'Invitar administrador: sin organización y con enlace de una sola vez');
  h.w.document.querySelector('[data-modal-cerrar]').click(); await sleep(100);
  await h.ir('/fma/organizaciones/detalle?id=o-1');
  ok(/Org Uno/.test(h.texto()) && /Autodiagnóstico/.test(h.texto()) && /Plan de acción/.test(h.texto()) && /1 de 1 módulos/.test(h.texto()), 'Detalle de organización: resumen de diagnóstico, plan y formación');
  ok(/Beto/.test(h.texto()) && !!h.q('[data-action="fma-persona-estado"][data-id="u-org2"]'), 'Detalle: FMA puede suspender a un responsable concreto');
  ok(w.localStorage.length === 0, 'Nada en localStorage');
  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
