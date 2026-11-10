# Lina Nieto · Portfolio

Portfolio site for Lina María Nieto Gómez, built from direction **D · Cuarto oscuro** in Figma file
`w3WthJXOQOkFUEW9wKw6Gy`. React 19 + TypeScript + Vite, with the [Polpo](https://ui.juanmsl.com) UI library and
Tailwind CSS v4.

Design system in `docs/DESIGN.md` and product context in `docs/PRODUCT.md`.

**Language convention:** code, file names, comments and docs are in English; everything the visitor sees
(copy, URLs, aria labels, alt text) is in Spanish.

## Commands

Requires Node 24 (`.nvmrc`) and pnpm 11.10.0 (`packageManager`; `corepack enable` activates it). `engines` in
`package.json` plus `engineStrict` in `pnpm-workspace.yaml` make `pnpm install` refuse to run on other versions.

```sh
pnpm install
pnpm dev       # dev server
pnpm build     # type check + build to dist/
pnpm lint      # ESLint (polpo-eslint-config)
pnpm lint:fix  # ESLint with automatic fixes
pnpm preview   # serve dist/
```

## Deployment

Every push to `main` (for example, merging a PR) publishes the site to GitHub Pages through
`.github/workflows/deploy.yml`: it installs with pnpm, runs `pnpm lint`, builds and uploads `dist/`. It can also be
run manually from the **Actions** tab (Run workflow).

- Once: in the repository, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- URL: **https://linanieto.com** (custom domain). One-time setup:
  - **Settings → Pages → Custom domain:** `linanieto.com` and, once DNS resolves, **Enforce HTTPS**.
  - DNS for `linanieto.com`: **A** records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
    `185.199.111.153` (optionally **AAAA** to `2606:50c0:8000::153` … `2606:50c0:8003::153`) and a **CNAME** from
    `www` to `juanmsl.github.io`.
  - No `CNAME` file is needed: with Actions deployments GitHub ignores it and stores the domain in Settings.
  - After setting the domain, redeploy (Actions → Run workflow) so the site is built for the root path.
- The base path comes from `actions/configure-pages`: `/` with a custom domain, `/<repository>/` without one.
  `vite.config.ts` reads it from `BASE_PATH` (`/` locally), the router uses `import.meta.env.BASE_URL` as its
  `basename`, and photos in `public/` are requested with the same base.
- GitHub Pages does not know the app's routes, so the workflow copies `index.html` to `404.html` and direct links
  (e.g. `linanieto.com/servicios`) still open.

## Search engines and link previews

- `index.html`: description, canonical URL and Open Graph / X tags with `public/og.jpg` (1200×630, Lina's photo in
  black and white with the LN monogram).
- `src/components/PageMeta.tsx`: title, description and canonical URL for each route; `noindex` on "Solicitud
  enviada" and the 404 page.
- `public/robots.txt` and `public/sitemap.xml` (portfolio, services, quote and the projects). If the domain changes
  or projects are added, update both files, `index.html` and `SITE_URL` in `src/content/contact.ts`.

## Structure

```
src/
  content/      Copy and data: projects, services, photos, contact, quote
  components/   Design D pieces (Navigation, DualTitle, FactSheet, Photo, Gallery, PlateFrame, ServiceTilePicker…) and PageMeta (title and canonical URL per route)
  pages/        PortfolioPage, ProjectPage, PhotoViewerPage, ServicesPage, QuotePage, QuoteSentPage, NotFoundPage
  index.css     Polpo theme with the D/ tokens (colors, typefaces, sizes)
.claude/skills/polpo   Polpo instructions for agents (npx polpo init-ai --claude)
docs/                  DESIGN.md (design system) and PRODUCT.md (product context)
```

Routes (kept in Spanish because visitors see them): `/`, `/proyectos/:slug`, `/proyectos/:slug/foto/:n`,
`/servicios`, `/cotizar`, `/cotizar/enviada`.

## Logo and logotype

The brand is the LN monogram (script "LN" inside a broken circle with a viewfinder corner) plus the "Lina Nieto"
logotype in script. Both are single-colour SVGs that take the text color (`currentColor`):

- `src/components/Logo.tsx` (monogram) and `src/components/Logotype.tsx` (logotype). In the navigation and the
  mobile menu they go together, monogram first; the footer uses the monogram alone before the copyright.
- `public/logo-ln.svg` and `public/logotipo.svg` (source files), `public/favicon.svg` (bone monogram on an ink
  square), `public/apple-touch-icon.png` (180×180) and `public/og.jpg` (link preview with monogram and logotype).

Use them in bone on dark backgrounds and in ink on light ones; never in color, outlined or distorted. Keep the
monogram at least 24 px tall and the logotype at least 20 px tall so the script stays legible.

## Theme

`src/index.css` overrides Polpo's variables: `ink` background `#0A0A0B`, `bone` text `#F2EFEA`, `graphite` rules
`#2A2A2E`, `ash` secondary text `#A3A3A8`, `prussian` blue `#5B8FC0` and `gold` `#C49A4E`; `primary` is bone (filled
primary button, outlined secondary). Self-hosted Fontsource typefaces: Bricolage Grotesque ExtraBold (headings),
Instrument Serif italic (second voice), Hanken Grotesk (text) and Geist Mono (coordinates).

Custom components (Polpo does not ship them): ServiceTilePicker (photo tile selector, uses react-hook-form),
PlateFrame, the cyanotype → color reveal and the row Gallery. Everything else uses Polpo.

## Pending before launch

- **Photos**: only `public/photos/lina.jpg` is real. The rest are listed in `src/content/photos.ts` and expected in
  `public/photos/` (`paramo.jpg`, `cocora.jpg`, `clouds.jpg`, `forest.jpg`, `brick.jpg`, `stairs.jpg`,
  `portrait.jpg`, `fashion.jpg`, `product.jpg`, `camera.jpg`). While they are missing, a dark placeholder with the
  description is shown. Ideally, use Lina's real photographs.
- **Contact**: WhatsApp, email and Instagram in `src/content/contact.ts` come from the mockup.
- **Form**: the quote page simulates the submission; it still needs a service that receives the requests.
- Invernadero, Campaña textil and Bodegón are example projects.
