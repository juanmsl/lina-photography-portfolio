# Lina Nieto · Portafolio

Sitio del portafolio de Lina María Nieto Gómez, dirección **D · Cuarto oscuro** del archivo de Figma
`w3WthJXOQOkFUEW9wKw6Gy`. React 19 + TypeScript + Vite, con la librería de UI [Polpo](https://ui.juanmsl.com)
y Tailwind CSS v4.

Sistema de diseño en `docs/DESIGN.md` y contexto de producto en `docs/PRODUCT.md`.

## Comandos

Requiere Node 24 (`.nvmrc`) y pnpm 11.10.0 (`packageManager`; con `corepack enable` se activa sola). `engines` en `package.json` y `engineStrict` en `pnpm-workspace.yaml` hacen que `pnpm install` se niegue a correr con otra versión.

```sh
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # tipos + compilación a dist/
pnpm lint      # ESLint (polpo-eslint-config)
pnpm lint:fix  # ESLint con correcciones automáticas
pnpm preview   # sirve dist/
```

## Despliegue

Cada push a `main` (por ejemplo, al hacer merge de un PR) publica el sitio en GitHub Pages con
`.github/workflows/deploy.yml`: instala con pnpm, corre `pnpm lint`, compila y sube `dist/`. También se puede
lanzar a mano desde la pestaña **Actions** (Run workflow).

- Una sola vez: en el repositorio, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- URL: `https://juanmsl.github.io/lina-photography-portfolio/`. La ruta base sale de `actions/configure-pages`; si después se
  configura un dominio propio, el sitio pasa a servirse desde la raíz sin cambiar nada más.
- `vite.config.ts` toma la ruta base de `BASE_PATH` (en local es `/`), el router usa
  `import.meta.env.BASE_URL` como `basename` y las fotos de `public/` se piden con esa misma base.
- Como GitHub Pages no conoce las rutas de la app, el workflow copia `index.html` a `404.html` para que los
  enlaces directos (p. ej. `/lina-photography-portfolio/servicios`) también abran.

## Estructura

```
src/
  content/      Textos y datos: proyectos, servicios, fotos, contacto, cotización
  components/   Piezas del diseño D (Navegación, Rótulo, Ficha, Foto, Galería, Marco de plancha, Mosaico de servicio…)
  pages/        Portafolio, Proyecto, Foto ampliada, Servicios, Cotizar, Solicitud enviada, 404
  index.css     Tema de Polpo con los tokens D/ (colores, tipografías, tamaños)
.claude/skills/polpo   Instrucciones de Polpo para agentes (npx polpo init-ai --claude)
docs/                  DESIGN.md (sistema de diseño) y PRODUCT.md (contexto de producto)
```

Rutas: `/`, `/proyectos/:slug`, `/proyectos/:slug/foto/:n`, `/servicios`, `/cotizar`, `/cotizar/enviada`.

## Tema

`src/index.css` sobrescribe las variables de Polpo: fondo negro `#0A0A0B`, texto hueso `#F2EFEA`, filetes grafito
`#2A2A2E`, gris `#A3A3A8`; `primary` es el hueso (botón primario relleno, secundario en contorno). Tipografías
autoalojadas con Fontsource: Bricolage Grotesque ExtraBold (titulares), Instrument Serif itálica (segunda voz),
Hanken Grotesk (texto) y Geist Mono (coordenadas).

Componentes propios (Polpo no los trae): Mosaico de servicio (selector con fotos, usa react-hook-form),
Marco de plancha, revelado cianotipia → color y Galería en filas. Todo lo demás usa Polpo.

## Pendiente antes de publicar

- **Fotos**: solo `public/fotos/lina.jpg` es real. Las demás están en el catálogo `src/content/fotos.ts` y se
  esperan en `public/fotos/` (`paramo.jpg`, `cocora.jpg`, `nubes.jpg`, `bosque.jpg`, `ladrillo.jpg`,
  `escalera.jpg`, `retrato.jpg`, `moda.jpg`, `producto.jpg`, `camara.jpg`). Mientras falten, se ve un marcador
  oscuro con la descripción. Lo ideal es poner las fotos reales de Lina.
- **Contacto**: WhatsApp, correo e Instagram en `src/content/contacto.ts` son los del mockup.
- **Formulario**: `Cotizar` simula el envío; falta conectarlo a un servicio que reciba las solicitudes.
- Invernadero, Campaña textil y Bodegón son proyectos de ejemplo.
- Al desplegar, el servidor debe redirigir todas las rutas a `index.html` (rutas del navegador).
