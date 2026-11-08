import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { Link } from 'react-router';

type EncabezadoProyectoProps = {
  titulo: string;
  subtitulo: string;
  /** Enlace al proyecto; si no se da, es solo texto. */
  a?: string;
  as?: 'h2' | 'h3';
  className?: string;
};

/** D/Encabezado de proyecto: título en Bricolage y subtítulo en Instrument Serif, centrados. */
export const EncabezadoProyecto = ({ titulo, subtitulo, a, as = 'h3', className }: EncabezadoProyectoProps) => (
  <div className={cn('flex flex-col items-center text-center', className)}>
    <Typography variant='header2' as={as} noPadding className='m-0'>
      {a ? (
        <Link to={a} className='underline-offset-[0.12em] decoration-2 hover:underline'>
          {titulo}
        </Link>
      ) : (
        titulo
      )}
    </Typography>
    <Typography noPadding className='voz-serif m-0 mt-1 t-serif'>
      {subtitulo}
    </Typography>
  </div>
);
