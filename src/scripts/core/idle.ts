/**
 * Resuelve cuando el navegador está libre (o tras `timeout` ms). Para trabajo pesado
 * que no debe bloquear la carga inicial (crear escenas WebGL, muestrear formas...).
 */
export function whenIdle(timeout = 1200): Promise<void> {
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => resolve(), { timeout });
    } else {
      setTimeout(resolve, 200);
    }
  });
}

/** Resuelve cuando `element` está a menos de `margin` de entrar en pantalla. */
export function whenNear(element: Element, margin = '100% 0px'): Promise<void> {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        resolve();
      },
      { rootMargin: margin },
    );
    observer.observe(element);
  });
}
