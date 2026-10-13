import { Experience } from './Experience';

let instance: Experience | null | undefined;

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Singleton perezoso: el primer componente que la pide la crea.
 * Devuelve `null` si no hay canvas o el navegador no soporta WebGL;
 * los componentes deben funcionar igual sin ella.
 */
export function getExperience(): Experience | null {
  if (instance !== undefined) return instance;

  const canvas = document.querySelector<HTMLCanvasElement>('[data-webgl-canvas]');
  instance = canvas && isWebGLAvailable() ? new Experience(canvas) : null;
  if (!instance) document.documentElement.classList.add('no-webgl');
  return instance;
}

export type { Experience };
