import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';
import { gsap } from '@/scripts/core/gsap';

export interface StageObject {
  update(time: number, stage: Stage): void;
  resize?(stage: Stage): void;
  dispose(): void;
}

const OFFSCREEN = new Vector2(999, 999);

/**
 * Un renderer por sección: el canvas vive dentro de su sección (no hay uno global
 * fijo) y solo se dibuja mientras es visible. `world` es el tamaño del plano z = 0
 * en unidades de la escena, para colocar cosas en coordenadas de pantalla.
 */
export class Stage {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(35, 1, 0.1, 100);
  readonly world = { width: 1, height: 1 };
  /** Puntero en coordenadas de mundo (suavizado). Fuera del canvas = lejos. */
  readonly pointer = OFFSCREEN.clone();

  private readonly pointerTarget = OFFSCREEN.clone();
  private readonly objects = new Set<StageObject>();
  private readonly abort = new AbortController();
  private readonly resizeObserver: ResizeObserver;
  private readonly visibilityObserver: IntersectionObserver;
  private visible = false;
  private lost = false;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.z = 10;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
    });
    this.visibilityObserver.observe(canvas);

    const { signal } = this.abort;
    // Si el navegador pierde el contexto WebGL (GPU reiniciada, demasiadas pestañas...)
    // se deja de dibujar y la página muestra su respaldo en HTML (clase `no-webgl`).
    canvas.addEventListener(
      'webglcontextlost',
      (event) => {
        event.preventDefault();
        this.lost = true;
        document.documentElement.classList.add('no-webgl');
      },
      { signal },
    );
    window.addEventListener('pointermove', this.onPointerMove, { passive: true, signal });
    document.documentElement.addEventListener(
      'pointerleave',
      () => this.pointerTarget.copy(OFFSCREEN),
      { signal },
    );

    this.resize();
    gsap.ticker.add(this.tick);
  }

  add(object: StageObject): void {
    this.objects.add(object);
    object.resize?.(this);
  }

  /** Coordenadas de cliente (px) -> plano z = 0, relativo a este canvas. */
  toWorld(clientX: number, clientY: number, target = new Vector2()): Vector2 {
    const rect = this.canvas.getBoundingClientRect();
    return target.set(
      ((clientX - rect.left) / rect.width - 0.5) * this.world.width,
      (0.5 - (clientY - rect.top) / rect.height) * this.world.height,
    );
  }

  dispose(): void {
    gsap.ticker.remove(this.tick);
    this.abort.abort();
    this.resizeObserver.disconnect();
    this.visibilityObserver.disconnect();
    this.objects.forEach((object) => object.dispose());
    this.renderer.dispose();
  }

  private readonly tick = (time: number): void => {
    if (!this.visible || this.lost) return;
    this.pointer.lerp(this.pointerTarget, 0.1);
    this.objects.forEach((object) => object.update(time, this));
    this.renderer.render(this.scene, this.camera);
  };

  private resize(): void {
    const width = this.canvas.clientWidth || 1;
    const height = this.canvas.clientHeight || 1;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const fov = (this.camera.fov * Math.PI) / 180;
    this.world.height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.world.width = this.world.height * this.camera.aspect;
    this.objects.forEach((object) => object.resize?.(this));
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.toWorld(event.clientX, event.clientY, this.pointerTarget);
  };
}

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Crea un Stage sobre `canvas` si hay WebGL; si no, marca el documento y devuelve null. */
export function createStage(canvas: HTMLCanvasElement | null): Stage | null {
  if (!canvas || !isWebGLAvailable()) {
    document.documentElement.classList.add('no-webgl');
    return null;
  }
  return new Stage(canvas);
}
