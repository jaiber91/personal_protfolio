import { gsap } from '@/scripts/core/gsap';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken, THEME_CHANGE_EVENT } from '@/scripts/core/theme';
import { FlipBoard } from '@/webgl/flip/FlipBoard';
import { createStage, type Stage } from '@/webgl/Stage';

const BOARD_FONT = '900 "Archivo Variable"';

/**
 * Hero: un tablero flip-dot escribe el nombre cuando termina el loader (barrido de
 * izquierda a derecha) y los discos se voltean al paso del cursor.
 */
class HeroSection extends HTMLElement {
  private ctx?: gsap.Context;
  private stage?: Stage | null;
  private readonly abort = new AbortController();

  connectedCallback(): void {
    void this.setup();
  }

  disconnectedCallback(): void {
    this.ctx?.revert();
    this.stage?.dispose();
    this.abort.abort();
  }

  private async setup(): Promise<void> {
    const reduced = prefersReducedMotion();
    const title = this.querySelector<HTMLElement>('[data-hero-title]')?.textContent?.trim() ?? '';
    const wide = window.innerWidth >= 768;

    // El tablero necesita la fuente real para rasterizar el nombre.
    await document.fonts.load(`${BOARD_FONT.replace('900', '900 100px')}`, title);
    this.stage = createStage(this.querySelector('[data-hero-board]'));
    let board: FlipBoard | null = null;
    if (this.stage) {
      const colors = () => ({ on: readColorToken('signal'), off: readColorToken('disc-off') });
      board = new FlipBoard({
        lines: wide ? [title.toUpperCase()] : title.toUpperCase().split(' '),
        font: BOARD_FONT,
        cellPx: wide ? 13 : 9,
        colors: colors(),
      });
      this.stage.scene.add(board.mesh);
      this.stage.add(board);
      window.addEventListener(THEME_CHANGE_EVENT, () => board?.setColors(colors()), {
        signal: this.abort.signal,
      });
    }

    if (reduced) {
      board?.showInstantly();
      return;
    }
    await lifecycle.loaderDone;
    this.ctx = gsap.context(() => {
      gsap.delayedCall(0.3, () => board?.reveal());
      gsap.from('[data-hero-reveal]', { autoAlpha: 0, duration: 0.01, stagger: 0.15, delay: 1.2 });
    }, this);
  }
}

if (!customElements.get('hero-section')) customElements.define('hero-section', HeroSection);
