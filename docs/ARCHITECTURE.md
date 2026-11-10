# Arquitectura · Turquesa Hub 1.0.0-rc4

## 1. Principios

1. **Frontend terminado y conectable.** La interfaz está completa para los tres perfiles y toda operación de datos pasa por una capa de servicios con dos implementaciones: local (desarrollo, con datos de prueba) y HTTP (producción, contra la API de `API_CONTRACT.md`). Las vistas no saben cuál está activa.
2. **Separación estricta por capas**: componentes → vistas → servicios de dominio → adaptador (local | HTTP) → caché de entidades → catálogos y configuración. Las vistas nunca tocan el almacenamiento ni `fetch`.
3. **Nada falso.** Desarrollo y producción se construyen desde configuraciones distintas (`config/env.*.js`, `tools/build.js`); el paquete de producción no contiene datos de prueba, no persiste en `localStorage`, no simula envíos y solo presenta como hecho lo que el servidor confirma.
4. **Autorización en servidor.** Los guardas del enrutador y las reglas de la capa local son experiencia de usuario y doble de pruebas; la autoridad es la sesión del backend (cookie HttpOnly) y cada endpoint autoriza por rol, permiso y organización. Las revisiones jurídica y psicosocial y la aprobación de documentos jurídicos son permisos exclusivos que ni la administración integral obtiene implícitamente.
5. **Publicado o nada.** Organizaciones y colaboradores solo reciben contenidos y módulos en estado `publicado`; el registro y la activación de invitaciones requieren una base de información y autorización (aviso transitorio de registro validado y publicado, o la política de datos definitiva), nunca borradores; no dependen de las políticas definitivas, que se publican después sin afectar cuentas ni avances. Los borradores y las revisiones viven únicamente en el espacio editorial.
6. **Contenido con trazabilidad.** Cada guía, módulo y pregunta cita el registro `docs/FUENTES.md` (27 fuentes verificadas el 2026-11-03: 20 V, 7 VS) y la matriz `docs/MATRIZ_TRAZABILIDAD_BIBLIOGRAFICA.md`.

## 2. Estructura del repositorio

```
turquesa-hub/
├─ public/                         DIRECTORIO DESPLEGABLE (lo único que se publica)
│  ├─ index.html                   cascarón; carga js/env.js y, solo en desarrollo, el bloque dev:start…dev:end
│  ├─ css/                         tokens (paleta/tipografía oficial) · base · layout · components · responsive · print
│  ├─ assets/branding/             logos oficiales FMA y Sello (extraídos del Manual) + README de identidad
│  └─ js/
│     ├─ env.js                    copia de config/env.desarrollo.js (tools/build.js escribe la de producción)
│     ├─ config.js                 TH.config: entorno, esRemoto, api, auth, consentimientos, archivos, módulos
│     ├─ data/                     catalogos · fuentes · instrumento-diagnostico · modulos-formativos · contenidos · documentos-legales
│     ├─ dev/semilla.js            DATOS DE PRUEBA (excluidos del paquete de producción)
│     ├─ state.js                  TH.store (caché/estado en memoria; localStorage solo en desarrollo) y TH.util
│     ├─ http.js                   TH.http: cliente de la API (JSON, multipart, CSRF, 401 → cierre de sesión)
│     ├─ auth.js                   TH.auth + adaptadores local/http (registro, acceso, verificación, recuperación, invitaciones, restaurar)
│     ├─ mock-api.js               TH.api.* implementación LOCAL de dominio (organizaciones, usuarios, invitaciones, evidencias, contenidos, módulos, documentos jurídicos, configuración)
│     ├─ services/                 diagnostico · plan-accion · formacion · sello · reportes (lógica de negocio local)
│     ├─ remoto.js                 TH.remoto: cargadores por espacio y mutaciones HTTP que SUSTITUYEN a las locales en producción
│     ├─ components/               ui (campos, tablas, modales, estados de carga, errores de API, referencias) · graficos · layout
│     ├─ router.js                 enrutador hash: guardas de rol/permiso, carga asíncrona por espacio, estado de carga y reintento
│     ├─ views/                    public · organization · collaborator · admin (operaciones asíncronas con await)
│     └─ app.js                    arranque: activar adaptador HTTP si procede, restaurar sesión (/auth/me), delegación de eventos
├─ config/env.desarrollo.js · env.produccion.js   definición del entorno (window.TH_ENV)
├─ tools/build.js                  genera dist/ (producción: sin js/dev, env de producción, sin bloque dev) y lo verifica
├─ tools/matriz-instrumento.js     regenera la sección 4 de la matriz bibliográfica
├─ reservado/                      proceso formal del Sello (FUERA del directorio desplegable; no se sirve por URL)
├─ docs/                           documentación, FUENTES, matriz, inventario, QA
└─ tests/                          smoke (desarrollo) · api-simulada (producción + servidor simulado) · produccion (paquete) · axe
```

