// Bootstrap global: se carga una vez desde BaseLayout.
import { ScrollTrigger } from './core/gsap';
import { lifecycle } from './core/lifecycle';
import { getScroll } from './core/scroll';
import { initMagnetic } from './interactions/magnetic';
import { initReveal } from './interactions/reveal';
import { initSplit } from './interactions/split';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

getScroll();
initMagnetic();
void lifecycle.loaderDone.then(() => {
  initReveal();
  initSplit();
});

// Las fuentes y la intro cambian medidas: recalcular posiciones de ScrollTrigger.
// Las secciones crean sus pins al terminar la intro, después de los reveals: se
// ordenan por posición para que cada trigger tenga en cuenta el espacio de los pins.
void lifecycle.introDone.then(() =>
  requestAnimationFrame(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }),
);
void document.fonts.ready.then(() => ScrollTrigger.refresh());
