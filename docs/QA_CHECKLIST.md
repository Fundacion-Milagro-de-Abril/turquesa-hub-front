# QA, incidencias y requisitos de producción · Turquesa Hub 1.0.0-rc4

## 1. Resultados de las pruebas automatizadas (2026-11-04)

| Suite | Qué cubre | Comando | Resultado |
|---|---|---|---|
| Humo (desarrollo, adaptador local) | Escenario completo `tests/lib/escenario.js`: carga · público sin nada publicado (registro y activación visibles con el aviso preparado) · seguridad sin sesión · aviso transitorio por permisos · editorial de módulos y contenidos · empresa nueva de registro a reportes sin políticas definitivas · aislamiento · colaborador (activación con el aviso) · políticas definitivas publicadas después (cuentas intactas, información, nueva autorización, historial) · empresa existente · FMA · persistencia | `npm run smoke` | **135 verificaciones · 0 fallos · 47 rutas** |
| Integración con API simulada (modo producción) | Requisitos del servidor antes de recoger datos (rechazo sin base publicada, autorización expresa, versiones sustituidas) + el mismo escenario con el cliente en producción (sin semilla, sin `localStorage`, adaptador HTTP; el aviso transitorio se valida y publica antes del registro) contra `tests/lib/servidor-simulado.js`, más verificación de la comunicación de cada módulo con la API | `npm run api` | **165 verificaciones · 0 fallos · 47 rutas** |
| Paquete de producción | `tools/build.js` → `dist/` sin semilla ni cuentas de prueba; comportamiento sin backend (errores de red, reintento, formulario de registro visible sin recoger datos, sin localStorage) | `npm run produccion` | **14 verificaciones · 0 fallos** |
| Accesibilidad WCAG 2.0/2.1/2.2 A+AA (axe-core + Playwright) | 38 vistas de los tres perfiles (incluido `/aviso-registro`) con la identidad del Manual Maestro aplicada | `npm run axe` | **0 violaciones** |

## 2. Verificación funcional (capturas en Chrome 1440 px y 390 px)

- [x] Ningún contenido ni módulo sin publicar llega a organizaciones o colaboradores (biblioteca y módulos vacíos hasta publicar; contenido en revisión no se abre por URL).
- [x] Registro y activación de invitaciones disponibles sin políticas definitivas: aviso de información y autorización versionado (en desarrollo, preparado; en producción, validado y publicado por la FMA), casilla de autorización independiente y no premarcada, condiciones solo si están publicadas; páginas de condiciones y privacidad identifican los borradores como no vigentes y remiten al aviso.
- [x] Políticas definitivas publicadas después: sustituyen al aviso para nuevos registros; cuentas, diagnósticos, planes y autorizaciones intactos; aviso informativo o solicitud de nueva autorización a las personas registradas; historial acumulativo de consentimientos.
- [x] Administración de módulos: versiones, editor estructurado, revisiones por permiso, aprobación, publicación con sustitución, retiro, historial de aprobaciones.
- [x] Revisiones jurídica y psicosocial y aprobación de documentos jurídicos: solo con permiso exclusivo (ni la administración integral).
- [x] Operaciones asíncronas en todas las vistas: indicador de carga, botones deshabilitados, errores de servidor por campo, errores de red con reintento, confirmaciones.
- [x] Sin textos de fase, demostración o funciones futuras en las 46 rutas (expresión regular en las suites).
- [x] Carga de archivos de evidencia validada en cliente (tipo y tamaño) y enviada por multipart; estado del archivo según el servicio.
- [x] Módulos reservados fuera del directorio desplegable; `dist/` no los contiene.
- [x] Identidad visual del Manual Maestro FMA v1.1 aplicada: endoso «Turquesa Hub · Sello Turquesa · Un servicio de Fundación Milagro de Abril», logos oficiales (FMA a color sobre blanco, blanco sobre Turquesa Profundo, isotipo como favicon), imagotipo completo del Sello en sus páginas, paleta y tipografías oficiales, onda solo en la apertura pública, membrete FMA en PDF/impresión; sin logos inventados ni recursos de otros universos (ver `public/assets/branding/README.md`).
- [x] Diseño responsivo verificado a 1440 px y 390 px (portada, Sello, acceso, espacios de organización, colaborador y FMA).

## 3. Incidencias corregidas en esta versión (rc1 → rc2)

