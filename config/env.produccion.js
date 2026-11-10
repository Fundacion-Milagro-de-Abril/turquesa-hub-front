/* Entorno de PRODUCCIÓN · tools/build.js lo copia a dist/js/env.js.
   Adaptador HTTP contra la API (docs/API_CONTRACT.md); sin datos de prueba; sin persistencia en el navegador.
   Ajustar apiBase a la URL real de la API (misma política de cookies; HTTPS obligatorio). */
window.TH_ENV = { entorno: 'produccion', apiBase: '/api/v1', version: '1.0.0-rc4' };
