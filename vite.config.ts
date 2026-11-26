import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import { photosPlugin } from './build/photos-plugin.ts';
import { seoPlugin } from './build/seo-plugin.ts';

export default defineConfig(({ mode }) => {
  /** Cloudinary credentials (Vercel environment variable or .env.local); see README → Photos on Cloudinary. */
  const cloudinaryUrl = loadEnv(mode, process.cwd(), '').CLOUDINARY_URL;

  return {
    // Served from the domain root on Vercel (see vercel.json).
    base: '/',
    build: {
      rolldownOptions: {
        output: {
          /*
           * Libraries go in their own chunks, apart from the app code: no chunk
           * is over 500 kB, and they stay cached between deploys that only
           * change the site.
           */
          codeSplitting: {
            groups: [
              {
                name: 'react',
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/,
              },
              { name: 'vendor', test: /[\\/]node_modules[\\/]/ },
            ],
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      // One HTML file per indexable route, 404.html and sitemap.xml (see build/seo-plugin.ts).
      seoPlugin(cloudinaryUrl),
      // Signed Cloudinary photo URLs (virtual:lina-photos); see build/photos-plugin.ts.
      photosPlugin(cloudinaryUrl),
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
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // App shell only; photos and fonts are cached the first time they are used.
          globPatterns: ['**/*.{js,css,html,svg}', 'pwa-*.png'],
          navigateFallback: 'index.html',
          // Files that are not pages (sitemap.xml, robots.txt) must reach the server, not the app shell.
          navigateFallbackDenylist: [/\.(?:xml|txt)$/, /^\/api\//],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === 'font',
              handler: 'CacheFirst',
              options: {
                cacheName: 'fonts',
                expiration: {
                  maxEntries: 40,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'CacheFirst',
              options: {
                cacheName: 'photos',
                expiration: {
                  maxEntries: 80,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
    ],
  };
});
