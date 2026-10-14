/**
 * `[data-fit]`: ajusta el tamaño de fuente para que el texto (en una línea) ocupe
 * exactamente el ancho de su caja. Para titulares gigantes en Anton.
 */
export function initFit(root: ParentNode = document): void {
  const elements = [...root.querySelectorAll<HTMLElement>('[data-fit]')];
  if (elements.length === 0) return;

  const fit = (element: HTMLElement) => {
    element.style.removeProperty('font-size');
    const base = parseFloat(getComputedStyle(element).fontSize);
    const available = element.clientWidth;
    element.style.width = 'max-content';
    const natural = element.getBoundingClientRect().width;
    element.style.removeProperty('width');
    if (natural > 0) element.style.fontSize = `${(base * available * 0.995) / natural}px`;
  };

  const fitAll = () => elements.forEach(fit);
  const observer = new ResizeObserver(fitAll);
  elements.forEach((element) => element.parentElement && observer.observe(element.parentElement));
  void document.fonts.ready.then(fitAll);
}
