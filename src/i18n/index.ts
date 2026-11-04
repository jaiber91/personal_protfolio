import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, isLocale, type Locale } from './config';
import en from './dictionaries/en';
import es, { type Dictionary } from './dictionaries/es';

import { ROUTES, type RouteKey } from './routes';

export * from './config';
export * from './routes';
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Resuelve el idioma actual a partir de `Astro.currentLocale` con fallback seguro. */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Ruta equivalente en otro idioma. `path` es la ruta sin prefijo de idioma. */
export function localizePath(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

/** URL relativa de una página del mapa de rutas: `routePath('en', 'mobile-apps')`. */
export function routePath(locale: Locale, key: RouteKey): string {
  return localizePath(locale, ROUTES[key][locale]);
}

/** Quita el prefijo de idioma de un pathname: `/en/about/` -> `about/`. */
export function stripLocale(pathname: string): string {
  const [, maybeLocale, ...rest] = pathname.split('/');
  return isLocale(maybeLocale) ? rest.join('/') : pathname.replace(/^\//, '');
}
