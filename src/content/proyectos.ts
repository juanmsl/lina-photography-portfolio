import type { FotoId } from './fotos';

export type FotoEnFila = {
  id: FotoId;
  /** Ancho relativo dentro de la fila (px del diseño a 1360). */
  ancho: number;
};

export type Fila = {
  /** Alto de la fila en el diseño de escritorio (px a 1360 de ancho). */
  alto: number;
  fotos: FotoEnFila[];
};

export type Dato = { etiqueta: string; valor: string };

export type Categoria = {
  id: 'paisaje' | 'arquitectura' | 'personas' | 'producto' | 'personales';
  /** Primera palabra del divisor, en Bricolage. */
  titulo: string;
  /** Segunda voz del divisor, en Instrument Serif. */
  voz: string;
};

export type Proyecto = {
  slug: string;
  categoria: Categoria['id'];
  titulo: string;
  subtitulo: string;
  resumen: string;
  /** Párrafos extra de la página del proyecto. */
  texto?: string[];
  ficha: Dato[];
  /** Filas en el portafolio (página de inicio). */
  portada: Fila[];
  /** Foto a sangre en la página del proyecto. */
  principal: FotoId;
  /** Filas en la página del proyecto. */
  galeria: Fila[];
  /** Muestra la misma foto en cianotipia y en color. */
  delAzulAlColor?: FotoId;
  /** La serie se revela de azul a color al pasar el cursor. */
  cianotipia?: boolean;
  /** Proyecto de ejemplo (no es trabajo real todavía). */
  ejemplo?: boolean;
};

export const categorias: Categoria[] = [
  { id: 'paisaje', titulo: 'Fotografía', voz: 'de paisaje' },
  { id: 'arquitectura', titulo: 'Fotografía', voz: 'de arquitectura' },
  { id: 'personas', titulo: 'Fotografía', voz: 'de personas' },
  { id: 'producto', titulo: 'Fotografía', voz: 'de producto' },
  { id: 'personales', titulo: 'Proyectos', voz: 'personales' },
];

