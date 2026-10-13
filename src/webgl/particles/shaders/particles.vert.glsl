uniform float uTime;
uniform float uIntro;        // 0 = texto del loader, 1 = dispositivo
uniform float uStage;        // 0 = móvil, 1 = tablet, 2 = web
uniform float uScatter;      // 0 = forma, 1 = campo de partículas ambiental
uniform float uMetric;       // 0 = campo ambiental, 1 = cifra de la trayectoria
uniform float uMetricMix;    // morph de la cifra anterior (A) a la nueva (B)
uniform float uContact;      // 0 = campo ambiental, 1 = "@" de contacto
uniform float uContactAlpha;
uniform float uContactScale;
uniform vec2 uContactOffset;
uniform float uChaos;        // amplitud de la "explosión" en cada transición
uniform float uTextScale;
uniform vec2 uTextOffset;
uniform float uDeviceScale;
uniform vec2 uDeviceOffset;
uniform vec2 uFieldSize;
uniform vec2 uPointer;
uniform float uPointerRadius;
uniform float uPointerStrength;
uniform float uSize;
uniform float uPixelRatio;

attribute vec3 aPhone;
attribute vec3 aTablet;
attribute vec3 aWeb;
attribute vec3 aContact;
attribute vec3 aMetricA;     // ya en coordenadas de mundo
attribute vec3 aMetricB;
attribute vec3 aDirection;
attribute float aRandom;

varying float vAlpha;

const float PI = 3.14159265;

// Progreso escalonado por partícula: no todas se mueven a la vez.
float stagger(float progress, float seed) {
  float spread = 0.35;
  float t = clamp((progress - seed * spread) / (1.0 - spread), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  vec3 textPosition = position * uTextScale + vec3(uTextOffset, 0.0);

  float toTablet = stagger(clamp(uStage, 0.0, 1.0), aRandom);
  float toWeb = stagger(clamp(uStage - 1.0, 0.0, 1.0), aRandom);
  vec3 device = mix(aPhone, aTablet, toTablet);
  device = mix(device, aWeb, toWeb);
  device = device * uDeviceScale + vec3(uDeviceOffset, 0.0);

  float intro = stagger(uIntro, aRandom);
  vec3 pos = mix(textPosition, device, intro);

  // Las partículas se dispersan a mitad de cada transición y vuelven a juntarse.
  float burst = sin(intro * PI) + sin(toTablet * PI) + sin(toWeb * PI);
  pos += aDirection * burst * uChaos;

  float scatter = stagger(uScatter, aRandom);
  vec3 field = aDirection * vec3(uFieldSize * 0.55, 1.5);
  pos = mix(pos, field, scatter);

  // Trayectoria: el campo se junta en una cifra; entre cifras estalla y se rearma.
  float metric = stagger(uMetric, aRandom);
  float metricMix = stagger(uMetricMix, aRandom);
  vec3 metricPosition = mix(aMetricA, aMetricB, metricMix);
  metricPosition += aDirection * sin(metricMix * PI) * uChaos;
  pos = mix(pos, metricPosition, metric);
  pos += aDirection * sin(metric * PI) * uChaos;

  // En contacto el campo vuelve a juntarse, ahora en un "@".
  float contact = stagger(uContact, aRandom);
  vec3 contactPosition = aContact * uContactScale + vec3(uContactOffset, 0.0);
  pos = mix(pos, contactPosition, contact);
  pos += aDirection * sin(contact * PI) * uChaos;

  // Respiración sutil
  float phase = aRandom * 2.0 * PI;
  pos.x += sin(uTime * 0.6 + phase) * 0.012;
  pos.y += cos(uTime * 0.5 + phase) * 0.012;

  // Repulsión del cursor
  vec2 away = pos.xy - uPointer;
  float distance = length(away);
  float force = (1.0 - smoothstep(0.0, uPointerRadius, distance)) * uPointerStrength;
  pos.xy += normalize(away + 1e-4) * force;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * uPixelRatio * (0.6 + aRandom * 0.8) / -mvPosition.z;

  // En el campo ambiental solo queda visible ~30% de las partículas, más tenues.
  float ambient = step(aRandom, 0.3) * 0.45;
  vAlpha = mix(mix(mix(1.0, ambient, scatter), 1.0, metric), uContactAlpha, contact);
}
