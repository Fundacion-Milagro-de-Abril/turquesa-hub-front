/* Contraseña de las cuentas de demostración, solo para las pruebas locales.
   NO está en este repositorio público: se lee de la semilla privada (public/js/dev/semilla.js, copiada del repositorio
   privado con tools/traer-semilla.sh) o de la variable de entorno TH_CLAVE_DEMO. Sin semilla, CLAVE queda vacía y las
   suites que la necesitan se omiten (ver `omitirSinSemilla`). */
const fs = require('fs'); const path = require('path');
const SEMILLA = path.resolve(__dirname, '..', '..', 'public', 'js', 'dev', 'semilla.js');
const hay = fs.existsSync(SEMILLA);
let CLAVE = process.env.TH_CLAVE_DEMO || '';
if (!CLAVE && hay) { const m = /claveCuentasDePrueba:\s*'([^']+)'/.exec(fs.readFileSync(SEMILLA, 'utf8')); CLAVE = m ? m[1] : ''; }
/** Termina la suite sin error cuando no hay semilla privada (p. ej. en la CI del repositorio público). */
function omitirSinSemilla(nombre) { if (!hay) { console.log('Suite «' + nombre + '» omitida: requiere la semilla privada (tools/traer-semilla.sh).'); process.exit(0); } }
module.exports = { CLAVE, hay, SEMILLA, omitirSinSemilla };
