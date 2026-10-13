import { gsap } from '../core/gsap';
import { isCoarsePointer, prefersReducedMotion } from '../core/motion';

/**
 * Elementos con `data-magnetic` siguen sutilmente al cursor.
 * `data-magnetic="0.4"` ajusta la intensidad (0–1).
 */
export function initMagnetic(root: ParentNode = document): void {
  if (prefersReducedMotion() || isCoarsePointer()) return;

  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
