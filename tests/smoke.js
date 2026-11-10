/* Pruebas de humo · Turquesa Hub 1.0.0-rc2 · entorno de DESARROLLO (adaptador local, datos de prueba).
   Ejecuta el escenario completo (tests/lib/escenario.js): documentos jurídicos → flujo editorial de módulos y
   contenidos → empresa nueva → aislamiento → colaborador → empresa existente → administración FMA, más las
   verificaciones propias del entorno local (persistencia sin credenciales).
   Ejecutar: node tests/smoke.js  (requiere `npm install` en tests/) */
const { crear } = require('./lib/entorno'); const escenario = require('./lib/escenario');
(async () => {
  const h = crear({ entorno: 'desarrollo' }); const TH = await h.listo(); const { w, ok, sleep } = h;
  await escenario(h, { remoto: false, estado: () => TH.store.get() });
  console.log('\n[Persistencia de desarrollo]');
  await sleep(350);
  const guardado = JSON.parse(w.localStorage.getItem('turquesa-hub-dev-v4') || '{}');
  ok(guardado.organizaciones && guardado.organizaciones.length === TH.store.get().organizaciones.length, 'Estado de desarrollo persistido en el navegador');
  const crudo = w.localStorage.getItem('turquesa-hub-dev-v4') || '';
  ok(!/Turquesa2026\*|NuevaClave2026|"token"|claveInicial/.test(crudo) && !/"credencial":/.test(TH.store.exportar()), 'Sin contraseñas en claro ni tokens en el almacenamiento; exportación sin credenciales');
  process.exit(h.resumen());
})().catch(e => { console.error('ERROR FATAL', e); process.exit(1); });
