import { Button, Typography } from 'polpo/components';
import { useEventListener } from 'polpo/hooks';
import { useEffect } from 'react';
import { LuAperture, LuArrowLeft, LuChevronLeft, LuChevronRight, LuMapPin, LuX } from 'react-icons/lu';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

import { setCameraDataShown, useCameraDataShown } from '../cameraData';
import { Photo } from '../components/Photo';
import { PlateFrame } from '../components/PlateFrame';
import { photos, formatCamera, formatCoordinates } from '../content/photos';
import { findProject, projectPhotos } from '../content/projects';
import { loadPhoto, photoSrc, preloadPhoto } from '../photoLoader';

import { NotFoundPage } from './NotFoundPage';

const CircleButton = ({
  label,
  onClick,
  children,
  className,
  pressed,
  title,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  /** For switches: aria-pressed, and filled in bone while on. */
  pressed?: boolean;
  title?: string;
}) => (
  <Button
    forIcon
    variant='outlined'
    radius='full'
    aria-label={label}
    aria-pressed={pressed}
    title={title}
    onClick={onClick}
    className={`size-12 shrink-0 md:size-14 ${
      pressed ? 'border-bone bg-bone text-ink hover:border-bone' : 'border-graphite text-bone hover:border-bone'
    } ${className ?? ''}`}
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
    navigate(`/proyectos/${p.slug}/foto/${next}`, { replace: true, viewTransition: true });
  };
  const close = () => p && navigate(`/proyectos/${p.slug}`, { viewTransition: true });

  const currentId = list.at(current - 1);
  const cameraShown = useCameraDataShown();
  const cameraLabels = currentId ? formatCamera(photos[currentId].camera) : [];

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) goTo(current - 1);

    if (['ArrowRight', 'ArrowDown'].includes(e.key)) goTo(current + 1);

    if (e.key === 'Escape') close();

    // I: show or hide the camera settings ("datos de toma"), when the photo has them.
    if ((e.key === 'i' || e.key === 'I') && !e.metaKey && !e.ctrlKey && !e.altKey && cameraLabels.length) {
      setCameraDataShown(!cameraShown);
    }
  });

  const nextId = list.at(current % list.length);
  const previousId = list.at(current - 2);

  // Once the current photo is here, download its neighbors so the next change is instant.
  useEffect(() => {
    if (!currentId) return undefined;

    let active = true;

    void loadPhoto(photoSrc(currentId, 'view')).then(() => {
      if (!active) return;

      if (nextId) preloadPhoto(nextId, 'view');

      if (previousId) preloadPhoto(previousId, 'view');
    });

    return () => {
      active = false;
    };
  }, [currentId, nextId, previousId]);

  if (!p) return <NotFoundPage />;

  if (!Number.isInteger(current) || current < 1 || current > list.length) {
    return <Navigate to={`/proyectos/${p.slug}/foto/1`} replace />;
  }

  const id = list[current - 1];
  const info = photos[id];
  const locationLabel = [info.region, info.coordinates && formatCoordinates(info.coordinates), info.altitude]
    .filter(Boolean)
    .join(' · ');

  return (
    <main className='flex min-h-dvh flex-col px-5 pt-4 pb-8 md:px-10 md:pt-7 md:pb-10'>
      <div className='flex items-center justify-between'>
        <Link
          viewTransition
          to={`/proyectos/${p.slug}`}
          className='inline-flex items-center gap-2.5 t-label font-medium hover:text-ash'
        >
          <LuArrowLeft size={18} aria-hidden />
          {p.title}
        </Link>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash' aria-live='polite'>
          {current} / {list.length}
        </Typography>
        <div className='flex items-center gap-2.5 md:gap-3'>
          {/* Only for photos with camera settings. */}
          {cameraLabels.length > 0 && (
            <CircleButton
              label={cameraShown ? 'Ocultar datos de toma' : 'Mostrar datos de toma'}
              title={`${cameraShown ? 'Ocultar' : 'Mostrar'} datos de toma (I)`}
              pressed={cameraShown}
              onClick={() => setCameraDataShown(!cameraShown)}
            >
              <LuAperture size={22} aria-hidden />
            </CircleButton>
          )}
          <CircleButton label='Cerrar' onClick={close}>
            <LuX size={22} aria-hidden />
          </CircleButton>
        </div>
      </div>

      <div className='mt-6 flex flex-1 items-center gap-6 md:mt-6 md:gap-6'>
        <CircleButton label='Foto anterior' onClick={() => goTo(current - 1)} className='hidden md:inline-flex'>
          <LuChevronLeft size={22} aria-hidden />
        </CircleButton>

        {/*
         * The frame takes the photo's own proportions, so it is shown whole (never
         * cropped), as big as the screen allows: as wide as the column and no taller
         * than --max-h (the viewport minus the top bar and the caption).
         */}
        <div
          className='mx-auto flex min-w-0 flex-1 justify-center [--max-h:max(16rem,calc(100dvh-18rem))] [--pad:0.75rem] md:[--max-h:max(20rem,calc(100dvh-19rem))] md:[--pad:1.75rem]'
          style={{ '--photo-ratio': info.dimensions[0] / info.dimensions[1] } as React.CSSProperties}
        >
          <PlateFrame
            coordinates={info.coordinates}
            className='w-[min(100%,73.5rem,calc(var(--max-h)*var(--photo-ratio)+2*var(--pad)))]'
          >
            <div className='relative'>
              <Photo id={id} size='view' priority className='aspect-[var(--photo-ratio)] w-full' />
              {/*
               * Labels written on the photo, bottom left: the place, and above it the
               * camera settings when switched on.
               */}
              {(locationLabel || (cameraShown && cameraLabels.length > 0)) && (
                <div className='absolute inset-x-3 bottom-3 flex flex-col-reverse items-start gap-1.5 t-small font-medium text-white max-md:text-[0.625rem] md:inset-x-6 md:bottom-6 md:gap-2'>
                  {locationLabel && (
                    <span className='flex items-center gap-2 md:gap-2.5'>
                      <LuMapPin aria-hidden className='size-[0.8125rem] shrink-0 md:size-4' />
                      <span className='font-code md:tracking-[0.02em]'>{locationLabel}</span>
                    </span>
                  )}
                  {cameraShown && cameraLabels.length > 0 && (
                    <span className='flex items-center gap-2 md:gap-2.5'>
                      <LuAperture aria-hidden className='size-[0.8125rem] shrink-0 md:size-4' />
                      <span className='font-code md:tracking-[0.02em]'>
                        <span className='sr-only'>Datos de toma: </span>
                        {cameraLabels.join(' · ')}
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </PlateFrame>
        </div>

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
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            onClick={() => navigate('/cotizar', { viewTransition: true })}
          >
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
