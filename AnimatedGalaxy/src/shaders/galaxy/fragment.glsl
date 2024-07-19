uniform vec3 insideColor;
uniform vec3 outsideColor;

void main(){
    vec3 colorStrength = mix(insideColor, outsideColor, 0.2);
    gl_FragColor = vec4(colorStrength, 1.0);
}