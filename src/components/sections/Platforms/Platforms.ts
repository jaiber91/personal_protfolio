import { gsap } from '@/scripts/core/gsap';
import { whenNear } from '@/scripts/core/idle';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken } from '@/scripts/core/theme';
import type { PixelDevices } from '@/webgl/pixels/PixelDevices';
import type { Stage } from '@/webgl/Stage';

/**
 * Fija la sección y usa el progreso del scroll para pasar de móvil a tablet y a web.
 * El scroll anima un estado propio (`progress`); los píxeles (WebGL) se crean solo
 * cuando la sección se acerca a la pantalla y leen ese estado.
 */
class PlatformsSection extends HTMLElement {
  private ctx?: gsap.Context;
  private stage?: Stage | null;
  private pixels: PixelDevices | null = null;
  private disposed = false;
  private readonly progress = { assemble: 0, stage: 0 };

  connectedCallback(): void {
    void whenNear(this).then(() => this.createPixels());
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.disposed = true;
    this.ctx?.revert();
    this.stage?.dispose();
  }

  private async createPixels(): Promise<void> {
    const [{ createStage }, { PixelDevices }] = await Promise.all([
      import('@/webgl/Stage'),
      import('@/webgl/pixels/PixelDevices'),
    ]);
    if (this.disposed) return;
    this.stage = createStage(this.querySelector('[data-platforms-canvas]'));
    if (!this.stage) return;

    const wide = window.innerWidth >= 1024;
    this.pixels = new PixelDevices(wide ? 7000 : 3500, {
      base: readColorToken('on-ink'),
      accent: readColorToken('signal'),
    });
    this.pixels.uniforms.uSize.value = wide ? 34 : 26;
    this.stage.scene.add(this.pixels.points);
    this.stage.add(this.pixels);
    this.apply();
  }

  /** Copia el estado del scroll a los uniforms (si los píxeles ya existen). */
  private apply = (): void => {
    if (!this.pixels) return;
    this.pixels.uniforms.uAssemble.value = this.progress.assemble;
    this.pixels.uniforms.uStage.value = this.progress.stage;
  };

  private setup(): void {
    const steps = [...this.querySelectorAll<HTMLElement>('[data-platform-step]')];
    const lastIndex = steps.length - 1;
    const pin = this.querySelector<HTMLElement>('[data-platforms-pin]');
    if (!pin) return;

    if (prefersReducedMotion()) {
      this.progress.assemble = 1;
      this.apply();
      return;
    }

    this.ctx = gsap.context(() => {
      gsap.to(this.progress, {
        assemble: 1,
        ease: 'none',
        onUpdate: this.apply,
        scrollTrigger: { trigger: this, start: 'top 80%', end: 'top top', scrub: 1 },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${window.innerHeight * lastIndex * 1.2}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => this.setActive(steps, Math.round(progress * lastIndex)),
          },
        })
        .to(this.progress, { stage: lastIndex, ease: 'none', onUpdate: this.apply });
    }, this);
  }

  private setActive(steps: HTMLElement[], activeIndex: number): void {
    steps.forEach((step, index) => step.toggleAttribute('data-active', index === activeIndex));
  }
}

if (!customElements.get('platforms-section')) {
  customElements.define('platforms-section', PlatformsSection);
}
