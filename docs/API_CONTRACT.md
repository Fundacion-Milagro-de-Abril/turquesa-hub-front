# Contrato de API · Turquesa Hub 1.0.0-rc4

Este contrato describe **exactamente** las llamadas que hace el frontend en producción. Está implementado en el cliente (`public/js/http.js`, `public/js/remoto.js`, `public/js/auth.js`) y en el servidor simulado de pruebas (`tests/lib/servidor-simulado.js`), que reproduce las reglas de negocio con la misma capa de dominio del cliente; la suite `tests/api-simulada.js` recorre todos los módulos contra él. El backend real debe implementar estos endpoints con estas formas de petición y respuesta.

Base: `TH.config.api.baseUrl` (por defecto `/api/v1`, definido en `config/env.produccion.js`). JSON (`Content-Type: application/json`, `Accept: application/json`), `credentials: 'include'`, solo HTTPS.

## 0. Convenciones que el cliente ya cumple

- **Sesión**: cookie `HttpOnly; Secure; SameSite=Lax|Strict` emitida por `/auth/login`, `/auth/invitaciones/activar` (y el backend puede emitirla tras `/auth/verificacion/confirmar`). El cliente guarda en `sessionStorage['th-sesion']` solo una caché de presentación `{ userId, rol, orgId, permisos, inicio, expira }` sin valor de autorización; al arrancar llama a `GET /auth/me` para confirmarla (`TH.auth.restaurar`). Nunca usa `localStorage`.
- **CSRF**: si el servidor devuelve la cabecera `X-CSRF-Token`, el cliente la reenvía en toda petición no-GET (`TH.http`). Alternativa: `SameSite=Strict`.
- **Autorización en servidor**: el cliente **nunca envía** `orgId`, `rol` ni `permisos` como criterio (verificado en `api-simulada.js`); el servidor los toma de la sesión. Recursos de otra organización → `404`.
- **Caché de entidades**: el cliente conserva en memoria (`TH.store`) las entidades que el servidor devuelve y las reemplaza con cada respuesta (`TH.remoto.fusionar`). Por eso **cada mutación devuelve la entidad o colección actualizada** con las claves de la tabla siguiente; el cliente se vacía al cambiar de sesión.
- **Errores**: `{ "error": { "codigo", "mensaje", "campos": { "campo": "mensaje" } } }`. El cliente muestra `mensaje` (y `campos` sobre el formulario). Códigos que interpreta: `CREDENCIALES`, `CORREO_NO_VERIFICADO`, `CUENTA_SUSPENDIDA`, `ORGANIZACION_SUSPENDIDA`, `DUPLICADO`, `VALIDACION`, `NO_AUTORIZADO`, `PROHIBIDO`, `NO_ENCONTRADO`. Estados: 200/201/204; 400 validación; 401 sin sesión (el cliente limpia su caché y redirige a `#/acceso`); 403; 404; 409; 413 archivo grande; 429 limitación de intentos.
- **Claves de respuesta reconocidas por el cliente** (cualquier combinación): `organizacion`, `organizaciones`, `usuario`, `usuarios`, `diagnostico`, `diagnosticosArchivados`, `diagnosticos`, `plan`, `planes`, `evidencia`, `evidencias` (+`orgId`), `invitacion`, `invitaciones` (+`orgId`), `progreso`, `progresos` (+`orgId`|`userId`), `contenido`, `contenidos`, `modulo`, `modulos`, `documento`, `documentosLegales`, `interes`, `intereses`, `historial`, `configuracion`, `instrumentoVersiones`, `instrumento.alcance`, `participacionAgregada`. Las entidades tienen la forma de `DATA_MODEL.md`; nunca incluyen `credencial`, `cuentaDePrueba` ni tokens.
- **Fechas** ISO 8601. **Ids** opacos (cadenas).

## 1. Carga de datos por espacio (GET)

Antes de renderizar una ruta, el cliente carga el espacio del rol de la sesión (`TH.remoto.cargadores`, en paralelo, con caché de 60 s que se invalida tras cada mutación):

