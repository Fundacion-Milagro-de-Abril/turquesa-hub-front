/* Pruebas del plan de acción conectado a Supabase (sin red: supabase-js se sustituye por un cliente simulado).
   1. Regla de sugerencias (criterio 12 de F03): Sí/No aplica no generan acción; No y No sé sí; Parcial baja la prioridad; plazos +60/+120/+180.
   2. Recorrido por las pantallas: crear, editar, «atrasada» derivada, acción propia, eliminar, seguimiento.
   3. El front solo llama a funciones de la base o escribe columnas permitidas; nunca envía la organización; sin rastros de evidencias.
   Las reglas de negocio reales (cierre, avance, bitácora, aislamiento) se prueban en pgTAP (supabase/tests/03_f03_plan.test.sql). */
const { crear } = require('./lib/entorno');

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h; const TH = await h.listo();
  const llamadas = [];
  const hoy = () => TH.util.hoy();
  const perfil = { id: 'u-1', organizacion_id: 'o-1', rol: 'organizacion', nombre: 'Ana', estado: 'activo' };
  const org = { id: 'o-1', nombre: 'Org Uno', estado: 'activa' };
  const activas = TH.data.instrumento.preguntas.filter(p => p.alcance === 'activa');
  // Diagnóstico completado: algunas respuestas de cada tipo.
  const resp = {}; activas.forEach((p, i) => { resp[p.id] = { opcion: p.permiteNA && i % 2 ? 'na' : ['si', 'no', 'parcial', 'nose'][i % 4], justificacion: 'x', fecha: '2026-11-10' }; });
  const tablas = {
    diagnosticos: [{ id: 'd-1', organizacion_id: 'o-1', ciclo: 1, estado: 'completado', instrumento_version: '1.0', preguntas: activas.map(p => p.id), respuestas: resp, pregunta_actual: 0, resultado: { global: 50, dimensiones: [] }, archivado: false, fecha_inicio: '2026-11-10T10:00:00Z', fecha_fin: '2026-11-10T11:00:00Z' }],
    planes: [], acciones: []
  };
  let n = 0;
  const filaAccion = (a, planId) => Object.assign({ id: 'acc-' + (++n), plan_id: planId, organizacion_id: 'o-1', pregunta_id: null, origen: 'propia', situacion: '', prioridad: 'media', fecha_cierre: null, estado: 'pendiente', avance: 0, observaciones: '', evidencia_esperada: '', bitacora: [], creado_en: '2026-11-10T12:00:00Z' }, a, { plan_id: planId });
  const rpc = async (nombre, args) => {
    llamadas.push({ rpc: nombre, args });
    if (nombre === 'registrar_inicio_sesion') return { error: null };
    if (nombre === 'crear_plan') {
      const plan = { id: 'p-1', organizacion_id: 'o-1', diagnostico_id: 'd-1', historial: [{ fecha: '2026-11-10', accion: 'Plan creado con ' + args.p_acciones.length + ' acciones.' }], creado_en: '2026-11-10T12:00:00Z' };
      tablas.planes.push(plan); args.p_acciones.forEach(a => tablas.acciones.push(filaAccion(a, plan.id))); return { data: plan, error: null };
    }
    if (nombre === 'incorporar_acciones') {
      const nuevas = args.p_acciones.filter(a => !a.pregunta_id || !tablas.acciones.some(x => x.pregunta_id === a.pregunta_id)); nuevas.forEach(a => tablas.acciones.push(filaAccion(a, 'p-1'))); return { data: nuevas.length, error: null };
    }
    return { error: { message: 'rpc desconocida' } };
  };
  const consulta = (tabla) => {
    const q = { op: 'select', f: [] }; const fila = () => (tablas[tabla] || []).filter(r => q.f.every(([k, v]) => r[k] === v));
    const b = {
      select() { return b; }, order() { return b; }, limit() { return b; }, eq(k, v) { q.f.push([k, v]); return b; },
      insert(p) { q.op = 'insert'; q.p = p; llamadas.push({ insert: tabla, payload: p }); return b; },
      update(p) { q.op = 'update'; q.p = p; llamadas.push({ update: tabla, payload: p, filtros: q.f }); return b; },
      delete() { q.op = 'delete'; llamadas.push({ delete: tabla, filtros: q.f }); return b; },
      single() { q.uno = true; return b; }, maybeSingle() { q.uno = true; return b; },
      then(okf, fail) {
        let data;
        if (tabla === 'perfiles') data = perfil; else if (tabla === 'organizaciones') data = org;
        else if (q.op === 'insert') { const f = filaAccion(q.p, q.p.plan_id); tablas[tabla].push(f); data = f; }
        else if (q.op === 'update') { const f = fila(); f.forEach(r => { Object.assign(r, q.p); if (r.estado === 'completada') { r.avance = 100; r.fecha_cierre = '2026-11-10'; } r.bitacora = (r.bitacora || []).concat([{ fecha: '2026-11-10', cambios: Object.keys(q.p) }]); }); data = q.uno ? f[0] : f; }
        else if (q.op === 'delete') { const f = fila(); tablas[tabla] = tablas[tabla].filter(r => !f.includes(r)); data = f; }
        else { const f = fila(); data = q.uno ? (f[0] || null) : f; }
        return Promise.resolve({ data, error: null }).then(okf, fail);
      } }; return b;
  };
  let sesion = null;
  const cliente = { auth: { async signInWithPassword(c) { sesion = { user: { id: 'u-1', email: c.email } }; return { data: { user: sesion.user, session: sesion }, error: null }; }, async getSession() { return { data: { session: sesion } }; }, async signOut() { sesion = null; return { error: null }; } }, from: consulta, rpc };
  Object.keys(cliente).forEach(k => { TH.sb[k] = cliente[k]; });

  /* ---------- 1. Regla de sugerencias ---------- */
  console.log('[Sugerencias]');
  const dd = (r) => ({ orgId: 'o-1', estado: 'completado', respuestas: r });
  const por = (op) => { const r = {}; activas.forEach(p => { r[p.id] = { opcion: op, justificacion: 'x' }; }); return r; };
  ok(TH.api.plan.generarSugeridas(dd(por('si'))).length === 0, 'Todo «Sí» → ninguna recomendación');
  ok(TH.api.plan.generarSugeridas(dd(por('na'))).length === 0, '«No aplica» no genera acción');
  const no = TH.api.plan.generarSugeridas(dd(por('no')));
  ok(no.length === activas.length, 'Todo «No» → una recomendación por pregunta activa (' + no.length + ')');
  ok(no.every(a => { const p = activas.find(x => x.id === a.preguntaId); return a.prioridad === p.accion.prioridad; }), '«No» conserva la prioridad de la plantilla');
  const nose = TH.api.plan.generarSugeridas(dd(por('nose')));
  ok(nose.every(a => /^Verificar con las áreas responsables/.test(a.accion) && /^Sin información suficiente/.test(a.situacion)), '«No sé» genera la acción de verificación');
  const parcial = TH.api.plan.generarSugeridas(dd(por('parcial')));
  const baja = { alta: 'media', media: 'baja', baja: 'baja' };
  ok(parcial.every(a => a.prioridad === baja[activas.find(x => x.id === a.preguntaId).accion.prioridad]), '«Parcial» baja la prioridad un nivel');
  const plazo = { alta: 60, media: 120, baja: 180 };
  ok(no.concat(parcial).every(a => a.fechaObjetivo === TH.util.sumarDias(hoy(), plazo[a.prioridad])), 'Plazos sugeridos: alta +60, media +120, baja +180 días');
  const orden = { alta: 0, media: 1, baja: 2 };
  ok(no.every((a, i) => i === 0 || orden[no[i - 1].prioridad] <= orden[a.prioridad]), 'Las recomendaciones salen ordenadas por prioridad');

  /* ---------- 2 y 3. Recorrido ---------- */
  console.log('[Recorrido]');
  const A = TH.authAdaptadores.supabase;
  await A.ingresar('ana@org.test', 'Clave12345*');
  await h.ir('/organizacion/plan-accion');
  ok(JSON.stringify(h.nav()) === JSON.stringify(['/organizacion/inicio', '/organizacion/diagnostico', '/organizacion/diagnostico/resultados', '/organizacion/plan-accion', '/organizacion/plan-accion/seguimiento', '/organizacion/colaboradores', '/organizacion/biblioteca']), 'Menú: inicio, diagnóstico, plan, colaboradores y biblioteca');
  ok(/Construir el plan de acción/.test(h.texto()) && h.w.document.querySelectorAll('input[name=sel]').length > 0, 'Con diagnóstico completado y sin plan: ofrece seleccionar recomendaciones');
  ok(!/Disponible|próximamente/i.test(h.texto()), 'La pantalla del plan ya no es «próximamente»');

  const f = h.q('form[data-form="plan-generar"]');
  const marcadas = [...f.querySelectorAll('input[name=sel]')]; marcadas.forEach((c, i) => { c.checked = i < 3; });
  await h.submit(f); await sleep(300);
  const crearLlamada = llamadas.find(l => l.rpc === 'crear_plan');
  ok(crearLlamada && crearLlamada.args.p_acciones.length === 3, 'Crear plan: envía solo las 3 recomendaciones seleccionadas');
  const a0 = crearLlamada.args.p_acciones[0];
  ok(['dim', 'pregunta_id', 'origen', 'objetivo', 'accion', 'prioridad', 'responsable', 'fecha_objetivo', 'indicador', 'meta'].every(k => k in a0) && a0.origen === 'sugerida', 'Crear plan: cada acción lleva los campos esperados por la base (en snake_case)');
  ok(!JSON.stringify(crearLlamada.args).includes('organizacion_id'), 'Crear plan: no se envía la organización');
  ok(tablas.acciones.length === 3 && /#\/organizacion\/plan-accion$/.test(w.location.hash) && /Plan de acción organizacional/.test(h.texto()), 'Tras crear se muestra el plan con sus 3 acciones');

  const textoPlan = h.texto();
  ok(!/Evid\./.test(textoPlan) && !/Con evidencia/.test(textoPlan) && !/Registrar evidencia/.test(textoPlan), 'Plan: sin columna ni contador de evidencias');
  ok(!h.q('a[href="#/organizacion/reportes"]'), 'Plan: sin enlace al reporte (módulo apagado)');
  ok(!!h.q('[data-action="plan-nueva-accion"]') && !!h.q('[data-action="plan-descargar-csv"]'), 'Plan: se puede añadir una acción y descargar el CSV');
  ok(!/Evidencias registradas/.test(TH.api.plan.aCSV(TH.api.plan.obtener('o-1'))), 'CSV: sin columna de evidencias');

  // Edición de estado desde la tabla
  const sel = h.q('select[data-change="plan-estado"]'); const id1 = sel.dataset.id;
  await h.cambiar(sel, 'en-ejecucion'); await sleep(300);
  const u1 = llamadas.find(l => l.update === 'acciones');
  ok(u1 && u1.payload.estado === 'en-ejecucion' && u1.filtros[0][1] === id1 && !('organizacion_id' in u1.payload) && !('bitacora' in u1.payload), 'Cambiar estado: actualiza solo ese campo de esa acción');
  ok(TH.api.plan.obtener('o-1').acciones.find(a => a.id === id1).estado === 'en-ejecucion', 'El plan en pantalla refleja el cambio');

  // «Atrasada» se deriva de la fecha y no se guarda
  tablas.acciones[1].fecha_objetivo = '2020-01-01'; tablas.acciones[1].estado = 'pendiente';
  await TH.router.recargar(); await sleep(300);
  ok(TH.api.plan.obtener('o-1').acciones[1].estado === 'atrasada', '«Atrasada» se calcula al leer: acción pendiente con fecha vencida');
  ok(tablas.acciones[1].estado === 'pendiente', '«Atrasada» no se escribe en la base');
  const antesU = llamadas.filter(l => l.update).length;
  await TH.api.plan.actualizarAccion('o-1', tablas.acciones[1].id, { estado: 'atrasada' });
  ok(llamadas.filter(l => l.update).length === antesU, 'Elegir «Atrasada» a mano no llama a la base (es un estado derivado)');

  // Detalle: sin evidencias, con bitácora
  await h.ir('/organizacion/plan-accion/detalle?id=' + id1);
  ok(!/Evidencias institucionales|Registrar evidencia/.test(h.texto()), 'Detalle: sin el bloque de evidencias');
  ok(/Evidencia organizacional esperada/.test(h.texto()) && /Bitácora de cambios/.test(h.texto()), 'Detalle: conserva el campo «evidencia esperada» y la bitácora');
  const form = h.q('form[data-form="plan-editar"]'); form.elements.avance.value = '60'; form.elements.responsable.value = 'Comité';
  await h.submit(form); await sleep(300);
  const u2 = llamadas.filter(l => l.update).pop();
  ok(u2.payload.avance === 60 && u2.payload.responsable === 'Comité' && 'evidencia_esperada' in u2.payload && 'fecha_objetivo' in u2.payload, 'Guardar el detalle: envía los campos editables con sus nombres de columna');

  // Completar
  await h.click('[data-action="plan-completar"]'); await sleep(300);
  const u3 = llamadas.filter(l => l.update).pop();
  ok(u3.payload.estado === 'completada' && u3.payload.avance === 100, 'Marcar completada: envía estado y avance (la base fija la fecha de cierre)');

  // Acción propia
  await h.ir('/organizacion/plan-accion');
  await h.click('[data-action="plan-nueva-accion"]');
  const fn = h.q('form[data-form="plan-nueva"]');
  fn.elements.dim.value = 'd2'; fn.elements.objetivo.value = 'Objetivo propio'; fn.elements.accion.value = 'Hacer algo'; fn.elements.responsable.value = 'Ana';
  fn.elements.fechaObjetivo.value = '2027-03-01'; fn.elements.indicador.value = 'Ind'; fn.elements.meta.value = '';
  await h.submit(fn); await sleep(300);
  ok(!llamadas.some(l => l.insert), 'Acción propia sin meta: no se envía nada a la base');
  fn.elements.meta.value = '100 %'; await h.submit(fn); await sleep(400);
  const ins = llamadas.find(l => l.insert === 'acciones');
  ok(ins && ins.payload.plan_id === 'p-1' && ins.payload.origen === 'propia' && ins.payload.objetivo === 'Objetivo propio' && !('organizacion_id' in ins.payload), 'Acción propia: se inserta en el plan, sin enviar la organización');
  ok(TH.api.plan.obtener('o-1').acciones.length === 4, 'La acción propia aparece en el plan');

  // Incorporar recomendaciones pendientes
  await h.ir('/organizacion/plan-accion?incorporar=1');
  const f2 = h.q('form[data-form="plan-generar"]'); ok(!!f2, 'Incorporar: ofrece las recomendaciones que aún no están en el plan');
  const antes = tablas.acciones.length; [...f2.querySelectorAll('input[name=sel]')].forEach((c, i) => { c.checked = i < 2; }); await h.submit(f2); await sleep(300);
  ok(llamadas.some(l => l.rpc === 'incorporar_acciones') && tablas.acciones.length === antes + 2, 'Incorporar: llama a incorporar_acciones y suma 2');

  // Eliminar
  await h.ir('/organizacion/plan-accion/detalle?id=' + tablas.acciones[0].id);
  await h.click('[data-action="plan-eliminar"]'); await h.click('[data-confirmar]'); await sleep(300);
  ok(llamadas.some(l => l.delete === 'acciones') && tablas.acciones.length === antes + 1, 'Eliminar: borra solo la acción elegida');

  // Seguimiento e inicio
  await h.ir('/organizacion/plan-accion/seguimiento');
  ok(/Seguimiento de compromisos/.test(h.texto()) && !/Evidencias registradas|Registrar evidencia/.test(h.texto()), 'Seguimiento: se muestra sin el módulo de evidencias');
  await h.ir('/organizacion/inicio');
  ok(/Sigue tu plan de acción/.test(h.texto()), 'Inicio: muestra el avance del plan');

  ok(!llamadas.some(l => JSON.stringify(l).includes('organizacion_id')), 'Ninguna llamada del recorrido envía la organización');
  ok(w.localStorage.length === 0, 'Nada en localStorage');
  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
