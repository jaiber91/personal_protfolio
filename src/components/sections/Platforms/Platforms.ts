import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { getExperience } from '@/webgl';

/** Fija la sección y usa el progreso del scroll para pasar de móvil a tablet y a web. */
class PlatformsSection extends HTMLElement {
  private ctx?: gsap.Context;

  connectedCallback(): void {
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
  }

  private setup(): void {
    const steps = [...this.querySelectorAll<HTMLElement>('[data-platform-step]')];
    const lastIndex = steps.length - 1;
    const particles = getExperience()?.particles;
    const pin = this.querySelector<HTMLElement>('[data-platforms-pin]');
    if (!pin) return;

    this.ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * lastIndex * 1.2}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => this.setActive(steps, Math.round(progress * lastIndex)),
        },
      });

      if (particles) {
        timeline.to(particles.uniforms.uStage, { value: lastIndex, ease: 'none' });
      } else {
        timeline.to({}, { duration: 1 });
      }
    }, this);
  }

  private setActive(steps: HTMLElement[], activeIndex: number): void {
    steps.forEach((step, index) => step.toggleAttribute('data-active', index === activeIndex));
  }
}

if (!customElements.get('platforms-section')) {
  customElements.define('platforms-section', PlatformsSection);
}
