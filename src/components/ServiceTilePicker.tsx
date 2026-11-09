import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { LuCheck } from 'react-icons/lu';

import { Photo } from './Photo';

import type { PhotoId } from '../content/photos';

type TileOption = { value: string; photo: PhotoId };

type ServiceTilePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Array<TileOption>;
  requiredMessage?: string;
};

/**
 * D/Service tile: multiple selection with photos. Each tile is a native
 * checkbox (keyboard accessible) with the photo, a veil and the name; the
 * active one gets a gold ring and check mark.
 */
export const ServiceTilePicker = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  requiredMessage,
}: ServiceTilePickerProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: { validate: (v: Array<string>) => (v?.length ? true : (requiredMessage ?? true)) },
  });
  const value: Array<string> = field.value ?? [];

  const toggle = (v: string) => field.onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);

  return (
    <fieldset className='m-0 min-w-0 border-0 p-0' aria-invalid={fieldState.invalid || undefined}>
      <legend className='meta-label mb-4 p-0'>{label}</legend>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4'>
        {options.map(o => {
          const active = value.includes(o.value);

          return (
            <label
              key={o.value}
              className={cn(
                'group relative m-0 block aspect-[2/1] cursor-pointer overflow-hidden rounded-[1.125rem] outline-offset-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-bone',
                active ? 'ring-3 ring-gold' : 'ring-0',
              )}
            >
              <input
                type='checkbox'
                className='sr-only'
                name={field.name}
                value={o.value}
                checked={active}
                onChange={() => toggle(o.value)}
                onBlur={field.onBlur}
              />
              <Photo
                id={o.photo}
                silentPlaceholder
                className='absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none'
              />
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_11/var(--veil-start))_20%,rgb(10_10_11/0.85)_100%)]',
                  active ? '[--veil-start:0.15]' : '[--veil-start:0.25]',
                )}
              />
              <span className='absolute bottom-3 left-3.5 font-medium text-bone'>{o.value}</span>
              {active && (
                <span
                  aria-hidden
                  className='absolute top-3 right-3 grid size-6 place-content-center rounded-full bg-gold text-ink'
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
