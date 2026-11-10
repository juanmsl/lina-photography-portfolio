import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  /*
   * Site base path. On GitHub Pages the deploy workflow sets it
   * (e.g. "/repo-name/"); locally it is the root.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
    /*
     * Installable PWA: the plugin writes manifest.webmanifest, links it from
     * index.html and generates the service worker (Workbox). start_url and
     * scope follow `base`. The service worker updates itself on the next visit.
     */
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Lina Nieto · Fotografía',
        short_name: 'Lina Nieto',
        description:
          'Lina María Nieto Gómez, fotógrafa en Bogotá. Paisaje, naturaleza y arquitectura; también retrato, moda y producto.',
        lang: 'es-CO',
        dir: 'ltr',
        display: 'standalone',
        theme_color: '#0A0A0B',
        background_color: '#0A0A0B',
        categories: ['photography', 'portfolio'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App shell only; photos and fonts are cached the first time they are used.
        globPatterns: ['**/*.{js,css,html,svg}', 'pwa-*.png'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'photos',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
