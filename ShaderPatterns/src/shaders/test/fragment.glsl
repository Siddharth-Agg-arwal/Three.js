varying vec2 vUv;

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
    // pattern 1
    // float strength = vUv.x;
    
    // pattern 2
    // float strength = vUv.y;

    // pattern 3
    // float strength = 1.0 - vUv.y;

    // pattern 4
    // float strength = vUv.y * 10.0;

    // pattern 5
    // float strength = mod(vUv.y * 10.0, 1.0);

    //pattern 6
    // float strength = mod(vUv.y * 10.0, 1.0);

    // if(strength < 0.5){
    //     strength = 0.0;
    // }
    // else{
    //     strength = 1.0;
    // }

    // or use
    // strength = step(0.5, strength); step function to get same result as pattern 6

    // pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

        // pattern 8
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // // pattern 9
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // // pattern 10
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.y * 10.0, 1.0));


    // // pattern 11
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // // pattern 11
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // // strength += barY;
    // float strength = barX + barY;

    // // pattern 12
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // // strength += barY;
    // float strength = barX + barY;

    // pattern 13
    // float strength = abs(vUv.x- 0.5);
 
    // // pattern 14
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // // pattern 15
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // // pattern 16
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strengthY = mod(vUv.y * 10.0, 10.0);
    // float strength = strengthX + strengthY;

    // // pattern 17
    // float strength1 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength2= step(0.20, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = strength1 * strength2;

    // pattern 17
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // // pattern 18
    // float strength1 = floor(vUv.x * 10.0) / 10.0;
    // float strength2 = floor(vUv.y * 10.0) / 10.0;
    // float strength = strength1 * strength2;

    // // pattern 19
    // float strength1 = floor(vUv.x * 10.0) / 10.0;
    // float strength2 = floor(vUv.y * 10.0) / 10.0;
    // float strength = strength1 * strength2;

    // pattern 19
    // float strength = random(vUv);

    // //pattern 20
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0) / 10.0
    // );
    
    // float strength = random(gridUv);


    // //pattern 21
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor((vUv.y + vUv.x * 0.2) * 10.0) / 10.0 
    // );
    
    // float strength = random(gridUv);

    // //pattern 22
    // float strength = length(vUv);

    // //pattern 23
    // // float strength = length(vUv - 0.5);
    // float strength = distance(vUv, vec2(0.5));

    // //pattern 23
    // // float strength = length(vUv - 0.5);
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // //pattern 24
    // // float strength = length(vUv - 0.5);
    float strength = 0.04 / distance(vUv, vec2(0.5));


    gl_FragColor  = vec4(strength, strength, strength, 1.0);
}