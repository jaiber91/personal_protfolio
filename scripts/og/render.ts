// Genera las imágenes para compartir (Open Graph, 1200×630) en public/og/.
// Uso: npm run og   (usa el Chrome instalado; o define CHROME_PATH)
//
// Reproduce el tablero flip-dot del hero: el nombre en discos amarillos sobre tinta,
// con el rol y la frase principal de cada idioma (tomados de los diccionarios).

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { profile } from '../../src/config/profile.ts';
import en from '../../src/i18n/dictionaries/en.ts';
import es from '../../src/i18n/dictionaries/es.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));
const font = (path: string) => pathToFileURL(`${root}node_modules/${path}`).href;
const outDir = `${root}public/og`;

const COLORS = {
  ink: '#111114',
  off: '#232328',
  signal: '#ffd23f',
  paper: '#efede6',
  muted: '#9a978e',
};

const html = (lead: string) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Archivo'; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}); font-weight: 100 900; font-stretch: 62% 125%; }
  @font-face { font-family: 'Mono'; src: url(${font('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}); font-weight: 100 800; }
  @font-face { font-family: 'Epilogue'; src: url(${font('@fontsource-variable/epilogue/files/epilogue-latin-wght-normal.woff2')}); font-weight: 100 900; }
  html, body { margin: 0; width: 1200px; height: 630px; background: ${COLORS.ink}; overflow: hidden; }
  canvas { position: absolute; inset: 0; }
  .info { position: absolute; left: 64px; right: 64px; bottom: 56px; display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; }
  .role { font: 600 22px 'Mono'; letter-spacing: .08em; text-transform: uppercase; color: ${COLORS.signal}; margin: 0 0 14px; }
  .lead { font: 400 30px/1.25 'Epilogue'; color: ${COLORS.paper}; margin: 0; max-width: 760px; }
  .mark { flex: none; width: 92px; height: 92px; display: grid; place-items: center; background: ${COLORS.signal}; color: ${COLORS.ink}; font: 900 40px 'Archivo'; font-stretch: 125%; }
</style></head><body>
  <canvas id="board" width="1200" height="630"></canvas>
  <div class="info">
    <div><p class="role">${profile.jobTitle}</p><p class="lead">${lead}</p></div>
    <div class="mark">JF</div>
  </div>
  <script>
    document.fonts.ready.then(() => {
      const cell = 15, cols = Math.floor(1200 / cell), rows = Math.floor(630 / cell);
      // El nombre se dibuja en una grilla de baja resolución: 1 píxel = 1 disco.
      const grid = document.createElement('canvas'); grid.width = cols; grid.height = rows;
      const g = grid.getContext('2d');
      g.fontStretch = 'expanded';
      g.font = '900 100px Archivo';
      const name = ${JSON.stringify(profile.displayName.toUpperCase())};
      const size = Math.min((cols * 0.86 * 100) / g.measureText(name).width, rows * 0.3);
      g.font = '900 ' + size + 'px Archivo';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(name, cols / 2, rows * 0.36);
      const lit = g.getImageData(0, 0, cols, rows).data;
      const ctx = document.getElementById('board').getContext('2d');
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const on = lit[(r * cols + c) * 4 + 3] > 110;
        ctx.fillStyle = on ? '${COLORS.signal}' : '${COLORS.off}';
        ctx.beginPath(); ctx.arc(c * cell + cell / 2, r * cell + cell / 2, cell * 0.4, 0, Math.PI * 2); ctx.fill();
      }
      document.body.dataset.ready = '1';
    });
  </script>
</body></html>`;

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
);
for (const [locale, t] of [
  ['es', es],
  ['en', en],
] as const) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  // Se abre como archivo (no setContent) para que pueda cargar las fuentes locales.
  const file = join(tmpdir(), `og-${locale}.html`);
  writeFileSync(file, html(t.hero.lead));
  await page.goto(pathToFileURL(file).href);
  await page.waitForSelector('body[data-ready="1"]');
  await page.screenshot({ path: `${outDir}/og-${locale}.png` });
  await page.close();
  rmSync(file);
  console.log(`public/og/og-${locale}.png`);
}
await browser.close();
