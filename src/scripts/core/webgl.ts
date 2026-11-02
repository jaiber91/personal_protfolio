// Detección de WebGL sin cargar Three.js: el loader la necesita antes de que exista la escena.

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software/i;

let available: boolean | undefined;

/**
 * WebGL con aceleración por GPU. Sin GPU el navegador lo emula en CPU (SwiftShader):
 * cada frame tarda cientos de ms y congela la página, así que cuenta como no disponible.
 * `failIfMajorPerformanceCaveat` cubre el caso habitual; el nombre del renderer, el de
 * SwiftShader forzado (donde el navegador ignora esa opción).
 * Se calcula una sola vez; si no hay WebGL marca el documento (`no-webgl`) para que se
 * vea el respaldo en HTML.
 */
export function hasWebGL(): boolean {
  available ??= detect();
  if (!available) document.documentElement.classList.add('no-webgl');
  return available;
}

function detect(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const options = { failIfMajorPerformanceCaveat: true };
    const gl = (canvas.getContext('webgl2', options) ??
      canvas.getContext('webgl', options)) as WebGLRenderingContext | null;
    if (!gl) return false;
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !SOFTWARE_RENDERER.test(renderer);
  } catch {
    return false;
  }
}
