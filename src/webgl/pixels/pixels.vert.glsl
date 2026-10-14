uniform float uTime;
uniform float uStage;       // 0 = móvil, 1 = tablet, 2 = web
uniform float uAssemble;    // 0 = píxeles dispersos, 1 = dispositivo armado
uniform float uScale;
uniform vec2 uOffset;
uniform vec2 uPointer;
uniform float uPointerRadius;
uniform float uSize;
uniform float uPixelRatio;

attribute vec3 aTablet;
attribute vec3 aWeb;
attribute vec3 aDirection;
attribute float aRandom;

varying float vAccent;

const float PI = 3.14159265;

float stagger(float progress, float seed) {
  float spread = 0.4;
  float t = clamp((progress - seed * spread) / (1.0 - spread), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// Cuantiza a una grilla: los píxeles "encajan" como en una pantalla de baja resolución.
vec2 snap(vec2 p, float cell) {
  return floor(p / cell + 0.5) * cell;
}

void main() {
  float toTablet = stagger(clamp(uStage, 0.0, 1.0), aRandom);
  float toWeb = stagger(clamp(uStage - 1.0, 0.0, 1.0), aRandom);
  vec3 device = mix(position, aTablet, toTablet);
  device = mix(device, aWeb, toWeb);
  device.xy = snap(device.xy, 0.012);
  device = device * uScale + vec3(uOffset, 0.0);

  // Entre formas los píxeles saltan en bloque, sin curva: brutalismo.
  float jump = sin(toTablet * PI) + sin(toWeb * PI);
  device.xy += aDirection.xy * jump * 0.5;

  vec3 scattered = aDirection * vec3(6.0, 4.0, 2.0);
  vec3 pos = mix(scattered, device, stagger(uAssemble, aRandom));

  vec2 away = pos.xy - uPointer;
  float influence = exp(-dot(away, away) / (uPointerRadius * uPointerRadius));
  pos.xy += normalize(away + 1e-4) * influence * 0.35;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio / -mv.z;
  vAccent = step(aRandom, 0.18);
}
