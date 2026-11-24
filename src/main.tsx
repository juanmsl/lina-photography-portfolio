import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from './App';
import './index.css';
// Before anything renders: Polpo's form fields need crypto.randomUUID, also over plain http (pnpm dev:lan).
import './polyfills';
import { hideSplash } from './splash';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

hideSplash();
