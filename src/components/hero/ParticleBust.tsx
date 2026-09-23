"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Point cloud sampled from a 3D model of the portrait: int16-normalized
// [x, y, z, nx, ny, nz, tone, gown] per point, generated offline from the GLB mesh.
// `tone` is the photo's brightness projected onto the front of the bust;
// `gown` marks the cap and gown (navy in the photo), which render blue.
const BUST_URL = "/models/bust-points.bin";

const INK = new THREE.Color("#27272a");
const GOWN_BLUE = new THREE.Color("#1d4ed8");
const INTRO_SECONDS = 2.4;
const FOV = 32;
const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
// Bust is 2 units tall and ~1.7 wide after normalization.
const BUST_HEIGHT_SHARE = 0.5;
const BUST_MAX_WIDTH_SHARE = 0.78;
const NARROW_ASPECT = 0.9;

// Icons are placed by `anchor`: fractions of the visible half-width/half-height
// (so they spread to the edges on any screen), plus depth. On narrow screens
// they use `narrow` instead, or are hidden when it is null.
type IconShape = {
  draw: (ctx: CanvasRenderingContext2D) => void;
  anchor: [number, number, number];
  narrow: [number, number] | null;
  scale: number;
  // A single colour, or gradient stops running diagonally bottom-left to top-right.
  color: string | string[];
};

// Lucide icon geometry (ISC license), drawn on a 24x24 grid and sampled into points.
const path = (ctx: CanvasRenderingContext2D, d: string) => ctx.stroke(new Path2D(d));
const ICONS: IconShape[] = [
  {
    // atom (React)
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(12, 12, 1, 0, Math.PI * 2);
      ctx.stroke();
      path(ctx, "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z");
      path(ctx, "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z");
    },
    anchor: [0.6, 0.58, -0.3],
    narrow: [0.62, 0.8],
    scale: 0.42,
    color: "#149eca",
  },
  {
    // sparkles (AI)
    draw: (ctx) => {
      path(ctx, "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z");
      path(ctx, "M20 3v4");
      path(ctx, "M22 5h-4");
      path(ctx, "M4 17v2");
      path(ctx, "M5 18H3");
    },
    anchor: [-0.55, 0.55, -0.35],
    narrow: [-0.62, 0.8],
    scale: 0.4,
    // Gemini-style blue → purple → rose
    color: ["#4285f4", "#9b72cb", "#d96570"],
  },
  {
    // code
    draw: (ctx) => {
      path(ctx, "m18 16 4-4-4-4");
      path(ctx, "m6 8-4 4 4 4");
      path(ctx, "m14.5 4-5 16");
    },
    anchor: [-0.8, 0.02, 0],
    narrow: [-0.7, 0.3],
    scale: 0.36,
    color: "#ea580c",
  },
  {
    // database
    draw: (ctx) => {
      ctx.beginPath();
      ctx.ellipse(12, 5, 9, 3, 0, 0, Math.PI * 2);
      ctx.stroke();
      path(ctx, "M3 5V19A9 3 0 0 0 21 19V5");
      path(ctx, "M3 12A9 3 0 0 0 21 12");
    },
    anchor: [0.8, 0.08, 0],
    narrow: [0.7, 0.3],
    scale: 0.34,
    color: "#2563eb",
  },
  {
    // smartphone (Android)
    draw: (ctx) => {
      ctx.beginPath();
      ctx.roundRect(5, 2, 14, 20, 2);
      ctx.stroke();
      path(ctx, "M12 18h.01");
    },
    anchor: [-0.4, -0.28, -0.45],
    narrow: null,
    scale: 0.3,
    color: "#16a34a",
  },
  {
    // cat
    draw: (ctx) => {
      path(ctx, "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z");
      path(ctx, "M8 14v.5");
      path(ctx, "M16 14v.5");
      path(ctx, "M11.25 16.25h1.5L12 17l-.75-.75Z");
    },
    anchor: [0.62, -0.38, -0.4],
    narrow: null,
    scale: 0.32,
    color: "#db2777",
  },
];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aScatter;
  attribute float aSeed;
  attribute float aTone;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    float t = clamp(uIntro * 1.35 - aSeed * 0.35, 0.0, 1.0);
    float ease = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = mix(aScatter, position, ease);
    p += 0.006 * vec3(
      sin(uTime * 1.3 + aSeed * 40.0),
      cos(uTime * 1.1 + aSeed * 57.0),
      sin(uTime * 0.9 + aSeed * 23.0)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.7 + 0.6 * fract(aSeed * 7.13)) / -mv.z;

    // Shade like a lit surface: silhouette edges and light-facing areas read darker.
    vec3 n = normalize(normalMatrix * normal);
    float rim = 1.0 - abs(n.z);
    float lambert = abs(dot(n, normalize(vec3(-0.35, 0.55, 0.75))));
    float ink = pow(1.0 - aTone, 1.3);
    vAlpha = clamp(0.1 + 0.35 * rim * rim + 0.08 * lambert + 0.85 * ink, 0.0, 1.0) * mix(0.15, 1.0, ease);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.15, d));
  }
