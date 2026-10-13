import type { DrawFn } from './sampler';

// Las tres formas comparten el mismo lienzo (512px) y la misma altura visual
// aproximada, para que la transición entre ellas se sienta continua.

const STROKE = 7;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Bloques de "interfaz" dentro de la pantalla: líneas de texto y tarjetas. */
function drawScreenContent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  rows: number[],
) {
  let cursor = y;
  for (const ratio of rows) {
    if (ratio < 0) {
      // Valor negativo = tarjeta de alto |ratio| * w.
      const h = Math.abs(ratio) * w;
      roundedRect(ctx, x, cursor, w, h, 10);
      ctx.lineWidth = 4;
      ctx.stroke();
      cursor += h + 18;
    } else {
      ctx.fillRect(x, cursor, w * ratio, 5);
      cursor += 18;
    }
  }
}

export const drawPhone: DrawFn = (ctx, size) => {
  const w = size * 0.36;
  const h = size * 0.74;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  ctx.strokeStyle = ctx.fillStyle = '#000';
  ctx.lineWidth = STROKE;
  roundedRect(ctx, x, y, w, h, 34);
  ctx.stroke();
  // Notch
  roundedRect(ctx, x + w / 2 - 26, y + 14, 52, 10, 5);
  ctx.fill();
  drawScreenContent(ctx, x + 22, y + 52, w - 44, [0.55, 0.8, -0.55, 0.9, 0.7, 0.4, -0.3, 0.6]);
};

export const drawTablet: DrawFn = (ctx, size) => {
  const w = size * 0.8;
  const h = size * 0.6;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  ctx.strokeStyle = ctx.fillStyle = '#000';
  ctx.lineWidth = STROKE;
  roundedRect(ctx, x, y, w, h, 26);
  ctx.stroke();
  // Cámara frontal
  ctx.beginPath();
  ctx.arc(x + w / 2, y + 14, 4, 0, Math.PI * 2);
  ctx.fill();
  // Sidebar + contenido
  const pad = 26;
  ctx.fillRect(x + pad, y + pad + 14, 6, h - pad * 2 - 14);
  drawScreenContent(ctx, x + pad + 28, y + pad + 14, w * 0.3, [0.9, 0.6, 0.75, 0.5, 0.8, 0.65]);
  drawScreenContent(ctx, x + w * 0.48, y + pad + 14, w * 0.44, [-0.42, 0.85, 0.6, 0.7]);
};

export const drawBrowser: DrawFn = (ctx, size) => {
  const w = size * 0.92;
  const h = size * 0.6;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  ctx.strokeStyle = ctx.fillStyle = '#000';
  ctx.lineWidth = STROKE;
  roundedRect(ctx, x, y, w, h, 14);
  ctx.stroke();
  // Barra de la ventana
  const bar = 38;
  ctx.fillRect(x, y + bar, w, 4);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x + 22 + i * 18, y + bar / 2, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  roundedRect(ctx, x + 90, y + 11, w * 0.5, 16, 8);
  ctx.lineWidth = 3;
  ctx.stroke();
  // Hero + grilla de tarjetas
  const pad = 28;
  drawScreenContent(ctx, x + pad, y + bar + pad, w * 0.45, [0.9, 0.7, 0.5]);
  const cardW = (w - pad * 2 - 32) / 3;
  for (let i = 0; i < 3; i++) {
    roundedRect(ctx, x + pad + i * (cardW + 16), y + h - pad - 110, cardW, 110, 10);
    ctx.lineWidth = 4;
    ctx.stroke();
  }
};
