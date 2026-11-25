import { Typography } from 'polpo/components';
import { cn } from 'polpo/helpers';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link, useParams } from 'react-router';

import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Gallery } from '../components/Gallery';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { ProjectHeading } from '../components/ProjectHeading';
import {
  findProject,
  categoryOf,
  categoryPath,
  projectPhotos,
  nextProject,
  previousProject,
  type Project,
} from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { NotFoundPage } from './NotFoundPage';

/** Link to the previous or next project: its cover, a round arrow, its title and the direction in the second voice. */
const NeighborProject = ({ p, direction }: { p: Project; direction: 'previous' | 'next' }) => {
  const isNext = direction === 'next';

  return (
    <Link
      viewTransition
      to={`/proyectos/${p.slug}`}
      rel={isNext ? 'next' : 'prev'}
      className={cn('group flex flex-col gap-5 md:gap-6', isNext && 'md:items-end md:text-right')}
    >
      <Photo id={p.cover} position={p.coverPosition} className='aspect-[440/280] w-full' />
      <span className={cn('flex items-center gap-5 md:gap-6', isNext && 'md:flex-row-reverse')}>
        <span className='grid size-14 shrink-0 place-content-center rounded-full border border-graphite transition-colors group-hover:border-bone md:size-18'>
          {isNext ? <LuArrowRight size={24} aria-hidden /> : <LuArrowLeft size={24} aria-hidden />}
        </span>
        <span className='flex flex-col'>
          <Typography variant='header2' as='span' noPadding className='m-0'>
            {p.title}
          </Typography>
          <span className='serif-voice -mt-1 t-serif'>{isNext ? 'siguiente proyecto' : 'proyecto anterior'}</span>
        </span>
      </span>
    </Link>
  );
};

export const ProjectPage = () => {
  const { slug } = useParams();
  const p = findProject(slug);

  if (!p) return <NotFoundPage />;

  const c = categoryOf(p);
  const order = projectPhotos(p);
  const next = nextProject(p);
  const previous = previousProject(p);
  const photoIndex = { slug: p.slug, photoIndex: (id: (typeof order)[number]) => order.indexOf(id) };

  return (
    <>
      <Navigation />

      <section aria-labelledby='project-title' className='px-5 pt-16 pb-10 md:px-10 md:pt-30 md:pb-16'>
        <nav aria-label='Ruta' className='flex justify-center'>
          <ol className='m-0 flex list-none items-center gap-2.5 p-0 font-code t-small tracking-[0.02em] text-ash'>
            <li>
              <Link viewTransition to='/' className='hover:text-bone'>
                Portafolio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link viewTransition to={categoryPath(c)} className='hover:text-bone'>
                {c.title} {c.voice}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current='page'>{p.title}</li>
          </ol>
        </nav>

        <DualTitle
          id='project-title'
          as='h1'
          level='hero'
          title={p.title}
          voice={p.subtitle.toLowerCase()}
          className='mt-10'
        />
      </section>

      <Link
        viewTransition
        to={`/proyectos/${p.slug}/foto/1`}
        aria-label='Ver la foto principal ampliada'
        onPointerEnter={() => preloadPhoto(p.cover, 'view')}
        onFocus={() => preloadPhoto(p.cover, 'view')}
        className='block'
      >
        <Photo
          id={p.cover}
          size='thumb'
          priority
          position={p.coverPosition}
          cyanotype={p.cyanotype ? 'fixed' : undefined}
          className='aspect-[4/3] w-full md:aspect-[1440/820]'
        />
      </Link>

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
        <Gallery rows={p.gallery} cyanotype={p.cyanotype} project={p.cyanotype ? undefined : photoIndex} />
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

      <nav
        aria-label='Otros proyectos'
        className='grid gap-14 border-t border-graphite px-5 py-12 md:grid-cols-2 md:gap-10 md:px-10 md:py-16'
      >
        <NeighborProject p={previous} direction='previous' />
        <NeighborProject p={next} direction='next' />
      </nav>

      <ContactSection withText />
      <Footer />
    </>
  );
};
