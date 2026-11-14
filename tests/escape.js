/* F05 · Escape de datos de usuario (criterios 1 y 3).
   1. Revisión estática: busca datos de usuario concatenados en HTML sin esc(). Las excepciones están documentadas
      abajo: todas terminan en una función que ya escapa (título de modal, toast, kpi, badge, alerta, dl, gráfico).
   2. Inyección: con Supabase simulado, carga en todos los campos de texto un fragmento HTML malicioso y recorre las
      pantallas activas de los tres roles. Nada debe convertirse en HTML: el fragmento debe verse como texto. */
const fs = require('fs'); const path = require('path');
const { crear } = require('./lib/entorno');
const JS = path.resolve(__dirname, '..', 'public', 'js');

/* ---------- 1. Revisión estática ---------- */
const CAMPOS = 'nombre|email|cargo|titulo|objetivo|accion|responsable|observaciones|situacion|area|descripcion|meta|indicador|justificacion|identificacion|telefono|tema|categoria|resumen|duracion|municipio|sector';
const re = new RegExp('\\+\\s*((?:[\\w$]+\\.)+(?:' + CAMPOS + '))\\b(?!\\s*[\\(\\.\\[])', 'g');
// Excepciones revisadas (archivo + fragmento): el valor va a una función que escapa.
const EXCEPCIONES = [
  ['views/admin.js', "['Contacto', det.contacto"],                  // TH.ui.dl escapa los valores
  ['views/admin.js', "titulo: 'Editar · ' + d.titulo"],              // TH.ui.modal escapa el título
  ['views/admin.js', "titulo: 'Permisos · ' + u.nombre"],            // idem
  ['views/collaborator.js', "siguiente.titulo + ' · ' + siguiente.duracion"], // TH.ui.siguientePaso escapa
  ['views/organization.js', "'Lectura orientativa · ' + res.nivelGlobal.nombre"], // TH.ui.kpi escapa
  ['views/organization.js', "' ' + m.modulo.titulo, valor"],         // TH.graficos.barras escapa la etiqueta
  ['views/organization.js', "'Asignar módulos · ' + inv.nombre"],    // título de modal
  ['views/organization.js', "'Asignar módulos · ' + u.nombre"],      // título de modal
  ['views/public.js', "'Acceso activado. Bienvenido/a, ' + r.usuario.nombre"], // TH.ui.toast escapa
  ['components/layout.js', "'Nueva versión publicada: ') + t.nombre"], // título de TH.ui.alerta (escapado)
  ['admin-supabase.js', "'Invitar responsable · ' + el.dataset.nombre"], // título de modal
  ['formacion-supabase.js', "'M' + m.orden + ' · ' + m.titulo : id"], // nombreModulo(): se usa dentro de esc() o badge()
  ['formacion-supabase.js', "'Módulos · ' + el.dataset.nombre"]     // título de modal
];
const archivos = ['views', 'components'].flatMap(d => fs.readdirSync(path.join(JS, d)).map(f => d + '/' + f))
  .concat(['router.js', 'supabase.js', 'admin-supabase.js', 'org-supabase.js', 'formacion-supabase.js']);
const hallazgos = [];
for (const f of archivos) {
  const t = fs.readFileSync(path.join(JS, f), 'utf8'); let m;
  while ((m = re.exec(t))) {
    const contexto = t.slice(Math.max(0, m.index - 60), m.index + m[0].length + 20);
    if (!EXCEPCIONES.some(([a, frag]) => a === f && contexto.includes(frag))) hallazgos.push(f + ':' + t.slice(0, m.index).split('\n').length + '  ' + contexto.replace(/\s+/g, ' '));
  }
}

