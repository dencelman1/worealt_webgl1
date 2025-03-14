attribute vec3 position;
uniform mat4 u_mvp;

void main() {
    gl_Position = u_mvp * vec4(position, 1.0);
}