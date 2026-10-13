// Tokens de movimiento compartidos con `src/styles/tokens/_motion.scss`.
export const DURATION = {
  fast: 0.16,
  base: 0.32,
  slow: 0.64,
  intro: 1.8,
} as const;

export const EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
} as const;

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion(): boolean {
  return reducedMotionQuery.matches;
}

export function isCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}
