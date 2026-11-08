import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';

type RotuloProps = {
  titulo: string;
  /** Segunda voz en Instrument Serif, desplazada a la derecha y montada sobre el titular. */
  voz: string;
  /** `hero` = D/Display, `header1` = D/Divisor. */
  nivel?: 'hero' | 'header1';
  as?: 'h1' | 'h2';
  className?: string;
  /** Alineación del bloque. */
  alinear?: 'centro' | 'inicio';
  id?: string;
};

/** Titular de dos voces: Bricolage ExtraBold arriba, Instrument Serif itálica debajo. */
export const Rotulo = ({
  titulo,
  voz,
  nivel = 'header1',
  as = 'h2',
  className,
  alinear = 'centro',
  id,
}: RotuloProps) => (
  <div className={cn('flex', alinear === 'centro' ? 'justify-center' : 'justify-start', className)}>
    <Typography variant={nivel} as={as} id={id} noPadding className='m-0 flex flex-col'>
      <span className={alinear === 'centro' ? 'self-center' : undefined}>{titulo}</span>
      <span
        className={cn(
          'voz-serif t-serif-xl',
          nivel === 'hero'
            ? '-mt-[0.2em] pl-[clamp(3.5rem,18vw,16.25rem)]'
            : '-mt-[0.28em] pl-[clamp(2.75rem,15vw,13.75rem)]',
        )}
      >
        {voz}
      </span>
    </Typography>
  </div>
);
