import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { isCoarsePointer } from '@/scripts/core/motion';

const HORIZONTAL_QUERY = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)';
const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';

/**
 * Pases de abordar. En escritorio la sección se fija y el scroll vertical los mueve
 * en horizontal; cada pase se inclina en 3D siguiendo al cursor.
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
    const tickets = [...this.querySelectorAll<HTMLElement>('[data-ticket]')];
    if (!pin || !track || tickets.length === 0) return;

    this.media = gsap.matchMedia(this);

    this.media.add(HORIZONTAL_QUERY, () => {
      this.classList.add('projects--horizontal');
      // El padding del carril (CSS) centra el primer y el último pase.
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      return () => this.classList.remove('projects--horizontal');
    });

    this.media.add(MOTION_QUERY, () => {
      tickets.forEach((ticket) => {
        gsap.from(ticket, {
          y: 80,
          rotate: -3,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: ticket, start: 'top 90%', once: true },
        });
      });
      if (!isCoarsePointer()) this.setupTilt(tickets);
    });
  }

  /** Inclinación 3D suave hacia el cursor. */
  private setupTilt(tickets: HTMLElement[]): void {
    tickets.forEach((ticket) => {
      const rotateX = gsap.quickTo(ticket, 'rotateX', { duration: 0.5, ease: 'power3.out' });
      const rotateY = gsap.quickTo(ticket, 'rotateY', { duration: 0.5, ease: 'power3.out' });
      ticket.addEventListener('pointermove', (event) => {
        const rect = ticket.getBoundingClientRect();
        rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 10);
        rotateX(((event.clientY - rect.top) / rect.height - 0.5) * -10);
      });
      ticket.addEventListener('pointerleave', () => {
        rotateX(0);
        rotateY(0);
      });
    });
  }
}

if (!customElements.get('projects-section')) {
  customElements.define('projects-section', ProjectsSection);
}
