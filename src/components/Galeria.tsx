import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

import { Foto } from './Foto';

import type { FotoId } from '../content/fotos';
import type { Fila } from '../content/proyectos';

type GaleriaProps = {
  filas: Array<Fila>;
  /** Si se da, cada foto enlaza a su vista ampliada dentro del proyecto. */
  proyecto?: { slug: string; indice: (id: FotoId) => number };
  cianotipia?: boolean;
  className?: string;
};

/**
 * Filas de fotos con 16 px de separación. En escritorio cada fila conserva la
 * proporción del diseño (1360 de ancho); en móvil las filas de varias fotos
 * pasan a dos columnas o a una sola foto por línea.
 */
export const Galeria = ({ filas, proyecto, cianotipia, className }: GaleriaProps) => (
  <div className={cn('grid gap-2 md:gap-4', className)}>
    {filas.map((fila, f) => {
      const total = fila.fotos.reduce((s, x) => s + x.ancho, 0);
      const varias = fila.fotos.length > 1;

      return (
        <div
          key={f}
          className={cn(
            'grid gap-2 md:flex md:gap-4 md:[aspect-ratio:var(--proporcion)]',
            varias && 'grid-cols-2',
            fila.fotos.length === 3 && '[&>*:first-child]:col-span-2',
          )}
          style={{ '--proporcion': `${total} / ${fila.alto}` } as React.CSSProperties}
        >
          {fila.fotos.map((x, i) => {
            const caja = cn(
              'w-full md:h-full md:w-auto',
              varias ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[4/3] md:aspect-auto',
              fila.fotos.length === 3 && i === 0 && 'aspect-[4/3]',
            );
            const estilo = { flex: `${x.ancho} 1 0%` };

            if (cianotipia) {
              return (
                <div key={i} className={caja} style={estilo}>
                  <Foto id={x.id} cianotipia='revelar' className='size-full' />
                </div>
              );
            }

            if (proyecto) {
              return (
                <Link
                  key={i}
                  to={`/proyectos/${proyecto.slug}/foto/${proyecto.indice(x.id) + 1}`}
                  className={cn(caja, 'group block overflow-hidden')}
                  style={estilo}
                >
                  <Foto
                    id={x.id}
                    className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none'
                  />
                </Link>
              );
            }

            return (
              <div key={i} className={caja} style={estilo}>
                <Foto id={x.id} className='size-full' />
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);
