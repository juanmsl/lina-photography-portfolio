import { cn } from 'polpo/helpers';
import { useState } from 'react';

import { fotos, type FotoId } from '../content/fotos';

type FotoProps = {
  id: FotoId;
  className?: string;
  /** `fija`: siempre en azul de Prusia. `revelar`: azul que pasa a color al pasar el cursor o al tocar. */
  cianotipia?: 'fija' | 'revelar';
  /** Blanco y negro (portada). */
  blancoYNegro?: boolean;
  /** Carga inmediata para fotos visibles al abrir la página. */
  prioridad?: boolean;
  /** Ajuste del recorte (CSS object-position). */
  posicion?: string;
  /** Oculta la descripción del marcador cuando falta el archivo (cajas pequeñas). */
  marcadorMudo?: boolean;
};

/**
 * Fotografía a sangre dentro de su caja. El tamaño lo decide el contenedor.
 * Si el archivo todavía no existe en `public/fotos`, muestra un marcador
 * oscuro con la descripción para que el diseño no se rompa.
 */
export const Foto = ({ id, className, cianotipia, blancoYNegro, prioridad, posicion, marcadorMudo }: FotoProps) => {
  const info = fotos[id];
  const [fallo, setFallo] = useState(false);
  const [revelada, setRevelada] = useState(false);
  const revela = cianotipia === 'revelar';

  const contenido = (
    <>
      {fallo ? (
        <span className='absolute inset-0 grid place-content-center gap-1 bg-[radial-gradient(120%_90%_at_50%_40%,var(--color-carbon),var(--color-negro))] p-4 text-center'>
          {!marcadorMudo && (
            <>
              <span className='font-code t-small text-gris'>{info.descripcion}</span>
              {info.provisional && <span className='font-code t-small text-grafito'>foto provisional</span>}
            </>
          )}
        </span>
      ) : (
        <img
          src={`/fotos/${info.archivo}`}
          alt={info.descripcion}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding='async'
          onError={() => setFallo(true)}
          style={posicion ? { objectPosition: posicion } : undefined}
          className={cn(
            'absolute inset-0 size-full object-cover transition-[filter] duration-700 ease-out motion-reduce:transition-none',
            (blancoYNegro || cianotipia) && 'grayscale',
            cianotipia && 'contrast-[1.15] brightness-[1.05]',
            revela && 'group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100',
            revela && revelada && 'grayscale-0 contrast-100 brightness-100',
          )}
        />
      )}
      {cianotipia && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 bg-prusia mix-blend-color transition-opacity duration-700 ease-out motion-reduce:transition-none',
            revela && 'group-hover:opacity-0',
            revela && revelada && 'opacity-0',
          )}
        />
      )}
    </>
  );

  if (revela) {
    return (
      <button
        type='button'
        aria-pressed={revelada}
        aria-label={`${info.descripcion}. ${revelada ? 'Ver en cianotipia' : 'Revelar en color'}`}
        onClick={() => setRevelada(v => !v)}
        className={cn('group relative block cursor-pointer overflow-hidden bg-carbon', className)}
      >
        {contenido}
      </button>
    );
  }

  return <figure className={cn('relative m-0 overflow-hidden bg-carbon', className)}>{contenido}</figure>;
};