| Espacio | Peticiones | Respuesta esperada |
|---|---|---|
| Público (sin sesión) | `GET /configuracion/publica` | `{ documentosLegales: [solo versiones "publicado" de aviso-registro, condiciones-uso y tratamiento-datos], configuracion: { contactoSello, diasInvitacion } }`. Si falla, las páginas públicas se muestran con aviso de servicio no disponible; el formulario de registro se muestra pero no recoge datos mientras el cliente no conozca una base de información publicada. |
| Organización | `GET /organizaciones/mia` → `{ organizacion, usuarios (de la org), resumen }` · `GET /organizaciones/mia/diagnostico` → `{ diagnostico, diagnosticosArchivados }` o 404 · `GET /organizaciones/mia/plan` → `{ plan }` o 404 (el servidor marca `atrasada` por fecha) · `GET /organizaciones/mia/evidencias` → `{ evidencias, orgId }` · `GET /organizaciones/mia/invitaciones` → `{ invitaciones, orgId }` · `GET /organizaciones/mia/colaboradores` → `{ usuarios, invitaciones, progresos (sin respuestasQuiz), orgId }` · `GET /contenidos?publico=organizacion` → `{ contenidos (solo publicados) }` · `GET /modulos` → `{ modulos (solo versiones publicadas) }` · `GET /organizaciones/mia/sello/intereses` → `{ intereses }` · `GET /configuracion/publica` | 404 de diagnóstico/plan es normal (aún no existen). |
| Colaborador | `GET /colaboradores/mi` → `{ usuario, organizacion, invitaciones, orgId }` · `GET /colaboradores/mi/modulos` → `{ modulos (publicados), progresos (del usuario), invitaciones, userId }` · `GET /contenidos?publico=colaborador` · `GET /configuracion/publica` | |
| FMA | `GET /admin/organizaciones` → `{ organizaciones, usuarios (no fma) }` · `/admin/usuarios` → `{ usuarios }` · `/admin/diagnosticos` → `{ diagnosticos, diagnosticosArchivados }` · `/admin/planes` → `{ planes }` · `/admin/evidencias` · `/admin/invitaciones` · `/admin/progreso` → `{ progresos (sin respuestas), participacionAgregada }` · `/admin/contenidos` → `{ contenidos (todos los estados) }` · `/admin/modulos` → `{ modulos (todas las versiones) }` · `/admin/documentos-legales` → `{ documentosLegales }` · `/admin/sello/intereses` → `{ intereses }` · `/admin/auditoria` → `{ historial }` · `/admin/configuracion` → `{ configuracion, instrumentoVersiones }` · `/admin/instrumento/versiones` → `{ instrumentoVersiones, instrumento: { alcance } }` | 403 en una colección (permiso insuficiente) no bloquea el espacio. |

## 2. Autenticación y cuentas (`public/js/auth.js`, adaptador `http`)

| Método | Ruta | Cuerpo | Respuesta | Reglas del servidor |
|---|---|---|---|---|
| POST | `/organizaciones` | ver §3.1 | 201 `{ usuario: {id}, org: {id}, verificacion: 'pendiente' }` | Crea organización + responsable (`organizacion`, `pendiente-verificacion`), envía correo de verificación y registra la autorización. **Antes de procesar datos personales verifica que exista una base de información publicada** (política de tratamiento de datos o, mientras no la haya, aviso de registro): si no existe → 409 `INFORMACION_NO_PUBLICADA`. No depende de las condiciones de uso ni de la política definitiva. 409 por NIT o correo existentes; 400 `VERSION_DOCUMENTO` si el formulario referencia una versión sustituida. |
| POST | `/auth/login` | `{ email, clave }` | 200 `{ usuario }` + cookie | 401 `CREDENCIALES` (mismo mensaje exista o no el correo); 403 `CORREO_NO_VERIFICADO` / `CUENTA_SUSPENDIDA` / `ORGANIZACION_SUSPENDIDA`; 429 tras N intentos; nunca por correo solo. |
| POST | `/auth/logout` | — | 204 | Invalida la sesión. |
| GET | `/auth/me` | — | `{ usuario }` / 401 | Llamado al arrancar. |
| POST | `/auth/verificacion/solicitar` | `{ email }` | 200 siempre | |
| POST | `/auth/verificacion/confirmar` | `{ token }` | 200 / 400 | Token de un solo uso; marca `correoVerificado`, estado `activo`. El cliente lo llama desde `#/verificar-correo?token=…`. |
| POST | `/auth/recuperacion/solicitar` | `{ email }` | 200 siempre | |
| POST | `/auth/recuperacion/restablecer` | `{ token, clave }` | 200 / 400 | Política de contraseña (§3.3); invalida sesiones. |
| POST | `/auth/clave` | `{ actual, nueva }` | 200 / 400 | Requiere sesión. |
| POST | `/auth/invitaciones/activar` | `{ codigo, nombre, area, clave, aceptaDatos: true, aceptaCondiciones?, documentoDatosId, documentoCondicionesId? }` | 201 `{ usuario }` + cookie | Misma regla de información y autorización que el registro (409 `INFORMACION_NO_PUBLICADA` antes de procesar datos; 400 sin `aceptaDatos`; 400 `VERSION_DOCUMENTO`). Crea colaborador vinculado con sus consentimientos; invitación → `activada`; 400 expirada/anulada/usada; 409 correo existente. |

