# Turquesa Hub · Front

Sitio web de **Turquesa Hub**, la plataforma de la Fundación Milagro de Abril (FMA) para que las organizaciones hagan su autodiagnóstico, planifiquen acciones y se formen. Es HTML, CSS y JavaScript estáticos, sin dependencias ni compilación; se publica en GitHub Pages en `https://turquesahub.fundacionmilagrodeabril.org`.

El backend (Supabase: Auth, PostgreSQL y RLS) vive en un repositorio privado aparte. **Este repositorio es público: aquí no hay secretos.** Lo único que el navegador conoce de Supabase es su URL y su clave *publishable*, que son públicas por diseño; la seguridad la dan las políticas de la base de datos (RLS), no el ocultamiento del código.

> Turquesa Hub no recibe denuncias ni gestiona casos individuales. El autodiagnóstico es orientativo y se basa en lo que cada organización declara.

## Estructura

| Ruta | Contenido |
|---|---|
| `public/` | El sitio: `index.html`, `css/`, `js/` (componentes, vistas, servicios, adaptadores), `assets/` y `CNAME` (dominio). |
| `config/` | `env.desarrollo.js` y `env.produccion.js`; el build copia el de producción a `js/env.js`. |
| `tools/build.js` | Genera `dist/` sin datos de prueba y verifica que el paquete sea válido. |
| `tests/` | Pruebas: humo (desarrollo), integración en modo producción con API simulada y paquete de producción. |

## Ejecutar en local (con datos de demostración, sin backend)

```bash
cd public && python3 -m http.server 8765    # http://localhost:8765
```

Las cuentas de demostración (contraseña `Turquesa2026*`) son ficticias, viven solo en el navegador y **no existen en producción**.

| Perfil | Correo |
|---|---|
| Administración FMA | `turquesa@fma.demo` |
| Organización con diagnóstico y plan | `talento@cafeandino.demo` |
| Colaboradora | `laura.gomez@cafeandino.demo` |

## Pruebas y paquete de producción

```bash
cd tests && npm ci && npm test      # 14 verificaciones de paquete + suites de humo e integración
node tools/build.js produccion      # genera dist/
```

## Publicación

Al fusionar en `main`, `pages.yml` ejecuta las pruebas, construye `dist/` y lo publica en GitHub Pages. Requisitos en *Settings → Pages*: origen **GitHub Actions** y dominio personalizado `turquesahub.fundacionmilagrodeabril.org` (con *Enforce HTTPS*).
