import { BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial, Vector2 } from 'three';
import { drawBrowser, drawPhone, drawTablet } from '../shapes/devices';
import { sampleDrawing } from '../shapes/sampler';
import type { Stage, StageObject } from '../Stage';
import { createRandom } from '../utils/random';
import fragmentShader from './pixels.frag.glsl?raw';
import vertexShader from './pixels.vert.glsl?raw';

export interface PixelUniforms {
  [name: string]: { value: unknown };
  uTime: { value: number };
  uStage: { value: number };
  uAssemble: { value: number };
  uScale: { value: number };
  uOffset: { value: Vector2 };
  uPointer: { value: Vector2 };
  uPointerRadius: { value: number };
  uSize: { value: number };
  uPixelRatio: { value: number };
  uColor: { value: Color };
  uAccent: { value: Color };
}

/** Píxeles cuadrados que forman móvil -> tablet -> web (`uStage`) y se arman con `uAssemble`. */
export class PixelDevices implements StageObject {
  readonly points: Points<BufferGeometry, ShaderMaterial>;
  readonly uniforms: PixelUniforms;

  constructor(count: number, colors: { base: string; accent: string }) {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(sampleDrawing(drawPhone, count, 2), 3));
    geometry.setAttribute('aTablet', new BufferAttribute(sampleDrawing(drawTablet, count, 3), 3));
    geometry.setAttribute('aWeb', new BufferAttribute(sampleDrawing(drawBrowser, count, 4), 3));

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

    this.uniforms = {
      uTime: { value: 0 },
      uStage: { value: 0 },
      uAssemble: { value: 0 },
      uScale: { value: 1 },
      uOffset: { value: new Vector2() },
      uPointer: { value: new Vector2(999, 999) },
      uPointerRadius: { value: 0.5 },
      uSize: { value: 30 },
      uPixelRatio: { value: 1 },
      uColor: { value: new Color(colors.base) },
      uAccent: { value: new Color(colors.accent) },
    };

    this.points = new Points(
      geometry,
      new ShaderMaterial({ vertexShader, fragmentShader, uniforms: this.uniforms }),
    );
    this.points.frustumCulled = false;
  }

  resize(stage: Stage): void {
    const { width, height } = stage.world;
    this.uniforms.uScale.value = Math.min(height * 0.95, width * 0.95);
    this.uniforms.uPixelRatio.value = stage.renderer.getPixelRatio();
  }

  update(time: number, stage: Stage): void {
    this.uniforms.uTime.value = time;
    this.uniforms.uPointer.value.copy(stage.pointer);
  }

  dispose(): void {
    this.points.geometry.dispose();
    this.points.material.dispose();
  }
}
