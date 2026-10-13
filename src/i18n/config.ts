// Fuente única de verdad para los idiomas. Debe coincidir con `i18n` en astro.config.mjs.
export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  es: { label: 'Español', htmlLang: 'es', ogLocale: 'es_CO' },
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
