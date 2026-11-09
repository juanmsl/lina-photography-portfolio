import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';

import { SITE_URL } from '../content/contact';
import { photos } from '../content/photos';
import { findProject, projectPhotos } from '../content/projects';

type Meta = { title: string; description: string; indexable: boolean };

const SUFFIX = 'Lina Nieto · Fotografía';
const DESCRIPTION =
  'Lina María Nieto Gómez, fotógrafa en Bogotá. Paisaje, naturaleza y arquitectura; también retrato, moda y producto.';
const NOT_FOUND: Meta = { title: `Página no encontrada · ${SUFFIX}`, description: DESCRIPTION, indexable: false };

const metaFor = (pathname: string): Meta => {
  const photo = matchPath('/proyectos/:slug/foto/:n', pathname);
  const project = matchPath('/proyectos/:slug', pathname);

  if (pathname === '/') return { title: SUFFIX, description: DESCRIPTION, indexable: true };

  if (pathname === '/servicios') {
    return {
      title: `Servicios · ${SUFFIX}`,
      description:
        'Fotografía para marcas, editoriales y personas. El precio depende del proyecto: te envío una propuesta.',
      indexable: true,
    };
  }

  if (pathname === '/cotizar') {
    return {
      title: `Cotizar · ${SUFFIX}`,
      description: 'Cuéntame tu proyecto. Respondo con una propuesta: alcance, fechas y valor.',
      indexable: true,
    };
  }

  if (pathname === '/cotizar/enviada')
    return { title: `Solicitud enviada · ${SUFFIX}`, description: DESCRIPTION, indexable: false };

  if (photo) {
    const p = findProject(photo.params.slug);
    const id = p ? projectPhotos(p)[Number(photo.params.n) - 1] : undefined;

    return p && id
      ? { title: `${photos[id].title} · ${p.title} · ${SUFFIX}`, description: p.summary, indexable: true }
      : NOT_FOUND;
  }

  if (project) {
    const p = findProject(project.params.slug);

    return p ? { title: `${p.title} · ${SUFFIX}`, description: p.summary, indexable: true } : NOT_FOUND;
  }

  return NOT_FOUND;
};

const setHeadTag = (selector: string, create: () => HTMLElement, attribute: string, value: string | null) => {
  let el = document.head.querySelector<HTMLElement>(selector);

  if (value === null) {
    el?.remove();

    return;
  }

  if (!el) {
    el = create();
    document.head.appendChild(el);
  }

  el.setAttribute(attribute, value);
};

/**
 * Title, description, canonical URL (linanieto.com) and robots for each route.
 * index.html carries the portfolio defaults and the link-sharing tags.
 */
export const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, indexable } = metaFor(pathname);
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });

    document.title = title;
    setHeadTag('meta[name="description"]', meta('description'), 'content', description);
    setHeadTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      indexable ? `${SITE_URL}${pathname}` : null,
    );
    setHeadTag('meta[name="robots"]', meta('robots'), 'content', indexable ? null : 'noindex');
  }, [pathname]);

  return null;
};