## 3. Organización (rol `organizacion`; `orgId` de la sesión)

### 3.1 Registro — cuerpo de `POST /organizaciones`
`{ nombre, tipoIdentificacion, identificacion, sector, tamano, departamento, municipio, emailInstitucional, telefono, responsable, cargo, email, clave, claveConfirmacion, aceptaDatos: true, documentoDatosId, aceptaCondiciones?: true, documentoCondicionesId? }`. `documentoDatosId` es el identificador de la base de información que el formulario mostró (aviso de registro publicado o política de datos publicada; `GET /configuracion/publica`); `aceptaCondiciones` y `documentoCondicionesId` solo existen cuando hay condiciones de uso publicadas. **El cliente no envía la lista de consentimientos: el servidor la construye** a partir de las versiones publicadas vigentes (`{ tipo, documentoId, version, fecha, modo: 'aceptacion', transitorio, validado: true }`).
Validación en servidor (réplica de `TH.api.organizaciones.validarRegistro`): NIT con dígito DIAN (pesos 3,7,13,17,19,23,29,37,41,43,47,53,59,67,71; módulo 11) solo si `tipoIdentificacion = 'NIT'`; otros tipos solo exigen número; `sin-identificacion` ninguno; duplicados por NIT normalizado y por correo; correo institucional válido; contraseña (§3.3); `aceptaDatos` obligatorio (casilla no premarcada) y `aceptaCondiciones` solo si hay condiciones publicadas; `documentoDatosId`/`documentoCondicionesId` deben coincidir con las versiones publicadas vigentes (si no, 400 `VERSION_DOCUMENTO`: el usuario recarga y vuelve a autorizar). Orden de comprobación: base publicada → versiones → validación de campos → duplicados.

