import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uGravity;
  uniform float uFold;
  uniform float uTension;
  uniform float uMovement;
  uniform float uIntro;
  uniform float uOpen;
  uniform float uShell;
  uniform vec2 uSize;
  uniform vec2 uPointer;
  uniform float uPointerStrength;

  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  varying vec3 vTangentW;
  varying vec2 vUv;
  varying float vHem;
  varying float vCrease;

  vec3 drape(vec2 uv) {
    vec3 pos = vec3((uv.x - 0.5) * uSize.x, (uv.y - 0.5) * uSize.y, 0.0);
    float hem = 1.0 - uv.y;
    float top = uv.y;
    float intro = smoothstep(0.04, 0.82, uIntro);
    float slack = 1.0 - uTension * 0.72;
    float depth = uFold * mix(0.22, 1.0, intro);

    float pinA = exp(-pow((uv.x - 0.31) * 9.0, 2.0));
    float pinB = exp(-pow((uv.x - 0.69) * 9.0, 2.0));
    float pins = clamp(pinA + pinB, 0.0, 1.0);
    float topNarrow = mix(1.0, 0.26 + pins * 0.24, pow(top, 1.45));
    float torso = 0.86 + 0.05 * sin((uv.x - 0.16) * 2.7);
    float waist = mix(torso, 0.67, uTension * smoothstep(0.18, 0.55, hem) * (1.0 - smoothstep(0.68, 0.96, hem)));
    float flare = 1.0 + pow(hem, 1.18) * (0.4 + uOpen * 0.36) * slack;
    float width = topNarrow * mix(waist, flare, smoothstep(0.14, 0.88, hem));
    float side = min(uv.x, 1.0 - uv.x);
    float scye = (1.0 - smoothstep(0.0, 0.17, side)) * smoothstep(0.5, 0.9, top);
    width *= mix(1.0, 0.76, scye);
    pos.x *= width;

    pos.x += (0.18 + uOpen * 0.1) * pow(hem, 1.26) * slack;
    pos.x -= (uv.x - 0.36) * pow(top, 2.3) * 0.15;
    pos.x += (0.5 - uv.x) * uTension * 0.1 * smoothstep(0.26, 0.66, hem);
    pos.x += (1.0 - uv.x) * scye * 0.07;

    pos.y += (1.0 - intro) * hem * 0.7;
    pos.z += (1.0 - intro) * (0.42 + hem * 0.22);
    pos.y -= pow(top, 5.2) * (0.36 - pins * 0.32);
    pos.y += pins * pow(top, 3.0) * 0.13;

    float hang = hem * hem;
    pos.y -= uGravity * hang * (0.36 + hem * 0.3) * slack;
    pos.y -= hem * 0.026 * (1.0 + 0.35 * sin(uv.x * 8.2));

    float volume = sin(3.14159 * clamp(hem * 1.05, 0.0, 1.0)) * (0.2 + uTension * 0.16);
    float across = 1.0 - clamp(abs(uv.x - 0.45) * 1.55, 0.0, 1.0);
    pos.z += volume * (0.5 + 0.5 * across);
    pos.z += hang * 0.15 * slack;

    float diag = uv.x - (0.29 + hem * 0.17);
    float p1 = exp(-pow(diag * 5.1, 2.0));
    float p2 = exp(-pow((uv.x - 0.47) * 3.05, 2.0));
    float p3 = exp(-pow((uv.x - 0.7 - hem * 0.05) * 4.3, 2.0));
    float travel = 0.9 + 0.1 * sin(uv.y * 1.15 + uv.x * 0.45 + uTime * 0.07 * uMovement);
    float fall = mix(0.16, 1.0, pow(hem, 0.36));
    float primary = (p1 * 0.92 + p2 * 0.68 + p3 * 0.58) * travel * depth * fall;
    pos.z -= primary * (0.56 + uTension * 0.16) * slack;
    pos.x += (p1 * 0.09 - p3 * 0.07 + p2 * 0.03) * slack * mix(0.32, 1.0, hem);

    float s1 = exp(-pow((uv.x - (0.31 + hem * 0.05)) * 8.0, 2.0));
    float s2 = exp(-pow((uv.x - 0.5) * 7.2, 2.0));
    float s3 = exp(-pow((uv.x - (0.69 - hem * 0.04)) * 8.2, 2.0));
    float s4 = exp(-pow((uv.x - 0.22) * 11.0, 2.0));
    float s5 = exp(-pow((uv.x - 0.8) * 11.2, 2.0));
    float secondary = (s1 * 0.58 + s2 * 0.4 + s3 * 0.52 + s4 * 0.26 + s5 * 0.22) * depth * slack * mix(0.12, 0.72, hem);
    secondary *= 0.94 + 0.06 * sin(uv.y * 2.4 + uTime * 0.03 * uMovement);
    pos.z -= secondary * 0.27;
    pos.x += (s3 - s1) * 0.03 * hem;

    float micro = sin(uv.x * 15.5 + uv.y * 1.5) * 0.14 + sin(uv.x * 8.6 - uv.y * 3.8) * 0.07;
    pos.z += micro * 0.012 * depth * slack * pow(hem, 1.45);

    float twist = (0.035 + hem * 0.13) * slack - uTension * 0.065 + uOpen * 0.035;
    float ca = cos(twist);
    float sa = sin(twist);
    float rx = pos.x;
    float rz = pos.z;
    pos.x = rx * ca - rz * sa;
    pos.z = rx * sa + rz * ca;

    float d = distance(uv, uPointer);
    float attract = exp(-d * d * 10.0) * uPointerStrength * mix(0.12, 0.8, hem);
    vec2 dir = normalize(uPointer - uv + 0.0001);
    pos.x += dir.x * attract * 0.05;
    pos.z += attract * 0.04;
    pos.y += attract * 0.008;

    pos.x += (uv.x - 0.5) * uOpen * hem * 0.2;
    pos.z -= uOpen * hem * 0.07;

    return pos;
  }

  void main() {
    vUv = uv;
    vHem = 1.0 - uv.y;

    vec3 pos = drape(uv);
    vec3 px = drape(uv + vec2(0.004, 0.0));
    vec3 py = drape(uv + vec2(0.0, 0.0035));
    vec3 n = normalize(cross(px - pos, py - pos));
    vec3 t = normalize(px - pos);
    pos -= n * (0.01 * uShell);

    float diag = uv.x - (0.29 + vHem * 0.17);
    float p1 = exp(-pow(diag * 5.1, 2.0));
    float p2 = exp(-pow((uv.x - 0.47) * 3.05, 2.0));
    float sPin = exp(-pow((uv.x - (0.31 + vHem * 0.05)) * 8.0, 2.0));
    float sPinB = exp(-pow((uv.x - (0.69 - vHem * 0.04)) * 8.2, 2.0));
    vCrease = clamp(p1 * 0.62 + p2 * 0.38 + sPin * 0.4 + sPinB * 0.34, 0.0, 1.0);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vWorldPos = world.xyz;
    mat3 nmat = mat3(modelMatrix);
    vNormalW = normalize(nmat * n);
    vTangentW = normalize(nmat * t);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragment = /* glsl */ `
  uniform float uSheen;
  uniform float uLightResponse;
  uniform float uShell;
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform vec3 uWarm;
  uniform vec3 uShadow;

  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  varying vec3 vTangentW;
  varying vec2 vUv;
  varying float vHem;
  varying float vCrease;

  void main() {
    vec3 n = normalize(vNormalW);
    if (!gl_FrontFacing) n = -n;

    vec3 light = normalize(uLightDir);
    vec3 view = normalize(cameraPosition - vWorldPos);
    vec3 halfV = normalize(light + view);
    vec3 warp = normalize(vTangentW);

    float ndl = clamp(dot(n, light), 0.0, 1.0);
    float ndv = clamp(dot(n, view), 0.0, 1.0);
    float ridge = pow(ndl, 1.35);
    float valley = pow(1.0 - ndl, 1.15);

    vec3 base = mix(uShadow, uColor, 0.28 + ridge * 0.72);
    base = mix(base, uShadow * 0.78, vCrease * valley * 0.72);
    base = mix(base, uColor * 1.06, ridge * (1.0 - vCrease) * 0.28);

    float tdh = dot(warp, halfV);
    float aniso = pow(sqrt(max(0.0, 1.0 - tdh * tdh)), 10.0);
    float peak = pow(clamp(dot(n, halfV), 0.0, 1.0), 18.0);
    float spec = (aniso * 0.18 + peak * 0.22) * uSheen * mix(0.28, 0.9, ridge);
    float fresnel = pow(1.0 - ndv, 2.8) * uSheen * 0.22;

    vec3 lit = mix(base, uWarm, spec * 0.42 * uLightResponse);
    lit += fresnel * mix(uColor, uWarm, 0.25) * 0.14;

    float selvedge = smoothstep(0.0, 0.012, vUv.x) * smoothstep(1.0, 0.988, vUv.x);
    lit *= mix(0.62, 1.0, selvedge);
    lit *= mix(0.9, 1.0, smoothstep(0.0, 0.07, vHem));
    lit = mix(uShadow * 0.86, lit, 1.0 - uShell * 0.55);

    gl_FragColor = vec4(lit, 1.0);
  }
`;

export class SilkMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uGravity: { value: 0.48 },
        uFold: { value: 1 },
        uTension: { value: 0.06 },
        uMovement: { value: 0.42 },
        uIntro: { value: 0 },
        uOpen: { value: 0 },
        uShell: { value: 0 },
        uSize: { value: new THREE.Vector2(2.08, 2.92) },
        uPointer: { value: new THREE.Vector2(0.5, 0.42) },
        uPointerStrength: { value: 0 },
        uSheen: { value: 0.4 },
        uLightResponse: { value: 1 },
        uColor: { value: new THREE.Color("#f3eadc") },
        uLightDir: { value: new THREE.Vector3(0.42, 0.72, 0.55).normalize() },
        uWarm: { value: new THREE.Color("#fff1dc") },
        uShadow: { value: new THREE.Color("#8a7764") },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.toneMapped = true;
    this.dithering = true;
  }

  get uTime() {
    return this.uniforms.uTime.value as number;
  }
  set uTime(v: number) {
    this.uniforms.uTime.value = v;
  }
  get uGravity() {
    return this.uniforms.uGravity.value as number;
  }
  set uGravity(v: number) {
    this.uniforms.uGravity.value = v;
  }
  get uFold() {
    return this.uniforms.uFold.value as number;
  }
  set uFold(v: number) {
    this.uniforms.uFold.value = v;
  }
  get uTension() {
    return this.uniforms.uTension.value as number;
  }
  set uTension(v: number) {
    this.uniforms.uTension.value = v;
  }
  get uMovement() {
    return this.uniforms.uMovement.value as number;
  }
  set uMovement(v: number) {
    this.uniforms.uMovement.value = v;
  }
  get uIntro() {
    return this.uniforms.uIntro.value as number;
  }
  set uIntro(v: number) {
    this.uniforms.uIntro.value = v;
  }
  get uOpen() {
    return this.uniforms.uOpen.value as number;
  }
  set uOpen(v: number) {
    this.uniforms.uOpen.value = v;
  }
  get uShell() {
    return this.uniforms.uShell.value as number;
  }
  set uShell(v: number) {
    this.uniforms.uShell.value = v;
  }
  get uSize() {
    return this.uniforms.uSize.value as THREE.Vector2;
  }
  get uPointer() {
    return this.uniforms.uPointer.value as THREE.Vector2;
  }
  get uPointerStrength() {
    return this.uniforms.uPointerStrength.value as number;
  }
  set uPointerStrength(v: number) {
    this.uniforms.uPointerStrength.value = v;
  }
  get uSheen() {
    return this.uniforms.uSheen.value as number;
  }
  set uSheen(v: number) {
    this.uniforms.uSheen.value = v;
  }
  get uLightResponse() {
    return this.uniforms.uLightResponse.value as number;
  }
  set uLightResponse(v: number) {
    this.uniforms.uLightResponse.value = v;
  }
  get uLightDir() {
    return this.uniforms.uLightDir.value as THREE.Vector3;
  }
  get uColor() {
    return this.uniforms.uColor.value as THREE.Color;
  }
  get uWarm() {
    return this.uniforms.uWarm.value as THREE.Color;
  }
  get uShadow() {
    return this.uniforms.uShadow.value as THREE.Color;
  }
}

export type SilkMaterialImpl = SilkMaterial;