## 3. Capas y contratos internos

| Capa | Módulos | Regla |
|---|---|---|
| Entorno y configuración | `env.js`, `config.js` | `TH.config.entorno` y `esRemoto` deciden adaptador y persistencia. Sin lógica de interfaz. |
| Datos y catálogos | `data/*` | Inmutables en ejecución. Semilla editorial para la base de datos del backend. |
| Caché/estado | `state.js` | `TH.store.get/update/vaciar/exportar`. En producción es solo caché de entidades (vaciada al cambiar de sesión). |
| Cliente HTTP | `http.js` | `llamar(metodo, ruta, json)`, `get`, `subir(ruta, campos, File)`, `descargar`. Normaliza errores; 401 cierra sesión. |
| Autenticación | `auth.js` | `TH.auth.{registrarOrganizacion, ingresar, salir, me, restaurar, solicitarVerificacion, verificarCorreo, solicitarRecuperacion, restablecerClave, cambiarClave, activarInvitacion, sesion, rol, orgId, tienePermiso, puede, usuario, organizacion}`; `PERMISOS_EXCLUSIVOS`. |
| Dominio local | `mock-api.js`, `services/*` | Lecturas sincrónicas sobre la caché (siempre) y mutaciones locales (solo desarrollo). Reglas de negocio documentadas: validación de registro, flujos editoriales, versiones, permisos. |
| Adaptador HTTP | `remoto.js` | `cargadores.{publico, organizacion, colaborador, fma}` llenan la caché por espacio; `http.<dominio>.<metodo>` ejecuta cada mutación contra la API y fusiona la respuesta (`fusionar`); `activar()` sustituye las mutaciones locales por las HTTP conservando firma y retorno `{ ok, error, errores, …entidades }`. |
| Componentes | `components/*` | HTML puro. `TH.ui.ocupado/errorApi/ejecutar` dan estado de carga y errores uniformes a formularios y botones. |
| Vistas | `views/*` | `(ctx) => html`; manejadores `async` que esperan las mutaciones y refrescan. Rutas registradas con `roles` y `permiso`. |
| Enrutador | `router.js` | Antes de renderizar, en producción, espera `TH.remoto.cargar` (indicador de carga tras 150 ms; error con "Reintentar"); sin sesión → `#/acceso?volver=`; rol/permiso incorrecto → acceso denegado. |

## 4. Flujo de una operación (ejemplo: registrar evidencia con archivo)
Vista `organization.js` (`evidencia-nueva`) valida tamaño y tipo → `TH.ui.ejecutar(form, () => TH.api.evidencias.registrar(orgId, datos))` → en desarrollo: `mock-api.js` escribe en `TH.store`; en producción: `remoto.js` envía `multipart/form-data` a `POST /organizaciones/mia/evidencias` y fusiona `{ evidencia }` → la vista refresca desde la caché. El servidor simulado (`tests/lib/servidor-simulado.js`) implementa el endpoint con la misma regla local y marca el archivo como `cargado`.