### 3.2 Operaciones
| Método | Ruta | Cuerpo | Devuelve |
|---|---|---|---|
| PATCH | `/organizaciones/mia` | campos editables: nombre, sector, tamano, departamento, municipio, emailInstitucional, telefono, responsable, cargo, acompanamiento, preferencias | `{ organizacion, usuarios }` |
| PATCH | `/organizaciones/mia/onboarding` | `{ paso }` (bienvenida, perfil, plan, colaboradores) | `{ organizacion }` |
| GET | `/organizaciones/mia/exportacion` | — | JSON descargable (perfil, diagnóstico, plan, evidencias, participación agregada) |
| GET | `/organizaciones/mia/reporte` | — | `{ reporte }` (opcional; el reporte se arma en cliente con la caché) |
| PATCH | `/organizaciones/mia/usuarios/{id}` | `{ nombre, area, cargo, telefono }` (solo usuarios de la org) | `{ organizacion, usuarios }` |
| GET/POST | `/organizaciones/mia/diagnostico` | POST `{}` inicia; `{ nuevoCiclo: true }` archiva el vigente (con `resultadoSnapshot`) e inicia otro | `{ diagnostico, diagnosticosArchivados }` |
| PUT | `/organizaciones/mia/diagnostico/respuestas/{preguntaId}` | `{ opcion: 'si'|'parcial'|'no'|'nose'|'na', justificacion }` (`na` exige justificación y `permiteNA`) | `{ diagnostico, … }` |
| POST | `/organizaciones/mia/diagnostico/finalizar` | `{}` | `{ diagnostico, … }`; 400 si faltan respuestas de `preguntasVersion` |
| GET | `/organizaciones/mia/plan/sugeridas` | — | `{ sugeridas }` (opcional; el cliente las calcula de la caché con `generarSugeridas`, ids `sug-<pregunta>`) |
| POST | `/organizaciones/mia/plan` | `{ seleccion: ['sug-q01', …] }` | 201 `{ plan }`; 409 si ya existe |
| POST | `/organizaciones/mia/plan/incorporar` | `{ seleccion }` | `{ plan }` |
| POST | `/organizaciones/mia/plan/acciones` | `{ dim, situacion, objetivo, accion, prioridad, responsable, fechaObjetivo, indicador, meta, evidencia }` | `{ plan }`; 400 con `campos` |
| PATCH | `/organizaciones/mia/plan/acciones/{id}` | cualquiera de: dim, situacion, objetivo, accion, prioridad, responsable, fechaObjetivo, indicador, meta, evidencia, estado, avance (0-100), observaciones | `{ plan }`; `completada` ⇒ avance 100 y `fechaCierre`; avance 100 sin completar ⇒ `en-revision`; 404 si la acción no es de la org |
| DELETE | `/organizaciones/mia/plan/acciones/{id}` | — | `{ plan, evidencias, orgId }` |
| GET | `/organizaciones/mia/evidencias` | — | `{ evidencias, orgId }` |
| POST | `/organizaciones/mia/evidencias` | **multipart/form-data**: `accionId`, `preguntaId`, `nombre`, `tipo`, `descripcion`, `archivo` (opcional; PDF/DOC/DOCX/XLS/XLSX/PNG/JPG; ≤ 10 MB — `TH.config.archivos`) | 201 `{ evidencia }` con `archivo: { nombre, tamano, mime, estado: 'cargado', clave }`; 413 si excede; 404 si `accionId` no es de la org |
| DELETE | `/organizaciones/mia/evidencias/{id}` | — | `{ evidencias, orgId }` |
| GET/POST | `/organizaciones/mia/invitaciones` | POST `{ nombre, email, area, modulos[] }` (solo ids de módulos publicados) | `{ invitaciones, orgId }`; el servidor genera `codigo`, `expira` (configuracion.diasInvitacion) y envía el correo |
| POST | `/organizaciones/mia/invitaciones/{id}/reenviar` | — | `{ invitaciones, orgId }` |
| PATCH | `/organizaciones/mia/invitaciones/{id}/modulos` | `{ modulos[] }` | `{ invitaciones, orgId }` |
| POST | `/organizaciones/mia/invitaciones/{id}/anular` | — | `{ invitaciones, orgId }` |
| GET | `/organizaciones/mia/colaboradores` | — | `{ usuarios, invitaciones, progresos (estado y conteos; **sin** `respuestasQuiz`), orgId }` |
| PATCH | `/organizaciones/mia/colaboradores/{userId}/modulos` | `{ modulos[] }` | igual que el GET |
| POST | `/organizaciones/mia/colaboradores/{userId}/desvincular` | — | igual que el GET |
| GET | `/organizaciones/mia/sello/intereses` | — | `{ intereses }` |

### 3.3 Contraseñas
Mínimo 10 caracteres con letras y números (`TH.config.auth.clave`); el servidor puede exigir más. Hash Argon2id/bcrypt; nunca se devuelve ni registra.

