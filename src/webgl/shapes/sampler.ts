import { createRandom } from '../utils/random';

export type DrawFn = (ctx: CanvasRenderingContext2D, size: number) => void;

/**
 * Dibuja una forma en un canvas 2D y devuelve `count` puntos (x, y, z) tomados
 * de sus píxeles. Coordenadas normalizadas: el lienzo completo mide 1 unidad.
 */
export function sampleDrawing(draw: DrawFn, count: number, seed = 1, size = 512): Float32Array {
  const ctx = createContext(size, size);
  draw(ctx, size);
  return pickPoints(ctx, count, seed, size, size, size);
}

/**
 * Muestrea un texto. La unidad es 1em, para poder escalarlo exactamente
 * al tamaño de fuente que tiene el texto HTML en pantalla.
 */
export function sampleText(text: string, font: string, count: number, seed = 1): Float32Array {
  const fontSize = 200;
  const probe = createContext(1, 1);
  probe.font = `${font.replace(/[\d.]+px/, `${fontSize}px`)}`;
  const metrics = probe.measureText(text);
  const width = Math.ceil(metrics.width + fontSize * 0.4);
  const height = Math.ceil(fontSize * 1.6);

  const ctx = createContext(width, height);
  ctx.font = probe.font;
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const glyphHeight = metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent;
  ctx.fillText(text, width / 2, height / 2 + glyphHeight / 2);

  return pickPoints(ctx, count, seed, width, height, fontSize);
}

function createContext(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas 2D no disponible');
  return ctx;
}

function pickPoints(
  ctx: CanvasRenderingContext2D,
  count: number,
  seed: number,
  width: number,
  height: number,
  unit: number,
): Float32Array {
  const { data } = ctx.getImageData(0, 0, width, height);
  const filled: number[] = [];
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 128) filled.push((i - 3) / 4);
  }

  const random = createRandom(seed);
  const points = new Float32Array(count * 3);
  if (filled.length === 0) return points;

  for (let i = 0; i < count; i++) {
    const pixel = filled[Math.floor(random() * filled.length)];
    const px = (pixel % width) + random();
    const py = Math.floor(pixel / width) + random();
    points[i * 3] = (px - width / 2) / unit;
    points[i * 3 + 1] = -(py - height / 2) / unit;
    points[i * 3 + 2] = (random() - 0.5) * 0.02;
  }
  return points;
}
