import {
  CircleGeometry,
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  ShaderMaterial,
} from 'three';
import type { Stage, StageObject } from '../Stage';
import { createRandom } from '../utils/random';
import fragmentShader from './flip.frag.glsl?raw';
import vertexShader from './flip.vert.glsl?raw';

export interface FlipBoardOptions {
  /** Líneas de texto a mostrar (p. ej. ['JAIBER', 'FLOR']). */
  lines: string[];
  /** Fuente CSS sin tamaño, p. ej. `900 "Archivo Variable"` (el tamaño se calcula). */
  font: string;
  /** Tamaño aproximado de celda en píxeles CSS. */
  cellPx: number;
  colors: { on: string; off: string };
}

const FLIP_SPEED = 5; // medias vueltas por segundo
const HOVER_RADIUS = 3.2; // en celdas
const HOVER_HOLD = 0.5; // s que una celda queda volteada tras pasar el cursor

/**
 * Tablero flip-dot: una grilla de discos (instancias) que escribe texto. Cada disco
 * tiene un objetivo (encendido/apagado) y gira hacia él tras un retardo propio, así
 * los cambios recorren el tablero como en los paneles de aeropuerto. El cursor
 * voltea los discos que toca.
 */
export class FlipBoard implements StageObject {
  readonly mesh: Mesh<InstancedBufferGeometry, ShaderMaterial>;

  private cols = 0;
  private rows = 0;
  private cell = 1;
  private flip = new Float32Array(0);
  private flipAttribute = new InstancedBufferAttribute(new Float32Array(0), 1);
  private bitmap: Uint8Array = new Uint8Array(0);
  private base = new Uint8Array(0);
  private startAt = new Float32Array(0);
  private hoverUntil = new Float32Array(0);
  private lastTime = 0;
  private time = 0;
  private revealed = false;
  private readonly random = createRandom(11);
  private readonly material: ShaderMaterial;