## 4. Colaborador (rol `colaborador`)
| Método | Ruta | Cuerpo | Devuelve |
|---|---|---|---|
| GET | `/colaboradores/mi` | — | `{ usuario, organizacion, invitaciones, orgId }` |
| PATCH | `/colaboradores/mi` | `{ nombre, area }` | `{ usuario }` |
| GET | `/colaboradores/mi/modulos` | — | `{ modulos (publicados), progresos (del usuario), invitaciones, userId }` |
| POST | `/colaboradores/mi/progreso/{moduloId}` | `{}` | `{ progreso }` (crea si no existe) |
| POST | `/colaboradores/mi/progreso/{moduloId}/lecciones/{leccionId}` | `{}` | `{ progreso }` (crea el progreso si no existía); 403 si el módulo no está asignado o no está publicado |
| PUT | `/colaboradores/mi/progreso/{moduloId}/respuestas/{preguntaId}` | `{ opcion }` | `{ progreso, correcta, retro }` |
| POST | `/colaboradores/mi/progreso/{moduloId}/finalizar` | `{}` | `{ progreso, puntaje, aciertos, total }`; 400 si faltan lecciones o respuestas |
| POST | `/colaboradores/mi/progreso/{moduloId}/reintentar` | `{}` | `{ progreso }` |

## 5. Público
| Método | Ruta | Cuerpo | Devuelve |
|---|---|---|---|
| GET | `/configuracion/publica` | — | `{ documentosLegales (publicados), configuracion }` |
| GET | `/contenidos?publico=organizacion|colaborador` | — | `{ contenidos }` — **solo** `estado = 'publicado'` y `publico` que incluya el valor |
| GET | `/modulos` | — | `{ modulos }` — solo versiones `publicado` |
| GET | `/fuentes` | — | `{ fuentes }` (registro F-xx; opcional, el cliente lo lleva embebido) |
| POST | `/sello/intereses` | `{ organizacion, contacto, cargo, email, telefono, municipio, mensaje, autorizaContacto: true }` (con o sin sesión; si hay sesión de organización el servidor asocia `orgId`) | 201 `{ id, interes }` (estado `recibida`). Captcha o limitación por IP. El cliente solo muestra "enviada" al recibir 201. |

