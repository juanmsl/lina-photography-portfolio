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
pnpm dev:lan   # dev server reachable from other devices on the same network (http://<your-ip>:5173)
pnpm build     # type check + build to dist/
pnpm lint      # ESLint (polpo-eslint-config)
pnpm lint:fix  # ESLint with automatic fixes
pnpm preview   # serve dist/
```

## Deployment (Vercel)

The site is deployed on Vercel from the GitHub repository. `vercel.json` holds the whole configuration:

- **Build:** `pnpm install --frozen-lockfile`, then `pnpm lint && pnpm build`; output in `dist/`.
- **Clean URLs:** `servicios.html` is served at `/servicios`, with no trailing slash.
- **Routes without their own HTML** (enlarged photos, example projects, "Solicitud enviada") are rewritten to
  `404.html`, which loads the app with `noindex`. Any other unknown URL gets that same page with a real 404 status.
- **Cache:** hashed files in `/assets` are cached for a year; `sw.js` is always revalidated so the PWA updates.

Every push to `main` deploys to production, and every PR gets its own preview URL (Vercel marks previews
`noindex`).

### One-time setup

1. In Vercel: **Add New → Project → Import** `juanmsl/lina-photography-portfolio`. Vercel reads `vercel.json`, so
   the build settings need no changes.
2. **Settings → Environment Variables:** `ENABLE_EXPERIMENTAL_COREPACK` = `1` (all environments). With it Vercel uses
   the pnpm version from `packageManager` (11.10.0); without it, it picks an older pnpm and the install fails because
   of `engines`. Node comes from `engines` (24.x).
3. **Settings → Domains:** add `linanieto.com` and `www.linanieto.com` (redirect `www` to the apex). Vercel shows the
   DNS records to use: replace the GitHub Pages `A` records and the `www` CNAME at the DNS provider with them. Keep
   the `google-site-verification` TXT record.
4. In GitHub: **Settings → Pages → Source: None** (or unpublish) so GitHub Pages stops serving the old copy.

## Analytics

`@vercel/analytics` (Web Analytics: visits and page views, without cookies) and `@vercel/speed-insights` (Core Web
Vitals from real visitors) are rendered once in `AppLayout` (`src/App.tsx`). Speed Insights receives the route
pattern (for example `/proyectos/:slug`) so dynamic pages are grouped. They only send data from a Vercel deployment:
locally the `/_vercel/*` scripts answer 404, which is expected.

One-time setup in Vercel: **Project → Analytics → Enable** and **Project → Speed Insights → Enable**.

## Photos on Cloudinary

The photos are served from Cloudinary, never as originals:

- **Originals** are uploaded as `authenticated` assets (`lina/photos/<name>`): they have no public URL.
- **Only four versions can be delivered**, the named transformations defined in `scripts/cloudinary/config.mjs`:
  - `lina_page` (up to 1600 px, no watermark): only Lina's own portrait in the hero (`size='page'`).
  - `lina_tiny`, `lina_small`, `lina_thumb`, `lina_large` and `lina_full` (480, 900, 1600 and 2400 px, and the
    uploaded resolution, all watermarked): every photo of her work on the pages (galleries, covers, services, quote
    tiles, "next project", "Solicitud enviada"). They work like a `srcset`: `Photo` takes the lightest size that is
    sharp for its box on that screen (box size, the crop of `object-cover` and the pixel density; `sizeFor` in
    `src/photoLoader.ts`) and moves up if the box grows. Meanwhile it shows `lina_tiny` blurred, which arrives
    first, and fades to the sharp one. A real `<picture>`/`srcset` is not used because the browser would request
    the Cloudinary URLs directly, and they would show again in the inspector instead of the `blob:` URL.
  - `lina_view` (up to 2560 px, watermarked): the enlarged photo on `/proyectos/:slug/foto/:n`.

  The watermark (`lina/watermark`): the LN monogram with the name, in white (`public/watermark.svg`), repeated as a
  grid over the whole photo (`fl_tiled`). Its settings are in `scripts/cloudinary/watermark.mjs` (`WATERMARK`):
  the mark is **40 px wide**, rotated **-30°**, with **200 px** of empty space between neighboring marks, at **5 %**
  opacity. Those pixels are exact inside every delivered image, whatever its size (on screen they scale with the
  photo). The 40 px is the drawing's own width (the SVG has a wide empty margin, which is left out), and the 200 px
  is measured between the edges of the rotated drawings. `pnpm cloudinary:setup` builds the tile from those
  settings (`scripts/cloudinary/watermark.svg`, generated: the rotated mark plus the gap as transparent margin) and
  uploads it; after changing them, run `pnpm cloudinary:setup --force`.
- **Signed URLs**: `build/photos-plugin.ts` signs one URL per photo and size at build time with `CLOUDINARY_URL`
  and exposes them as `virtual:lina-photos`. The secret never reaches the browser, and editing an URL (bigger
  size, no watermark) breaks the signature. When Cloudinary is on, the build also drops `public/photos` from the
  output so the originals are not published with the site, and the photos in link previews and structured data
  (`src/seo.ts`) use the signed URLs too: the watermarked version for Lina's work, the plain one for her portrait.
- **Without `CLOUDINARY_URL`** (for example a local `pnpm dev` with no `.env.local`) the site uses the local files in
  `public/photos/`. A photo missing in both places shows the dark placeholder.
- `Photo` downloads each photo with `fetch` once it gets close to the screen and shows it through a `blob:` URL, so
  the `<img>` in the inspector does not point to Cloudinary (if the download fails it falls back to the direct
  URL). It also disables right click, dragging and the iOS long-press menu.
- **Loading speed** (`src/photoLoader.ts`): each photo is downloaded once per visit and kept in memory, so it is
  never fetched twice. Until the right size arrives, a photo shows the sharpest size of it already downloaded, or
  the tiny one blurred. The enlarged view first shows the gallery version if it is already loaded and swaps to the
  big one when it arrives; it also preloads the previous and next photos, and a gallery photo starts loading its
  big version on hover. `pnpm cloudinary:setup` generates every version at upload time (eager), so no visitor
  waits for Cloudinary to create one. All of this only discourages: the
  request is still visible in the network tab and anything shown on screen can be captured, which is why only
  reduced versions are public and every photo of her work is watermarked.

### Setup

1. Create a Cloudinary account (or use the same one as Áureo: everything here lives under `lina/` and `lina_*`). In
   **Settings → API Keys**, copy the **API environment variable**
   (`CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>`).
2. Put that line in `.env.local` at the root of this project (ignored by git; never commit it).
3. In Vercel: **Settings → Environment Variables → CLOUDINARY_URL** with the same value (Production and Preview).
4. Run `pnpm cloudinary:setup`. It creates the named transformations, uploads the watermark and the photos in
   `public/photos/` that are not in Cloudinary yet, and generates every version of every photo. Run it again
   whenever photos are added. After changing a photo file, the watermark or a transformation, run
   `pnpm cloudinary:setup --force`: it re-uploads everything and purges the cached versions.
5. In Cloudinary: **Settings → Security → Strict transformations: enabled**. From then on only the named
   transformations can be delivered.
6. Redeploy on Vercel so the build signs the new URLs.

### Adding photos

1. Keep the originals outside the repository. Export a web copy of each photo: JPEG, at most 3000 px on the long
   side and under 10 MB (Cloudinary's limit on the free plan), with a descriptive kebab-case name
   (`river-sunset.jpg`), into `public/photos/`.
2. Register it in `src/content/photos.ts` (id, file, its width and height in `dimensions`, so the enlarged view
   shows it whole, title and a specific alt text in Spanish) and place it in a
   project in `src/content/projects.ts` (cover and gallery rows: each row is a list of photo ids; the photos keep
   their own proportions, never cropped, so a row only decides which photos go side by side).
3. Run `pnpm cloudinary:setup` and redeploy.

`public/photos/` is ignored by git (except `lina.jpg`): with Cloudinary the site never reads those files, and
committing them would publish the unwatermarked copies with the repository. The deployed site therefore needs
`CLOUDINARY_URL` in Vercel; without it the photos show as placeholders.

## Search engines and link previews

- `src/seo.ts`: title, description, robots, canonical, link-preview image and structured data (JSON-LD) for every
  route. It is the single source: `PageMeta` applies it while navigating, and the build writes it into the HTML.
  Photo URLs come from a resolver (`PhotoUrl`), so with Cloudinary they are the signed URLs.
- `build/seo-plugin.ts` (Vite plugin): writes one HTML file per indexable route (`servicios.html`,
  `proyectos/rio.html`…) with its own head, plus `404.html` (`noindex`) and `sitemap.xml`. Every page then
  answers 200 with the right tags, even for crawlers and link previews that do not run JavaScript.
- Not indexed (`noindex, follow`, out of the sitemap): example projects (`isExample`), enlarged photos, "Solicitud
  enviada" and the 404 page.
- `public/robots.txt` points to the sitemap. If the domain changes, update `SITE_URL` in `src/content/contact.ts`,
  `index.html` and `robots.txt`.

Search Console setup and next steps: `docs/SEO.md`.

## Structure

```
src/
  content/      Copy and data: projects, services, photos, contact, quote
  components/   Design D pieces (Navigation, DualTitle, FactSheet, Photo, Gallery, PlateFrame, ServiceTilePicker…) and PageMeta (title and canonical URL per route)
  pages/        PortfolioPage, ProjectPage, PhotoViewerPage, ServicesPage, QuotePage, QuoteSentPage, NotFoundPage
  index.css     Polpo theme with the D/ tokens (colors, typefaces, sizes)
.claude/skills/polpo   Polpo instructions for agents (npx polpo init-ai --claude)
docs/                  DESIGN.md (design system), PRODUCT.md (product context) and SEO.md
```

Routes (kept in Spanish because visitors see them): `/`, `/categorias`, `/categorias/:slug`, `/proyectos/:slug`,
`/proyectos/:slug/foto/:n`, `/servicios`, `/cotizar`, `/cotizar/enviada`.

Each category with projects (`slug` in `categories`, `src/content/projects.ts`) gets a page at `/categorias/:slug`;
the portfolio dividers link to it. The page is a vertical reel (`ProjectReel`): the selected project in the middle with
its title over the edge of the photo, the previous and next peeking above and below, and the categories at the bottom
left. The mouse wheel, ↑ ↓, a swipe, the dots and the arrow move it (it is circular); the selected project is kept in
the address as `?p=<slug>`. Clicking the photo or the title opens `/proyectos/:slug`: the cover and the title travel
there (view transition names `project-cover` and `project-title`, see index.css). The project page opens with the cover
full screen, then text, facts, the photos two by two (`StaggeredGallery`) and the previous and next project links;
"← Category · Resumen" goes back to the reel on that project.

`/categorias` (in the main navigation) shows every category's photos in a carousel, with chips to switch category
(kept in the address as `?c=<slug>`); the middle photo opens the photo viewer and the caption links to its project.

## Logo and logotype

The brand is the LN monogram (script "LN" inside a broken circle with a viewfinder corner) plus the "Lina Nieto"
logotype in script. Both are single-colour SVGs that take the text color (`currentColor`):

- `src/components/Logo.tsx` (monogram) and `src/components/Logotype.tsx` (logotype). In the navigation and the
  mobile menu they go together, monogram first; the footer uses the monogram alone before the copyright.
- `public/logo-ln.svg` and `public/logotipo.svg` (source files), `public/favicon.svg` (bone monogram on an ink
  square), `public/apple-touch-icon.png` (180×180) and `public/og.jpg` (link preview with monogram and logotype).

Use them in bone on dark backgrounds and in ink on light ones; never in color, outlined or distorted. Keep the
monogram at least 24 px tall and the logotype at least 20 px tall so the script stays legible.

## Light and dark theme

The site opens in the dark theme, always, unless the visitor turns the light on. The system preference
(`prefers-color-scheme`) is ignored on purpose.

- **Switch:** `src/components/ThemeToggle.tsx`, a light bulb in the navigation (off = dark, on = light). The change is
  animated like a camera flash when the light turns on and dims when it turns off (`theme-to-light` /
  `theme-to-dark` view transitions in `src/index.css`).
- **Memory:** `src/theme.ts` stores the choice in `localStorage` (`lina-theme`). An inline script in `index.html`
  applies it before the first paint (also to the loader) so there is no flash of the wrong theme.
- **Tokens:** the light theme overrides the same color variables on `:root[data-theme='light']` in `src/index.css`:
  bone becomes the paper (`#F2EFEA`), black becomes the ink, and gray, lines, surfaces and the Polpo `primary` scale
  change accordingly. Components keep using `text-bone`, `bg-ink`, etc. Text that sits on a photo uses
  `text-on-photo` / `text-on-photo-ink`, which never change; Prussian blue and gold are not overridden.
- Figma: page "D · Cuarto claro" with every screen in the light theme and the `D Claro/` paint styles.

## Cyanotype mode

A second switch next to the light bulb (`src/components/CyanotypeToggle.tsx`, a drop that turns Prussian blue when
on) shows every photo of Lina's work as a cyanotype; each one goes back to color under the pointer, and turning
the switch off brings all of them back. Her own portrait in the hero is left out.

- **State:** `src/cyanotype.ts` sets `data-cyanotype="on"` on `<html>` and stores the choice in `localStorage`
  (`lina-cyanotype`); the inline script in `index.html` applies it before the first paint.
- **Styles:** the `cyano:` variant (`@custom-variant` in `src/index.css`) applies only while that attribute is set.
  `Photo` uses it to add the grayscale filter and the Prussian blue color layer, and removes both on hover of the
  photo (`group/photo`), with the same 0.7 s fade. Nothing re-renders when the switch changes.
- On touch screens there is no hover, so the photos stay blue until the switch is turned off.

## Loader and page transitions

- **Initial loader:** `#splash` in `index.html` (inline CSS, so it shows before the JS arrives): the LN monogram
  pulsing over ink with a thin progress line. `src/splash.ts` fades it out once the fonts and the hero photo are
  ready (3 s at most) and removes it.
- **Transitions between pages:** the router is a data router (`createBrowserRouter` in `src/App.tsx`) so `Link` and
  `navigate` can use `viewTransition`. The animation lives in `src/index.css` (`::view-transition-*`): the old page
  fades out, the new one rises in, and the header stays still. Browsers without the View Transitions API change the
  page without animation. Every new link or `navigate` call should pass `viewTransition`.
- Both respect `prefers-reduced-motion`.

## Installable app (PWA)

`vite-plugin-pwa` (in `vite.config.ts`) turns the site into an installable app:

- **Manifest:** name, short name, colors and icons are set in `VitePWA({ manifest })`. The build writes
  `manifest.webmanifest` and links it from `index.html`. `start_url` and `scope` follow `base`.
- **Icons:** `public/pwa-192x192.png`, `public/pwa-512x512.png` and `public/maskable-icon-512x512.png` (LN monogram
  on ink; the maskable one leaves the safe margin Android needs). iOS uses `apple-touch-icon.png` and the
  `apple-mobile-web-app-*` tags in `index.html`.
- **Service worker:** generated by Workbox. It precaches the app shell (HTML, JS, CSS, SVG), caches fonts and photos
  the first time they load, and updates itself on the next visit (`registerType: 'autoUpdate'`). The site keeps
  working offline with what was already visited.

On Android (Chrome) the browser offers "Instalar app"; on iPhone, Safari → Compartir → "Agregar a inicio". The
service worker only runs in `pnpm build` + `pnpm preview` or in production, not in `pnpm dev`.

## Theme

`src/index.css` overrides Polpo's variables: `ink` background `#0A0A0B`, `bone` text `#F2EFEA`, `graphite` rules
`#2A2A2E`, `ash` secondary text `#A3A3A8`, `prussian` blue `#5B8FC0` and `gold` `#C49A4E`; `primary` is bone (filled
primary button, outlined secondary). Self-hosted Fontsource typefaces: Bricolage Grotesque ExtraBold (headings),
Instrument Serif italic (second voice), Hanken Grotesk (text) and Geist Mono (coordinates).

Custom components (Polpo does not ship them): ServiceTilePicker (photo tile selector, uses react-hook-form),
PlateFrame, the cyanotype → color reveal and the row Gallery. Everything else uses Polpo.

## Pending before launch

- **Project details**: the six projects (`src/content/projects.ts`) only describe what the photos show. Lina still
  has to confirm or add the place, client and year of each one (for example, where the river series was taken and
  which restaurants appear in Interiores), and optionally the region and coordinates of each photo
  (`src/content/photos.ts`), which the enlarged view shows.
- **Camera settings**: the enlarged view has a switch (aperture icon, or the I key) that shows the ISO, exposure
  time, aperture and focal length on the photo. It only appears for photos with a `camera` field in
  `src/content/photos.ts`, e.g. `camera: { iso: 100, exposure: '1/250', aperture: 5.6, focalLength: 18 }`; every
  value is optional. Today only "Geografía de un hogar" has it (read from its EXIF); the other exports have no
  camera data, so Lina has to add the values by hand or export again with metadata. The visitor's choice is
  remembered (`src/cameraData.ts`).
- **Form**: the quote page simulates the submission; it still needs a service that receives the requests.