`;

function scatterAttribute(count: number, radius: number) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const r = radius * Math.cbrt(Math.random());
    const s = Math.sqrt(1 - u * u);
    out[i * 3] = r * s * Math.cos(theta);
    out[i * 3 + 1] = r * s * Math.sin(theta);
    out[i * 3 + 2] = r * u;
  }
  return out;
}

function seedAttribute(count: number) {
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = Math.random();
  return out;
}

function buildGeometry(
  positions: Float32Array,
  normals: Float32Array,
  tones: Float32Array,
  colors: Float32Array,
  scatterRadius: number
) {
  const count = positions.length / 3;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatterAttribute(count, scatterRadius), 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seedAttribute(count), 1));
  geometry.setAttribute("aTone", new THREE.BufferAttribute(tones, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

// Rasterize a stroked icon and keep a random subset of its inked pixels as points.
function sampleIcon(icon: IconShape, maxPoints: number) {
  const size = 224;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(size / 24, size / 24);
  ctx.lineWidth = 1.6;
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.strokeStyle = "#000";
  icon.draw(ctx);

  const { data } = ctx.getImageData(0, 0, size, size);
  const inked: number[] = [];
  for (let i = 0; i < size * size; i++) if (data[i * 4 + 3] > 110) inked.push(i);
  const count = Math.min(maxPoints, inked.length);
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const px = inked[Math.floor(Math.random() * inked.length)];
    positions[i * 3] = ((px % size) / size - 0.5) * 2 + (Math.random() - 0.5) * 0.02;
    positions[i * 3 + 1] = -(Math.floor(px / size) / size - 0.5) * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    // Mostly-facing normals with a little variation so icons shimmer as they turn.
    normals[i * 3] = (Math.random() - 0.5) * 0.6;
    normals[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
    normals[i * 3 + 2] = 1;
  }
  // Icons have no photo tone; full ink so their colours read at full strength.
  const colors = new Float32Array(count * 3);
  const stops = (Array.isArray(icon.color) ? icon.color : [icon.color]).map((c) => new THREE.Color(c));
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    // Position along the bottom-left → top-right diagonal, 0..1.
    const t = THREE.MathUtils.clamp((positions[i * 3] + positions[i * 3 + 1] + 2) / 4, 0, 1);
    const scaled = t * (stops.length - 1);
    const k = Math.min(Math.floor(scaled), stops.length - 2);
    if (stops.length === 1) color.copy(stops[0]);
    else color.copy(stops[k]).lerp(stops[k + 1], scaled - k);
    color.toArray(colors, i * 3);
  }
  return buildGeometry(positions, normals, new Float32Array(count).fill(0), colors, 1.2);
}

export default function ParticleBust({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the hero simply shows without the illustration.
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.set(0, 0, 6);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: reduceMotion ? 1 : 0 },
        uSize: { value: 9 },
        uPixelRatio: { value: pixelRatio },
      },
    });

    const bust = new THREE.Group();
    scene.add(bust);
    let bustBaseY = 0;

    const icons: { object: THREE.Points; shape: IconShape; base: THREE.Vector3; phase: number }[] = [];
    ICONS.forEach((shape, i) => {
      const geometry = sampleIcon(shape, 2200);
      if (!geometry) return;
      const object = new THREE.Points(geometry, material);
      object.scale.setScalar(shape.scale);
      scene.add(object);
      icons.push({ object, shape, base: new THREE.Vector3(), phase: i * 1.7 });
    });

    let disposed = false;
    fetch(BUST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`bust points: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        if (disposed) return;
        const raw = new Int16Array(buffer);
        const stride = 8;
        const count = raw.length / stride;
        const positions = new Float32Array(count * 3);
        const normals = new Float32Array(count * 3);
        const tones = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        const mixed = new THREE.Color();
        for (let i = 0; i < count; i++) {
          for (let k = 0; k < 3; k++) {
            positions[i * 3 + k] = raw[i * stride + k] / 32767;
            normals[i * 3 + k] = raw[i * stride + 3 + k] / 32767;
          }
          tones[i] = raw[i * stride + 6] / 32767;
          mixed.copy(INK).lerp(GOWN_BLUE, raw[i * stride + 7] / 32767).toArray(colors, i * 3);
        }
        bust.add(new THREE.Points(buildGeometry(positions, normals, tones, colors, 2.6), material));
        startTime = performance.now();
        if (reduceMotion) renderFrame(startTime);
      })
      .catch(() => {
        /* Illustration is decorative; leave the icons if the bust fails to load. */
      });

    // Pointer: turn toward the cursor anywhere on the page.
    const target = { x: 0, y: 0 };
    let pointerActive = false;
    const onPointerMove = (e: PointerEvent) => {
      pointerActive = true;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      const aspect = w / h;
      camera.aspect = aspect;
      // Fit the bust to a share of the height, but pull back on narrow screens
      // so its shoulders stay inside the frame.
      const halfH = Math.max(1 / BUST_HEIGHT_SHARE, 0.85 / BUST_MAX_WIDTH_SHARE / aspect);
      camera.position.z = halfH / TAN_HALF_FOV;
      camera.updateProjectionMatrix();
      // Sit the bust a little above centre, clear of the title at the bottom.
      bustBaseY = halfH * 0.24;

      const narrow = aspect < NARROW_ASPECT;
      for (const icon of icons) {
        const [fx, fy, z] = icon.shape.anchor;
        const place = narrow ? icon.shape.narrow : [fx, fy];
        icon.object.visible = place !== null;
        if (!place) continue;
        const halfAtDepth = (camera.position.z - z) * TAN_HALF_FOV;
        icon.base.set(place[0] * halfAtDepth * aspect, place[1] * halfAtDepth, z);
        icon.object.scale.setScalar(icon.shape.scale * (narrow ? 0.75 : 1));
      }
      if (reduceMotion) renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) loop();
    });
    visibility.observe(container);

    let startTime = performance.now();
    let frame = 0;
    const rot = { x: 0, y: 0 };

    const renderFrame = (now: number) => {
      const t = now / 1000;
      material.uniforms.uTime.value = t;
      material.uniforms.uIntro.value = reduceMotion
        ? 1
        : Math.min((now - startTime) / 1000 / INTRO_SECONDS, 1);

      const idle = pointerActive ? 0 : Math.sin(t * 0.35) * 0.35;
      rot.y += (target.x * 0.7 + idle - rot.y) * 0.05;
      rot.x += (target.y * 0.22 - rot.x) * 0.05;
      // Lift the chin slightly: the source photo looks down at the phone.
      bust.rotation.set(-0.12 + rot.x, rot.y, 0);
      bust.position.y = bustBaseY + Math.sin(t * 0.8) * 0.03;

      for (const icon of icons) {
        icon.object.position.set(
          icon.base.x - rot.y * 0.12,
          icon.base.y + Math.sin(t * 0.7 + icon.phase) * 0.06 + rot.x * 0.08,
          icon.base.z
        );
        icon.object.rotation.set(0, -rot.y * 0.6 + Math.sin(t * 0.4 + icon.phase) * 0.3, 0);
      }
      renderer.render(scene, camera);
    };

    const loop = () => {
      cancelAnimationFrame(frame);
      const tick = (now: number) => {
        if (disposed || !visible || document.hidden) return;
        renderFrame(now);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const onVisibilityChange = () => {
      if (!document.hidden && !reduceMotion) loop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (reduceMotion) renderFrame(performance.now());
    else loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) obj.geometry.dispose();
      });
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