## 6. Administración FMA (rol `fma`; permiso indicado)
| Método | Ruta | Permiso | Cuerpo → Devuelve |
|---|---|---|---|
| POST | `/admin/organizaciones/{id}/estado` | `*` | `{ estado: 'activa'|'suspendida', motivo }` → `{ organizacion }` |
| POST | `/admin/usuarios` | `usuarios:gestionar` | `{ nombre, email, cargo, permisos[] }` → 201 `{ usuario }` (estado `pendiente-activacion`; correo de activación; sin contraseña inicial) |
| PATCH | `/admin/usuarios/{id}` | `usuarios:gestionar` | `{ permisos[], estado }` → `{ usuario }`; 400 si intenta cambiar sus propios permisos |
| POST | `/admin/contenidos` | `contenidos:editar` | datos del contenido (titulo, categoria, tema, descripcion, objetivo, secciones[], referencias[F-xx registradas], publico[], aplicaJuridica, aplicaPsicosocial, referencial) → 201 `{ contenido }` (borrador) |
| PUT | `/admin/contenidos/{id}` | `contenidos:editar` | ídem → `{ contenido }` (nueva versión menor; vuelve a `en-revision-tecnica`; revisiones a `pendiente`) |
| POST | `/admin/contenidos/{id}/estado` | según destino: `en-revision-tecnica`/`borrador` → `contenidos:editar`; `en-revision-juridica`/`en-revision-psicosocial` → `contenidos:revisar-tecnica`; `aprobado` → `contenidos:aprobar` (exige técnica aprobada y jurídica/psicosocial aprobadas o `no-aplica`); `publicado`/`archivado` → `contenidos:publicar` (publicar solo desde `aprobado`) | `{ estado, nota }` → `{ contenido }`; 400 con mensaje si la transición no procede |
| POST | `/admin/contenidos/{id}/revisiones` | por tipo: `contenidos:revisar-tecnica` / `contenidos:revisar-juridica` / `contenidos:revisar-psicosocial` (**los dos últimos no se derivan de `*`**) | `{ tipo, resultado: 'aprobada'|'cambios-requeridos'|'en-curso', observaciones }` → `{ contenido }` (registra revisor, fecha, versión; `cambios-requeridos` ⇒ `borrador`) |
| POST | `/admin/modulos/{moduloId}/versiones` | `formacion:editar` | `{ nota }` → `{ modulos }` (nueva versión en `borrador` copiada de la publicada/última; 400 si ya hay una versión abierta) |
| PUT | `/admin/modulos/versiones/{id}` | `formacion:editar` | `{ titulo, duracion, resumen, objetivos[], recursos[], bibliografia[F-xx], lecciones[{id,tipo,titulo,cuerpo[],situacion,actividad{titulo,instrucciones,preguntas[]},tarjeta{tipo,texto},referencias[]}], quiz[{id,texto,opciones[{id,texto}],correcta,retro{ok,no},referencia}] }` → `{ modulos }` (no editable si publicada/archivada/retirada; toda edición reinicia revisiones y devuelve a `borrador`) |
| POST | `/admin/modulos/versiones/{id}/estado` | como contenidos con prefijo `formacion:` (`aprobado` exige las **tres** revisiones aprobadas; `publicado` solo desde `aprobado` y archiva la versión publicada anterior; `retirado` solo desde `publicado`) | `{ estado, nota }` → `{ modulos }` |
| POST | `/admin/modulos/versiones/{id}/revisiones` | `formacion:revisar-tecnica` / `formacion:revisar-juridica` / `formacion:revisar-psicosocial` (exclusivos) | `{ tipo, resultado, observaciones }` → `{ modulos }` |
| POST | `/admin/documentos-legales` | `documentos:editar` | `{ tipo: 'aviso-registro'|'condiciones-uso'|'tratamiento-datos', titulo?, version?, secciones? }` → `{ documentosLegales }` (borrador; 400 si hay una versión abierta del mismo tipo) |
| PUT | `/admin/documentos-legales/{id}` | `documentos:editar` | `{ titulo, version, secciones[] }` → `{ documentosLegales }` (solo borrador/en revisión; vuelve a borrador y borra la aprobación) |
| POST | `/admin/documentos-legales/{id}/revision` | `documentos:editar` | — → `{ documentosLegales }` (`borrador` → `en-revision-juridica`) |
| POST | `/admin/documentos-legales/{id}/aprobacion` | `documentos:aprobar` (**exclusivo del perfil jurídico; `*` no lo otorga**) | `{ resultado: 'aprobada'|'cambios-requeridos', nota }` → `{ documentosLegales }` (registra `aprobacion { por, porId, fecha, nota, version }`) |
| POST | `/admin/documentos-legales/{id}/publicacion` | `documentos:publicar` | `{ requiereNuevaAutorizacion?: bool, nota?: string }` → `{ documentosLegales }` (solo desde `aprobado`; archiva la publicada anterior del mismo tipo; guarda `publicacion: { fecha, por, requiereNuevaAutorizacion, nota }`). Publicar el aviso de registro habilita el registro; publicar la política de datos la convierte en la base de registro y **no modifica cuentas, diagnósticos, planes ni consentimientos existentes** (sin aceptaciones retroactivas): las personas registradas ven la nueva versión como pendiente y la aceptan o se dan por informadas con `POST /documentos-legales/{id}/aceptacion`. |
| POST | `/documentos-legales/{id}/aceptacion` | sesión de organización o colaborador | `{ modo: 'aceptacion'|'informado' }` → `{ consentimiento, usuario }`. Solo versiones publicadas que la persona no tenga registradas; si la publicación marcó `requiereNuevaAutorizacion`, exige `modo: 'aceptacion'`. Añade `{ tipo, documentoId, version, fecha, modo, transitorio: false, validado: true }` a `usuario.consentimientos` (historial acumulativo, nunca se reescribe). |
| POST | `/admin/sello/intereses/{id}/gestion` | `organizaciones:ver` | `{ estado: 'recibida'|'contactada'|'cerrada', nota }` → `{ intereses }` |
| PATCH | `/admin/configuracion` | `*` | `{ contactoSello, diasInvitacion, mensajeInicio }` → `{ configuracion }` |
| PATCH | `/admin/instrumento/preguntas/{id}/alcance` | `instrumento:editar` | `{ alcance: 'activa'|'reserva' }` → `{ instrumento: { alcance } }` |
| POST | `/admin/instrumento/versiones` | `instrumento:editar` | `{ nota }` → `{ instrumentoVersiones }` |
| GET | `/admin/reportes/organizaciones.csv`, `/admin/auditoria.csv` | `reportes:ver` / `organizaciones:ver` | CSV descargable (`TH.http.descargar`) |

