import { flapIn, prepareFlaps } from '@/scripts/interactions/flap';
import { prefersReducedMotion } from '@/scripts/core/motion';

/** Las celdas del tablero giran (split-flap) hasta mostrar el vuelo cancelado. */
class NotFound extends HTMLElement {
  connectedCallback(): void {
    if (prefersReducedMotion()) return;
    const cells = [...this.querySelectorAll<HTMLElement>('[data-flap]')].flatMap(prepareFlaps);
    flapIn(cells, { delay: 0.2, stagger: 0.04 });
  }
}

if (!customElements.get('not-found')) customElements.define('not-found', NotFound);
