import { cn } from 'polpo/helpers';
import type { ReactNode } from 'react';

type MarcoPlanchaProps = {
  /** [latG, latM, lonG, lonM] de la foto; si falta, el marco va sin rótulos. */
  coordenadas?: [number, number, number, number];
  children: ReactNode;
  className?: string;
};

const minutos = (grados: number, min: number, delta: number) => {
  let total = grados * 60 + min + delta;
  if (total < 0) total = 0;
  return `${Math.floor(total / 60)}°${String(total % 60).padStart(2, '0')}′`;
};

const LON = [5, 3, 1, -1, -3, -5];
const LAT = [4, 2, 0, -2];

/**
 * Marco de plancha: filete blanco alrededor de la foto con marcas y rótulos de
 * coordenadas, como una plancha cartográfica. Puramente decorativo.
 */
export const MarcoPlancha = ({ coordenadas, children, className }: MarcoPlanchaProps) => (
  <div className={cn('relative p-3 md:p-7', className)}>
    <div aria-hidden className='pointer-events-none absolute inset-0 border border-white/80'>
      {LON.map((d, i) => {
        const x = `${10.5 + i * 15.9}%`;
        return (
          <span key={`lon-${d}`}>
            <span className='absolute top-0 h-2 w-px bg-white/55' style={{ left: x }} />
            <span className='absolute bottom-0 h-2 w-px bg-white/55' style={{ left: x }} />
            {coordenadas && (
              <span
                className='font-code absolute top-[0.4rem] hidden pl-1.5 whitespace-nowrap text-[0.6875rem] leading-none text-white/75 md:block'
                style={{ left: x }}
              >
                {minutos(coordenadas[2], coordenadas[3], d)}
              </span>
            )}
          </span>
        );
      })}
      {LAT.map((d, i) => {
        const y = `${15.7 + i * 23.15}%`;
        return (
          <span key={`lat-${d}`}>
            <span className='absolute left-0 h-px w-2 bg-white/55' style={{ top: y }} />
            <span className='absolute right-0 h-px w-2 bg-white/55' style={{ top: y }} />
            {coordenadas && (
              <span
                className='font-code absolute left-[0.45rem] hidden -translate-y-[130%] whitespace-nowrap text-[0.6875rem] leading-none text-white/75 md:block'
                style={{ top: y }}
              >
                {minutos(coordenadas[0], coordenadas[1], d)}
              </span>
            )}
          </span>
        );
      })}
    </div>
    {children}
  </div>
);
