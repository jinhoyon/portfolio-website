import * as THREE from "three";
import { chladni, chladniGradient } from "./math";

export interface ChladniOptions {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  particleCount: number;
  reducedMotion: boolean;
}

const VERTEX_SHADER = /* glsl */ `
  attribute float aBrightness;
  uniform float pixelRatio;
  varying float vBrightness;

  void main() {
    vBrightness = aBrightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (1.1 + vBrightness * 1.6) * pixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  varying float vBrightness;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * (0.18 + vBrightness * 0.6);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Self-contained WebGL sand simulation. Owns its Three.js scene and the
 * particle physics loop; the React layer only sets target harmonics — no
 * other React or DOM-event concerns live in here besides resize handling.
 */
export class ChladniSimulation {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera;
  private points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;

  private readonly count: number;
  // Physics happens in one continuous plate space. Rather than stretch a
  // square [-1,1] domain to fit a wide hero (which warps the nodal curves)
  // or tile several separate squares (visible seams between cells), the
  // domain itself extends proportionally to the aspect ratio — sin(nπx)
  // is periodic, so a wider domain just continues the same wave, giving
  // one seamless pattern that naturally fills the full rectangle.
  private local: Float32Array;
  private velocities: Float32Array;
  private brightness: Float32Array;
  private renderPositions: Float32Array;

  private scale = 1;
  private halfExtentX = 1;
  private halfExtentY = 1;

  // Harmonic state: current values ease slowly toward targets, so the sand
  // visibly flows from one nodal pattern into the next rather than
  // snapping — the equation is continuous in n/m, so fractional values
  // in between are themselves valid, gradually-morphing plate shapes.
  private n = 3;
  private m = 4;
  private targetN = 3;
  private targetM = 4;

  // Drive amplitude: a resting base plus a slow, gentle breathing so the
  // plate never looks perfectly static.
  private readonly baseAmplitude = 0.55;
  private time = 0;

  private width = 1;
  private height = 1;

  private reducedMotion: boolean;
  private disposed = false;
  private frameHandle = 0;
  private lastTime = 0;
  private readonly frameInterval = 1000 / 60;

  private readonly grad: [number, number] = [0, 0];

  constructor(opts: ChladniOptions) {
    this.count = opts.particleCount;
    this.reducedMotion = opts.reducedMotion;

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x0d0f12, 1);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 1;

    // Establish the real domain extents before seeding, so particles
    // start spread across the whole plate rather than a default square.
    this.computeExtents(opts.container.clientWidth, opts.container.clientHeight);

    this.local = new Float32Array(this.count * 2);
    this.velocities = new Float32Array(this.count * 2);
    this.brightness = new Float32Array(this.count);
    this.renderPositions = new Float32Array(this.count * 3);
    this.seedParticles();

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.renderPositions, 3)
    );
    this.geometry.setAttribute(
      "aBrightness",
      new THREE.BufferAttribute(this.brightness, 1)
    );

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0xe2e8f0) },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    this.resize(opts.container.clientWidth, opts.container.clientHeight);
    this.frameHandle = requestAnimationFrame(this.tick);
  }

  private seedParticles() {
    for (let i = 0; i < this.count; i++) {
      this.local[i * 2] = (Math.random() * 2 - 1) * this.halfExtentX;
      this.local[i * 2 + 1] = (Math.random() * 2 - 1) * this.halfExtentY;
      this.velocities[i * 2] = 0;
      this.velocities[i * 2 + 1] = 0;
    }
  }

  private computeExtents(width: number, height: number) {
    this.width = Math.max(width, 1);
    this.height = Math.max(height, 1);
    const minDim = Math.min(this.width, this.height);
    this.scale = (minDim / 2) * 0.94;
    this.halfExtentX = this.width / minDim;
    this.halfExtentY = this.height / minDim;
  }

  resize(width: number, height: number) {
    this.computeExtents(width, height);

    const dpr = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height, false);
    (this.material.uniforms.pixelRatio.value as number) = dpr;

    this.camera.left = -this.width / 2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = -this.height / 2;
    this.camera.updateProjectionMatrix();

    // Keep any existing particles inside the (possibly changed) domain.
    for (let i = 0; i < this.count; i++) {
      const li = i * 2;
      this.local[li] = clamp(this.local[li], -this.halfExtentX, this.halfExtentX);
      this.local[li + 1] = clamp(
        this.local[li + 1],
        -this.halfExtentY,
        this.halfExtentY
      );
    }
  }

  /** Set the plate's next target harmonic numbers (1-7); the current
   *  values glide toward them over several seconds. */
  setTargetHarmonics(n: number, m: number) {
    this.targetN = clamp(n, 1, 7);
    this.targetM = clamp(m, 1, 7);
  }

  setReducedMotion(value: boolean) {
    this.reducedMotion = value;
  }

  private tick = (now: number) => {
    if (this.disposed) return;
    this.frameHandle = requestAnimationFrame(this.tick);

    const elapsed = now - this.lastTime;
    if (elapsed < this.frameInterval) return;
    this.lastTime = now - (elapsed % this.frameInterval);

    const dt = Math.min(elapsed / 1000, 1 / 30);
    this.step(dt);

    this.renderer.render(this.scene, this.camera);
  };

  private step(dt: number) {
    this.time += dt;

    // Slow exponential glide toward the target harmonics — reaches ~95%
    // of the way there in about 7s (2.5s in reduced-motion), giving the
    // sand time to visibly flow between shapes instead of snapping.
    const rate = this.reducedMotion ? 1.2 : 0.42;
    this.n += (this.targetN - this.n) * Math.min(rate * dt, 1);
    this.m += (this.targetM - this.m) * Math.min(rate * dt, 1);

    // Gentle continuous breathing so the plate never looks frozen.
    const breathing = 1 + 0.08 * Math.sin(this.time * 0.15);
    const amplitude = this.baseAmplitude * breathing;

    const drive = 2.4 * dt;
    const damping = Math.pow(0.86, dt * 60);
    const jitter = this.reducedMotion ? 0 : 0.0018;

    const local = this.local;
    const vel = this.velocities;
    const bright = this.brightness;
    const render = this.renderPositions;
    const scale = this.scale;
    const halfExtentX = this.halfExtentX;
    const halfExtentY = this.halfExtentY;

    for (let i = 0; i < this.count; i++) {
      const li = i * 2;
      const ri = i * 3;
      const x = local[li];
      const y = local[li + 1];

      const z = chladni(x, y, amplitude, amplitude * 0.85, this.n, this.m);
      chladniGradient(x, y, amplitude, amplitude * 0.85, this.n, this.m, this.grad);

      // Gradient descent on z^2 pushes particles toward nodal lines (z≈0)
      // and away from high-vibration antinodes.
      vel[li] = vel[li] * damping - this.grad[0] * z * drive;
      vel[li + 1] = vel[li + 1] * damping - this.grad[1] * z * drive;

      if (jitter > 0) {
        vel[li] += (Math.random() - 0.5) * jitter * (0.2 + Math.abs(z));
        vel[li + 1] += (Math.random() - 0.5) * jitter * (0.2 + Math.abs(z));
      }

      let nx = x + vel[li];
      let ny = y + vel[li + 1];

      if (nx > halfExtentX || nx < -halfExtentX) {
        vel[li] *= -0.4;
        nx = clamp(nx, -halfExtentX, halfExtentX);
      }
      if (ny > halfExtentY || ny < -halfExtentY) {
        vel[li + 1] *= -0.4;
        ny = clamp(ny, -halfExtentY, halfExtentY);
      }

      local[li] = nx;
      local[li + 1] = ny;

      render[ri] = nx * scale;
      render[ri + 1] = ny * scale;
      render[ri + 2] = 0;

      // Settled (low |z|, low velocity) grains render brighter/larger,
      // like real sand piling along the nodal lines.
      const speed = Math.abs(vel[li]) + Math.abs(vel[li + 1]);
      const settled = 1 - Math.min(Math.abs(z) * 1.4 + speed * 40, 1);
      bright[i] += (settled - bright[i]) * Math.min(6 * dt, 1);
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aBrightness.needsUpdate = true;
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frameHandle);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
