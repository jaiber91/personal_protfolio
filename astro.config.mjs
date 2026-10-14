// @ts-check
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Única fuente del dominio: canonical, hreflang, Open Graph, datos estructurados,
  // sitemap, robots.txt y llms.txt.
  site: 'https://jaiberflor.dev',
  integrations: [
    // Sitemap con hreflang (es/en). La raíz "/" solo redirige por idioma: no se indexa.
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
      filter: (page) => new URL(page).pathname !== '/',
      // Igual que el <head>: x-default apunta al idioma por defecto (si no coinciden,
      // Google puede ignorar el par de hreflang).
      // Las URL comparten la lista de enlaces: se crea una nueva por URL.
      serialize: (item) => {
        const fallback = item.links?.find((link) => link.lang === 'es');
        if (!item.links || !fallback) return item;
        return { ...item, links: [...item.links, { url: fallback.url, lang: 'x-default' }] };
      },
    }),
  ],
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
