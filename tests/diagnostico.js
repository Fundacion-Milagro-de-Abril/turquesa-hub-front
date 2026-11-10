/* Pruebas del autodiagnóstico conectado a Supabase (sin red: supabase-js se sustituye por un cliente simulado).
   1. Equivalencia del cálculo: valores calculados a mano (todo Sí, todo No, mixto con No aplica y No sé).
   2. El front solo llama a las funciones de la base y nunca envía organizacion_id.
   3. Recorrido de las pantallas de rc4: iniciar, responder, no aplica, finalizar con pendientes, finalizar, resultados, nuevo ciclo. */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h; const TH = await h.listo();
  const llamadas = [];
  const perfil = { id: 'u-1', organizacion_id: 'o-1', rol: 'organizacion', nombre: 'Ana', estado: 'activo' };
  const org = { id: 'o-1', nombre: 'Org Uno', estado: 'activa' };
  let diag = null; let archivados = [];

  /* Simulación mínima de las funciones de la base (las reglas reales se prueban en pgTAP). */
  const filaNueva = (ciclo) => ({ id: 'd-' + ciclo, organizacion_id: 'o-1', ciclo, estado: 'en-curso', instrumento_version: '1.0', preguntas: TH.data.instrumento.preguntas.filter(p => p.alcance === 'activa').map(p => p.id), respuestas: {}, pregunta_actual: 0, resultado: null, archivado: false, fecha_inicio: '2026-11-10T10:00:00Z', fecha_fin: null, ultimo_guardado: null });
  const rpc = async (n, a) => {
    llamadas.push({ rpc: n, args: a });
    if (n === 'registrar_inicio_sesion') return { error: null };
    if (n === 'iniciar_diagnostico') { diag = diag || filaNueva(1); return { data: diag, error: null }; }
    if (n === 'guardar_respuesta') { diag.respuestas[a.p_pregunta] = { opcion: a.p_opcion, justificacion: a.p_justificacion || undefined, fecha: '2026-11-10' }; diag.pregunta_actual = a.p_siguiente; return { data: diag, error: null }; }
    if (n === 'finalizar_diagnostico') { diag.estado = 'completado'; diag.resultado = a.p_resultado; diag.fecha_fin = '2026-11-10T11:00:00Z'; return { data: diag, error: null }; }
    if (n === 'nuevo_ciclo_diagnostico') { diag.archivado = true; archivados.push(diag); diag = filaNueva(diag.ciclo + 1); return { data: diag, error: null }; }
    return { error: { message: 'rpc desconocida' } };
  };
  const consulta = (tabla) => {
    const q = { f: [] }; const b = {
      select() { return b; }, order() { return b; }, eq(k, v) { q.f.push([k, v]); return b; }, limit() { return b; },
      maybeSingle() { q.uno = true; return b; }, single() { q.uno = true; return b; },
      then(okf, fail) {
        let data; llamadas.push('select ' + tabla);
        if (tabla === 'perfiles') data = perfil; else if (tabla === 'organizaciones') data = org;
        else if (tabla === 'diagnosticos') data = [diag].concat(archivados).filter(Boolean).sort((x, y) => y.ciclo - x.ciclo);
        else data = q.uno ? null : [];
        return Promise.resolve({ data, error: null }).then(okf, fail);
      } }; return b;
  };
  let sesion = null;
  const cliente = { auth: {
    async signInWithPassword(c) { sesion = { user: { id: 'u-1', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; },
    async getSession() { return { data: { session: sesion } }; }, async signOut() { sesion = null; return { error: null }; } }, from: consulta, rpc };
  Object.keys(cliente).forEach(k => { TH.sb[k] = cliente[k]; });

  /* ---------- 1. Equivalencia del cálculo ---------- */
  console.log('[Cálculo]');
  const activas = TH.api.diagnostico.preguntas();
  const resp = (fn) => { const r = {}; activas.forEach(p => { const o = fn(p); if (o) r[p.id] = { opcion: o }; }); return r; };
  const calc = (r) => TH.api.diagnostico.calcular({ orgId: 'o-1', respuestas: r });
  ok(activas.length === 16, 'El instrumento tiene 16 preguntas activas');
  ok(calc(resp(() => 'si')).global === 100, 'Todo «Sí» → global 100');
  ok(calc(resp(() => 'no')).global === 0, 'Todo «No» → global 0');
  ok(calc(resp(() => 'parcial')).global === 50, 'Todo «Parcial» → global 50');
  ok(calc(resp(() => 'nose')).global === 0, '«No sé» cuenta como 0');
  // Mixto a mano: en cada dimensión se alternan Sí/No; las preguntas con No aplica se excluyen.
  const mixto = {}; const porDim = {};
  activas.forEach(p => { (porDim[p.dim] = porDim[p.dim] || []).push(p); });
  let esperado = []; // puntaje esperado por dimensión, calculado aquí sin usar la función del front
  Object.keys(porDim).forEach(d => {
    let pts = 0, n = 0;
    porDim[d].forEach((p, i) => {
      if (p.permiteNA && i === porDim[d].length - 1) { mixto[p.id] = { opcion: 'na', justificacion: 'x' }; return; }
      const o = i % 3 === 0 ? 'si' : i % 3 === 1 ? 'parcial' : 'no'; mixto[p.id] = { opcion: o }; n++; pts += o === 'si' ? 1 : o === 'parcial' ? 0.5 : 0;
    });
    esperado.push(n ? Math.round(pts / n * 100) : null);
  });
  const rm = calc(mixto); const validos = esperado.filter(x => x !== null);
  ok(JSON.stringify(rm.dimensiones.map(x => x.puntaje)) === JSON.stringify(esperado), 'Mixto: el puntaje por dimensión coincide con el calculado a mano (' + esperado.join(', ') + ')');
  ok(rm.global === Math.round(validos.reduce((a, b) => a + b, 0) / validos.length), 'Mixto: global = promedio de las dimensiones aplicables');

  /* ---------- 2 y 3. Recorrido con las pantallas ---------- */
  console.log('[Recorrido]');
  const A = TH.authAdaptadores.supabase;
  await A.ingresar('ana@org.test', 'Clave12345*');
  await h.ir('/organizacion/inicio');
  ok(JSON.stringify(h.nav()) === JSON.stringify(['/organizacion/inicio', '/organizacion/diagnostico', '/organizacion/diagnostico/resultados', '/organizacion/plan-accion', '/organizacion/plan-accion/seguimiento', '/organizacion/colaboradores', '/organizacion/biblioteca']), 'Menú de la organización: inicio, diagnóstico, plan, colaboradores y biblioteca');
  ok(/Empieza con tu autodiagnóstico/.test(h.texto()) && /16 preguntas/.test(h.texto()), 'Inicio: invita a empezar el autodiagnóstico');
  await h.ir('/organizacion/diagnostico');
  const btn = h.q('[data-action="diag-iniciar"]');
  ok(!!btn, 'Diagnóstico sin iniciar: muestra el botón para comenzar');
  await h.click(btn);
  ok(llamadas.some(l => l.rpc === 'iniciar_diagnostico' && !l.args), 'Iniciar llama a iniciar_diagnostico sin parámetros (la organización la pone la base)');
  ok(!!h.q('form[data-form="diag-responder"]'), 'Aparece la primera pregunta');

  const responder = async (valor, just) => {
    const f = h.q('form[data-form="diag-responder"]'); const r = f.querySelector('input[value="' + valor + '"]'); r.checked = true;
    if (just !== undefined) { const t = f.querySelector('textarea'); if (t) t.value = just; }
    await h.submit(f); await sleep(200);
  };
  await responder('parcial');
  const g1 = llamadas.filter(l => l.rpc === 'guardar_respuesta')[0];
  ok(g1 && g1.args.p_opcion === 'parcial' && g1.args.p_pregunta === activas[0].id && !('organizacion_id' in g1.args), 'Responder: llama a guardar_respuesta con pregunta y opción, sin organización');
  ok(diag.pregunta_actual === 1, 'Responder: se guarda la posición para poder reanudar');

  // Reanudar: recargar la ruta debe mostrar lo guardado sin perder respuestas.
  await h.ir('/organizacion/diagnostico'); await sleep(200);
  ok(Object.keys(TH.api.diagnostico.obtener('o-1').respuestas).length === 1, 'Al volver se conservan las respuestas guardadas');

  // Responder todas las demás (la de «No aplica» con justificación) usando la capa de servicio, como lo hace la pantalla.
  for (const p of activas.slice(1)) {
    const r = p.permiteNA ? await TH.api.diagnostico.responder('o-1', p.id, 'na', 'No aplica en nuestra organización') : await TH.api.diagnostico.responder('o-1', p.id, 'si', '');
    if (!r.ok) { ok(false, 'Responder ' + p.id + ': ' + r.error); break; }
  }
  ok(!llamadas.some(l => l.args && ('organizacion_id' in l.args || 'p_organizacion_id' in l.args)), 'Ninguna llamada envía la organización');
  const na = activas.find(p => !p.permiteNA);
  ok((await TH.api.diagnostico.responder('o-1', na.id, 'na', 'x')).ok === false, '«No aplica» en una pregunta que no lo admite se rechaza antes de llamar a la base');
  const naQ = activas.find(p => p.permiteNA);
  ok((await TH.api.diagnostico.responder('o-1', naQ.id, 'na', '  ')).ok === false, '«No aplica» sin justificación se rechaza antes de llamar a la base');

  const falto = await (async () => { const d = TH.api.diagnostico.obtener('o-1'); const guardada = d.respuestas[activas[3].id]; delete d.respuestas[activas[3].id]; const r = await TH.api.diagnostico.finalizar('o-1'); d.respuestas[activas[3].id] = guardada; return r; })();
  ok(!falto.ok && /Falta 1|Faltan 1 /.test(falto.error) && !llamadas.some(l => l.rpc === 'finalizar_diagnostico'), 'Finalizar con preguntas pendientes: dice cuántas faltan y no llama a la base');

  await h.ir('/organizacion/diagnostico?revisar=1');
  const fin = h.q('[data-action="diag-finalizar"]');
  ok(!!fin, 'Con todo respondido aparece «Finalizar»');
  if (fin) await h.click(fin);
  await sleep(300);
  const f = llamadas.find(l => l.rpc === 'finalizar_diagnostico');
  ok(f && typeof f.args.p_resultado.global === 'number' && Array.isArray(f.args.p_resultado.dimensiones) && !('organizacion_id' in f.args), 'Finalizar envía el resultado calculado (global y dimensiones)');
  ok(diag.estado === 'completado', 'El diagnóstico queda completado en la base');
  ok(/#\/organizacion\/diagnostico\/resultados/.test(w.location.hash) && /Resultados/.test(h.texto()), 'Tras finalizar se muestran los resultados');

  await h.ir('/organizacion/inicio');
  ok(/Tu autodiagnóstico está completo/.test(h.texto()), 'Inicio: refleja el diagnóstico completado');

  // Nuevo ciclo desde la pantalla de resultados
  await h.ir('/organizacion/diagnostico');
  const nc = h.q('[data-action="diag-nuevo-ciclo"]');
  if (nc) { await h.click(nc); await h.click('[data-confirmar]'); await sleep(300); }
  ok(!!nc && diag.ciclo === 2 && archivados.length === 1 && archivados[0].estado === 'completado', 'Nuevo ciclo: el anterior queda archivado completado y empieza el ciclo 2');

  // Lo que aún no está conectado (reportes) sigue «próximamente»
  await h.ir('/organizacion/reportes');
  ok(/se habilitarán próximamente/.test(h.texto()), 'Los reportes siguen «próximamente»');

  ok(w.localStorage.length === 0, 'Nada en localStorage');
  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
