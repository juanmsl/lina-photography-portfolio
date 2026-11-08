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
pnpm lint      # oxlint
pnpm preview   # sirve dist/
```

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
