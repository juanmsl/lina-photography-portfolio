import { Typography } from 'polpo/components';
import { Link, useParams } from 'react-router';

import { ContactSection, Footer } from '../components/ContactSection';
import { FactSheet } from '../components/FactSheet';
import { Navigation } from '../components/Navigation';
import { NeighborLink } from '../components/NeighborLink';
import { Photo } from '../components/Photo';
import { ProjectHeading } from '../components/ProjectHeading';
import { StaggeredGallery } from '../components/StaggeredGallery';
import {
  categoryOf,
  categoryPath,
  findProject,
  nextProject,
  previousProject,
  projectPhotos,
} from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { NotFoundPage } from './NotFoundPage';

export const ProjectPage = () => {
  const { slug } = useParams();
  const p = findProject(slug);

  if (!p) return <NotFoundPage />;

  const c = categoryOf(p);
  const next = nextProject(p);
  const previous = previousProject(p);
  const order = projectPhotos(p);
  const photoIndex = { slug: p.slug, photoIndex: (id: (typeof order)[number]) => order.indexOf(id) };

  return (
    <>
      <Navigation />

      {/* The cover fills the screen, behind the navigation. It is where the photo and the title of the reel arrive. */}
      <header
        aria-labelledby='project-title'
        className='relative -mt-[var(--header-h)] h-dvh min-h-[32rem] overflow-hidden'
      >
        <Link
          viewTransition
          to={`/proyectos/${p.slug}/foto/1`}
          aria-label='Ver la foto principal ampliada'
          onPointerEnter={() => preloadPhoto(p.cover, 'view')}
          onFocus={() => preloadPhoto(p.cover, 'view')}
          className='absolute inset-0 block'
          style={{ viewTransitionName: 'project-cover' }}
        >
          <Photo
            id={p.cover}
            size='thumb'
            priority
            position={p.coverPosition}
            cyanotype={p.cyanotype ? 'fixed' : undefined}
            className='size-full'
          />
        </Link>
        <span
          aria-hidden
          className='pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/75 to-transparent'
        />

        <nav aria-label='Ruta' className='absolute top-[calc(var(--header-h)+1.5rem)] left-5 z-10 md:left-10'>
          <Link
            viewTransition
            to={`${categoryPath(c)}?p=${p.slug}`}
            className='font-code t-small tracking-[0.02em] text-on-photo uppercase'
          >
            <span aria-hidden>← </span>
            {c.label} · Resumen
          </Link>
        </nav>

        <div
          className='pointer-events-none absolute bottom-14 left-5 z-10 text-on-photo md:bottom-24 md:left-10'
          style={{ viewTransitionName: 'project-title' }}
        >
          <Typography variant='header2' as='h1' id='project-title' noPadding className='m-0'>
            {p.title}
          </Typography>
          <span className='serif-voice t-serif-xl -mt-[0.2em] block pl-[clamp(3.5rem,18vw,16.25rem)]'>
            {p.subtitle.toLowerCase()}
          </span>
        </div>

        <span
          aria-hidden
          className='absolute right-5 bottom-6 z-10 hidden font-code t-small text-on-photo md:right-10 md:bottom-10 md:block'
        >
          DESLIZA ↓
        </span>
      </header>

      <section className='px-5 py-16 md:px-10 md:py-30'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,52.5rem)_minmax(0,25rem)] lg:justify-between lg:gap-30'>
          <div className='grid content-start gap-6'>
            {[p.summary, ...(p.text ?? [])].map(t => (
              <Typography key={t.slice(0, 20)} noPadding className='m-0 t-lead'>
                {t}
              </Typography>
            ))}
            {p.isExample && (
              <Typography variant='small' noPadding className='font-code m-0 text-ash'>
                Proyecto de ejemplo con fotos provisionales.
              </Typography>
            )}
          </div>
          <FactSheet data={p.facts} columns={1} />
        </div>
      </section>

      <section aria-label='Galería' className='px-5 pb-20 md:px-10 md:pb-30'>
        <StaggeredGallery rows={p.gallery} cyanotype={p.cyanotype} project={p.cyanotype ? undefined : photoIndex} />
      </section>

      {p.blueToColor && (
        <section aria-labelledby='blue-to-color-title' className='px-5 pt-10 pb-24 md:px-10 md:pt-20 md:pb-40'>
          <div id='blue-to-color-title'>
            <ProjectHeading as='h2' title='Del azul al color' subtitle='la misma foto, dos veces' />
          </div>
          <div className='mt-8 grid gap-2 md:mt-10 md:grid-cols-2 md:gap-4'>
            <Photo id={p.blueToColor} cyanotype='fixed' className='aspect-[672/500]' />
            <Photo id={p.blueToColor} className='aspect-[672/500]' />
          </div>
        </section>
      )}

      {previous !== p && (
        <nav
          aria-label='Otros proyectos'
          className='flex items-start justify-between gap-6 border-t border-graphite px-5 pt-10 pb-16 md:px-10 md:pt-20 md:pb-30'
        >
          <NeighborLink noun='proyecto' to={`/proyectos/${previous.slug}`} direction='previous' text={previous.title} />
          {next !== previous && (
            <NeighborLink noun='proyecto' to={`/proyectos/${next.slug}`} direction='next' text={next.title} />
          )}
        </nav>
      )}

      <ContactSection withText />
      <Footer />
    </>
  );
};
