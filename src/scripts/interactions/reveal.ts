import { gsap, ScrollTrigger } from '../core/gsap';
import { prefersReducedMotion } from '../core/motion';

/** Revela con un fade-up los elementos `[data-reveal]` al entrar en pantalla. */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (prefersReducedMotion() || elements.length === 0) return;

  gsap.set(elements, { autoAlpha: 0, y: 32 });
  ScrollTrigger.batch(elements, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }),
  });
}