| # | Incidencia (revisión independiente) | Corrección |
|---|---|---|
| R-01 | `biblioteca.mostrarEnRevision: true` exponía 21 contenidos no publicados | Regla fija `esVisible = estado === 'publicado'`; opción eliminada; pruebas en ambos entornos |
| R-02 | Panel FMA solo consultaba los módulos | `TH.api.modulos` con versiones, edición, revisiones por permiso, aprobación, publicación/sustitución, retiro, historial; vistas `/fma/formacion` y `/fma/formacion/version` |
| R-03 | Adaptador HTTP solo para autenticación e interés en el Sello | `http.js` + `remoto.js`: cargadores por espacio y todas las mutaciones por HTTP; router asíncrono; vistas con `await`, carga y errores; servidor simulado y suite `api-simulada.js` |
| R-04 | Se podían aceptar condiciones/política identificadas como borradores | `TH.api.documentosLegales` (versiones, aprobación jurídica exclusiva, publicación); registro y activación bloqueados sin versión publicada; consentimientos con `documentoId` y versión |
| R-05 | 16 fuentes pendientes y una en fuente secundaria | Verificación de las 27 fuentes (sección 4) |
| R-06 | Módulos reservados en el directorio estático | Movidos a `reservado/` fuera de `public/`; `tools/build.js` solo empaqueta `public/` |
| R-07 | Configuración de producción por edición manual del HTML | `config/env.*.js` + `tools/build.js` (verifica ausencia de semilla y cuentas); `tests/produccion.js` |
| R-08 | Administración integral (`*`) podía registrar revisiones jurídicas y psicosociales | Permisos exclusivos (`TH.auth.PERMISOS_EXCLUSIVOS`) no derivables de `*` |
| R-09 | Caché con datos de otra sesión en producción | `TH.store.vaciar()` al iniciar y cerrar sesión |
| R-10 | El formulario de interés enviaba `orgId` desde el cliente | Eliminado; el servidor lo toma de la sesión |
| R-11 | Las páginas públicas quedaban bloqueadas si fallaba `/configuracion/publica` | Carga pública degradada con aviso y reintento |
| R-12 | Progreso formativo creado en el render de la lección | Creación idempotente en la primera lección/respuesta (cliente y servidor) |
| R-13 | Semilla con consentimientos "2026-11" sin documento publicado | Marcados como datos de prueba sin `documentoId` |

Incidencias de rc1 conservadas (I-01 a I-10) siguen corregidas.

## 4. Verificación bibliográfica (2026-11-03)

Resultado: 27 fuentes, **20 V** (fuente oficial/primaria consultada) y **7 VS** (verificación parcial: Decreto 1072/2015 por compilaciones y textos relacionados; OMS 2013 por ficha oficial; cinco normas ISO por fichas y vistas previas oficiales, textos de pago no consultados). **Ninguna en C.** Matriz de 272 filas revisada fila por fila (apartados concretos, URL oficiales, estados). Hallazgos y correcciones aplicadas:

