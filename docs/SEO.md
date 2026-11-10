# SEO and indexing

How linanieto.com is prepared for search engines, how to register it in Google Search Console and what is still
pending.

## What the site already does

| Piece                                                                                                                                                                                                              | Where                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| Unique title and description per page, in Spanish, with "Bogotá" where it fits                                                                                                                                     | `src/seo.ts`                          |
| Canonical URL without a trailing slash (`https://linanieto.com/servicios`)                                                                                                                                         | `src/seo.ts`, build plugin            |
| `robots`: `index, follow, max-image-preview:large`, or `noindex, follow` on pages that should not rank                                                                                                             | `src/seo.ts`                          |
| One static HTML file per indexable page (HTTP 200 and the right head without running JavaScript)                                                                                                                   | `build/seo-plugin.ts`                 |
| `sitemap.xml` generated on every build with only the indexable pages                                                                                                                                               | `build/seo-plugin.ts`                 |
| `robots.txt` pointing to the sitemap                                                                                                                                                                               | `public/robots.txt`                   |
| Structured data (schema.org JSON-LD): `WebSite`, `Person` (the photographer, Bogotá), `ProfilePage` on the home page; `WebPage` + `BreadcrumbList` on Servicios; `CreativeWork` + `BreadcrumbList` on each project | `src/seo.ts`                          |
| Open Graph and X cards (`og.jpg`, 1200×630)                                                                                                                                                                        | `index.html`, `src/seo.ts`            |
| `lang="es-CO"`, `og:locale es_CO`, descriptive `alt` on every photo                                                                                                                                                | `index.html`, `src/content/photos.ts` |
| HTTPS, mobile-first layout, PWA manifest, fast static hosting                                                                                                                                                      | Vercel, `vite.config.ts`              |

Pages left out on purpose (`noindex, follow`): the three example projects (Invernadero, Campaña textil, Bodegón,
flagged `isExample` in `src/content/projects.ts`), the enlarged-photo pages, "Solicitud enviada" and the 404 page.
When an example project is replaced with real work, remove `isExample` and it enters the sitemap automatically.

## Google Search Console

1. Open https://search.google.com/search-console and choose **Add property → Domain**: `linanieto.com`. A domain
   property covers `https`, `http`, `www` and any subdomain.
2. Google shows a `TXT` record (`google-site-verification=…`). Add it in the DNS of the domain (same panel where the
   Vercel records live), wait a few minutes and press **Verify**. Keep the record: removing it unverifies
   the property.
3. **Sitemaps** → submit `sitemap.xml` (full URL `https://linanieto.com/sitemap.xml`).
4. **URL inspection** → inspect `https://linanieto.com/`, then **Request indexing**. Repeat for `/servicios` and each
   real project. Use **Test live URL → View tested page** to confirm Google sees the title and the content.
5. After a few days check **Pages** (indexed / not indexed and why), **Enhancements → Breadcrumbs** (structured data)
   and **Core Web Vitals**.

Optional: the structured data can be checked anytime at https://search.google.com/test/rich-results and the link
previews at https://www.opengraph.xyz.

## Bing (and DuckDuckGo, Ecosia, ChatGPT search)

https://www.bing.com/webmasters → **Import from Google Search Console**. It copies the verified site and the
sitemap in one step.

## Pending before launch (they matter more than any tag)

- **Real photographs.** Today almost every image is provisional. Real work is what ranks in Google Images. Use
  descriptive file names (`paramo-chingaza-amanecer.jpg`, not `IMG_0412.jpg`), keep the `alt` texts specific (place,
  subject) and export them as WebP or AVIF around 2000 px on the long side.
- **Real contact details** in `src/content/contact.ts` (WhatsApp, email, Instagram). Once they are real, add the
  Instagram and other profiles to `sameAs` in the `Person` data of `src/seo.ts` so Google links the profiles to the
  site.
- **Google Business Profile** as a photographer in Bogotá (service area business, without a public address if she
  does not have a studio). It is the strongest signal for searches like "fotógrafa en Bogotá" and shows the site in
  Maps. Use the same name, phone and city as the site.
- **Links to the site**: Instagram bio, the Áureo site (a link to linanieto.com from the studio page), directories of
  Colombian photographers, publications or clients that credit her work.
- **Text on project pages.** A few sentences per project (place, story, technique) give Google something to read
  besides the photos.

## Later, if it is worth it

- **Full prerender of the content.** Google runs the JavaScript and reads the content, so the current setup is
  enough. If other engines lag behind, the pages can be prerendered with their full HTML at build time.
- **Image sitemap** (`<image:image>` entries) once the real photographs are in.
- **Blog or field notes** (for example, "Fotografiar el páramo de Chingaza al amanecer"): content that answers real
  searches and brings visitors who then see the portfolio.
