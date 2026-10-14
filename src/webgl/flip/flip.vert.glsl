uniform float uCell;          // tamaño de celda en unidades de mundo

attribute vec2 aCell;         // centro de la celda
attribute float aFlip;        // 0 = cara apagada, 1 = cara encendida (180°)

varying float vShade;
varying float vFace;

const float PI = 3.14159265;

void main() {
  // Cada disco gira sobre su eje horizontal, como en un tablero flip-dot real.
  float angle = aFlip * PI;
  vec3 p = position * uCell;
  p = vec3(p.x, p.y * cos(angle), p.y * sin(angle));
  p.xy += aCell;

  // De canto el disco se ve más oscuro.
  vShade = 0.45 + 0.55 * abs(cos(angle));
  vFace = step(0.5, aFlip);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
