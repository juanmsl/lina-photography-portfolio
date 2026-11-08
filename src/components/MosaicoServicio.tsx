import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { LuCheck } from 'react-icons/lu';

import { Foto } from './Foto';

import type { FotoId } from '../content/fotos';

type Opcion = { valor: string; foto: FotoId };

type MosaicoServicioProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  etiqueta: string;
  opciones: Array<Opcion>;
  requerido?: string;
};

/**
 * D/Mosaico de servicio: selección múltiple con fotos. Cada mosaico es una
 * casilla nativa (accesible con teclado) con la foto, un velo y el nombre;
 * el activo lleva filete y marca en oro.
 */
export const MosaicoServicio = <T extends FieldValues>({
  name,
  control,
  etiqueta,
  opciones,
  requerido,
}: MosaicoServicioProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { validate: (v: Array<string>) => (v?.length ? true : (requerido ?? true)) },
  });
  const valor: Array<string> = field.value ?? [];

  const alternar = (v: string) => field.onChange(valor.includes(v) ? valor.filter(x => x !== v) : [...valor, v]);

  return (
    <fieldset className='m-0 min-w-0 border-0 p-0' aria-invalid={fieldState.invalid || undefined}>
      <legend className='etiqueta mb-4 p-0'>{etiqueta}</legend>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4'>
        {opciones.map(o => {
          const activo = valor.includes(o.valor);

          return (
            <label
              key={o.valor}
              className={cn(
                'group relative m-0 block aspect-[2/1] cursor-pointer overflow-hidden rounded-[1.125rem] outline-offset-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-hueso',
                activo ? 'ring-3 ring-oro' : 'ring-0',
              )}
            >
              <input
                type='checkbox'
                className='sr-only'
                name={field.name}
                value={o.valor}
                checked={activo}
                onChange={() => alternar(o.valor)}
                onBlur={field.onBlur}
              />
              <Foto
                id={o.foto}
                marcadorMudo
                className='absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none'
              />
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_11/var(--velo-ini))_20%,rgb(10_10_11/0.85)_100%)]',
                  activo ? '[--velo-ini:0.15]' : '[--velo-ini:0.25]',
                )}
              />
              <span className='absolute bottom-3 left-3.5 font-medium text-hueso'>{o.valor}</span>
              {activo && (
                <span
                  aria-hidden
                  className='absolute top-3 right-3 grid size-6 place-content-center rounded-full bg-oro text-negro'
                >
                  <LuCheck size={14} strokeWidth={3} />
                </span>
              )}
            </label>
          );
        })}
      </div>
      {fieldState.error?.message && (
        <Typography role='alert' noPadding className='m-0 mt-3 text-alert-500'>
          {fieldState.error.message}
        </Typography>
      )}
    </fieldset>
  );
};
