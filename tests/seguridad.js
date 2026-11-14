/* F05 · Comprobaciones estáticas de seguridad del front (criterios 5, 6, 8 y 9).
   CSP presente y coherente con la configuración; sin recursos de terceros; fuentes locales existentes;
   versiones exactas; supabase-js copiado y con la huella anotada; sin claves secretas ni service_role. */
const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const RAIZ = path.resolve(__dirname, '..'); const PUB = path.join(RAIZ, 'public');
let pasos = 0, fallos = 0; const ok = (c, m) => { pasos++; if (!c) { fallos++; console.log('  ✗ ' + m); } else console.log('  ✓ ' + m); };
const leer = (p) => fs.readFileSync(path.join(RAIZ, p), 'utf8');
const todos = (dir, ext) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? todos(path.join(dir, e.name), ext) : (ext.test(e.name) ? [path.join(dir, e.name)] : []));

console.log('[CSP y recursos]');
const html = leer('public/index.html');
const csp = (/http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html) || [])[1] || '';
const dir = Object.fromEntries(csp.split(';').map(x => x.trim().split(/\s+/)).filter(x => x[0]).map(x => [x[0], x.slice(1)]));
ok(!!csp, 'index.html declara una CSP');
ok(JSON.stringify(dir['script-src']) === JSON.stringify(["'self'"]), "script-src solo 'self' (sin 'unsafe-inline' ni 'unsafe-eval')");
ok(JSON.stringify(dir['default-src']) === JSON.stringify(["'self'"]) && JSON.stringify(dir['object-src']) === JSON.stringify(["'none'"]) && JSON.stringify(dir['base-uri']) === JSON.stringify(["'self'"]), "default-src 'self', object-src 'none' y base-uri 'self'");
const urlProd = (/supabaseUrl:\s*'([^']+)'/.exec(leer('config/env.produccion.js')) || [])[1];
ok(urlProd && (dir['connect-src'] || []).includes(urlProd) && dir['connect-src'].length === 2, 'connect-src: solo el sitio y el Supabase de config/env.produccion.js (' + urlProd + ')');
ok(!/https?:\/\/(?!www\.w3\.org)/.test(html.replace(/<!--[\s\S]*?-->/g, '').replace(urlProd, '')), 'index.html no carga nada de otros dominios');
const css = todos(path.join(PUB, 'css'), /\.css$/).map(f => fs.readFileSync(f, 'utf8')).join('\n');
ok(!/@import|url\(\s*['"]?https?:/.test(css), 'Las hojas de estilo no importan recursos externos');
const fuentes = [...css.matchAll(/url\('\.\.\/(assets\/fonts\/[^']+)'\)/g)].map(m => m[1]);
ok(fuentes.length >= 3 && fuentes.every(f => fs.existsSync(path.join(PUB, f))), 'Las ' + fuentes.length + ' tipografías declaradas existen en assets/fonts');
ok(['OFL-Poppins.txt', 'OFL-NunitoSans.txt', 'OFL-Lora.txt'].every(f => fs.existsSync(path.join(PUB, 'assets', 'fonts', f))), 'Las licencias OFL de las tipografías acompañan los archivos');

console.log('[Dependencias]');
const pkg = JSON.parse(leer('tests/package.json'));
const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
ok(Object.values(deps).every(v => /^\d+\.\d+\.\d+$/.test(v)), 'tests/package.json fija versiones exactas (' + Object.entries(deps).map(([k, v]) => k + '@' + v).join(', ') + ')');
const vendorReadme = leer('public/js/vendor/README.md');
const huella = crypto.createHash('sha256').update(fs.readFileSync(path.join(PUB, 'js', 'vendor', 'supabase.js'))).digest('hex');
ok(vendorReadme.includes(huella), 'supabase-js está copiado en el repositorio y su SHA-256 coincide con el anotado');
ok(!/<script[^>]+src="https?:/.test(html), 'Ningún script se carga desde un CDN');

console.log('[Claves]');
const codigo = todos(PUB, /\.(js|html)$/).concat(todos(path.join(RAIZ, 'config'), /\.js$/)).filter(f => !f.includes(path.join('js', 'vendor')));
// Sin comentarios (los comentarios advierten justamente de no poner esas claves).
const sinComentarios = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*\/\/.*$/gm, '');
const sospechosos = codigo.filter(f => /sb_secret_|service_role|SUPABASE_SERVICE|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJ[^"']*c2VydmljZV9yb2xl/.test(sinComentarios(fs.readFileSync(f, 'utf8'))));
ok(sospechosos.length === 0, 'Sin claves secretas ni service_role en el código del navegador' + (sospechosos.length ? ': ' + sospechosos.join(', ') : ''));
const claves = codigo.flatMap(f => [...fs.readFileSync(f, 'utf8').matchAll(/sb_(publishable|secret)_[A-Za-z0-9_-]+/g)].map(m => m[0]));
ok(claves.length >= 1 && claves.every(k => k.startsWith('sb_publishable_')), 'La única clave de Supabase en el front es la publishable');

console.log('\n' + pasos + ' verificaciones · ' + fallos + ' fallos'); process.exit(fallos ? 1 : 0);
