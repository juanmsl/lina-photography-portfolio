import { Button, Typography } from 'polpo/components';
import { useEventListener } from 'polpo/hooks';
import { LuArrowLeft, LuChevronLeft, LuChevronRight, LuMapPin, LuX } from 'react-icons/lu';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

import { Photo } from '../components/Photo';
import { PlateFrame } from '../components/PlateFrame';
import { photos, formatCoordinates } from '../content/photos';
import { findProject, projectPhotos } from '../content/projects';

import { NotFoundPage } from './NotFoundPage';

const CircleButton = ({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <Button
    forIcon
    variant='outlined'
    radius='full'
    aria-label={label}
    onClick={onClick}
    className={`size-12 shrink-0 border-graphite text-bone hover:border-bone md:size-14 ${className ?? ''}`}
  >
    {children}
  </Button>
);

export const PhotoViewerPage = () => {
  const { slug, n } = useParams();
  const navigate = useNavigate();
  const p = findProject(slug);
  const list = p ? projectPhotos(p) : [];
  const current = Number(n);

  const goTo = (i: number) => {
    if (!p) return;

    const next = ((i - 1 + list.length) % list.length) + 1;
    navigate(`/proyectos/${p.slug}/foto/${next}`, { replace: true });
  };
  const close = () => p && navigate(`/proyectos/${p.slug}`);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);

    if (e.key === 'ArrowRight') goTo(current + 1);

    if (e.key === 'Escape') close();
  });

  if (!p) return <NotFoundPage />;

  if (!Number.isInteger(current) || current < 1 || current > list.length) {
    return <Navigate to={`/proyectos/${p.slug}/foto/1`} replace />;
  }

  const id = list[current - 1];
  const info = photos[id];
  const locationLabel = [info.title, info.coordinates && formatCoordinates(info.coordinates), info.altitude]
    .filter(Boolean)
    .join(' · ');

  return (
    <main className='flex min-h-dvh flex-col px-5 pt-4 pb-8 md:px-10 md:pt-7 md:pb-10'>
      <div className='flex items-center justify-between'>
        <Link
          to={`/proyectos/${p.slug}`}
          className='inline-flex items-center gap-2.5 t-label font-medium hover:text-ash'
        >
          <LuArrowLeft size={18} aria-hidden />
          {p.title}
        </Link>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash' aria-live='polite'>
          {current} / {list.length}
        </Typography>
        <CircleButton label='Cerrar' onClick={close}>
          <LuX size={22} aria-hidden />
        </CircleButton>
      </div>

      <div className='mt-6 flex flex-1 items-center gap-6 md:mt-6 md:gap-6'>
        <CircleButton label='Foto anterior' onClick={() => goTo(current - 1)} className='hidden md:inline-flex'>
          <LuChevronLeft size={22} aria-hidden />
        </CircleButton>

        <PlateFrame coordinates={info.coordinates} className='mx-auto w-full max-w-[73.5rem]'>
          <div className='relative'>
            <Photo id={id} priority className='aspect-[4/5] w-full sm:aspect-[1120/700]' />
            {locationLabel && (
              <span className='absolute bottom-4 left-4 flex items-center gap-2.5 t-small font-medium text-white md:bottom-10 md:left-15'>
                <LuMapPin size={16} aria-hidden />
                <span className='font-code tracking-[0.02em]'>{locationLabel}</span>
              </span>
            )}
          </div>
        </PlateFrame>

        <CircleButton label='Foto siguiente' onClick={() => goTo(current + 1)} className='hidden md:inline-flex'>
          <LuChevronRight size={22} aria-hidden />
        </CircleButton>
      </div>

      <div className='mx-auto mt-6 flex w-full max-w-[70rem] flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between'>
        <div className='flex flex-wrap items-baseline gap-x-4'>
          <Typography variant='header3' as='h1' noPadding className='m-0'>
            {info.title}
          </Typography>
          {info.region && <span className='serif-voice t-serif'>{info.region}</span>}
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex gap-3 md:hidden'>
            <CircleButton label='Foto anterior' onClick={() => goTo(current - 1)}>
              <LuChevronLeft size={22} aria-hidden />
            </CircleButton>
            <CircleButton label='Foto siguiente' onClick={() => goTo(current + 1)}>
              <LuChevronRight size={22} aria-hidden />
            </CircleButton>
          </div>
          <Button color='primary' variant='outlined' radius='full' onClick={() => navigate('/cotizar')}>
            Cotizar algo así
          </Button>
        </div>
      </div>
      {info.provisional && (
        <Typography variant='small' noPadding className='font-code mx-auto mt-6 w-full max-w-[70rem] text-graphite'>
          Foto provisional
        </Typography>
      )}
    </main>
  );
};
