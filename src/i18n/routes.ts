// Rutas con slug traducido: cada página tiene una clave y una ruta por idioma (sin el
// prefijo de idioma, con barra final). Es la fuente para el canonical, el hreflang, el
// sitemap y el selector de idioma. Sin dependencias de Astro: también lo usa
// astro.config.mjs (sitemap).
import type { Locale } from './config';

export const ROUTES = {
  home: { es: '', en: '' },
  'mobile-apps': { es: 'desarrollo-apps-moviles/', en: 'mobile-app-development/' },
  'web-apps': { es: 'desarrollo-aplicaciones-web/', en: 'web-app-development/' },
  'landing-pages': { es: 'landing-pages/', en: 'landing-pages/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function isRouteKey(value: string): value is RouteKey {
  return Object.hasOwn(ROUTES, value);
}

/**
 * Ruta equivalente en otro idioma. `path` es la ruta sin prefijo de idioma
 * (`desarrollo-apps-moviles/`). Las rutas que no están en el mapa se conservan tal cual.
 */
export function translatePath(path: string, from: Locale, to: Locale): string {
  const routes: Record<Locale, string>[] = Object.values(ROUTES);
  const route = routes.find((entry) => entry[from] === path);
  return route ? route[to] : path;
}
