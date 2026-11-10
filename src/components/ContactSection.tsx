import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { openWhatsApp, contact } from '../content/contact';

import { DualTitle } from './DualTitle';
import { FactItem } from './FactSheet';
import { Logo } from './Logo';

const YEAR = new Date().getFullYear();

/** Contact actions: Quote (primary) and WhatsApp (outlined). */
export const ContactActions = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4'>
      <Button color='primary' radius='full' onClick={() => navigate('/cotizar', { viewTransition: true })}>
        Cotizar un proyecto
      </Button>
      <Button color='primary' variant='outlined' radius='full' onClick={() => openWhatsApp()}>
        Escribir por WhatsApp
      </Button>
    </div>
  );
};

type ContactSectionProps = { withChannels?: boolean; withText?: boolean };

/** "¿Hablamos?" closing section shared by the pages. */
export const ContactSection = ({ withChannels = true, withText = true }: ContactSectionProps) => (
  <section
    id='contacto'
    aria-labelledby='contact-title'
    className='scroll-mt-8 px-5 pt-28 pb-18 md:px-10 md:pt-52 md:pb-30'
  >
    <DualTitle id='contact-title' title='¿Hablamos?' voice='cuéntame tu proyecto' level='hero' />
    {withText && (
      <Typography noPadding align='center' className='mx-auto mt-8 max-w-[35rem] t-lead text-ash'>
        Te respondo con una propuesta: alcance, fechas y valor.
      </Typography>
    )}
    <div className='mt-8'>
      <ContactActions />
    </div>
    {withChannels && (
      <dl className='mx-auto mt-10 grid max-w-[51rem] gap-4 sm:grid-cols-3 sm:gap-12'>
        <FactItem label='WhatsApp' value={contact.whatsappDisplay} />
        <FactItem label='Correo' value={contact.email} />
        <FactItem label='Instagram' value={contact.instagram} />
      </dl>
    )}
  </section>
);

export const Footer = () => (
  <footer className='flex flex-col gap-2 border-t border-graphite px-5 pt-7 pb-9 sm:flex-row sm:items-center sm:justify-between md:px-10 md:pt-8 md:pb-10'>
    <Typography noPadding className='m-0 flex items-center gap-3 text-ash'>
      <Logo className='h-7 w-auto text-bone' title='Lina Nieto' />© {YEAR} Lina María Nieto Gómez
    </Typography>
    <Typography variant='small' noPadding className='font-code m-0 tracking-[0.02em] text-ash'>
      {contact.base} · {contact.baseCoordinates}
    </Typography>
  </footer>
);
