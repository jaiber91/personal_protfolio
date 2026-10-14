import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken } from '@/scripts/core/theme';
import { PixelDevices } from '@/webgl/pixels/PixelDevices';
import { createStage, type Stage } from '@/webgl/Stage';

/** Fija la sección y usa el progreso del scroll para pasar de móvil a tablet y a web. */
class PlatformsSection extends HTMLElement {
  private ctx?: gsap.Context;
  private stage?: Stage | null;

  connectedCallback(): void {
    this.stage = createStage(this.querySelector('[data-platforms-canvas]'));
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
    this.stage?.dispose();
  }

  private setup(): void {
    const steps = [...this.querySelectorAll<HTMLElement>('[data-platform-step]')];
    const lastIndex = steps.length - 1;
    const pin = this.querySelector<HTMLElement>('[data-platforms-pin]');
    if (!pin) return;

    let pixels: PixelDevices | null = null;
    if (this.stage) {
      const wide = window.innerWidth >= 1024;
      pixels = new PixelDevices(wide ? 7000 : 3500, {
        base: readColorToken('on-ink'),
        accent: readColorToken('signal'),
      });
      pixels.uniforms.uSize.value = wide ? 34 : 26;
      this.stage.scene.add(pixels.points);
      this.stage.add(pixels);
    }

    if (prefersReducedMotion()) {
      if (pixels) pixels.uniforms.uAssemble.value = 1;
      return;
    }

    this.ctx = gsap.context(() => {
      if (pixels) {
        gsap.to(pixels.uniforms.uAssemble, {
          value: 1,
          ease: 'none',
          scrollTrigger: { trigger: this, start: 'top 80%', end: 'top top', scrub: 1 },
        });
      }

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
      if (pixels) timeline.to(pixels.uniforms.uStage, { value: lastIndex, ease: 'none' });
      else timeline.to({}, { duration: 1 });
    }, this);
  }

  private setActive(steps: HTMLElement[], activeIndex: number): void {
    steps.forEach((step, index) => step.toggleAttribute('data-active', index === activeIndex));
  }
}

if (!customElements.get('platforms-section')) {
  customElements.define('platforms-section', PlatformsSection);
}
