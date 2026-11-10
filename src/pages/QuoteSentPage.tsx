import { Button, Typography } from 'polpo/components';
import { LuCheck } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router';

import { FactItem } from '../components/FactSheet';
import { Navigation } from '../components/Navigation';
import { Photo } from '../components/Photo';
import { openWhatsApp, whatsappMessage } from '../content/contact';
import { formatMonth, type QuoteRequest } from '../content/quote';

export const QuoteSentPage = () => {
  const navigate = useNavigate();
  const data = (useLocation().state ?? null) as QuoteRequest | null;
  const firstName = data?.name.trim().split(/\s+/)[0];
  const date = data?.date ? formatMonth(data.date) : '';
  const services = data?.services.join(', ') ?? '';

  const summary = [
    { label: 'Servicio', value: services },
    { label: 'Fecha', value: date ? date[0].toUpperCase() + date.slice(1) : '' },
    { label: 'Lugar', value: data?.place ?? '' },
  ].filter(d => d.value);

  return (
    <div className='relative isolate flex min-h-dvh flex-col'>
      <div aria-hidden className='absolute inset-0 -z-10'>
        <Photo id='clouds' silentPlaceholder className='size-full' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-ink)_60%,transparent),var(--color-ink))]' />
      </div>

      <Navigation />

      <main className='grid flex-1 place-content-center justify-items-center gap-7 px-5 py-20 text-center'>
        <span className='grid size-18 place-content-center rounded-full border border-bone'>
          <LuCheck size={30} aria-hidden />
        </span>
        <Typography variant='header2' as='h1' noPadding className='m-0 flex flex-col items-center'>
          <span>Recibí tu solicitud</span>
          {firstName && (
            <span className='serif-voice -mt-[0.1em] pl-[min(12.5rem,30vw)] text-[clamp(2.25rem,4vw,3.5rem)]'>
              gracias, {firstName}
            </span>
          )}
        </Typography>
        <Typography noPadding className='m-0 max-w-[35rem] t-lead text-ash'>
          {data?.email
            ? `Te escribiré a ${data.email} con una propuesta. Si es urgente, escríbeme por WhatsApp.`
            : 'Te escribiré con una propuesta. Si es urgente, escríbeme por WhatsApp.'}
        </Typography>
        {summary.length > 0 && (
          <dl className='m-0 grid w-full max-w-[41.5rem] gap-4 text-left sm:grid-cols-3 sm:gap-8'>
            {summary.map(d => (
              <FactItem key={d.label} {...d} />
            ))}
          </dl>
        )}
        <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
          <Button
            color='primary'
            radius='full'
            onClick={() => openWhatsApp(whatsappMessage(services.toLowerCase() || undefined, date || undefined))}
          >
            Escribir por WhatsApp
          </Button>
          <Button
            color='primary'
            variant='outlined'
            radius='full'
            onClick={() => navigate('/', { viewTransition: true })}
          >
            Volver al portafolio
          </Button>
        </div>
      </main>
    </div>
  );
};
