precision mediump float;
// varying float vRandom;

//to fetch color 
uniform vec3 uColor;

//to fetch texture
uniform sampler2D uTexture;

varying float vElevation;

//uv coordinates from vertex shader
varying vec2 vUv;

void main(){
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.6;
    // gl_FragColor = vec4(uColor, 1.0);
    gl_FragColor = textureColor;
}