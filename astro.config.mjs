// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio real antes de publicar (se usa para canonical y hreflang).
  site: 'https://example.com',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
      // La raíz la maneja src/pages/index.astro (detecta el idioma del navegador).
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    build: {
      // Three.js por sí solo ronda los 530 kB minificados (~130 kB gzip).
      chunkSizeWarningLimit: 600,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Permite `@use 'abstracts' as *;` desde cualquier componente.
          loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
        },
      },
    },
  },
});
