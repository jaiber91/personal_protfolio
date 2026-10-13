import { gsap, SplitText } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { EASE, prefersReducedMotion } from '@/scripts/core/motion';
import { SPLIT_CHAR_CLASS } from '@/scripts/interactions/split';

class HeroSection extends HTMLElement {
  private ctx?: gsap.Context;

  connectedCallback(): void {
    if (prefersReducedMotion()) return;
    void lifecycle.loaderDone.then(() => this.reveal());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
  }

  private reveal(): void {
    this.ctx = gsap.context(() => {
      const title = this.querySelector<HTMLElement>('[data-hero-title]');
      const others = [...this.querySelectorAll('[data-hero-reveal]')].filter((el) => el !== title);
      const timeline = gsap.timeline({ delay: 0.5 });

      if (title) {
        const split = SplitText.create(title, {
          type: 'chars',
          mask: 'chars',
          charsClass: SPLIT_CHAR_CLASS,
        });
        timeline
          .set(title, { autoAlpha: 1 })
          .from(split.chars, { yPercent: 110, duration: 1.2, ease: EASE.out, stagger: 0.04 });
      }

      timeline.from(
        others,
        { autoAlpha: 0, y: 24, duration: 1, ease: EASE.out, stagger: 0.08 },
        '<0.3',
      );
    }, this);
  }
}

if (!customElements.get('hero-section')) customElements.define('hero-section', HeroSection);
