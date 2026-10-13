import { getTheme, setTheme, THEME_CHANGE_EVENT } from '@/scripts/core/theme';

class ThemeToggle extends HTMLElement {
  private readonly abort = new AbortController();

  connectedCallback(): void {
    const button = this.querySelector('button');
    if (!button) return;

    const sync = () => button.setAttribute('aria-pressed', String(getTheme() === 'dark'));
    sync();

    const { signal } = this.abort;
    button.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'), {
      signal,
    });
    window.addEventListener(THEME_CHANGE_EVENT, sync, { signal });
  }

  disconnectedCallback(): void {
    this.abort.abort();
  }
}

if (!customElements.get('theme-toggle')) customElements.define('theme-toggle', ThemeToggle);
