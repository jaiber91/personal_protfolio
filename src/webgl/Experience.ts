import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';
import { gsap } from '@/scripts/core/gsap';
import { prefersReducedMotion } from '@/scripts/core/motion';
import { readColorToken, THEME_CHANGE_EVENT } from '@/scripts/core/theme';
import { ParticleMorph, type WorldSize } from './particles/ParticleMorph';
import { sampleText } from './shapes/sampler';

const WIDE_QUERY = '(min-width: 64rem)';
const OFFSCREEN = new Vector2(999, 999);

/**
 * Dueño del renderer, la cámara y el loop. Hay una sola instancia por página
 * (ver `getExperience`) y un único canvas fijo detrás del contenido.
 */
export class Experience {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(35, 1, 0.1, 100);
  particles: ParticleMorph | null = null;

  private readonly world: WorldSize = { width: 1, height: 1 };
  private readonly pointer = OFFSCREEN.clone();
  private readonly pointerTarget = OFFSCREEN.clone();
  private readonly reducedMotion = prefersReducedMotion();
  private readonly abort = new AbortController();
  private readonly textSamples = new Map<string, Float32Array>();

  constructor(readonly canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.z = 10;

    const { signal } = this.abort;
    window.addEventListener('resize', this.resize, { signal });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true, signal });
    document.documentElement.addEventListener('pointerleave', this.onPointerLeave, { signal });
    window.addEventListener(THEME_CHANGE_EVENT, this.syncColor, { signal });

    this.resize();
    gsap.ticker.add(this.tick);
  }

  /** Crea las partículas. Espera a la fuente para muestrear el texto con la tipografía real. */
  async init(options: { text: string; font: string }): Promise<ParticleMorph> {
    await document.fonts.load(options.font, options.text);
    const wide = window.matchMedia(WIDE_QUERY).matches;
    this.particles = new ParticleMorph({
      ...options,
      count: wide ? 9000 : 5000,
      reducedMotion: this.reducedMotion,
    });
    this.scene.add(this.particles.points);
    this.syncColor();
    this.resize();
    return this.particles;
  }

  /** Hace coincidir el texto de partículas con un elemento HTML (posición y tamaño). */
  alignTextTo(element: HTMLElement): void {
    if (!this.particles) return;
    const rect = element.getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(element).fontSize);
    const center = this.toWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
    this.particles.uniforms.uTextOffset.value.copy(center);
    this.particles.uniforms.uTextScale.value = fontSize * (this.world.height / window.innerHeight);
  }

  /**
   * Posiciones de partículas que dibujan `text` justo encima de `element`, con su
   * misma tipografía, tamaño y centro. Se usa para las cifras de la trayectoria.
   */
  textTargetFor(element: HTMLElement, text: string): Float32Array | null {
    if (!this.particles) return null;
    const style = getComputedStyle(element);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const key = `${font}|${text}`;
    let sample = this.textSamples.get(key);
    if (!sample) {
      sample = sampleText(text, font, this.particles.particleCount, 7);
      this.textSamples.set(key, sample);
    }

    const rect = element.getBoundingClientRect();
    const scale = parseFloat(style.fontSize) * (this.world.height / window.innerHeight);
    const center = this.toWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
    const target = new Float32Array(sample.length);
    for (let i = 0; i < sample.length; i += 3) {
      target[i] = sample[i] * scale + center.x;
      target[i + 1] = sample[i + 1] * scale + center.y;
      target[i + 2] = sample[i + 2] * scale;
    }
    return target;
  }

  /** Convierte coordenadas de pantalla (px) al plano z = 0 del mundo 3D. */
  toWorld(x: number, y: number, target = new Vector2()): Vector2 {
    return target.set(
      (x / window.innerWidth - 0.5) * this.world.width,
      (0.5 - y / window.innerHeight) * this.world.height,
    );
  }

  dispose(): void {
    gsap.ticker.remove(this.tick);
    this.abort.abort();
    this.particles?.dispose();
    this.renderer.dispose();
  }

  private readonly tick = (time: number): void => {
    if (!this.particles) return;
    this.pointer.lerp(this.pointerTarget, 0.12);
    this.particles.update(time, this.pointer);
    this.renderer.render(this.scene, this.camera);
  };

  private readonly resize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const fov = (this.camera.fov * Math.PI) / 180;
    this.world.height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.world.width = this.world.height * this.camera.aspect;

    this.particles?.setLayout(this.world, window.matchMedia(WIDE_QUERY).matches, pixelRatio);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.toWorld(event.clientX, event.clientY, this.pointerTarget);
  };

  private readonly onPointerLeave = (): void => {
    this.pointerTarget.copy(OFFSCREEN);
  };

  private readonly syncColor = (): void => {
    this.particles?.setColor(readColorToken('particle'));
  };
}
