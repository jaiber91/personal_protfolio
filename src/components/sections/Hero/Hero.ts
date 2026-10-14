import { gsap } from '@/scripts/core/gsap';
import { whenIdle } from '@/scripts/core/idle';
import { lifecycle } from '@/scripts/core/lifecycle';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken, THEME_CHANGE_EVENT } from '@/scripts/core/theme';
import type { FlipBoard } from '@/webgl/flip/FlipBoard';
import type { Stage } from '@/webgl/Stage';

const BOARD_FONT = '900 "Archivo Variable"';

/**
 * Hero: un tablero flip-dot escribe el nombre cuando termina el loader (barrido de
 * izquierda a derecha) y los discos se voltean al paso del cursor.
 * Three.js se carga aparte y cuando el navegador está libre: el loader dura más que
 * eso, así que el tablero está listo antes de mostrarse y no bloquea la carga.
 */
class HeroSection extends HTMLElement {
  private ctx?: gsap.Context;
  private stage?: Stage | null;
  private disposed = false;
  private readonly abort = new AbortController();

  connectedCallback(): void {
    void this.setup();
  }

  disconnectedCallback(): void {
    this.disposed = true;
    this.ctx?.revert();
    this.stage?.dispose();
    this.abort.abort();
  }

  private async setup(): Promise<void> {
    // El tablero se prepara en paralelo mientras corre el loader.
    const boardReady = this.createBoard();
    if (prefersReducedMotion()) {
      (await boardReady)?.showInstantly();
      return;
    }

    await lifecycle.loaderDone;
    this.ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', { autoAlpha: 0, duration: 0.01, stagger: 0.15, delay: 1.2 });
    }, this);
    const board = await boardReady;
    gsap.delayedCall(0.3, () => board?.reveal());
  }

  private async createBoard(): Promise<FlipBoard | null> {
    const title = this.querySelector<HTMLElement>('[data-hero-title]')?.textContent?.trim() ?? '';
    const wide = window.innerWidth >= 768;
    // En pantallas verticales (móvil, tablet de pie) el nombre va en dos líneas, más grande.
    const stacked = !wide || window.innerHeight > window.innerWidth;

    // La fuente real hace falta para rasterizar el nombre; el resto espera a que el navegador esté libre.
    await Promise.all([
      document.fonts.load(BOARD_FONT.replace('900', '900 100px'), title),
      whenIdle(),
    ]);
    const [{ createStage }, { FlipBoard }] = await Promise.all([
      import('@/webgl/Stage'),
      import('@/webgl/flip/FlipBoard'),
    ]);
    if (this.disposed) return null;

    this.stage = createStage(this.querySelector('[data-hero-board]'));
    if (!this.stage) return null;
    const colors = () => ({ on: readColorToken('signal'), off: readColorToken('disc-off') });
    const board = new FlipBoard({
      lines: stacked ? title.toUpperCase().split(' ') : [title.toUpperCase()],
      font: BOARD_FONT,
      cellPx: wide ? 13 : 9,
      colors: colors(),
      // La pista de pronunciación se coloca justo debajo del nombre.
      onLayout: (bottom) =>
        this.style.setProperty('--name-bottom', `${(bottom * 100).toFixed(2)}%`),
    });
    this.stage.scene.add(board.mesh);
    this.stage.add(board);
    window.addEventListener(THEME_CHANGE_EVENT, () => board.setColors(colors()), {
      signal: this.abort.signal,
    });
    return board;
  }
}

if (!customElements.get('hero-section')) customElements.define('hero-section', HeroSection);
