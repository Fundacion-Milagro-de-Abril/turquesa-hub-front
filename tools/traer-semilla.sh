#!/usr/bin/env bash
# Copia la semilla de demostración (cuentas y datos ficticios para el modo de desarrollo) desde el repositorio
# privado hermano. No está en este repositorio público a propósito. Solo hace falta para:
#   - ver la app con datos de demostración en local (python3 -m http.server en public/),
#   - ejecutar las suites completas de tests/ (smoke y api-simulada); sin ella se omiten.
set -euo pipefail
ORIGEN="${1:-$(cd "$(dirname "$0")/../.." && pwd)/turquesa-hub-back/demo/semilla.js}"
DESTINO="$(cd "$(dirname "$0")/.." && pwd)/public/js/dev/semilla.js"
[ -f "$ORIGEN" ] || { echo "No encuentro la semilla en: $ORIGEN" >&2; exit 1; }
mkdir -p "$(dirname "$DESTINO")"
cp "$ORIGEN" "$DESTINO"
echo "Semilla copiada a public/js/dev/semilla.js (está en .gitignore: no se sube)."
