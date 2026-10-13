export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'theme:change';

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage bloqueado (modo privado): el tema solo dura la sesión.
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

/** Lee un token de color definido en `src/styles/tokens/_colors.scss`. */
export function readColorToken(role: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${role}`).trim();
}
