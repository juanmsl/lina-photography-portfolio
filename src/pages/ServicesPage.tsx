import { Typography } from 'polpo/components';
import { LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';

import { ContactSection, Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { steps, faqs, services } from '../content/services';

export const ServicesPage = () => (
  <>
    <Navigation />

    <section aria-labelledby='services-title' className='px-5 pt-20 pb-14 md:px-10 md:pt-40 md:pb-30'>
      <DualTitle id='services-title' as='h1' level='hero' title='Servicios' voice='por encargo' />
      <Typography noPadding align='center' className='mx-auto mt-8 max-w-[40rem] t-lead text-ash md:mt-10'>
        Fotografía para marcas, editoriales y personas. El precio depende del proyecto: te envío una propuesta.
      </Typography>
    </section>

    <section aria-label='Lista de servicios' className='px-5 pb-24 md:px-10 md:pb-40'>
      <ul className='m-0 grid list-none gap-0 p-0 md:gap-10'>
        {services.map(s => (
          <li key={s.name}>
            <Link
              to='/cotizar'
              state={{ service: s.name }}
              className='group grid gap-4 border-t border-graphite py-7 md:grid-cols-[minmax(0,32.5rem)_minmax(0,24.25rem)_17.5rem_auto] md:items-center md:gap-12 md:py-8'
            >
              <Typography variant='header3' as='h2' noPadding className='m-0'>
                {s.name}
              </Typography>
              <Typography noPadding className='m-0 t-lead text-ash'>
                {s.description}
              </Typography>
              <Photo id={s.photo} className='aspect-[280/180] w-full md:w-70' />
              <span className='hidden items-center gap-2 t-label font-medium text-ash transition-colors group-hover:text-bone md:inline-flex'>
                <span className='sr-only'>Cotizar {s.name}</span>
                <LuArrowRight
                  size={28}
                  aria-hidden
                  className='transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby='process-title' className='px-5 pb-24 md:px-10 md:pb-40'>
      <Typography id='process-title' variant='header1' as='h2' noPadding className='m-0'>
        Cómo trabajo
      </Typography>
      <ol className='m-0 mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 md:mt-10 lg:grid-cols-4 lg:gap-10'>
        {steps.map(step => (
          <li key={step.title} className='border-t border-graphite pt-6'>
            <Typography variant='header3' as='h3' noPadding className='m-0'>
              {step.title}
            </Typography>
            <Typography noPadding className='m-0 mt-3 text-ash'>
              {step.text}
            </Typography>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby='faq-title' className='px-5 md:px-10'>
      <Typography id='faq-title' variant='header1' as='h2' noPadding className='m-0'>
        Preguntas
      </Typography>
      <dl className='m-0 mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-10'>
        {faqs.map(q => (
          <div key={q.question} className='border-t border-graphite pt-6'>
            <Typography as='dt' noPadding className='m-0 text-[1.25rem] font-semibold'>
              {q.question}
            </Typography>
            <Typography as='dd' noPadding className='m-0 mt-3 max-w-[37.5rem] text-ash'>
              {q.answer}
            </Typography>
          </div>
        ))}
      </dl>
    </section>

    <ContactSection withText={false} withChannels={false} />
    <Footer />
  </>
);
