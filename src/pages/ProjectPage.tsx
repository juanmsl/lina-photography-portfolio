import { Typography } from 'polpo/components';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { Link, useParams } from 'react-router';

import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Gallery } from '../components/Gallery';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { ProjectHeading } from '../components/ProjectHeading';
import { findProject, categoryOf, projectPhotos, nextProject } from '../content/projects';

import { NotFoundPage } from './NotFoundPage';

export const ProjectPage = () => {
  const { slug } = useParams();
  const p = findProject(slug);

  if (!p) return <NotFoundPage />;

  const c = categoryOf(p);
  const order = projectPhotos(p);
  const next = nextProject(p);
  const photoIndex = { slug: p.slug, photoIndex: (id: (typeof order)[number]) => order.indexOf(id) };

  return (
    <>
      <Navigation />

      <section aria-labelledby='project-title' className='px-5 pt-16 pb-10 md:px-10 md:pt-30 md:pb-16'>
        <div className='flex justify-center'>
          <Link to='/' className='inline-flex items-center gap-2.5 t-label font-medium text-ash hover:text-bone'>
            <LuArrowLeft size={18} aria-hidden />
            Portafolio · {c.title} {c.voice}
          </Link>
        </div>
        <DualTitle
          id='project-title'
          as='h1'
          level='hero'
          title={p.title}
          voice={p.subtitle.toLowerCase()}
          className='mt-10'
        />
      </section>

      <Link to={`/proyectos/${p.slug}/foto/1`} aria-label='Ver la foto principal ampliada' className='block'>
        <Photo
          id={p.cover}
          priority
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

      <nav aria-label='Siguiente proyecto' className='border-t border-graphite px-5 py-12 md:px-10 md:py-16'>
        <Link
          to={`/proyectos/${next.slug}`}
          className='group flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12'
        >
          <span className='flex flex-col'>
            <Typography variant='header2' as='span' noPadding className='m-0'>
              {next.title}
            </Typography>
            <span className='serif-voice -mt-1 t-serif'>siguiente proyecto</span>
          </span>
          <span className='flex items-center gap-8'>
            <Photo id={next.cover} className='aspect-[440/280] w-full max-w-[27.5rem]' />
            <span className='hidden size-18 shrink-0 place-content-center rounded-full border border-graphite transition-colors group-hover:border-bone md:grid'>
              <LuArrowRight size={26} aria-hidden />
            </span>
          </span>
        </Link>
      </nav>

      <ContactSection withText />
      <Footer />
    </>
  );
};
