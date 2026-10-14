import { gsap, ScrollTrigger } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { flapIn, prepareFlaps } from '@/scripts/interactions/flap';

/**
 * Tablero de salidas: al entrar en pantalla las letras giran (split-flap) fila por fila.
 * Cada vuelo se abre para mostrar sus cifras, que cuentan la primera vez que se ven.
 */
class StorySection extends HTMLElement {
  private ctx?: gsap.Context;
  private readonly abort = new AbortController();
  private readonly counted = new WeakSet<HTMLElement>();

  connectedCallback(): void {
    this.setupToggles();
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
    this.abort.abort();
  }

  private setup(): void {
    const rows = [...this.querySelectorAll<HTMLElement>('[data-flight]')];
    const open = rows.find((row) => row.hasAttribute('data-open'));

    this.ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const cellsPerRow = rows.map((row) =>
        [...row.querySelectorAll<HTMLElement>('[data-flap]')].flatMap(prepareFlaps),
      );
      ScrollTrigger.create({
        trigger: this.querySelector('.story__board'),
        start: 'top 75%',
        once: true,
        onEnter: () => {
          cellsPerRow.forEach((cells, index) =>
            flapIn(cells, { delay: index * 0.25, stagger: 0.02 }),
          );
          if (open) this.countMetrics(open);
        },
      });
    }, this);
  }

  /** Un vuelo abierto a la vez (acordeón). */
  private setupToggles(): void {
    const rows = [...this.querySelectorAll<HTMLElement>('[data-flight]')];
    rows.forEach((row) => {
      const button = row.querySelector<HTMLButtonElement>('[data-flight-toggle]');
      button?.addEventListener(
        'click',
        () => {
          const willOpen = !row.hasAttribute('data-open');
          rows.forEach((other) => {
            other.removeAttribute('data-open');
            other.querySelector('[data-flight-toggle]')?.setAttribute('aria-expanded', 'false');
          });
          // El usuario ya descubrió que los vuelos se abren: dejan de parpadear.
          this.querySelector('[data-story-board]')?.classList.add('is-explored');
          if (!willOpen) return;
          row.setAttribute('data-open', '');
          button.setAttribute('aria-expanded', 'true');
          this.countMetrics(row);
          // La altura de la página cambia: recalcular las secciones que vienen después.
          gsap.delayedCall(0.7, () => ScrollTrigger.refresh());
        },
        { signal: this.abort.signal },
      );
    });
  }

  /** Las cifras cuentan desde `data-count-from` (0 por defecto) la primera vez. */
  private countMetrics(row: HTMLElement): void {
    if (prefersReducedMotion() || this.counted.has(row)) return;
    this.counted.add(row);
    const format = new Intl.NumberFormat(document.documentElement.lang, { useGrouping: 'always' });
    row.querySelectorAll<HTMLElement>('[data-count]').forEach((metric) => {
      const suffix = metric.dataset.countSuffix ?? '';
      const counter = { value: Number(metric.dataset.countFrom) || 0 };
      const render = () => (metric.textContent = format.format(Math.round(counter.value)) + suffix);
      render();
      gsap.to(counter, {
        value: Number(metric.dataset.count),
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: render,
      });
    });
  }
}

if (!customElements.get('story-section')) customElements.define('story-section', StorySection);
