import { BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial, Vector2 } from 'three';
import { drawBrowser, drawPhone, drawTablet } from '../shapes/devices';
import { sampleDrawing, sampleText } from '../shapes/sampler';
import { createRandom } from '../utils/random';
import fragmentShader from './shaders/particles.frag.glsl?raw';
import vertexShader from './shaders/particles.vert.glsl?raw';

// Símbolo que forman las partículas al llegar a contacto.
const CONTACT_SYMBOL = '@';

export interface ParticleMorphOptions {
  count: number;
  /** Texto inicial (el contador del loader). */
  text: string;
  /** Fuente CSS del texto, p. ej. `600 200px "Outfit Variable"`. */
  font: string;
  reducedMotion: boolean;
}

export interface WorldSize {
  width: number;
  height: number;
}

/** Uniforms animables desde fuera (GSAP tweenea `.value`). */
export interface ParticleUniforms {
  [name: string]: { value: unknown };
  uTime: { value: number };
  uIntro: { value: number };
  uStage: { value: number };
  uScatter: { value: number };
  uMetric: { value: number };
  uMetricMix: { value: number };
  uContact: { value: number };
  uContactAlpha: { value: number };
  uContactScale: { value: number };
  uContactOffset: { value: Vector2 };
  uChaos: { value: number };
  uOpacity: { value: number };
  uTextScale: { value: number };
  uTextOffset: { value: Vector2 };
  uDeviceScale: { value: number };
  uDeviceOffset: { value: Vector2 };
  uFieldSize: { value: Vector2 };
  uPointer: { value: Vector2 };
  uPointerRadius: { value: number };
  uPointerStrength: { value: number };
  uSize: { value: number };
  uPixelRatio: { value: number };
  uColor: { value: Color };
}

/**
 * Nube de partículas que se transforma: texto -> móvil -> tablet -> web -> cifras -> "@".
 * Las formas fijas viven en atributos de la GPU y el morph es solo un uniform.
 * Las cifras de la trayectoria son dinámicas: dos buffers (A -> B) que se reescriben
 * en cada cambio (ver `setMetricTarget`).
 */
export class ParticleMorph {
  readonly points: Points<BufferGeometry, ShaderMaterial>;
  readonly uniforms: ParticleUniforms;

  private readonly count: number;
  private readonly seeds: Float32Array;
  private readonly directions: Float32Array;
  private readonly metricA: BufferAttribute;
  private readonly metricB: BufferAttribute;

  constructor({ count, text, font, reducedMotion }: ParticleMorphOptions) {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(sampleText(text, font, count, 1), 3));
    geometry.setAttribute('aPhone', new BufferAttribute(sampleDrawing(drawPhone, count, 2), 3));
    geometry.setAttribute('aTablet', new BufferAttribute(sampleDrawing(drawTablet, count, 3), 3));
    geometry.setAttribute('aWeb', new BufferAttribute(sampleDrawing(drawBrowser, count, 4), 3));
    geometry.setAttribute(
      'aContact',
      new BufferAttribute(sampleText(CONTACT_SYMBOL, font, count, 6), 3),
    );

