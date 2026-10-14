uniform vec3 uColor;
uniform vec3 uAccent;

varying float vAccent;

void main() {
  // Sin descartar esquinas: cada partícula es un píxel cuadrado.
  gl_FragColor = vec4(mix(uColor, uAccent, vAccent), 1.0);
  #include <colorspace_fragment>
}
