import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { getExperience } from '@/webgl';

const COPIED_DURATION = 2000;

/**
 * Al llegar a contacto, el campo de partículas vuelve a juntarse formando un "@".
 * El botón de correo copia la dirección: muchos navegadores no tienen un cliente
 * de correo configurado y `mailto:` no hace nada.
 */
class ContactSection extends HTMLElement {
  private ctx?: gsap.Context;
  private readonly abort = new AbortController();
  private resetTimer?: number;

  connectedCallback(): void {
    this.setupCopy();
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
    this.abort.abort();
    window.clearTimeout(this.resetTimer);
  }

  private setupCopy(): void {
    const button = this.querySelector<HTMLButtonElement>('[data-copy-email]');
    const label = button?.querySelector<HTMLElement>('.button__label');
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

  private setup(): void {
    const particles = getExperience()?.particles;
    if (!particles) return;

    this.ctx = gsap.context(() => {
      gsap.to(particles.uniforms.uContact, {
        value: 1,
        ease: 'none',
        scrollTrigger: { trigger: this, start: 'top bottom', end: 'top 25%', scrub: 1 },
      });
    }, this);
  }
}

if (!customElements.get('contact-section')) {
  customElements.define('contact-section', ContactSection);
}