Permisos: `*`, `organizaciones:ver`, `reportes:ver`, `contenidos:ver|editar|revisar-tecnica|revisar-juridica|revisar-psicosocial|aprobar|publicar`, `formacion:ver|editar|revisar-tecnica|revisar-juridica|revisar-psicosocial|aprobar|publicar`, `instrumento:ver|editar|revisar|publicar`, `documentos:ver|editar|aprobar|publicar`, `usuarios:gestionar`. Perfiles predefinidos en `TH.api.usuarios.perfilesPermiso`. **Exclusivos** (no derivables de `*`): `contenidos:revisar-juridica`, `contenidos:revisar-psicosocial`, `formacion:revisar-juridica`, `formacion:revisar-psicosocial`, `documentos:aprobar`.

## 7. Auditoría
Toda escritura registra `{ fecha, actorId, accion, entidad, entidadId, detalle, ip }` (`GET /admin/auditoria` → `{ historial }`). Retención ≥ 2 años.

## 8. Pruebas de autorización que debe superar el backend
Además de los casos que `tests/api-simulada.js` ya ejecuta contra el servidor simulado (y que el backend real debe pasar reemplazando `fetch`):

| # | Caso | Esperado |
|---|---|---|
| A1 | Cualquier ruta privada sin cookie | 401 |
| A2 | Cookie manipulada o expirada | 401 |
| A3 | Org A → `PATCH /organizaciones/mia/plan/acciones/{id de B}` | 404, sin escritura |
| A4 | Org A → `POST /organizaciones/mia/evidencias` con `accionId` de B | 404 |
| A5 | Colaborador → cualquier `/admin/*` o `/organizaciones/mia/*` | 403 |
| A6 | Colaborador → `/colaboradores/mi/progreso/{módulo no asignado o no publicado}` | 403 |
| A7 | Organización → respuestas individuales de un colaborador | No existe endpoint; `progresos` sin `respuestasQuiz` |
| A8 | `POST /auth/login` con solo `email` | 400/401, sin sesión |
| A9 | 6.º intento fallido en 15 min | 429 |
| A10 | Registro con NIT y DV inválido | 400 `campos.identificacion` |
| A11 | Registro con NIT o correo existente | 409 |
| A12 | Registro o activación sin base de información publicada (ni aviso de registro ni política de datos) | 409 `INFORMACION_NO_PUBLICADA` antes de procesar datos |
| A12b | Registro con `documentoDatosId` de una versión sustituida, o sin `aceptaDatos` | 400 `VERSION_DOCUMENTO` / 400 campo `aceptaDatos` |
| A12c | `POST /documentos-legales/{id}/aceptacion` sobre un borrador, una versión ya registrada, o con `modo: 'informado'` cuando se exige autorización | 400 |
| A13 | Registro con `rol` o `permisos` en el cuerpo | Ignorados |
| A14 | `POST /admin/usuarios` sin `usuarios:gestionar` | 403 |
| A15 | Revisión jurídica (contenido, módulo o documento) por usuario sin el permiso exclusivo, incluido `*` | 403 |
| A16 | `aprobado` con revisión aplicable pendiente | 400 |
| A17 | `publicado` desde estado ≠ `aprobado` | 400 |
| A18 | Edición de contenido/módulo publicado | Contenido: nueva versión en revisión; módulo: 400 (crear nueva versión) |
| A19 | Activar invitación expirada/anulada/usada | 400 |
| A20 | Login de colaborador de organización suspendida | 403 `ORGANIZACION_SUSPENDIDA` |
| A21 | `GET /contenidos` y `GET /modulos` | Nunca devuelven borradores ni versiones en revisión |
| A22 | Toda escritura | Fila de auditoría |
| A23 | Cabeceras | HSTS, CSP, `X-Content-Type-Options`, cookies `HttpOnly; Secure` |
