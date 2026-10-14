uniform vec3 uOn;
uniform vec3 uOff;

varying float vShade;
varying float vFace;

void main() {
  gl_FragColor = vec4(mix(uOff, uOn, vFace) * vShade, 1.0);
  #include <colorspace_fragment>
}
