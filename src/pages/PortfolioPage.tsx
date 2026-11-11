import { Typography } from 'polpo/components';
import { Fragment } from 'react';

import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Gallery } from '../components/Gallery';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { ProjectHeading } from '../components/ProjectHeading';
import { contact } from '../content/contact';
import { categories, projectPhotos, projects, type Project } from '../content/projects';

const ProjectBlock = ({ p }: { p: Project }) => {
  const order = projectPhotos(p);

  return (
    <article aria-labelledby={`project-${p.slug}`} className='px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-30'>
      <div id={`project-${p.slug}`}>
        <ProjectHeading title={p.title} subtitle={p.subtitle} a={`/proyectos/${p.slug}`} />
      </div>
      <div className='mx-auto mt-8 max-w-[40rem] md:mt-10'>
        <Typography noPadding align='center' className='t-lead text-ash'>
          {p.summary}
        </Typography>
        <FactSheet data={p.facts} className='mt-8 md:mt-10' />
      </div>
      <Gallery
        rows={p.preview}
        cyanotype={p.cyanotype}
        project={p.cyanotype ? undefined : { slug: p.slug, photoIndex: id => order.indexOf(id) }}
        className='mt-8 md:mt-16'
      />
    </article>
  );
};

export const PortfolioPage = () => (
  <>
    <Navigation />

    {/* Hero: pulled up under the sticky navigation so the photo starts at the top of the page */}
    <section
      aria-labelledby='hero-title'
      className='relative -mt-[var(--header-h)] flex min-h-[48.75rem] flex-col pt-[var(--header-h)] md:min-h-[min(100dvh,58.75rem)]'
    >
      <div className='absolute inset-x-0 top-0 h-[38.75rem] md:inset-y-0 md:left-[40%] md:h-auto'>
        <Photo id='lina' grayscale priority position='50% 30%' className='size-full' />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--color-ink)_100%)] md:bg-[linear-gradient(to_right,var(--color-ink)_0%,transparent_38%),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_55%,transparent)_0%,transparent_14%,transparent_70%,var(--color-ink)_100%)]'
        />
      </div>

      <div className='relative mt-auto px-4 md:px-9'>
        <DualTitle id='hero-title' as='h1' level='hero' title='Portafolio' voice='fotográfico' align='start' />
      </div>

      <div className='relative flex flex-col gap-2 px-5 pt-14 pb-6 md:flex-row md:items-center md:justify-between md:px-10 md:pt-24'>
        <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash'>
          {contact.base} · {contact.baseCoordinates}
        </Typography>
        <Typography noPadding className='m-0 hidden text-ash md:block'>
          Paisaje · naturaleza · arquitectura · retrato · moda · producto
        </Typography>
      </div>
    </section>

    {/* About me */}
    <section
      id='quien-soy'
      aria-labelledby='about-title'
      className='scroll-mt-8 px-5 pt-24 pb-18 md:px-10 md:pt-45 md:pb-40'
    >
      <Typography id='about-title' variant='header1' as='h2' noPadding align='center' className='m-0'>
        ¿Quién soy?
      </Typography>
      <Typography noPadding align='center' className='mx-auto mt-6 max-w-[45rem] t-lead md:mt-10'>
        Soy Lina Nieto, fotógrafa en Bogotá. Empecé fotografiando montaña, páramo y ciudad; de ahí viene mi forma de
        mirar: paciencia, luz natural y composición limpia.
      </Typography>
      <FactSheet
        columns={3}
        className='mx-auto mt-8 max-w-[50rem] md:mt-10'
        data={[
          { label: 'Base', value: contact.base },
          { label: 'Enfoque', value: 'Paisaje, naturaleza, arquitectura' },
          { label: 'También', value: 'Retrato, moda y producto' },
        ]}
      />
    </section>

    {/* Projects by type */}
    {categories.map(c => {
      const inCategory = projects.filter(p => p.category === c.id);

      if (!inCategory.length) return null;

      return (
        <Fragment key={c.id}>
          <div className='px-5 pt-30 pb-6 md:px-10 md:pt-50 md:pb-10'>
            <DualTitle title={c.title} voice={c.voice} />
          </div>
          {inCategory.map(p => (
            <ProjectBlock key={p.slug} p={p} />
          ))}
        </Fragment>
      );
    })}

    <ContactSection />
    <Footer />
  </>
);
