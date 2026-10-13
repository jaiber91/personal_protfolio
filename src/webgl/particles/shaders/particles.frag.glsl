uniform vec3 uColor;
uniform float uOpacity;

varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.3, d) * vAlpha * uOpacity;
  gl_FragColor = vec4(uColor, alpha);
  #include <colorspace_fragment>
}
