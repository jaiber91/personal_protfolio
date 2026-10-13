import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;

/** Smooth scroll sincronizado con el ticker de GSAP. `null` con reduced motion. */
export function getScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function lockScroll(): void {
  getScroll()?.stop();
  document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll(): void {
  document.documentElement.style.removeProperty('overflow');
  getScroll()?.start();
}
