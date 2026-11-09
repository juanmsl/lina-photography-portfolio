import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';

import { SITIO_URL } from '../content/contacto';
import { fotos } from '../content/fotos';
import { buscarProyecto, fotosDeProyecto } from '../content/proyectos';

type Meta = { titulo: string; descripcion: string; indexable: boolean };

const SUFIJO = 'Lina Nieto · Fotografía';
const DESCRIPCION =
  'Lina María Nieto Gómez, fotógrafa en Bogotá. Paisaje, naturaleza y arquitectura; también retrato, moda y producto.';
const NO_ENCONTRADA: Meta = { titulo: `Página no encontrada · ${SUFIJO}`, descripcion: DESCRIPCION, indexable: false };

const metaDe = (pathname: string): Meta => {
  const foto = matchPath('/proyectos/:slug/foto/:n', pathname);
  const proyecto = matchPath('/proyectos/:slug', pathname);

  if (pathname === '/') return { titulo: SUFIJO, descripcion: DESCRIPCION, indexable: true };

  if (pathname === '/servicios') {
    return {
      titulo: `Servicios · ${SUFIJO}`,
      descripcion:
        'Fotografía para marcas, editoriales y personas. El precio depende del proyecto: te envío una propuesta.',
      indexable: true,
    };
  }

  if (pathname === '/cotizar') {
    return {
      titulo: `Cotizar · ${SUFIJO}`,
      descripcion: 'Cuéntame tu proyecto. Respondo con una propuesta: alcance, fechas y valor.',
      indexable: true,
    };
  }

  if (pathname === '/cotizar/enviada')
    return { titulo: `Solicitud enviada · ${SUFIJO}`, descripcion: DESCRIPCION, indexable: false };

  if (foto) {
    const p = buscarProyecto(foto.params.slug);
    const id = p ? fotosDeProyecto(p)[Number(foto.params.n) - 1] : undefined;

    return p && id
      ? { titulo: `${fotos[id].titulo} · ${p.titulo} · ${SUFIJO}`, descripcion: p.resumen, indexable: true }
      : NO_ENCONTRADA;
  }

  if (proyecto) {
    const p = buscarProyecto(proyecto.params.slug);

    return p ? { titulo: `${p.titulo} · ${SUFIJO}`, descripcion: p.resumen, indexable: true } : NO_ENCONTRADA;
  }

  return NO_ENCONTRADA;
};

const fijar = (selector: string, crear: () => HTMLElement, atributo: string, valor: string | null) => {
  let el = document.head.querySelector<HTMLElement>(selector);

  if (valor === null) {
    el?.remove();

    return;
  }

  if (!el) {
    el = crear();
    document.head.appendChild(el);
  }

  el.setAttribute(atributo, valor);
};

/**
 * Título, descripción, URL canónica (linanieto.com) y robots de cada ruta.
 * index.html trae los del portafolio y las etiquetas para compartir el enlace.
 */
export const Metadatos = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { titulo, descripcion, indexable } = metaDe(pathname);
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });

    document.title = titulo;
    fijar('meta[name="description"]', meta('description'), 'content', descripcion);
    fijar(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href',
      indexable ? `${SITIO_URL}${pathname}` : null,
    );
    fijar('meta[name="robots"]', meta('robots'), 'content', indexable ? null : 'noindex');
  }, [pathname]);

  return null;
};
