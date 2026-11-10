/**
 * SEO for every route: title, description, canonical, robots and structured
 * data (JSON-LD). It is plain data with no DOM access, so it is shared by
 * `PageMeta` (in the browser) and by the build step in `vite.config.ts`, which
 * writes one HTML file per indexable route and the sitemap.
 */
import { SITE_URL } from './content/contact';
import { photos } from './content/photos';
import { findProject, projectPhotos, projects } from './content/projects';

export type RouteMeta = {
  title: string;
  description: string;
  /** false → `noindex, follow`, no canonical and left out of the sitemap. */
  indexable: boolean;
  /** Absolute image URL for link previews. */
  image: string;
  imageAlt: string;
  /** JSON-LD objects for this route. */
  jsonLd: Array<Record<string, unknown>>;
};

export const SITE_NAME = 'Lina Nieto · Fotografía';
const PERSON_NAME = 'Lina María Nieto Gómez';
const DEFAULT_DESCRIPTION =
  'Lina María Nieto Gómez, fotógrafa en Bogotá. Paisaje, naturaleza y arquitectura; también retrato, moda y producto.';
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const OG_IMAGE_ALT = 'Retrato en blanco y negro de Lina Nieto junto al título Portafolio fotográfico';

export const absoluteUrl = (pathname: string) => (pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`);

const photoUrl = (file: string) => `${SITE_URL}/photos/${file}`;

/** The photographer, referenced from every page by its @id. */
const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#lina`,
  name: PERSON_NAME,
  alternateName: 'Lina Nieto',
  jobTitle: 'Fotógrafa',
  url: `${SITE_URL}/`,
  image: photoUrl(photos.lina.file),
  homeLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
  },
  knowsAbout: [
    'Fotografía de paisaje',
    'Fotografía de naturaleza',
    'Fotografía de arquitectura',
    'Retrato',
    'Fotografía de moda',
    'Fotografía de producto',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-CO',
  publisher: { '@id': person['@id'] },
};

const graph = (...nodes: Array<Record<string, unknown>>) => [{ '@context': 'https://schema.org', '@graph': nodes }];

const breadcrumbs = (items: Array<[name: string, pathname: string]>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, pathname], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(pathname),
  })),
});

const base = (title: string, description: string): RouteMeta => ({
  title,
  description,
  indexable: true,
  image: OG_IMAGE,
  imageAlt: OG_IMAGE_ALT,
  jsonLd: [],
});

const notFound: RouteMeta = { ...base(`Página no encontrada · ${SITE_NAME}`, DEFAULT_DESCRIPTION), indexable: false };

/** Metadata for a pathname (without the base path). */
export const metaFor = (pathname: string): RouteMeta => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (path === '/') {
    return {
      ...base(`${SITE_NAME} en Bogotá`, DEFAULT_DESCRIPTION),
      jsonLd: graph(website, person, {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: `${PERSON_NAME} · Portafolio fotográfico`,
        inLanguage: 'es-CO',
        isPartOf: { '@id': website['@id'] },
        mainEntity: { '@id': person['@id'] },
      }),
    };
  }

  if (path === '/servicios') {
    const description =
      'Fotografía por encargo en Bogotá para marcas, editoriales y personas: paisaje, arquitectura, retrato, moda y producto. Cotiza tu proyecto.';

    return {
      ...base(`Servicios de fotografía · ${SITE_NAME}`, description),
      jsonLd: graph(
        {
          '@type': 'WebPage',
          url: absoluteUrl(path),
          name: 'Servicios de fotografía',
          description,
          inLanguage: 'es-CO',
          isPartOf: { '@id': website['@id'] },
          about: { '@id': person['@id'] },
        },
        breadcrumbs([
          ['Portafolio', '/'],
          ['Servicios', path],
        ]),
      ),
    };
  }

  if (path === '/cotizar') {
    return {
      ...base(
        `Cotizar una sesión de fotos · ${SITE_NAME}`,
        'Cuéntame tu proyecto de fotografía en Bogotá y te respondo con una propuesta: alcance, fechas y valor.',
      ),
      jsonLd: graph(
        breadcrumbs([
          ['Portafolio', '/'],
          ['Cotizar', path],
        ]),
      ),
    };
  }

  if (path === '/cotizar/enviada')
    return { ...base(`Solicitud enviada · ${SITE_NAME}`, DEFAULT_DESCRIPTION), indexable: false };

  const photo = /^\/proyectos\/([^/]+)\/foto\/(\d+)$/.exec(path);

  if (photo) {
    const p = findProject(photo[1]);
    const id = p ? projectPhotos(p)[Number(photo[2]) - 1] : undefined;

    // Enlarged photos are thin pages: they are not indexed, the project page is.
    return p && id
      ? { ...base(`${photos[id].title} · ${p.title} · ${SITE_NAME}`, p.summary), indexable: false }
      : notFound;
  }

  const project = /^\/proyectos\/([^/]+)$/.exec(path);

  if (project) {
    const p = findProject(project[1]);

    if (!p) return notFound;

    const cover = photos[p.cover];

    return {
      ...base(`${p.title} · ${p.subtitle} · ${SITE_NAME}`, p.summary),
      // Example projects stay out of Google until they are replaced by real work.
      indexable: !p.isExample,
      image: cover.provisional ? OG_IMAGE : photoUrl(cover.file),
      imageAlt: cover.provisional ? OG_IMAGE_ALT : cover.description,
      jsonLd: graph(
        {
          '@type': 'CreativeWork',
          url: absoluteUrl(path),
          name: p.title,
          headline: `${p.title} · ${p.subtitle}`,
          description: p.summary,
          inLanguage: 'es-CO',
          creator: { '@id': person['@id'] },
          isPartOf: { '@id': website['@id'] },
          image: projectPhotos(p)
            .filter(id => !photos[id].provisional)
            .map(id => photoUrl(photos[id].file)),
        },
        breadcrumbs([
          ['Portafolio', '/'],
          [p.title, path],
        ]),
      ),
    };
  }

  return notFound;
};

/** Every indexable route: they get their own HTML file and go into the sitemap. */
export const indexableRoutes = (): Array<string> =>
  ['/', '/servicios', '/cotizar', ...projects.map(p => `/proyectos/${p.slug}`)].filter(r => metaFor(r).indexable);
