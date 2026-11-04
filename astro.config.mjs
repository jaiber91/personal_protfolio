// @ts-check
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { DEFAULT_LOCALE, isLocale, LOCALES } from './src/i18n/config.ts';
import { translatePath } from './src/i18n/routes.ts';

const SITE = 'https://jaiberflor.dev';

// https://astro.build/config
export default defineConfig({
  // Única fuente del dominio: canonical, hreflang, Open Graph, datos estructurados,
  // sitemap, robots.txt y llms.txt.
  site: SITE,
  // Sin resaltado de código (no hay bloques de código): Shiki usa estilos en línea
  // incompatibles con la CSP.
  markdown: { syntaxHighlight: false },
  integrations: [
    // Sitemap con hreflang (es/en). La raíz "/" solo redirige por idioma: no se indexa.
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return pathname !== '/' && !pathname.includes('404');
      },
      // Igual que el <head>: los pares de idioma salen del mapa de rutas (los slugs están
      // traducidos, así que no basta con cambiar el prefijo) y x-default apunta al idioma
      // por defecto (si no coinciden, Google puede ignorar el par de hreflang).
      serialize: (item) => {
        const [, from, ...rest] = new URL(item.url).pathname.split('/');
        if (!from || !isLocale(from)) return item;
        const path = rest.join('/');
        const url = (/** @type {import('./src/i18n/config').Locale} */ to) =>
          new URL(`/${to}/${translatePath(path, from, to)}`, SITE).href;
        return {
          ...item,
          links: [
            ...LOCALES.map((lang) => ({ lang, url: url(lang) })),
            { lang: 'x-default', url: url(DEFAULT_LOCALE) },
          ],
        };
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
        // Cloudflare Web Analytics (sin cookies): el script lo inyecta Cloudflare y envía
        // las métricas a cloudflareinsights.com.
        "connect-src 'self' https://cloudflareinsights.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
      // Atributos style="" (variables CSS en marcado) permitidos; <style> sigue con hashes.
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
      styleDirective: {
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  // URLs con barra final (/es/, /en/): coinciden con cómo las sirve Cloudflare, así el
  // canonical, el hreflang y el sitemap nunca apuntan a una redirección.
  trailingSlash: 'always',
  build: {
    // Respeta la estructura de src/pages: [lang]/404.astro → /es/404.html y /en/404.html,
    // que Cloudflare sirve para las URL inexistentes de cada idioma (ver wrangler.jsonc).
    format: 'preserve',
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
