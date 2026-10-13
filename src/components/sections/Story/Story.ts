import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { getExperience } from '@/webgl';

const STEP_SCROLL = 0.6; // pantallas de scroll por cifra
const MORPH = { duration: 1.4, ease: 'power2.inOut' };

/**
 * Trayectoria: la sección se fija y el scroll recorre las cifras de cada empresa.
 * Las partículas del fondo se juntan en la cifra activa (encima de la cifra HTML,
 * que queda transparente) y entre cifras estallan y se rearman. Con movimiento
 * reducido se queda como una lista estática.
 */
class StorySection extends HTMLElement {
  private ctx?: gsap.Context;
  private media?: gsap.MatchMedia;
  private steps: HTMLElement[] = [];
  private current = -1;
  private pendingMorph?: gsap.core.Tween;

  connectedCallback(): void {
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
    this.media?.revert();
  }

  private setup(): void {
    const particles = getExperience()?.particles;

    this.ctx = gsap.context(() => {
      if (!particles) return;
      gsap.to(particles.uniforms.uScatter, {
        value: 1,
        ease: 'none',
        scrollTrigger: { trigger: this, start: 'top bottom', end: 'top 20%', scrub: 1 },
      });
    }, this);

    this.media = gsap.matchMedia(this);
    this.media.add('(prefers-reduced-motion: no-preference)', () => this.setupInteractive());
  }

  private setupInteractive(): () => void {
    const pin = this.querySelector<HTMLElement>('[data-story-pin]');
    const particles = getExperience()?.particles;
    this.steps = [...this.querySelectorAll<HTMLElement>('[data-story-step]')];
    if (!pin || this.steps.length === 0) return () => {};

    this.classList.add('story--interactive');
    this.classList.toggle('story--particles', Boolean(particles));
    this.current = -1;
    this.setStep(0, true);

    const showMetric = (value: number) =>
      particles &&
      gsap.to(particles.uniforms.uMetric, { value, duration: 1.2, ease: 'power2.inOut' });

    gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${window.innerHeight * STEP_SCROLL * this.steps.length}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) =>
          this.setStep(Math.min(Math.floor(progress * this.steps.length), this.steps.length - 1)),
        onEnter: () => showMetric(1),
        onEnterBack: () => showMetric(1),
        onLeave: () => showMetric(0),
        onLeaveBack: () => showMetric(0),
        // El layout cambió (resize): recolocar la cifra actual sin animación.
        onRefresh: () => this.placeCurrent(),
      },
    });

    return () => {
      this.pendingMorph?.kill();
      this.classList.remove('story--interactive', 'story--particles');
      this.steps.forEach((step) => step.removeAttribute('data-active'));
      this.querySelectorAll('[data-story-company]').forEach((company) =>
        company.removeAttribute('data-active'),
      );
      if (particles) particles.uniforms.uMetric.value = 0;
    };
  }

  private setStep(index: number, instant = false): void {
    if (index === this.current) return;
    const forward = index > this.current;
    this.current = index;

    const step = this.steps[index];
    const company = step.closest('[data-story-company]');
    this.steps.forEach((el) => el.toggleAttribute('data-active', el === step));
    this.querySelectorAll('[data-story-company]').forEach((el) =>
      el.toggleAttribute('data-active', el === company),
    );
    this.querySelectorAll('[data-story-dot]').forEach((dot, i) =>
      dot.toggleAttribute('data-active', i <= index),
    );
    const counter = this.querySelector('[data-story-counter]');
    if (counter) counter.textContent = `${pad(index + 1)} / ${pad(this.steps.length)}`;

    this.morphTo(step, instant, forward);
  }

  /** Las partículas forman la cifra del paso; si tiene "antes" (60 -> 10 min), pasa por ella. */
  private morphTo(step: HTMLElement, instant: boolean, forward: boolean): void {
    const experience = getExperience();
    const particles = experience?.particles;
    const value = step.querySelector<HTMLElement>('[data-story-value]');
    const text = step.dataset.text;
    if (!experience || !particles || !value || !text) return;

    this.pendingMorph?.kill();
    const morph = (content: string) => {
      const target = experience.textTargetFor(value, content);
      if (!target) return;
      particles.setMetricTarget(target);
      return gsap.to(particles.uniforms.uMetricMix, { value: 1, ...MORPH });
    };

    const target = experience.textTargetFor(value, text);
    if (!target) return;
    if (instant) {
      particles.jumpMetricTo(target);
      return;
    }

    const fromText = step.dataset.fromText;
    if (fromText && forward) {
      morph(fromText);
      this.pendingMorph = gsap.delayedCall(MORPH.duration * 0.8, () => {
        this.pendingMorph = morph(text);
      });
    } else {
      this.pendingMorph = morph(text);
    }
  }

  private placeCurrent(): void {
    const step = this.steps[this.current];
    const experience = getExperience();
    const value = step?.querySelector<HTMLElement>('[data-story-value]');
    const target =
      value && step.dataset.text && experience?.textTargetFor(value, step.dataset.text);
    if (target) experience?.particles?.jumpMetricTo(target);
  }
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

if (!customElements.get('story-section')) customElements.define('story-section', StorySection);
