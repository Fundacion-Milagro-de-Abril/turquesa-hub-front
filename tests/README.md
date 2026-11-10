# Pruebas · Turquesa Hub 1.0.0-rc4

| Archivo | Qué verifica | Comando |
|---|---|---|
| `smoke.js` | Escenario completo (`lib/escenario.js`) en **desarrollo** (adaptador local, datos de prueba): público sin nada publicado (registro y activación visibles con el aviso preparado) → aviso transitorio (técnica no aprueba; en producción: validación jurídica y publicación) → editorial de módulos y contenidos por permisos → empresa nueva de registro a seguimiento sin políticas definitivas (NIT, autorización versionada sobre el aviso, 16 preguntas, plan, acciones, evidencias con archivo, vencidas, CSV/PDF, invitaciones, biblioteca publicada, cambio de contraseña) → aislamiento → colaborador (activación con el aviso, módulo publicado, lecciones, ejercicio, constancia) → políticas definitivas publicadas después (cuenta, diagnóstico y plan intactos; sin aceptaciones retroactivas; aviso informativo y nueva autorización; historial) → empresa existente → FMA (suspensión, instrumento, usuarios, Sello, trazabilidad) → seguridad (rutas, correo solo, manipulación de almacenamiento, escalada, permisos exclusivos) → 46 rutas sin textos de fase/demostración ni enlaces rotos → persistencia sin credenciales. | `npm run smoke` |
| `api-simulada.js` | El **mismo escenario en modo producción**: cliente construido con `config/env.produccion.js` (sin semilla, sin `localStorage`, adaptador HTTP) y `fetch` dirigido a `lib/servidor-simulado.js`, un doble de la API (`docs/API_CONTRACT.md`) que autoriza por cookie, rol y organización sobre la misma capa de dominio. Antes del escenario comprueba que el servidor rechaza registro y activación sin base publicada (409 `INFORMACION_NO_PUBLICADA`) aunque el cliente envíe la autorización; después, que exige `aceptaDatos` y rechaza versiones sustituidas (`VERSION_DOCUMENTO`). Verifica además que cada módulo llamó a sus endpoints (incluida la aceptación posterior de versiones), que las peticiones llevan credenciales y no transportan `orgId`/`rol`/`permisos`, y que el servidor no expone credenciales. | `npm run api` |
| `produccion.js` | Construye `dist/` con `tools/build.js` y comprueba que no contiene semilla, cuentas, contraseñas ni módulos reservados; carga `dist/index.html` sin backend y verifica errores de red con reintento, formulario de registro visible sin recoger datos (sin base publicada), sesión de prueba deshabilitada y `localStorage` vacío. | `npm run produccion` |
| `axe.js` | Accesibilidad WCAG 2.0/2.1/2.2 A+AA (axe-core) en 37 vistas de los tres perfiles. Requiere `python3 -m http.server 8765` desde `public/` y Chrome/Chromium (`CHROME_PATH` opcional). | `npm run axe` |

```bash
npm install
npm test        # smoke + api + produccion
```

Resultados de referencia (2026-11-04): smoke 135/135, api-simulada 165/165, produccion 14/14, axe 0 violaciones (38 vistas).

Para validar el backend real: en `api-simulada.js` sustituir `servidor.fetch` por un `fetch` hacia la API desplegada (misma URL base y cookies) y ejecutar el escenario; los casos de autorización adicionales A1-A23 están en `docs/API_CONTRACT.md` §8.
