import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { DURATION, EASE, prefersReducedMotion } from '@/scripts/core/motion';
import { lockScroll, unlockScroll } from '@/scripts/core/scroll';
import { getExperience } from '@/webgl';
import type { ParticleMorph } from '@/webgl/particles/ParticleMorph';

const FINAL_COUNT = '100';

/**
 * Contador 0 -> 100 mientras se preparan fuentes y partículas. Al llegar a 100
 * el número "se convierte" en partículas que vuelan a formar el hero.
 */
class SiteLoader extends HTMLElement {
  connectedCallback(): void {
    void this.run();
  }

  private async run(): Promise<void> {
    const count = this.querySelector<HTMLElement>('[data-loader-count]');
    const experience = getExperience();
    const particlesReady: Promise<ParticleMorph | null> =
      experience && count
        ? experience.init({ text: FINAL_COUNT, font: fontOf(count) }).catch(() => null)
        : Promise.resolve(null);

    if (prefersReducedMotion() || !count) {
      const particles = await particlesReady;
      if (particles) {
        particles.uniforms.uIntro.value = 1;
        particles.uniforms.uOpacity.value = 1;
      }
      this.finish();
      return;
    }

    lockScroll();
    const counter = { value: 0 };
    const render = () => (count.textContent = String(Math.round(counter.value)));

    await gsap.to(counter, { value: 86, duration: 1.4, ease: 'power2.inOut', onUpdate: render });
    const particles = await particlesReady;
    await gsap.to(counter, { value: 100, duration: 0.4, ease: 'power2.out', onUpdate: render });

    lifecycle.completeLoader();
    await this.reveal(count, particles);
    unlockScroll();
    this.finish();
  }

  private async reveal(count: HTMLElement, particles: ParticleMorph | null): Promise<void> {
    const experience = getExperience();
    if (!experience || !particles) {
      await gsap.to(this, { autoAlpha: 0, duration: DURATION.slow });
      return;
    }

    experience.alignTextTo(count);
    experience.canvas.classList.add('is-front');

    await gsap
      .timeline()
      .to(particles.uniforms.uOpacity, { value: 1, duration: 0.2 })
      .to(count, { autoAlpha: 0, duration: 0.2 }, '<')
      .to(particles.uniforms.uIntro, { value: 1, duration: DURATION.intro, ease: EASE.inOut })
      .to(this, { autoAlpha: 0, duration: DURATION.slow, ease: 'power2.out' }, '<0.2');

    experience.canvas.classList.remove('is-front');
  }

  private finish(): void {
    lifecycle.completeLoader();
    lifecycle.completeIntro();
    this.remove();
  }
}

function fontOf(element: HTMLElement): string {
  const style = getComputedStyle(element);
  return `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
}

if (!customElements.get('site-loader')) customElements.define('site-loader', SiteLoader);
