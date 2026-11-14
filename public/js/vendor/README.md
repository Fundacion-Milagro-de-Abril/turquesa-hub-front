# Bibliotecas de terceros (copiadas en el repositorio)

Se sirven desde el propio sitio: el navegador no descarga código de ningún CDN (lo exige la política de seguridad del contenido de `index.html`).

| Archivo | Biblioteca | Versión | Origen | SHA-256 |
|---|---|---|---|---|
| `supabase.js` | `@supabase/supabase-js` (UMD) | 2.86.0 | `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.86.0/dist/umd/supabase.js` | `6c6a807c5c8087d2ea1b3bfac3632b0bedff0a0700ee521a560a1893d364554e` |

Para actualizar: descarga la versión nueva desde ese origen, reemplaza el archivo, actualiza esta tabla (versión y huella con `shasum -a 256 supabase.js`) y corre todas las pruebas (`cd tests && npm test`). La prueba `tests/seguridad.js` verifica que la huella coincida.
