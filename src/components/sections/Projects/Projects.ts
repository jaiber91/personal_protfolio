import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';

const HORIZONTAL_QUERY = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)';
const VERTICAL_QUERY = '(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)';

/**
 * Cada proyecto se muestra dentro de su dispositivo. En escritorio la sección se
 * fija y el scroll vertical desplaza los proyectos en horizontal; en móvil cada
 * dispositivo sube al entrar en pantalla.
 */
class ProjectsSection extends HTMLElement {
  private media?: gsap.MatchMedia;

  connectedCallback(): void {
    void lifecycle.introDone.then(() => this.setup());
  }

  disconnectedCallback(): void {
    this.media?.revert();
  }

  private setup(): void {
    const pin = this.querySelector<HTMLElement>('[data-projects-pin]');
    const track = this.querySelector<HTMLElement>('[data-projects-track]');
    const progress = this.querySelector<HTMLElement>('[data-projects-progress]');
    const slides = [...this.querySelectorAll<HTMLElement>('[data-projects-slide]')];
    if (!pin || !track || slides.length === 0) return;

    this.media = gsap.matchMedia(this);

    this.media.add(HORIZONTAL_QUERY, () => {
      this.classList.add('projects--horizontal');
      const distance = () => track.scrollWidth - window.innerWidth;

      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: value }) => gsap.set(progress, { scaleX: value }),
        },
      });

      // Al entrar cada proyecto, el dispositivo llega con retraso respecto a su ficha.
      slides.slice(1).forEach((slide) => {
        const scrollTrigger = {
          trigger: slide,
          containerAnimation: scroll,
          start: 'left right',
          end: 'left left',
          scrub: true,
        };
        gsap.from(slide.querySelector('[data-project-device]'), {
          xPercent: 35,
          rotate: 4,
          ease: 'none',
          scrollTrigger,
        });
        gsap.from(slide.querySelector('[data-project-info]'), {
          xPercent: 20,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger,
        });
      });

      return () => this.classList.remove('projects--horizontal');
    });

    this.media.add(VERTICAL_QUERY, () => {
      slides.forEach((slide) => {
        gsap.from(slide.querySelector('[data-project-device]'), {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: slide, start: 'top 85%', once: true },
        });
      });
    });
  }
}

if (!customElements.get('projects-section')) {
  customElements.define('projects-section', ProjectsSection);
}
