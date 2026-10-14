import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken } from '@/scripts/core/theme';

/** Las palabras se encienden con el scroll; las resaltadas se "pintan" de azul. */
class ManifestoSection extends HTMLElement {
  private ctx?: gsap.Context;

  connectedCallback(): void {
    if (prefersReducedMotion()) return;
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
  }

  private setup(): void {
    const words = [...this.querySelectorAll<HTMLElement>('[data-manifesto-word]')];
    this.ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.manifesto__text',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
      words.forEach((word, index) => {
        timeline.to(word, { opacity: 1, duration: 0.3, ease: 'none' }, index * 0.1);
        if (word.hasAttribute('data-highlight')) {
          timeline.to(
            word,
            {
              backgroundSize: '100% 100%',
              color: readColorToken('on-signal'),
              duration: 0.4,
              ease: 'none',
            },
            index * 0.1,
          );
        }
      });
    }, this);
  }
}

if (!customElements.get('manifesto-section')) {
  customElements.define('manifesto-section', ManifestoSection);
}
