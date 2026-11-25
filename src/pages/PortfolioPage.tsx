import { Typography } from 'polpo/components';
import { Fragment } from 'react';
import { Link } from 'react-router';

import { CategoryCovers } from '../components/CategoryCovers';
import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { FactSheet } from '../components/FactSheet';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { contact } from '../content/contact';
import { activeCategories, categoryPath } from '../content/projects';

export const PortfolioPage = () => (
  <>
    <Navigation />

    {/* Hero: pulled up under the sticky navigation so the photo starts at the top of the page */}
    <section
      aria-labelledby='hero-title'
      className='relative -mt-[var(--header-h)] flex min-h-[48.75rem] flex-col pt-[var(--header-h)] md:min-h-[min(100dvh,58.75rem)]'
    >
      <div className='absolute inset-x-0 top-0 h-[38.75rem] md:inset-y-0 md:left-[40%] md:h-auto'>
        <Photo id='lina' size='page' grayscale priority position='50% 30%' className='size-full' />
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
        <nav aria-label='Categorías del portafolio' className='hidden md:block'>
          <Typography noPadding className='m-0 text-ash'>
            {activeCategories().map((c, i) => (
              <Fragment key={c.id}>
                {i > 0 && ' · '}
                <Link viewTransition to={categoryPath(c)} className='transition-colors hover:text-bone'>
                  {c.label}
                </Link>
              </Fragment>
            ))}
          </Typography>
        </nav>
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

      <Typography noPadding align='center' className='mx-auto mt-6 max-w-180 t-lead md:mt-10'>
        ¡Holi! Qué lindo tenerte aquí, yo soy Lina Nieto.
      </Typography>

      <Typography noPadding align='center' className='mx-auto mt-6 max-w-180 t-lead md:mt-10'>
        Para mí, la fotografía es una forma de detener el tiempo, de inmortalizar instantes que suelen perderse entre
        las prisas de lo cotidiano. Una invitación a observar con calma, descubrir lo extraordinario en los pequeños
        detalles y conservar aquello que merece permanecer.
      </Typography>

      <Typography noPadding align='center' className='mx-auto mt-6 max-w-180 t-lead md:mt-10'>
        Mi mirada nace de la conexión con la naturaleza y la curiosidad por descubrir nuevas perspectivas. Una
        sensibilidad que llevo al retrato, la moda, la arquitectura y la fotografía de producto, donde cada imagen es
        una oportunidad para contar una historia.
      </Typography>
      <FactSheet
        columns={3}
        className='mx-auto mt-8 max-w-200 md:mt-10'
        data={[
          { label: 'Base', value: contact.base },
          { label: 'Enfoque', value: 'Paisaje, naturaleza, arquitectura' },
          { label: 'También', value: 'Retrato, moda y producto' },
        ]}
      />
    </section>

    {/* Projects by type, grouped: each category shows all its projects together and links to its page. */}
    {activeCategories().map(c => (
      <CategoryCovers key={c.id} c={c} />
    ))}

    <ContactSection />
    <Footer />
  </>
);
