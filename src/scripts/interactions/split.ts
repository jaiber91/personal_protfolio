import { gsap, ScrollTrigger, SplitText } from '../core/gsap';
import { EASE, prefersReducedMotion } from '../core/motion';

/** La máscara recibe `split-char-mask`, con holgura vertical en `utilities/_layout.scss`. */
export const SPLIT_CHAR_CLASS = 'split-char';

/**
 * Los títulos `[data-split]` entran letra a letra desde una máscara al aparecer
 * en pantalla, igual que el título del hero.
 */
export function initSplit(root: ParentNode = document): void {
  if (prefersReducedMotion()) return;

  root.querySelectorAll<HTMLElement>('[data-split]').forEach((title) => {
    const split = SplitText.create(title, {
      type: 'words,chars',
      mask: 'chars',
      charsClass: SPLIT_CHAR_CLASS,
    });
    gsap.set(split.chars, { yPercent: 110 });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(split.chars, { yPercent: 0, duration: 1.2, ease: EASE.out, stagger: 0.03 }),
    });
  });
}
