uniform float uTime;

uniform float uSize;
attribute float aScale;


varying vec3 vColor;

//can refer to book of shaders for extra information and help


// Position
void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //holy fuck makes a cool ass portal
    //spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    // modelPosition.x = cos(angle);
    // modelPosition.z = sin(angle); //badass portal with just cos and sin

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale;

    //for size attenuation : formula in shaders chunk in shaders node modules
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = color;
}

// Size