| # | Hallazgo | Corrección |
|---|---|---|
| B-01 | El Decreto 1040/2026 (Colpensiones y Secretaría Jurídica Distrital) repite el número 2.2.1.8.3.4 y **no contiene** 2.2.1.8.3.5 | Citas corregidas a "2.2.1.8.3.4 (2.º)" en 22 fragmentos de contenidos y módulos, FUENTES y matriz; nota en la ficha 2466/1040 |
| B-02 | El decreto exige "espacios de formación y actualización anualmente", no la actualización anual del documento | 9 fragmentos (contenidos, módulos y preguntas q09/q12) reformulados; indicador de rec-indicadores marcado como criterio técnico |
| B-03 | La guía PNUD "para organizaciones" registrada como 2024 es de junio de 2014 (ISBN 978-9962-688-28-0; la ficha web es de 2024) y no desarrolla el modelo de cuatro componentes | F-23 corregida a 2014; frase de rec-prevencion reescrita |
| B-04 | URL registrada de ISO 53800 (iso.org/standard/71967) correspondía a ISO 21851:2020 | URL corregida (84591) + folleto oficial |
| B-05 | RESPECT 2.ª ed. llama a la estrategia E "Environments made safe" (no "Enabling environments") | FUENTES, matriz y 2 fragmentos |
| B-06 | Circular 0076/2025: diagnósticos periódicos, participación y no confrontación son recomendaciones (num. 5); el derecho a no confrontación es de la Ley 2365 (arts. 5 y 13) | 1 fragmento de contenidos, 3 de módulos (incluida una retroalimentación) y 6 filas de la matriz |
| B-07 | Ley 1581/2012 art. 5 no incluye literalmente "orientación sexual" (sí "vida sexual" y "datos biométricos") | rec-datos, rec-ficha-1581 y glosario |
| B-08 | BID 2022 no contiene "consentimiento informado" ni la excepción a la confidencialidad por riesgo inminente (sí GBVIMS pp. 50-51) | 3 citas trasladadas a F-29; FUENTES precisada |
| B-09 | ISO 45003 Tabla 1 no lista la discriminación como peligro independiente | 4 fragmentos reformulados |
| B-10 | Afirmaciones atribuidas al Módulo 2 de la guía PNUD 2021 (pp. 40-73, no contrastadas) | 6 fragmentos acotados como criterio técnico (más el ajuste de q03); filas de la matriz marcadas "pendiente de contraste" |
| B-11 | Adición del num. 10 al art. 9 de la Ley 1010 la hace el art. 16 (no 17) de la Ley 2365; Ley 1010 art. 2 num. 3 modificado por Ley 1622/2013; C-081/2026 precisada | Fichas, glosario y matriz |
| B-12 | Res. 3461/2025: conformación "más de 5 y menos de 20"; Res. 2764/2022 con URL genérica; Decreto 4463 con id de Función Pública incorrecto | Fichas, FUENTES y matriz (URL de Colpensiones/INVIMA) |
| B-13 | WEPs: la revisión de piezas de comunicación corresponde al principio 5 (no al 2); q02 citaba F-22 sin afirmación; Recomendación 206 "orienta", no "exige" | Corregidos |

Pendientes que requieren acceso manual (no se afirman): estado de ratificación del C190 en NORMLEX (bloqueado para acceso automatizado; el Comunicado 24 de la Corte dice que no está perfeccionado); contraste página a página de las pp. 40-73 de la guía PNUD 2021; textos íntegros de las normas ISO; condiciones de uso de las herramientas GBVIMS; versión final del manual OMS 2014 en IRIS.

## 4a. Corrección prioritaria: registro sin depender de las políticas definitivas (2026-11-04)

| Escenario (instrucción de la Dirección) | Resultado | Dónde se prueba |
|---|---|---|
| A · Registro nuevo en desarrollo: `/registro` sin políticas publicadas muestra todos los campos; registro de organización ficticia; confirmación; acceso; panel; autodiagnóstico; guardar y recuperar avance | Cumplido con el aviso preparado (versión 2026-11-v1, sin validar; marcado «solo registros de prueba») | `tests/lib/escenario.js` (Área pública · Empresa nueva), `npm run smoke` |
| B · Colaborador: invitación, `/activar-invitacion`, activación sin políticas definitivas, acceso a formación | Cumplido; exige la casilla de autorización | ídem (Colaborador) |
| C · Políticas posteriores: registrar → publicar condiciones (informar) y política (requiere nueva autorización) → cuenta, diagnóstico y plan intactos → historial y nuevas aceptaciones | Cumplido; sin aceptaciones retroactivas; el colaborador queda con pendientes | ídem (Políticas definitivas publicadas después) |
| D · Producción: solicitudes a la API, errores del servidor mostrados, sin sesiones ficticias; el servidor verifica información y autorización válidas (no la existencia de un PDF) | Cumplido contra el servidor simulado: 409 `INFORMACION_NO_PUBLICADA` sin aviso publicado aunque el cliente envíe la autorización; 400 sin `aceptaDatos`; 400 `VERSION_DOCUMENTO`; registro real solo tras validar y publicar el aviso | `npm run api`, `npm run produccion` |

**No se declara operativo el registro de empresas reales**: requiere el backend (`GUIA_INGENIERO.md` §C), que la FMA complete el canal de contacto y ejercicio de derechos del aviso y lo valide (revisión jurídica) y publique, y las condiciones mínimas de protección de datos (HTTPS, cookies seguras, almacenamiento).

## 4b. Aplicación de la identidad visual (2026-11-04)

Base: Manual Maestro de Marca FMA 2026–2030 v1.1. Hallazgos corregidos al aplicarla:

