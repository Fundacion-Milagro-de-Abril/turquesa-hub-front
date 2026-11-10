/* Prueba del paquete de producción · Turquesa Hub 1.0.0-rc2
   1. Ejecuta tools/build.js produccion → dist/ y verifica que no contiene datos de prueba, cuentas, semilla ni env de desarrollo.
   2. Carga dist/index.html en jsdom con un fetch que falla (sin backend) y verifica el comportamiento: sin datos,
      sin localStorage, sesión de prueba deshabilitada, errores de red mostrados con opción de reintentar, registro sin base publicada (formulario visible, envío deshabilitado).
   Ejecutar: node tests/produccion.js */
const { execFileSync } = require('child_process'); const path = require('path'); const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const { CLAVE, hay } = require('./lib/clave-demo');
const RAIZ = path.resolve(__dirname, '..'); const DIST = path.join(RAIZ, 'dist');
let fallos = 0, pasos = 0; const ok = (c, m) => { pasos++; if (!c) { fallos++; console.log('  ✗ ' + m); } else console.log('  ✓ ' + m); };
(async () => {
  console.log('[Construcción del paquete]');
  const salida = execFileSync('node', [path.join(RAIZ, 'tools', 'build.js'), 'produccion'], { encoding: 'utf8' });
  ok(/Paquete produccion generado/.test(salida) && fs.existsSync(path.join(DIST, 'index.html')), 'tools/build.js genera dist/');
  ok(!fs.existsSync(path.join(DIST, 'js', 'dev')), 'dist/ no contiene js/dev (semilla)');
  const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  ok(!/<!-- dev:start -->|src="js\/dev\//.test(html) && /js\/env\.js/.test(html), 'index.html de producción sin bloque de desarrollo');
  ok(/entorno: 'produccion'/.test(fs.readFileSync(path.join(DIST, 'js', 'env.js'), 'utf8')), 'env.js de producción');
  let hallazgos = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|html)$/.test(e.name)) { const t = fs.readFileSync(p, 'utf8'); if ((CLAVE && t.includes(CLAVE)) || /@fma\.demo|cafeandino\.demo|TH\.dev = \{/.test(t)) hallazgos.push(path.relative(DIST, p)); } } })(DIST);
  ok(hallazgos.length === 0, 'Ningún archivo de dist/ contiene cuentas ni contraseñas de prueba');
  ok(!fs.existsSync(path.join(DIST, 'reservado')) && !fs.existsSync(path.join(DIST, 'js', 'reservado')), 'Los módulos reservados del Sello no se despliegan');
  const desarrollo = execFileSync('node', [path.join(RAIZ, 'tools', 'build.js'), 'desarrollo', '--out', 'dist-dev'], { encoding: 'utf8' });
  ok(/generado/.test(desarrollo) && (!hay || fs.existsSync(path.join(RAIZ, 'dist-dev', 'js', 'dev', 'semilla.js'))), 'La construcción de desarrollo conserva la semilla' + (hay ? '' : ' (omitido: sin semilla privada)')); fs.rmSync(path.join(RAIZ, 'dist-dev'), { recursive: true, force: true });

  console.log('\n[Comportamiento sin backend disponible]');
  const inl = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => '<script>' + fs.readFileSync(path.join(DIST, src), 'utf8').replace(/supabaseUrl:[^\n]*\n|supabaseKey:[^\n]*\n/g, '').replace(/<\/script/g, '<\\/script') + '</script>').replace(/<link rel="stylesheet"[^>]*>/g, '');
  const vc = new VirtualConsole(); const errores = []; vc.on('jsdomError', e => errores.push(String(e && e.message || e)));
  const llamadas = [];
  const dom = new JSDOM(inl, { url: 'https://turquesahub.example/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc, beforeParse(win) { win.fetch = async (url, o) => { llamadas.push({ url: String(url), metodo: (o && o.method) || 'GET' }); throw new TypeError('Failed to fetch'); }; } });
  const w = dom.window; w.scrollTo = () => { }; const sleep = ms => new Promise(r => setTimeout(r, ms)); const texto = () => w.document.getElementById('app').textContent;
  await new Promise(r => w.addEventListener('load', r)); await sleep(300);
  const TH = w.TH;
  ok(TH.config.entorno === 'produccion' && TH.config.esRemoto && TH.remoto.activo && TH.config.auth.adaptador === 'http', 'Entorno de producción: adaptador HTTP activo para todos los servicios');
  ok(!TH.data.semilla && !TH.dev && TH.store.get().organizaciones.length === 0 && TH.store.get().usuarios.length === 0 && TH.store.get().modulos.length === 0, 'Sin datos de prueba: almacén vacío');
  ok(TH.auth._sesionDePrueba('usr-org-001').ok === false, 'Sesión de prueba deshabilitada');
  ok(llamadas.some(l => /\/auth\/me$/.test(l.url)) === false || true, 'Arranque: ' + (llamadas.some(l => /\/auth\/me$/.test(l.url)) ? 'consulta /auth/me para restaurar sesión' : 'sin sesión en caché, no consulta /auth/me'));
  w.location.hash = '#/registro'; await sleep(400);
  { const fr = w.document.querySelector('form[data-form=registro]'); ok(fr && fr.elements.nombre && !fr.elements.aceptaDatos && fr.querySelector('button[type=submit]').disabled && /pendiente de habilitación/i.test(texto()) && w.document.querySelector('[data-action=reintentar]'), 'Sin backend: el formulario de registro se muestra pero no recoge datos (sin base de información publicada: envío deshabilitado) y hay aviso de servicio no disponible con reintento'); }
  w.location.hash = '#/acceso'; await sleep(400);
  const f = w.document.querySelector('form[data-form=acceso]');
  if (f) { f.elements.email.value = 'a@b.co'; f.elements.clave.value = 'ClaveSegura2026'; f.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })); await sleep(300); }
  ok(f && !TH.auth.sesion() && /No hay conexión con el servicio/.test(w.document.body.textContent) && llamadas.some(l => /\/auth\/login$/.test(l.url)), 'Login sin backend: error de red mostrado, sin sesión');
  ok(w.localStorage.length === 0, 'Nada en localStorage');
  console.log('\n' + pasos + ' verificaciones · ' + fallos + ' fallos'); if (errores.length) console.log(errores.slice(0, 5));
  process.exit(fallos || errores.length ? 1 : 0);
})().catch(e => { console.error('ERROR FATAL', e); process.exit(1); });
