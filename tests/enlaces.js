/* F06 · Los enlaces a herramientas de FMA responden (criterio 4). Necesita red: sin conexión se omite con aviso. */
const vm = require('vm'); const fs = require('fs'); const path = require('path');
(async () => {
  const fuente = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'js', 'publico-supabase.js'), 'utf8');
  const urls = [...new Set([...fuente.matchAll(/(?:HERR \+ '([a-z-]+\.html)'|'(https:\/\/[a-z]+\.fundacionmilagrodeabril\.org\/[^']*)')/g)]
    .map(m => m[1] ? 'https://herramientas.fundacionmilagrodeabril.org/' + m[1] : m[2]))]
    .filter(u => u !== 'https://herramientas.fundacionmilagrodeabril.org/');   // la base es solo un prefijo en el código, no un enlace visible
  let fallos = 0;
  for (const u of urls) {
    try { const r = await fetch(u, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) }); const okk = r.status === 200; if (!okk) fallos++; console.log('  ' + (okk ? '✓' : '✗') + ' ' + r.status + ' ' + u); }
    catch (e) { if (/ENOTFOUND|EAI_AGAIN|fetch failed/.test(String(e.cause || e))) { console.log('Prueba de enlaces omitida: sin conexión.'); process.exit(0); } fallos++; console.log('  ✗ ' + u + ' · ' + e.message); }
  }
  console.log('\n' + urls.length + ' enlaces · ' + fallos + ' fallos'); process.exit(fallos ? 1 : 0);
})();
