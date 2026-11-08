import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';

import type { Dato } from '../content/proyectos';

/** D/Dato de ficha: filete grafito arriba, etiqueta y valor. */
export const DatoFicha = ({ etiqueta, valor, className }: Dato & { className?: string }) => (
  <div className={cn('border-t border-grafito pt-3.5', className)}>
    <Typography variant='small' as='dt' noPadding className='etiqueta m-0'>
      {etiqueta}
    </Typography>
    <Typography as='dd' noPadding className='m-0 mt-1.5 font-medium leading-snug'>
      {valor}
    </Typography>
  </div>
);

/** Ficha en rejilla de 1 o 2 columnas. */
export const Ficha = ({ datos, columnas = 2, className }: { datos: Dato[]; columnas?: 1 | 2 | 3; className?: string }) => (
  <dl
    className={cn(
      'm-0 grid gap-x-10 gap-y-2',
      columnas === 2 && 'sm:grid-cols-2',
      columnas === 3 && 'sm:grid-cols-3',
      className,
    )}
  >
    {datos.map(d => (
      <DatoFicha key={d.etiqueta} {...d} />
    ))}
  </dl>
);
