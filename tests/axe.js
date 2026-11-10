/* Auditoría de accesibilidad (axe-core, WCAG 2.0/2.1/2.2 A+AA) sobre las vistas de Turquesa Hub (público, organización, colaborador y FMA).
   La sesión de cada perfil se abre con TH.auth._sesionDePrueba (solo existe en entorno de desarrollo).
   Requiere un servidor estático en http://localhost:8765 sirviendo public/ (desde turquesa-hub/public: python3 -m http.server 8765)
   y Chrome/Chromium. Ejecutar: node tests/axe.js */
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const axe = fs.readFileSync(path.join(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
  const base = 'http://localhost:8765/index.html#';
  const rutas = [['/', null], ['/conocer-turquesa-hub', null], ['/sello-turquesa', null], ['/acceso', null], ['/registro', null], ['/activar-invitacion', null], ['/privacidad', '/aviso-registro', null],
    ['/organizacion/inicio', 'usr-org-001'], ['/organizacion/perfil', 'usr-org-001'], ['/organizacion/diagnostico?revisar=1', 'usr-org-001'], ['/organizacion/diagnostico/resultados', 'usr-org-001'], ['/organizacion/plan-accion', 'usr-org-001'], ['/organizacion/plan-accion/seguimiento', 'usr-org-001'], ['/organizacion/colaboradores', 'usr-org-001'], ['/organizacion/sensibilizacion', 'usr-org-001'], ['/organizacion/biblioteca', 'usr-org-001'],  ['/organizacion/reportes', 'usr-org-001'], ['/organizacion/sello', 'usr-org-001'], ['/organizacion/configuracion', 'usr-org-001'],
    ['/colaborador/inicio', 'usr-col-001'], ['/colaborador/formacion/modulo?id=mod-1', 'usr-col-001'], ['/colaborador/mi-progreso', 'usr-col-001'], ['/colaborador/perfil', 'usr-col-001'],
    ['/fma/inicio', 'usr-fma-001'], ['/fma/organizaciones', 'usr-fma-001'], ['/fma/organizaciones/detalle?id=org-001', 'usr-fma-001'], ['/fma/diagnosticos', 'usr-fma-001'], ['/fma/contenidos', 'usr-fma-001'], ['/fma/contenidos?id=rec-prevencion', 'usr-fma-001'], ['/fma/formacion', 'usr-fma-001'], ['/fma/formacion/version?id=modv-mod-1-1', 'usr-fma-001'], ['/fma/documentos-legales', 'usr-fma-001'], ['/fma/documentos-legales?id=doc-condiciones-2026-11-b1', 'usr-fma-001'], ['/fma/sello', 'usr-fma-001'], ['/fma/usuarios', 'usr-fma-001'], ['/fma/auditoria', 'usr-fma-001'], ['/fma/configuracion', 'usr-fma-001']];
  let total = 0;
  for (const [r, u] of rutas) {
    await page.goto(base + '/'); await page.waitForTimeout(100);
    if (u) await page.evaluate(id => TH.auth._sesionDePrueba(id), u);
    await page.goto(base + r); await page.waitForTimeout(300);
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }); return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, html: v.nodes.map(n => n.html.slice(0, 90)) })); });
    total += res.length; console.log(r, res.length ? JSON.stringify(res) : 'OK');
  }
  console.log('violaciones totales:', total);
  await browser.close(); process.exit(total ? 1 : 0);
})();
