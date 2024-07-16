precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix; combined matrix for both viewMatrix and ModelMatrix

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main(){
    
    //break down into each multiple components of theh gl_Position gives us better control over each component
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 20.0) * 0.1;
    modelPosition.z += aRandom * 0.01;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
