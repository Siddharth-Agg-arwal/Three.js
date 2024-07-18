uniform float uBigWavesElevation;
uniform vec2 uBigWavesFreq;
uniform float uTime;
uniform float uWavesSpeed;
varying float vElevation;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.x * uBigWavesFreq.x + uTime * uWavesSpeed) * 
                        sin(modelPosition.z * uBigWavesFreq.y + uTime * uWavesSpeed) * 
                        uBigWavesElevation;
    
    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vElevation = elevation;
}