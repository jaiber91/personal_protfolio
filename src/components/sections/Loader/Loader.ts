import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { lockScroll, unlockScroll } from '@/scripts/core/scroll';

const MIN_DURATION = 2.2;

/**
 * Arranque: el log se escribe línea a línea mientras el contador sube 000 -> 100.
 * Al terminar, el fondo (una grilla de baldosas) se deshace en orden aleatorio y
 * deja ver el hero, como píxeles que se apagan.
 */
class SiteLoader extends HTMLElement {
  connectedCallback(): void {
    if (prefersReducedMotion()) {
      this.finish();
      return;
    }
    void this.run();
  }

  private async run(): Promise<void> {
    lockScroll();
    const tiles = this.buildTiles();
    const lines = [...this.querySelectorAll<HTMLElement>('[data-loader-line]')];
    const count = this.querySelector<HTMLElement>('[data-loader-count]');
    const bar = this.querySelector('[data-loader-bar]');
    const counter = { value: 0 };

    const boot = gsap.timeline();
    boot.to(counter, {
      value: 100,
      duration: MIN_DURATION,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count) count.textContent = String(Math.round(counter.value)).padStart(3, '0');
      },
    });
    boot.to(bar, { scaleX: 1, duration: MIN_DURATION, ease: 'power2.inOut' }, 0);
    lines.forEach((line, index) => {
      boot.call(
        () => {
          lines.forEach((other) => other.classList.remove('is-current'));
          line.classList.add('is-visible', 'is-current');
        },
        [],
        (MIN_DURATION / lines.length) * index,
      );
    });

    await Promise.all([boot.then(), document.fonts.ready]);
    lifecycle.completeLoader();

    await gsap
      .timeline()
      .to('[data-loader-content]', { autoAlpha: 0, duration: 0.2, ease: 'none' })
      .to(tiles, {
        autoAlpha: 0,
        duration: 0.01,
        stagger: { each: 0.004, from: 'random' },
      });

    unlockScroll();
    this.finish();
  }

  /** Llena el fondo con una grilla de baldosas cuadradas según el viewport. */
  private buildTiles(): HTMLElement[] {
    const container = this.querySelector<HTMLElement>('[data-loader-tiles]');
    if (!container) return [];
    const size = window.innerWidth < 768 ? 48 : 72;
    const cols = Math.ceil(window.innerWidth / size);
    const rows = Math.ceil(window.innerHeight / size);
    container.style.setProperty('--cols', String(cols));
    container.style.setProperty('--rows', String(rows));
    const tiles = Array.from({ length: cols * rows }, () => {
      const tile = document.createElement('span');
      tile.className = 'loader__tile';
      return tile;
    });
    container.append(...tiles);
    this.classList.add('has-tiles');
    return tiles;
  }

  private finish(): void {
    lifecycle.completeLoader();
    lifecycle.completeIntro();
    this.remove();
  }
}

if (!customElements.get('site-loader')) customElements.define('site-loader', SiteLoader);
