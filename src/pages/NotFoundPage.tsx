import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { Footer } from '../components/ContactSection';
import { DualTitle } from '../components/DualTitle';
import { Navigation } from '../components/Navigation';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <main className='grid min-h-[70dvh] content-center justify-items-center gap-8 px-5 py-24 md:px-10'>
        <DualTitle as='h1' level='hero' title='Fuera de foco' voice='esta página no existe' />
        <Typography noPadding align='center' className='m-0 max-w-[35rem] t-lead text-ash'>
          Puede que el enlace haya cambiado. El portafolio completo está en la página de inicio.
        </Typography>
        <Button color='primary' radius='full' onClick={() => navigate('/', { viewTransition: true })}>
          Volver al portafolio
        </Button>
      </main>
      <Footer />
    </>
  );
};
