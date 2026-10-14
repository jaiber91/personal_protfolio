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
  // Content-Security-Policy (OWASP A05/A02). Astro calcula en build los hashes de los
  // scripts y estilos en línea y los publica en un <meta>. Las cabeceras del hosting
  // (public/_headers, vercel.json) añaden lo que un <meta> no admite (frame-ancestors).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
      // Atributos style="" (variables CSS en marcado) permitidos; <style> sigue con hashes.
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  build: {
    // El CSS es pequeño (~10 kB gzip): va dentro del HTML y no bloquea el primer pintado.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Three.js por sí solo ronda los 530 kB minificados (~130 kB gzip).
      chunkSizeWarningLimit: 600,
      // Nada se incrusta como data: (p. ej. subconjuntos pequeños de fuentes): la CSP
      // puede quedarse en font-src/img-src 'self' sin permitir data:.
      assetsInlineLimit: 0,
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