| # | Hallazgo | Corrección |
|---|---|---|
| V-01 | Marca «TH» inventada (símbolo y favicon) y lockup «Turquesa Hub / Fundación Milagro de Abril» sin endoso correcto | Retirados; nombre tipográfico «Turquesa Hub · Sello Turquesa» + línea divisora neutra + logo FMA oficial; favicon = isotipo oficial |
| V-02 | Textos de marca no autorizados: «Modelo Turquesa de Innovación Social», «ecosistema Turquesa», Sello como «iniciativa de reconocimiento», eslogan usado como etiquetas | Reescritos con las formulaciones oficiales (descriptor «Laboratorio de Innovación Social», Modelo Turquesa como modelo de intervención, Sello como «servicio de evaluación, acompañamiento y reconocimiento organizacional · Un servicio de Fundación Milagro de Abril», eslogan solo en el cierre) |
| V-03 | Ilustración de portada con formas de mariposa (universo de otro programa) y paleta no oficial | Sustituida por franja cromática con onda contenida + diagrama modular de contenedores |
| V-04 | Paleta provisional (#159EAA, #7952A3, #EA8A46…) y tipografía Inter | Paleta y tipografías oficiales; 31 combinaciones de contraste corregidas tras la auditoría (menú lateral activo, avatares, pestañas, texto translúcido) |
| V-05 | Constancia sin la fórmula institucional | «Fundación Milagro de Abril hace constar que…», con logo FMA; sin «certificación» |
| V-06 | Reportes/constancias impresos sin membrete | Membrete FMA (logo a color) y filete al pie en `css/print.css` |

Pendiente (no se afirma como hecho): archivos maestros del repositorio de marca (P-11); validación de tamaños mínimos del logotipo manuscrito en pantalla pequeña (en móvil se usa el isotipo oficial).

## 5. Requisitos de producción (backend y operación)

| # | Requisito | Referencia |
|---|---|---|
| P-01 | API con los endpoints y formas de `API_CONTRACT.md` (incluidos documentos jurídicos y versiones de módulos) | API §1-§6 |
| P-02 | Autenticación (cookie HttpOnly/Secure, Argon2id/bcrypt, limitación de intentos, CSRF) y `GET /auth/me` | API §0, §2 |
| P-03 | Correo transaccional: verificación con token, recuperación, invitaciones, activación de usuarios internos | API §2, §3.2, §6 |
| P-04 | Base de datos con aislamiento por organización, versiones editoriales y auditoría inmutable | DATA_MODEL |
| P-05 | Almacenamiento privado de evidencias (multipart ≤ 10 MB, antivirus, URL firmadas) | API §3.2 |
| P-06 | Endpoint de manifestaciones de interés con captcha/limitación | API §5 |
| P-07 | Despliegue de `dist/` con HTTPS, HSTS, CSP y cabeceras; retirar `noindex` | GUIA_INGENIERO §C.7 |
| P-08 | Crear las cuentas internas reales y sus perfiles; **Claudia** (revisión jurídica + `documentos:aprobar`) y **Lorena** (revisión psicosocial) registran sus revisiones antes de cualquier publicación | GUIA_INGENIERO §C.8 |
| P-09 | Antes de registros reales: completar el canal de contacto y ejercicio de derechos del aviso de registro, validarlo (revisión jurídica) y publicarlo. Después, cargar, aprobar y publicar las condiciones de uso y la política de datos definitivas (indicando si requieren nueva autorización) | USER_FLOWS §0 |
| P-10 | Abrir NORMLEX manualmente para el estado de ratificación del C190 y contrastar las pp. 40-73 de la guía PNUD 2021 | FUENTES.md |
| P-11 | Sustituir los PNG extraídos del Manual por los archivos del repositorio de marca (`FMA_Logo_*_APPROVED`, vector y PNG de alta resolución; imagotipo del Sello con transparencia) conservando los nombres; validar con Comunicaciones los tamaños mínimos de reproducción del logotipo manuscrito (cap. 06 y 28 del Manual) | assets/branding/README.md |
| P-12 | Pruebas de autorización A1-A23 en la suite del backend; ejecutar `tests/lib/escenario.js` contra la API real | API §8, GUIA §B |
| P-13 | Copias de seguridad, retención y procedimiento de supresión de cuentas | DATA_MODEL §11 |
