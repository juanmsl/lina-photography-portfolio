import { Button, Typography } from 'polpo/components';
import { useNavigate } from 'react-router';

import { PiePagina } from '../components/Contacto';
import { Navegacion } from '../components/Navegacion';
import { Rotulo } from '../components/Rotulo';

export const NoEncontrada = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navegacion />
      <main className='grid min-h-[70dvh] content-center justify-items-center gap-8 px-5 py-24 md:px-10'>
        <Rotulo as='h1' nivel='hero' titulo='Fuera de foco' voz='esta página no existe' />
        <Typography noPadding align='center' className='m-0 max-w-[35rem] t-lead text-gris'>
          Puede que el enlace haya cambiado. El portafolio completo está en la página de inicio.
        </Typography>
        <Button color='primary' radius='full' onClick={() => navigate('/')}>
          Volver al portafolio
        </Button>
      </main>
      <PiePagina />
    </>
  );
};