(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 150 });
  const { w, ok, sleep } = h; const TH = await h.listo();
  console.log('[Revisión estática]');
  hallazgos.forEach(x => console.log('    ' + x));
  ok(hallazgos.length === 0, 'Ningún dato de usuario se concatena en HTML sin esc() (' + EXCEPCIONES.length + ' excepciones documentadas)');

  /* ---------- 2. Inyección ---------- */
  console.log('[Inyección]');
  const X = '<img src=x onerror="window.__xss=1" data-xss>';
  const M1 = TH.data.modulos[0];
  const modulo = Object.assign(JSON.parse(JSON.stringify(M1)), { titulo: X + 'Módulo', resumen: X, lecciones: M1.lecciones.map(l => Object.assign({}, l, { titulo: X + l.titulo, cuerpo: [X] })) });
  modulo.quiz = M1.quiz.map(q => Object.assign({}, q, { texto: X + q.texto }));
  const contenido = Object.assign(JSON.parse(JSON.stringify(TH.data.contenidos[0])), { titulo: X + 'Guía', descripcion: X, publico: ['organizacion', 'colaborador'] });
  const activas = TH.data.instrumento.preguntas.filter(p => p.alcance === 'activa');
  const respuestas = {}; activas.forEach(p => { respuestas[p.id] = p.permiteNA ? { opcion: 'na', justificacion: X } : { opcion: 'no' }; });
  const tablas = {
    perfiles: [{ id: 'u-org', organizacion_id: 'o-1', rol: 'organizacion', nombre: X + 'Ana', cargo: X, area: X, estado: 'activo' },
               { id: 'u-col', organizacion_id: 'o-1', rol: 'colaborador', nombre: X + 'Laura', area: X, estado: 'activo' },
               { id: 'u-adm', organizacion_id: null, rol: 'admin_fma', nombre: X + 'Admin', estado: 'activo' }],
    organizaciones: [{ id: 'o-1', nombre: X + 'Org', tipo_identificacion: 'NIT', identificacion: X, responsable: X, estado: 'activa', creado_en: '2026-11-01T00:00:00Z' }],
    diagnosticos: [{ id: 'd-1', organizacion_id: 'o-1', ciclo: 1, estado: 'completado', instrumento_version: '1.0', preguntas: activas.map(p => p.id), respuestas, pregunta_actual: 0, resultado: { global: 10, dimensiones: [] }, archivado: false, fecha_inicio: '2026-11-10T00:00:00Z', fecha_fin: '2026-11-10T01:00:00Z' }],
    planes: [{ id: 'p-1', organizacion_id: 'o-1', diagnostico_id: 'd-1', historial: [{ fecha: '2026-11-10', accion: X }], creado_en: '2026-11-10T00:00:00Z' }],
    acciones: [{ id: 'a-1', plan_id: 'p-1', organizacion_id: 'o-1', dim: 'd1', pregunta_id: null, origen: 'propia', situacion: X, objetivo: X + 'Objetivo', accion: X, prioridad: 'alta', responsable: X, fecha_objetivo: '2020-01-01', indicador: X, meta: X, evidencia_esperada: X, estado: 'pendiente', avance: 10, observaciones: X, bitacora: [{ fecha: '2026-11-10', cambios: ['objetivo'] }], creado_en: '2026-11-10T00:00:00Z' }],
    invitaciones: [{ id: 'i-1', organizacion_id: 'o-1', email: X + '@x.test', rol: 'colaborador', estado: 'pendiente', modulos: ['mod-1'], vence_en: '2999-01-01T00:00:00Z', creada_en: '2026-11-10T00:00:00Z' }],
    auditoria: [{ id: 1, actor_id: 'u-org', organizacion_id: 'o-1', accion: X, entidad: X, entidad_id: X, detalle: { nombre: X }, creado_en: '2026-11-10T00:00:00Z' }],
    modulo_versiones: [{ id: 'modv-mod-1-1', modulo_id: 'mod-1', estado: 'publicado', datos: Object.assign(modulo, { version: '1.0', historial: [{ fecha: '2026-11-10', actor: X, accion: X, version: '1.0' }], revisiones: [] }) }],
    contenidos: [{ id: contenido.id, estado: 'publicado', publico: contenido.publico, datos: Object.assign(contenido, { historial: [{ fecha: '2026-11-10', actor: X, accion: X }] }) }],
    asignaciones_modulo: [{ user_id: 'u-col', modulo_id: 'mod-1' }],
    progreso: [{ id: 'pr-1', organizacion_id: 'o-1', user_id: 'u-col', modulo_id: 'mod-1', lecciones_vistas: [M1.lecciones[0].id], respuestas: {}, puntaje: null, estado: 'en-curso', fecha_inicio: '2026-11-10T00:00:00Z' }]
  };
  const personas = [{ id: 'u-org', nombre: X + 'Ana', email: X, rol: 'organizacion', estado: 'activo', area: X, cargo: X, organizacion_id: 'o-1', creado_en: '2026-11-01T00:00:00Z' },
                    { id: 'u-col', nombre: X + 'Laura', email: X, rol: 'colaborador', estado: 'activo', area: X, organizacion_id: 'o-1', creado_en: '2026-11-01T00:00:00Z' }];
  let actual = null; let sesion = null;
  const rpc = async (n, a) => ({ data: n === 'listar_personas' ? (a && a.p_organizacion_id === null ? [{ id: 'u-adm', nombre: X, email: X, rol: 'admin_fma', estado: 'activo' }] : personas)
    : n === 'resumen_formacion' ? [{ usuario_id: 'u-col', nombre: X, estado_persona: 'activo', modulo_id: 'mod-1', asignado: true, estado: 'en-curso', puntaje: null, lecciones: 1 }]
    : n === 'resumen_formacion_fma' ? [{ organizacion_id: 'o-1', colaboradores: 1, asignaciones: 1, completados: 0 }] : null, error: null });
  const consulta = (tabla) => { const q = { f: [] }; const b = { select() { return b; }, order() { return b; }, limit() { return b; }, eq(k, v) { q.f.push([k, v]); return b; }, maybeSingle() { q.uno = true; return b; }, single() { q.uno = true; return b; },
    then(okf, fail) { const f = (tablas[tabla] || []).filter(r => q.f.every(([k, v]) => r[k] === v)); return Promise.resolve({ data: JSON.parse(JSON.stringify(q.uno ? (f[0] || null) : f)), error: null }).then(okf, fail); } }; return b; };
  Object.assign(TH.sb, { from: consulta, rpc, auth: { async signInWithPassword(c) { sesion = { user: { id: actual, email: 'x@x.test' } }; return { data: { user: sesion.user, session: sesion }, error: null }; }, async getSession() { return { data: { session: sesion } }; }, async signOut() { sesion = null; return { error: null }; } } });
  const A = TH.authAdaptadores.supabase;
  const entrar = async (id) => { if (sesion) await A.salir(); actual = id; await A.ingresar('x@x.test', 'Clave12345*'); };
  const limpio = () => !w.document.querySelector('[data-xss]') && !w.__xss;
  const revisar = async (ruta, extra) => {
    await h.ir(ruta); await sleep(100); if (extra) await extra();
    const texto = w.document.getElementById('app').textContent + (w.document.getElementById('modal-root').textContent || '');
    const ve = texto.includes('<img src=x');
    ok(limpio() && ve, ruta + ': el HTML malicioso se ve como texto y no se ejecuta');
  };

  await entrar('u-org');
  for (const r of ['/organizacion/inicio', '/organizacion/diagnostico/resultados', '/organizacion/plan-accion', '/organizacion/plan-accion/detalle?id=a-1', '/organizacion/plan-accion/seguimiento', '/organizacion/colaboradores', '/organizacion/biblioteca', '/organizacion/biblioteca?id=' + contenido.id]) await revisar(r);
  await revisar('/organizacion/colaboradores', async () => { await h.click('[data-action="sb-colab-tab"][data-tab="invitaciones"]'); });
  await revisar('/organizacion/colaboradores', async () => { await h.click('[data-action="sb-colab-tab"][data-tab="avance"]'); });
  await revisar('/organizacion/colaboradores', async () => { await h.click('[data-action="sb-colab-tab"][data-tab="personas"]'); await h.click('[data-action="sb-persona-estado"][data-id="u-col"]'); });
  ok(limpio(), 'El cuadro de confirmación con el nombre de la persona no ejecuta HTML'); TH.ui.cerrarModal();

  await entrar('u-col');
  for (const r of ['/colaborador/inicio', '/colaborador/formacion', '/colaborador/formacion/modulo?id=mod-1', '/colaborador/mi-progreso', '/colaborador/recursos', '/colaborador/perfil']) await revisar(r);

  await entrar('u-adm');
  for (const r of ['/fma/inicio', '/fma/organizaciones', '/fma/organizaciones/detalle?id=o-1', '/fma/equipo', '/fma/auditoria', '/fma/formacion', '/fma/formacion/version?id=modv-mod-1-1', '/fma/contenidos']) await revisar(r);
  ok(!w.__xss, 'En todo el recorrido no se ejecutó ningún código inyectado');

  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
