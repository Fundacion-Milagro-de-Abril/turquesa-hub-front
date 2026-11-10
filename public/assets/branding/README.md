# Identidad visual aplicada · Turquesa Hub

Fuente de verdad: **Manual Maestro de Marca FMA 2026–2030, versión 1.1 (septiembre de 2026)** y, para formulaciones estratégicas, la Plataforma de Posicionamiento v1.2 que el Manual cita. Custodio estratégico: Dirección Ejecutiva; gestión operativa: Comunicaciones (cap. 27). Cualquier cambio de logo, paleta, tipografía o estructura se consulta con Comunicaciones.

## Qué es Turquesa Hub en la arquitectura de marca (cap. 04, 14 y 17)

- Activo de **nivel 4**, plataforma subordinada al **Sello Turquesa** (programa madre, nivel 3). Autonomía visual baja.
- Se nombra siempre junto a su programa madre: **«Turquesa Hub · Sello Turquesa»**. No se presenta al nivel de un programa madre ni como marca independiente.
- **No tiene logo propio y no se crea uno** («inventario de logos existentes de nivel 4 … sin crear logos nuevos», cap. 28). La marca se expresa de forma tipográfica (Poppins) con el endoso de Fundación Milagro de Abril: línea divisora neutra (#C9CCDB) + logo FMA (sistema A) o la frase «Un servicio de Fundación Milagro de Abril» (sistema B).
- El Sello Turquesa se muestra solo con su **imagotipo completo** (símbolo + «Sello Turquesa») y con el endoso «Un servicio de Fundación Milagro de Abril», en las páginas informativas del Sello.

## Archivos de esta carpeta

| Archivo | Qué es | Origen |
|---|---|---|
| `fma-logo-vertical.png` (698×637) | Logo FMA vertical (versión principal) a color | Extraído del PDF del Manual (cap. 06) con su máscara de transparencia |
| `fma-logo-horizontal.png` (895×354) | Logo FMA horizontal a color · cabecera, pie, membrete de impresión | Ídem |
| `fma-isotipo.png` (442×442) y `fma-isotipo-{32,64,180,512}.png` | Isotipo oficial · favicon, icono táctil y piezas muy pequeñas (cabecera móvil) | Ídem |
| `fma-logotipo.png` (690×214) | Logotipo (texto) · disponible, sin uso en la interfaz | Ídem |
| `fma-logo-negativo-blanco.png` (1312×1204) | Versión negativa oficial (logo en blanco) · página de acceso sobre Turquesa Profundo | Ídem |
| `fma-isotipo-mono-{turquesa,violeta,tinta}.png` | Isotipo monocromático oficial · disponibles, sin uso en la interfaz | Ídem |
| `sello-turquesa-imagotipo.png` (1600×629) | Imagotipo completo del Sello Turquesa · páginas del Sello | Extraído del PDF del Manual (cap. 17), recortado a su caja y reducido |

Los archivos reproducen las versiones **oficiales autorizadas** tal como están embebidas en el Manual (raster con transparencia). **Pendiente para ingeniería/Comunicaciones:** sustituirlos por los archivos del repositorio de marca (`FMA_Logo_*_APPROVED`, vector `.ai`/SVG y PNG de alta resolución, cap. 28) cuando se entreguen; mantener los mismos nombres de archivo para no tocar el código. No se recomponen, recolorean, deforman ni rodean con sombras (cap. 06).

## Reglas aplicadas en el código

| Regla del Manual | Dónde se aplica |
|---|---|
| Paleta oficial (cap. 07 y tabla técnica cap. 30): Turquesa Sello #17A2B8 · Turquesa Profundo #0B7F95 · Turquesa Brillante #43CBFF · Violeta #736EFE · Violeta Texto #5B54C9 · acentos · neutros Tinta #2B2C40, Gris #6A6C82, Nube #F4F5FB, Crema #FBF7F0 | `css/tokens.css` (los tintes de superficie son el color oficial al 10 % sobre blanco; los estados hover son el color oficial −12 %) |
| Contraste verificado (cap. 07/13): texto normal ≥ 4.5:1, grande ≥ 3:1, componentes ≥ 3:1 | Texto de lectura solo en Tinta, Gris, Turquesa Profundo (sobre blanco), Violeta Texto o Ciruela; blanco solo sobre Turquesa Profundo, Violeta Texto, Ciruela o Tinta; sobre el degradado solo texto grande. Auditoría axe: 0 violaciones en 37 vistas |
| Semáforo accesible (cap. 12): el color no transmite la información por sí solo | Badges, alertas, estados y campos con error: punto/borde de color + texto en Tinta |
| Botón primario Turquesa Profundo con texto blanco; foco visible ≥ 2 px con contraste ≥ 3:1; área táctil ≥ 44 px; cuerpo ≥ 16 px (cap. 13) | `css/components.css`, `css/base.css` |
| Tipografía (cap. 08): Poppins (identidad, títulos, navegación, datos, UI) · Nunito Sans (cuerpo y formularios) · Lora Italic (citas y frases ancla); sustitutas Segoe UI/Calibri y Georgia/Cambria | `index.html` (Google Fonts, fuente oficial indicada por el Manual) y `css/tokens.css` |
| Sistema gráfico (cap. 09): un recurso dominante por pieza; la onda es ocasional (aperturas y cierres); páginas técnicas sin onda; contenedores y filetes neutros de apoyo | Onda solo en la franja de apertura de la página pública de inicio (`.portada__banda`); filete turquesa→violeta bajo los títulos; páginas de trabajo sin onda |
| Degradado FMA como acento, no como fondo permanente (cap. 07) | Solo en la franja de apertura y en el filete |
| Logo según el fondo (cap. 06): a color sobre blanco/claro neutro; blanco sobre Turquesa Profundo; nunca negro sobre oscuro; nunca onda encima del logo | Cabecera y pie (blanco/Nube), acceso (negativo blanco), impresión (membrete blanco con filete que no pasa por detrás del logo, cap. 21) |
| Iconografía lineal, redondeada, monocromática en Turquesa Profundo, Violeta Texto o Tinta (cap. 10) | `js/components/ui.js` + `.icono` |
| Lenguaje (cap. 01–03, 12, 26): «Fundación Milagro de Abril» en primera mención y «FMA» después; descriptor «Laboratorio de Innovación Social» como texto; Modelo Turquesa como modelo de intervención (nunca «metodología» ni «Modelo Turquesa de Innovación Social»); «participantes», no «beneficiarios»; «constancia» («Fundación Milagro de Abril hace constar que…»), nunca «certificación»; eslogan «Renacer · Emerger · Trascender» solo como cierre | Textos de `js/components/layout.js`, `js/views/public.js`, `js/views/collaborator.js`, `js/views/organization.js` |
| Textos de marca oficiales sin versiones nuevas (cap. 02, 27): definición corta, idea central y promesa | Página de inicio y «Conocer Turquesa Hub» |

## Qué no se hizo (a propósito)

- No se dibujó ningún logo, sello ni símbolo nuevo para Turquesa Hub, el Laboratorio o el Modelo Turquesa.
- No se usó el loto como decoración, ni ondas sobre el logo, ni lockups triples (Turquesa Hub | Sello | FMA).
- No se aplicó identidad de otros universos (Ruta de la Mariposa, Línea Turquesa): la ilustración anterior con formas de mariposa fue retirada.
- No se compuso el archivo «logo + descriptor» (pendiente en la biblioteca de marca, cap. 28): el descriptor aparece como versión tipográfica autorizada.
