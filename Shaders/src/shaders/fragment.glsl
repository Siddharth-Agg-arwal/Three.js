precision mediump float;
// varying float vRandom;

uniform vec3 uColor;

void main(){
    gl_FragColor = vec4(uColor, 1.0);
}