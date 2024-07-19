// uniform vec3 insideColor;
// uniform vec3 outsideColor;

//we used vertexColor = true for shader material so no need to define color attribute
varying vec3 vColor;

void main(){
    // vec3 colorStrength = mix(insideColor, outsideColor, 0.2);

    //circular stars
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - step(0.5, strength);
    
    // // diffuse point linear
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.0;
    // strength = 1.0 - strength;
    
    // diffuse point exponential
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    //final color
    vec3 color2 = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(color2, 1.0);
}