## 5. Entornos y construcción

| | Desarrollo | Producción (`node tools/build.js produccion` → `dist/`) |
|---|---|---|
| Entorno | `config/env.desarrollo.js` copiado en `public/js/env.js` | `config/env.produccion.js` (ajustar `apiBase`) |
| Datos | `public/js/dev/semilla.js` (bloque `dev:start…dev:end` de `index.html`) | Excluidos; `index.html` sin el bloque; verificación automática de que no quedan cuentas ni contraseñas de prueba |
| Servicios | Adaptador local | `TH.remoto.activar()` en el arranque: todas las mutaciones por HTTP |
| Persistencia | `localStorage` (`turquesa-hub-dev-v4`), sin credenciales en claro | Ninguna; caché en memoria por sesión |
| Sesión | `TH.auth._sesionDePrueba` disponible para pruebas | Deshabilitada; `GET /auth/me` al arrancar |
| Correo, archivos, envío de interés | No existen; la interfaz lo dice | Por el backend |

`tests/produccion.js` construye `dist/` y comprueba todo lo anterior.

## 6. Seguridad en el frontend
Garantiza: ingreso solo con correo y contraseña; sin selector de cuentas; sesión en caché contrastada (desarrollo) o confirmada por `/auth/me` (producción); caché vaciada al cambiar de sesión; rutas y acciones protegidas por rol y permiso; permisos de revisión exclusivos; sin `orgId`/`rol`/`permisos` en las peticiones; archivos validados antes de subir; escape de todo dato en HTML (`TH.util.esc`); sin `localStorage` en producción; módulos reservados fuera del directorio desplegable.
No garantiza (backend): confidencialidad e integridad de datos, autorización real, limitación de intentos, verificación de correo, recuperación, correo transaccional, almacenamiento de archivos, auditoría inmutable, HTTPS/HSTS/CSP (ver `GUIA_INGENIERO.md`).

## 7. Accesibilidad e identidad visual
Identidad aplicada desde el **Manual Maestro de Marca FMA 2026–2030 v1.1** (detalle y tabla de reglas en `public/assets/branding/README.md`): Turquesa Hub es un activo de nivel 4 subordinado al Sello Turquesa, sin logo propio; se nombra «Turquesa Hub · Sello Turquesa» y lleva el endoso «Un servicio de Fundación Milagro de Abril» con el logo FMA oficial. Paleta oficial en `css/tokens.css` (primarios, acentos, neutros, tintes al 10 % y estados −12 % documentados), tipografías Poppins · Nunito Sans · Lora, filete cromático bajo los títulos, onda solo en la apertura pública, páginas de trabajo blancas/Nube sin onda, iconografía lineal monocromática, membrete FMA en impresión.
Accesibilidad (cap. 13 del Manual y WCAG 2.2 AA): contraste verificado por combinación (texto de lectura en Tinta/Gris/Turquesa Profundo/Violeta Texto; blanco solo sobre colores aprobados; sobre el degradado solo texto grande), semáforo accesible (color + punto/borde + texto), foco visible 3 px Violeta Texto, áreas táctiles ≥ 44 px, cuerpo 16 px con interlineado 1.55, navegación por teclado, `aria-current`, regiones con nombre, tablas con `caption`, estados de carga con `aria-busy`/`role="status"`, `prefers-reduced-motion`, diseño responsivo, hoja de impresión. Auditoría axe (WCAG 2.0/2.1/2.2 A+AA): 0 violaciones en 37 vistas.

## 8. Módulos reservados
`reservado/` (fuera de `public/`) contiene postulación, matriz de criterios, evaluación, dictámenes y administración del Sello. No se despliega ni se sirve por URL; activación descrita en `reservado/README.md` cuando la FMA lo decida.
