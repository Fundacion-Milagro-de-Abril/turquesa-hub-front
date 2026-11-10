#!/usr/bin/env node
/* Construye el paquete de despliegue en dist/ a partir de public/.
   - Copia public/ excluyendo js/dev/ (datos de prueba) y cualquier archivo *.dev.*
   - Sustituye js/env.js por config/env.<entorno>.js (por defecto produccion)
   - Elimina de index.html los bloques <!-- dev:start --> … <!-- dev:end -->
   - Verifica que el resultado no contenga la semilla, cuentas de prueba ni referencias a js/dev/
   Uso: node tools/build.js [produccion|desarrollo] [--out dist] */
const fs = require('fs'); const path = require('path');
const raiz = path.resolve(__dirname, '..');
const args = process.argv.slice(2); const entorno = args.find(a => !a.startsWith('--')) || 'produccion';
const outIdx = args.indexOf('--out'); const out = path.resolve(raiz, outIdx >= 0 ? args[outIdx + 1] : 'dist');
const origen = path.join(raiz, 'public'); const env = path.join(raiz, 'config', 'env.' + entorno + '.js');
if (!fs.existsSync(env)) { console.error('Entorno desconocido: ' + entorno); process.exit(1); }
fs.rmSync(out, { recursive: true, force: true });
function copiar(dir, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.relative(origen, path.join(dir, e.name)).replace(/\\/g, '/');
    if (entorno === 'produccion' && (rel === 'js/dev' || /\.dev\./.test(e.name))) continue;
    if (e.isDirectory()) copiar(path.join(dir, e.name), path.join(dest, e.name));
    else fs.copyFileSync(path.join(dir, e.name), path.join(dest, e.name));
  }
}
copiar(origen, out);
fs.copyFileSync(env, path.join(out, 'js', 'env.js'));
const idx = path.join(out, 'index.html'); let html = fs.readFileSync(idx, 'utf8');
if (entorno === 'produccion') html = html.replace(/\s*<!-- dev:start -->[\s\S]*?<!-- dev:end -->/g, '');
fs.writeFileSync(idx, html);
// Verificación del paquete de producción
if (entorno === 'produccion') {
  const problemas = [];
  if (fs.existsSync(path.join(out, 'js', 'dev'))) problemas.push('dist/js/dev existe');
  if (/src="js\/dev\//.test(html)) problemas.push('index.html carga scripts de js/dev/');
  if (!/entorno: 'produccion'/.test(fs.readFileSync(path.join(out, 'js', 'env.js'), 'utf8'))) problemas.push('env.js no es de producción');
  const todo = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|html)$/.test(e.name)) todo.push(p); } })(out);
  for (const f of todo) { const t = fs.readFileSync(f, 'utf8'); if (/Turquesa2026\*|@fma\.demo|cafeandino\.demo/.test(t)) problemas.push('cuentas o contraseñas de prueba en ' + path.relative(out, f)); }
  if (problemas.length) { console.error('Paquete de producción inválido:\n - ' + problemas.join('\n - ')); process.exit(1); }
}
console.log('Paquete ' + entorno + ' generado en ' + path.relative(raiz, out) + '/');
