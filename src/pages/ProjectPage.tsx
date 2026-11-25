import { Typography } from 'polpo/components';
import { Link, useParams } from 'react-router';

import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Gallery } from '../components/Gallery';
import { Navigation } from '../components/Navigation';
import { NeighborLink } from '../components/NeighborLink';
import { Photo } from '../components/Photo';
import { ProjectHeading } from '../components/ProjectHeading';
import {
  findProject,
  categoryOf,
  categoryPath,
  projectPhotos,
  nextProject,
  previousProject,
} from '../content/projects';
import { preloadPhoto } from '../photoLoader';

import { NotFoundPage } from './NotFoundPage';
import {LiaHomeSolid} from "react-icons/lia";
import {LuCamera} from "react-icons/lu";
import {FaCamera} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";

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
        <nav aria-label='Ruta' className='flex justify-center mb-20'>
          <ol className='m-0 flex list-none items-center gap-2.5 p-0 font-code t-small tracking-[0.02em] text-ash'>
            <li className='flex gap-2 items-center'>
              <FaHome />
              <Link viewTransition to='/' className='hover:text-bone border-b'>
                Portafolio
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className='flex gap-2 items-center'>
              <FaCamera />
              <Link viewTransition to={categoryPath(c)} className='hover:text-bone border-b'>
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