    const random = createRandom(5);
    const directions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      directions[i * 3] = random() * 2 - 1;
      directions[i * 3 + 1] = random() * 2 - 1;
      directions[i * 3 + 2] = random() * 2 - 1;
      seeds[i] = random();
    }
    geometry.setAttribute('aDirection', new BufferAttribute(directions, 3));
    geometry.setAttribute('aRandom', new BufferAttribute(seeds, 1));

    this.count = count;
    this.seeds = seeds;
    this.directions = directions;
    this.metricA = new BufferAttribute(new Float32Array(count * 3), 3);
    this.metricB = new BufferAttribute(new Float32Array(count * 3), 3);
    geometry.setAttribute('aMetricA', this.metricA);
    geometry.setAttribute('aMetricB', this.metricB);

    this.uniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uStage: { value: 0 },
      uScatter: { value: 0 },
      uMetric: { value: 0 },
      uMetricMix: { value: 0 },
      uContact: { value: 0 },
      uContactAlpha: { value: 1 },
      uContactScale: { value: 1 },
      uContactOffset: { value: new Vector2() },
      uChaos: { value: reducedMotion ? 0 : 0.35 },
      uOpacity: { value: 0 },
      uTextScale: { value: 1 },
      uTextOffset: { value: new Vector2() },
      uDeviceScale: { value: 1 },
      uDeviceOffset: { value: new Vector2() },
      uFieldSize: { value: new Vector2(1, 1) },
      uPointer: { value: new Vector2(999, 999) },
      uPointerRadius: { value: 0.6 },
      uPointerStrength: { value: reducedMotion ? 0 : 0.3 },
      uSize: { value: 26 },
      uPixelRatio: { value: 1 },
      uColor: { value: new Color() },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
    });

    this.points = new Points(geometry, material);
    // Las posiciones finales se calculan en el shader: el bounding sphere no sirve.
    this.points.frustumCulled = false;
  }

  /** Coloca el dispositivo según el viewport: a la derecha en escritorio, arriba en móvil. */
  setLayout(world: WorldSize, wide: boolean, pixelRatio: number): void {
    const u = this.uniforms;
    u.uFieldSize.value.set(world.width, world.height);
    u.uPixelRatio.value = pixelRatio;

    if (wide) {
      // La forma más ancha (navegador) ocupa ~0.92 del lienzo: debe caber en la mitad derecha.
      u.uDeviceScale.value = Math.min(world.height * 0.9, world.width * 0.5);
      u.uDeviceOffset.value.set(world.width * 0.22, 0);
      u.uContactScale.value = u.uDeviceScale.value;
      u.uContactOffset.value.copy(u.uDeviceOffset.value);
      u.uContactAlpha.value = 0.5;
    } else {
      // Móvil: el dispositivo ocupa la mitad superior y el texto la inferior.
      u.uDeviceScale.value = Math.min(world.height * 0.5, world.width * 0.9);
      u.uDeviceOffset.value.set(0, world.height * 0.22);
      // En móvil el "@" ocupa el ancho, centrado detrás del texto y más tenue para no competir.
      u.uContactScale.value = world.width * 0.85;
      u.uContactOffset.value.set(0, 0);
      u.uContactAlpha.value = 0.25;
    }
  }

  /**
   * Prepara el siguiente morph de cifras: congela en A la posición actual de cada
   * partícula (aunque el morph anterior siga a medias) y escribe el destino en B.
   * Después basta animar `uMetricMix` de 0 a 1.
   * @param target posiciones en coordenadas de mundo (x, y, z por partícula).
   */
  setMetricTarget(target: Float32Array): void {
    const a = this.metricA.array as Float32Array;
    const b = this.metricB.array as Float32Array;
    const mix = this.uniforms.uMetricMix.value;
    const chaos = this.uniforms.uChaos.value;

    for (let i = 0; i < this.count; i++) {
      // Mismo cálculo que el shader: progreso escalonado + "estallido" a mitad de camino.
      const t = stagger(mix, this.seeds[i]);
      const burst = Math.sin(t * Math.PI) * chaos;
      for (let axis = 0; axis < 3; axis++) {
        const k = i * 3 + axis;
        a[k] = a[k] + (b[k] - a[k]) * t + this.directions[k] * burst;
      }
    }
    b.set(target);
    this.uniforms.uMetricMix.value = 0;
    this.metricA.needsUpdate = true;
    this.metricB.needsUpdate = true;
  }

  /** Coloca la cifra sin animación (primer paso o tras un resize). */
  jumpMetricTo(target: Float32Array): void {
    (this.metricA.array as Float32Array).set(target);
    (this.metricB.array as Float32Array).set(target);
    this.uniforms.uMetricMix.value = 0;
    this.metricA.needsUpdate = true;
    this.metricB.needsUpdate = true;
  }

  get particleCount(): number {
    return this.count;
  }

  setColor(cssColor: string): void {
    this.uniforms.uColor.value.setStyle(cssColor);
  }

  update(time: number, pointer: Vector2): void {
    this.uniforms.uTime.value = time;
    this.uniforms.uPointer.value.copy(pointer);
  }

  dispose(): void {
    this.points.geometry.dispose();
    this.points.material.dispose();
  }
}

/** Copia en CPU de `stagger()` del vertex shader. */
function stagger(progress: number, seed: number): number {
  const spread = 0.35;
  const t = Math.min(Math.max((progress - seed * spread) / (1 - spread), 0), 1);
  return t * t * (3 - 2 * t);
}
