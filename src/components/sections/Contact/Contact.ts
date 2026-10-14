const COPIED_DURATION = 2000;

/**
 * El bloque de correo copia la dirección: muchos navegadores no tienen un cliente
 * de correo configurado y `mailto:` no hace nada. Si el portapapeles falla, se abre `mailto:`.
 */
class ContactSection extends HTMLElement {
  private readonly abort = new AbortController();
  private resetTimer?: number;

  connectedCallback(): void {
    const button = this.querySelector<HTMLButtonElement>('[data-copy-email]');
    const label = this.querySelector<HTMLElement>('[data-copy-label]');
    const status = this.querySelector<HTMLElement>('[data-copy-status]');
    if (!button || !label) return;

    const email = button.dataset.copyEmail ?? '';
    const original = label.textContent ?? email;

    button.addEventListener(
      'click',
      async () => {
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          window.location.href = `mailto:${email}`;
          return;
        }
        const copied = button.dataset.copiedLabel ?? '';
        label.textContent = copied;
        if (status) status.textContent = copied;
        window.clearTimeout(this.resetTimer);
        this.resetTimer = window.setTimeout(() => {
          label.textContent = original;
          if (status) status.textContent = '';
        }, COPIED_DURATION);
      },
      { signal: this.abort.signal },
    );
  }

  disconnectedCallback(): void {
    this.abort.abort();
    window.clearTimeout(this.resetTimer);
  }
}

if (!customElements.get('contact-section')) {
  customElements.define('contact-section', ContactSection);
}
