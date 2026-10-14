import { gsap } from '../core/gsap';
import { prefersReducedMotion } from '../core/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const FLIP_KEYFRAMES: Keyframe[] = [
  { transform: 'rotateX(0deg)' },
  { transform: 'rotateX(-90deg)', offset: 0.5 },
  { transform: 'rotateX(0deg)' },
];

/**
 * Convierte el texto de `element` en celdas split-flap (una por carácter, agrupadas
 * por palabra para que no se partan al hacer salto de línea). Devuelve las celdas.
 * El texto sigue siendo el mismo para lectores de pantalla.
 */
export function prepareFlaps(element: HTMLElement): HTMLElement[] {
  const text = element.textContent?.trim() ?? '';
  const cells: HTMLElement[] = [];
  element.textContent = '';
  text.split(/\s+/).forEach((word, index) => {
    if (index > 0) element.append(' ');
    const group = document.createElement('span');
    group.className = 'flap-word';
    [...word].forEach((char) => {
      const cell = document.createElement('span');
      cell.className = 'flap';
      cell.textContent = char;
      cell.dataset.char = char;
      group.append(cell);
      cells.push(cell);
    });
    element.append(group);
  });
  return cells;
}

/** Cada celda pasa por caracteres al azar antes de detenerse en el suyo. */
export function flapIn(cells: HTMLElement[], { delay = 0, stagger = 0.025 } = {}): void {
  if (prefersReducedMotion()) return;
  cells.forEach((cell, index) => {
    const final = cell.dataset.char ?? '';
    if (final.trim() === '') return;
    const cycles = 4 + Math.floor(Math.random() * 6);
    const state = { step: 0 };
    let last = -1;
    gsap.to(state, {
      step: cycles,
      duration: cycles * 0.06,
      delay: delay + index * stagger,
      ease: 'none',
      onStart: () => (cell.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
      onUpdate: () => {
        const current = Math.floor(state.step);
        if (current === last) return;
        last = current;
        cell.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        cell.animate(FLIP_KEYFRAMES, { duration: 60 });
      },
      onComplete: () => {
        cell.textContent = final;
        cell.animate(FLIP_KEYFRAMES, { duration: 90 });
      },
    });
  });
}
