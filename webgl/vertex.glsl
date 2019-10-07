// Attributes are values that are applied to individual vertices.
// Attributes are only available to the vertex shader.
// This could be something like each vertex having a distinct color.
// Attributes have a one-to-one relationship with vertices.
attribute vec4 aPosition;
uniform float theta;
uniform float scale;

void main() {
  // mat4 translasi = mat4(
  //   1.0, 0.0, 0.0, 0.5,   // dx = 0.5
  //   0.0, 1.0, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );
  mat4 skalasi = mat4(
    scale, 0.0, 0.0, 0.1,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  gl_Position = (aPosition-vec4(-0.45,0,0,0)) * rotasi + vec4(-0.45,0,0,0);

}