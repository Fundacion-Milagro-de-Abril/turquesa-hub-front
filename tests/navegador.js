/* F05 · Prueba en un navegador real (Chrome/Chromium) del paquete de producción (criterios 4 y 5).
   - La CSP de index.html no bloquea nada propio del sitio (ni scripts, ni estilos, ni fuentes, ni imágenes).
   - No hay peticiones a terceros: solo al propio sitio y al proyecto de Supabase (simulado aquí, sin red).
   - Las tipografías se sirven desde el propio sitio.
   - La CSP sí bloquea lo ajeno: un script de otro dominio inyectado no se carga.
   Usa el Chrome instalado (CHROME_PATH) o el de Playwright; si no hay navegador, se omite con aviso. */
const http = require('http'); const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const RAIZ = path.resolve(__dirname, '..'); const DIST = path.join(RAIZ, 'dist');
const SUPABASE = 'https://xfifkecattmqadvqrfod.supabase.co';
const CANDIDATOS = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'].filter(Boolean);

(async () => {
  let pasos = 0, fallos = 0; const ok = (c, m) => { pasos++; if (!c) { fallos++; console.log('  ✗ ' + m); } else console.log('  ✓ ' + m); };
  const { chromium } = require('playwright');
  const ruta = CANDIDATOS.find(p => { try { return fs.existsSync(p); } catch (_) { return false; } });
  let navegador;
  try { navegador = await chromium.launch({ executablePath: ruta, args: ['--no-sandbox'] }); }
  catch (e) { console.log('Prueba en navegador omitida: no hay Chrome/Chromium disponible (define CHROME_PATH).'); process.exit(0); }

  execFileSync('node', [path.join(RAIZ, 'tools', 'build.js'), 'produccion'], { stdio: 'ignore' });
  const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.txt': 'text/plain' };
  const servidor = http.createServer((req, res) => {
    const p = path.join(DIST, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!p.startsWith(DIST) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
  }).listen(0);
  const base = 'http://localhost:' + servidor.address().port + '/';

  const pagina = await (await navegador.newContext()).newPage();
  const peticiones = []; const violaciones = [];
  pagina.on('request', r => peticiones.push(r.url()));
  pagina.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) violaciones.push(m.text()); });
  await pagina.addInitScript(() => { document.addEventListener('securitypolicyviolation', e => { (window.__csp = window.__csp || []).push(e.violatedDirective + ' ' + e.blockedURI); }); });
  // Supabase simulado: el aviso publicado (pantalla de activación) y respuestas vacías para lo demás.
  await pagina.route(SUPABASE + '/**', r => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' },
    body: /avisos/.test(r.request().url()) ? JSON.stringify({ version: 'v1', titulo: 'Aviso', texto: 'Texto', publicado_en: null }) : '[]' }));

  console.log('[Navegador real · paquete de producción]');
  for (const r of ['', '#/acceso', '#/activar-invitacion?codigo=abc', '#/recuperar-acceso', '#/conocer-turquesa-hub']) {
    await pagina.goto(base + 'index.html' + r, { waitUntil: 'networkidle' }); await pagina.waitForTimeout(300);
  }
  const cspPropias = (await pagina.evaluate(() => window.__csp || [])).concat(violaciones);
  ok(cspPropias.length === 0, 'La CSP no bloquea nada del propio sitio' + (cspPropias.length ? ': ' + cspPropias.slice(0, 3).join(' | ') : ''));
  const terceros = [...new Set(peticiones.filter(u => !u.startsWith(base) && !u.startsWith(SUPABASE) && !u.startsWith('data:')))];
  ok(terceros.length === 0, 'Sin peticiones a terceros' + (terceros.length ? ': ' + terceros.join(', ') : ''));
  ok(peticiones.some(u => u.startsWith(base + 'assets/fonts/') && u.endsWith('.woff2')), 'Las tipografías se descargan del propio sitio');
  const familias = await pagina.evaluate(async () => { await document.fonts.ready; return [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')); });
  ok(familias.includes('Poppins') && familias.includes('Nunito Sans'), 'Poppins y Nunito Sans quedan cargadas (' + [...new Set(familias)].join(', ') + ')');
  await pagina.goto(base + 'index.html#/activar-invitacion?codigo=abc', { waitUntil: 'networkidle' }); await pagina.waitForTimeout(300);
  const activacion = await pagina.textContent('#app');
  ok(/Activa tu acceso/.test(activacion) && /versión v1/.test(activacion), 'La pantalla de activación carga el aviso desde Supabase (la CSP permite esa conexión)');

  // La CSP bloquea lo ajeno
  await pagina.evaluate(() => { const s = document.createElement('script'); s.src = 'https://ejemplo-malicioso.test/x.js'; document.head.appendChild(s); });
  await pagina.waitForTimeout(300);
  const bloqueos = await pagina.evaluate(() => window.__csp || []);
  ok(bloqueos.some(v => /script-src/.test(v) && /ejemplo-malicioso/.test(v)), 'Un script de otro dominio queda bloqueado por la CSP');
  const enLinea = await pagina.evaluate(() => { window.__enLinea = false; const s = document.createElement('script'); s.textContent = 'window.__enLinea = true'; document.head.appendChild(s); return window.__enLinea; });
  ok(enLinea === false, 'Un script en línea inyectado no se ejecuta');

  // Accesibilidad de la zona pública (F06, criterio 6): axe-core WCAG 2.x A y AA. Contexto aparte que ignora la CSP
  // solo para poder inyectar axe; el sitio que ve la gente sí la aplica (verificado arriba).
  console.log('[Accesibilidad · zona pública]');
  const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  const pa = await (await navegador.newContext({ bypassCSP: true })).newPage();
  await pa.route(SUPABASE + '/**', r => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: 'null' }));
  for (const r of ['', '#/como-acceder', '#/herramientas', '#/autocuidado', '#/privacidad', '#/acceso', '#/activar-invitacion', '#/recuperar-acceso']) {
    for (const ancho of [1280, 375]) {
      await pa.setViewportSize({ width: ancho, height: 900 });
      await pa.goto(base + 'index.html' + r, { waitUntil: 'networkidle' }); await pa.waitForTimeout(200);
      await pa.evaluate(axe);
      const v = await pa.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })).violations.map(x => x.id + ' (' + x.nodes.length + ')'));
      const desborde = await pa.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      ok(v.length === 0 && !desborde, (r || '#/') + ' · ' + ancho + ' px: sin violaciones de accesibilidad' + (ancho === 375 ? ' y sin desborde horizontal' : '') + (v.length ? ': ' + v.join(', ') : '') + (desborde ? ' · DESBORDA' : ''));
    }
  }

  await navegador.close(); servidor.close();
  console.log('\n' + pasos + ' verificaciones · ' + fallos + ' fallos'); process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