  constructor(private readonly options: FlipBoardOptions) {
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      uniforms: {
        uCell: { value: 1 },
        uOn: { value: new Color(options.colors.on) },
        uOff: { value: new Color(options.colors.off) },
      },
    });
    this.mesh = new Mesh(new InstancedBufferGeometry(), this.material);
    this.mesh.frustumCulled = false;
  }

  /** Muestra el texto: los discos giran en barrido de izquierda a derecha. */
  reveal(): void {
    this.revealed = true;
    for (let i = 0; i < this.base.length; i++) {
      this.base[i] = this.bitmap[i];
      this.startAt[i] = this.time + (i % this.cols) * 0.012 + this.random() * 0.25;
    }
  }

  /** Muestra el texto al instante (movimiento reducido o tras un resize). */
  showInstantly(): void {
    this.revealed = true;
    this.base.set(this.bitmap);
    this.flip.set(this.bitmap);
    this.flipAttribute.needsUpdate = true;
  }

  setColors(colors: { on: string; off: string }): void {
    (this.material.uniforms.uOn.value as Color).setStyle(colors.on);
    (this.material.uniforms.uOff.value as Color).setStyle(colors.off);
  }

  resize(stage: Stage): void {
    const pixelWidth = stage.canvas.clientWidth || 1;
    const cols = Math.max(24, Math.round(pixelWidth / this.options.cellPx));
    const cell = stage.world.width / cols;
    const rows = Math.max(12, Math.floor(stage.world.height / cell));
    if (cols === this.cols && rows === this.rows) {
      this.cell = cell;
      this.material.uniforms.uCell.value = cell;
      return;
    }
    this.build(cols, rows, cell);
    if (this.revealed) this.showInstantly();
  }

  update(time: number, stage: Stage): void {
    const dt = Math.min(time - this.lastTime, 0.1);
    this.lastTime = time;
    this.time = time;
    this.applyHover(stage);

    let changed = false;
    const step = dt * FLIP_SPEED;
    for (let i = 0; i < this.flip.length; i++) {
      const target = this.base[i] ^ (this.hoverUntil[i] > time ? 1 : 0);
      const current = this.flip[i];
      if (current === target || time < this.startAt[i]) continue;
      this.flip[i] = target > current ? Math.min(1, current + step) : Math.max(0, current - step);
      changed = true;
    }
    if (changed) this.flipAttribute.needsUpdate = true;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.material.dispose();
  }

  private build(cols: number, rows: number, cell: number): void {
    this.cols = cols;
    this.rows = rows;
    this.cell = cell;
    const count = cols * rows;

    const centers = new Float32Array(count * 2);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = row * cols + col;
        centers[i * 2] = (col + 0.5 - cols / 2) * cell;
        centers[i * 2 + 1] = (rows / 2 - row - 0.5) * cell;
      }
    }

    this.flip = new Float32Array(count);
    this.flipAttribute = new InstancedBufferAttribute(this.flip, 1);
    this.base = new Uint8Array(count);
    this.startAt = new Float32Array(count);
    this.hoverUntil = new Float32Array(count);
    this.bitmap = this.rasterize(cols, rows);

    const disc = new CircleGeometry(0.42, 20);
    const geometry = new InstancedBufferGeometry();
    geometry.index = disc.index;
    geometry.setAttribute('position', disc.getAttribute('position'));
    geometry.instanceCount = count;
    geometry.setAttribute('aCell', new InstancedBufferAttribute(centers, 2));
    geometry.setAttribute('aFlip', this.flipAttribute);
    this.mesh.geometry.dispose();
    this.mesh.geometry = geometry;
    this.material.uniforms.uCell.value = cell;
  }

  /** Dibuja las líneas de texto en un canvas del tamaño de la grilla (1 píxel = 1 disco). */
  private rasterize(cols: number, rows: number): Uint8Array {
    const canvas = document.createElement('canvas');
    canvas.width = cols;
    canvas.height = rows;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const result = new Uint8Array(cols * rows);
    if (!context) return result;

    const { lines, font } = this.options;
    const lineHeight = 0.9;
    context.fontStretch = 'expanded';
    // Tamaño que hace caber la línea más ancha en el 90% del ancho y el bloque en el 62% del alto.
    context.font = `${font.replace(/^(\d+)/, '$1 100px')}`;
    const widest = Math.max(...lines.map((line) => context.measureText(line).width));
    const size = Math.min((cols * 0.9 * 100) / widest, (rows * 0.62) / (lines.length * lineHeight));
    context.font = `${font.replace(/^(\d+)/, `$1 ${size}px`)}`;
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const blockHeight = lines.length * size * lineHeight;
    lines.forEach((line, index) => {
      // Un poco por encima del centro: abajo quedan el panel y los datos del hero.
      const y = rows * 0.42 - blockHeight / 2 + size * lineHeight * (index + 0.5);
      context.fillText(line, cols / 2, y);
    });

    const { data } = context.getImageData(0, 0, cols, rows);
    for (let i = 0; i < result.length; i++) result[i] = data[i * 4 + 3] > 110 ? 1 : 0;
    return result;
  }

  /** Los discos cerca del cursor se voltean y vuelven tras `HOVER_HOLD`. */
  private applyHover(stage: Stage): void {
    const col = stage.pointer.x / this.cell + this.cols / 2;
    const row = this.rows / 2 - stage.pointer.y / this.cell;
    if (col < -HOVER_RADIUS || col > this.cols + HOVER_RADIUS) return;
    if (row < -HOVER_RADIUS || row > this.rows + HOVER_RADIUS) return;

    const radius = Math.ceil(HOVER_RADIUS);
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const c = Math.floor(col) + dx;
        const r = Math.floor(row) + dy;
        if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) continue;
        if (Math.hypot(c + 0.5 - col, r + 0.5 - row) > HOVER_RADIUS) continue;
        const i = r * this.cols + c;
        this.hoverUntil[i] = this.time + HOVER_HOLD;
        this.startAt[i] = Math.min(this.startAt[i], this.time);
      }
    }
  }
}
