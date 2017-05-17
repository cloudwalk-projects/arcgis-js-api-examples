attribute vec2 a_pos;

uniform highp mat4 u_transformMatrix;
uniform mediump vec2 u_normalized_origin;
uniform mediump float u_depth;
uniform mediump float u_coord_ratio;
uniform mediump vec2 u_delta; // in tile coordinates
uniform mediump vec2 u_dimensions; // in tile coordinates

varying mediump vec2 v_tex;

void main() {
  mediump vec2 offests = u_coord_ratio * vec2(u_delta + a_pos * u_dimensions);
  gl_Position = vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(offests, 0.0, 1.0);

  v_tex = a_pos;
}