export const proyectos: Proyecto[] = [
  {
    slug: 'cordillera',
    categoria: 'paisaje',
    titulo: 'Cordillera',
    subtitulo: 'Serie personal',
    resumen:
      'Madrugadas en el páramo y en los valles de la cordillera. Fotos hechas esperando a que la niebla se abra y la luz encuentre el relieve.',
    texto: [
      'Trabajo con luz natural y sin prisa: llego antes del amanecer, observo cómo cambia el clima y vuelvo las veces que haga falta. La serie existe también en cianotipia, el azul con el que empieza cada imagen.',
    ],
    ficha: [
      { etiqueta: 'Lugar', valor: 'Páramo de Chingaza y Valle del Cocora' },
      { etiqueta: 'Coordenadas', valor: '4°31′N 73°45′O' },
      { etiqueta: 'Rol', valor: 'Fotografía y edición' },
      { etiqueta: 'Tipo', valor: 'Paisaje y naturaleza' },
    ],
    portada: [
      { alto: 760, fotos: [{ id: 'paramo', ancho: 1360 }] },
      {
        alto: 560,
        fotos: [
          { id: 'cocora', ancho: 443 },
          { id: 'nubes', ancho: 443 },
          { id: 'bosque', ancho: 442 },
        ],
      },
    ],
    principal: 'paramo',
    galeria: [
      {
        alto: 860,
        fotos: [
          { id: 'cocora', ancho: 672 },
          { id: 'nubes', ancho: 672 },
        ],
      },
      { alto: 720, fotos: [{ id: 'bosque', ancho: 1360 }] },
      {
        alto: 560,
        fotos: [
          { id: 'paramo', ancho: 443 },
          { id: 'cocora', ancho: 443 },
          { id: 'nubes', ancho: 442 },
        ],
      },
    ],
    delAzulAlColor: 'paramo',
  },
  {
    slug: 'la-candelaria',
    categoria: 'arquitectura',
    titulo: 'La Candelaria',
    subtitulo: 'Serie personal',
    resumen:
      'Muros de ladrillo, escaleras y patios del centro de Bogotá. Composición limpia y luz de media tarde.',
    ficha: [
      { etiqueta: 'Lugar', valor: 'La Candelaria, Bogotá' },
      { etiqueta: 'Coordenadas', valor: '4°35′N 74°04′O' },
      { etiqueta: 'Rol', valor: 'Fotografía y edición' },
      { etiqueta: 'Tipo', valor: 'Arquitectura' },
    ],
    portada: [
      {
        alto: 860,
        fotos: [
          { id: 'ladrillo', ancho: 672 },
          { id: 'escalera', ancho: 672 },
        ],
      },
      { alto: 520, fotos: [{ id: 'ladrillo', ancho: 1360 }] },
    ],
    principal: 'ladrillo',
    galeria: [
      {
        alto: 860,
        fotos: [
          { id: 'escalera', ancho: 672 },
          { id: 'ladrillo', ancho: 672 },
        ],
      },
    ],
  },
  {
    slug: 'invernadero',
    categoria: 'personas',
    titulo: 'Invernadero',
    subtitulo: 'Retrato · proyecto de ejemplo',
    resumen:
      'Retrato con luz natural entre plantas: una sesión tranquila, sin flash, donde la persona marca el ritmo.',
    ficha: [
      { etiqueta: 'Lugar', valor: 'Bogotá' },
      { etiqueta: 'Luz', valor: 'Natural' },
      { etiqueta: 'Rol', valor: 'Fotografía y edición' },
      { etiqueta: 'Tipo', valor: 'Retrato' },
    ],
    portada: [
      {
        alto: 760,
        fotos: [
          { id: 'retrato', ancho: 560 },
          { id: 'retrato', ancho: 784 },
        ],
      },
    ],
    principal: 'retrato',
    galeria: [
      {
        alto: 760,
        fotos: [
          { id: 'retrato', ancho: 560 },
          { id: 'retrato', ancho: 784 },
        ],
      },
    ],
    ejemplo: true,
  },
  {
    slug: 'campana-textil',
    categoria: 'personas',
    titulo: 'Campaña textil',
    subtitulo: 'Moda · proyecto de ejemplo',
    resumen: 'Lookbook en exteriores para una marca de ropa: prendas en movimiento y color del lugar.',
    ficha: [
      { etiqueta: 'Lugar', valor: 'Bogotá' },
      { etiqueta: 'Formato', valor: 'Lookbook' },
      { etiqueta: 'Rol', valor: 'Fotografía y dirección de arte' },
      { etiqueta: 'Tipo', valor: 'Moda' },
    ],
    portada: [
      {
        alto: 600,
        fotos: [
          { id: 'moda', ancho: 443 },
          { id: 'moda', ancho: 443 },
          { id: 'moda', ancho: 442 },
        ],
      },
    ],
    principal: 'moda',
    galeria: [
      {
        alto: 600,
        fotos: [
          { id: 'moda', ancho: 443 },
          { id: 'moda', ancho: 443 },
          { id: 'moda', ancho: 442 },
        ],
      },
    ],
    ejemplo: true,
  },
  {
    slug: 'bodegon',
    categoria: 'producto',
    titulo: 'Bodegón',
    subtitulo: 'Producto · proyecto de ejemplo',
    resumen:
      'Producto en estudio con luz suave y fondos limpios, pensado para tienda en línea, catálogo y redes.',
    ficha: [
      { etiqueta: 'Lugar', valor: 'Estudio, Chapinero' },
      { etiqueta: 'Formato', valor: 'Catálogo y tienda en línea' },
      { etiqueta: 'Rol', valor: 'Fotografía y edición' },
      { etiqueta: 'Tipo', valor: 'Producto' },
    ],
    portada: [
      {
        alto: 600,
        fotos: [
          { id: 'producto', ancho: 896 },
          { id: 'camara', ancho: 448 },
        ],
      },
      {
        alto: 328,
        fotos: [
          { id: 'producto', ancho: 328 },
          { id: 'camara', ancho: 328 },
          { id: 'producto', ancho: 328 },
          { id: 'camara', ancho: 328 },
        ],
      },
    ],
    principal: 'producto',
    galeria: [
      {
        alto: 600,
        fotos: [
          { id: 'camara', ancho: 448 },
          { id: 'producto', ancho: 896 },
        ],
      },
    ],
    ejemplo: true,
  },
  {
    slug: 'cianotipias',
    categoria: 'personales',
    titulo: 'Cianotipias',
    subtitulo: 'del azul al color',
    resumen:
      'Mi serie personal: cada foto existe primero en azul de Prusia, como una cianotipia, y después en color. Pasa el cursor sobre una foto para revelarla.',
    ficha: [
      { etiqueta: 'Técnica', valor: 'Cianotipia digital' },
      { etiqueta: 'Serie', valor: 'Paisaje, arquitectura y retrato' },
    ],
    portada: [
      {
        alto: 440,
        fotos: [
          { id: 'paramo', ancho: 328 },
          { id: 'escalera', ancho: 328 },
          { id: 'retrato', ancho: 328 },
          { id: 'nubes', ancho: 328 },
        ],
      },
    ],
    principal: 'nubes',
    galeria: [
      {
        alto: 560,
        fotos: [
          { id: 'paramo', ancho: 443 },
          { id: 'escalera', ancho: 443 },
          { id: 'retrato', ancho: 442 },
        ],
      },
      {
        alto: 560,
        fotos: [
          { id: 'cocora', ancho: 672 },
          { id: 'ladrillo', ancho: 672 },
        ],
      },
    ],
    cianotipia: true,
  },
];

export const buscarProyecto = (slug?: string) => proyectos.find(p => p.slug === slug);

/** Fotos únicas del proyecto, en el orden en que aparecen en su página. */
export const fotosDeProyecto = (p: Proyecto): FotoId[] => {
  const todas = [p.principal, ...p.galeria.flatMap(f => f.fotos.map(x => x.id))];
  return todas.filter((id, i) => todas.indexOf(id) === i);
};

export const siguienteProyecto = (p: Proyecto) =>
  proyectos[(proyectos.indexOf(p) + 1) % proyectos.length];

export const categoriaDe = (p: Proyecto) => categorias.find(c => c.id === p.categoria)!;
