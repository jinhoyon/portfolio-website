"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// A cut-away living room on a layered floor slab, seen from above at an angle:
// a Togo-style sofa with code-icon pillows, plants, a lamp, a coffee table with
// a laptop, and a print on the wall. Built from rounded primitives, no models.

const ROOM = 8; // footprint, units
const WALL_H = 4.6;
const WALL_T = 0.3;

const C = {
  wall: "#f3eee7",
  wood: "#d8b88f",
  screed: "#f1ece4",
  insulation: "#cfc8bd",
  concrete: "#8b7d6b",
  sofa: "#7c97ba",
  rug: "#e4d3bf",
  table: "#c9a274",
  pot: "#f1ede6",
  potWarm: "#d9c7b0",
  leaf: "#4f7d4a",
  leafLight: "#6f9f5e",
  frame: "#b88b5e",
  laptop: "#3f3f46",
  glass: "#bfe0ee",
  lampShade: "#f7f0e4",
  ink: "#27272a",
};

const rounded = (w: number, h: number, d: number, r: number) => new RoundedBoxGeometry(w, h, d, 4, r);

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void, w = size) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Lucide icon paths (ISC), drawn on their 24x24 grid.
const ICON_PATHS: Record<"terminal" | "database" | "braces", string[]> = {
  terminal: ["m4 17 6-6-6-6", "M12 19h8"],
  database: ["M21 5a9 3 0 1 1-18 0 9 3 0 1 1 18 0", "M3 5V19A9 3 0 0 0 21 19V5", "M3 12A9 3 0 0 0 21 12"],
  braces: [
    "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
    "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
  ],
};

function iconTexture(icon: keyof typeof ICON_PATHS, color: string) {
  return canvasTexture(256, (ctx, s) => {
    ctx.clearRect(0, 0, s, s);
    ctx.save();
    ctx.translate(s * 0.14, s * 0.14);
    ctx.scale((s * 0.72) / 24, (s * 0.72) / 24);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const d of ICON_PATHS[icon]) ctx.stroke(new Path2D(d));
    ctx.restore();
  });
}

const plankTexture = () =>
  canvasTexture(512, (ctx, s) => {
    ctx.fillStyle = C.wood;
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = "rgba(120, 82, 45, 0.22)";
    ctx.lineWidth = 2;
    const rows = 10;
    for (let i = 0; i <= rows; i++) {
      const y = (i / rows) * s;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(s, y);
      ctx.stroke();
      // staggered plank ends
      const offset = (i % 2) * 0.5;
      for (const f of [0.25 + offset * 0.5, 0.75 + offset * 0.5]) {
        const x = (f % 1) * s;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + s / rows);
        ctx.stroke();
      }
    }
  });

// The print above the sofa: flat shapes plus a large </>.
const artTexture = () =>
  canvasTexture(
    400,
    (ctx, s) => {
      const w = s * 1.5;
      ctx.fillStyle = "#f8f5ef";
      ctx.fillRect(0, 0, w, s);
      ctx.fillStyle = "#3d6ef5";
      ctx.beginPath();
      ctx.arc(w * 0.3, s * 0.52, s * 0.27, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fcd34d";
      ctx.beginPath();
      ctx.arc(w * 0.62, s * 0.36, s * 0.16, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#f9a8d4";
      ctx.fillRect(w * 0.55, s * 0.58, s * 0.24, s * 0.24);
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = s * 0.035;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(w * 0.74, s * 0.44);
      ctx.lineTo(w * 0.68, s * 0.52);
      ctx.lineTo(w * 0.74, s * 0.6);
      ctx.moveTo(w * 0.86, s * 0.44);
      ctx.lineTo(w * 0.92, s * 0.52);
      ctx.lineTo(w * 0.86, s * 0.6);
      ctx.moveTo(w * 0.82, s * 0.4);
      ctx.lineTo(w * 0.78, s * 0.64);
      ctx.stroke();
    },
    600
  );

// Code on the laptop screen.
const screenTexture = () =>
  canvasTexture(
    200,
    (ctx, s) => {
      const w = s * 1.5;
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, w, s);
      const colors = ["#a78bfa", "#4ade80", "#fcd34d", "#60a5fa", "#e4e4e7"];
      let y = s * 0.14;
      for (let i = 0; i < 8; i++) {
        let x = w * (0.08 + ((i * 7) % 3) * 0.05);
        const parts = 2 + (i % 3);
        for (let p = 0; p < parts; p++) {
          const len = w * (0.08 + ((i + p) % 4) * 0.06);
          ctx.fillStyle = colors[(i + p) % colors.length];
          ctx.fillRect(x, y, len, s * 0.045);
          x += len + w * 0.025;
        }
        y += s * 0.1;
      }
    },
    300
  );

function std(color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0, ...extra });
}

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, pos: [number, number, number], shadow = true) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(...pos);
  m.castShadow = shadow;
  m.receiveShadow = true;
  return m;
}

/** Togo-style sofa: a soft base wrapped in horizontal rolls, back leaning away. Front faces +z. */
function buildSofa() {
  const g = new THREE.Group();
  const fabric = new THREE.MeshPhysicalMaterial({
    color: C.sofa,
    roughness: 0.9,
    sheen: 1,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#dbe6f3"),
  });
  const width = 3.4;
  g.add(mesh(rounded(width, 0.55, 1.55, 0.26), fabric, [0, 0.28, 0.05]));
  // Back slab, leaning away, then the pleats stacked over it.
  const back = mesh(rounded(width, 1.35, 0.55, 0.26), fabric, [0, 0.95, -0.52]);
  back.rotation.x = -0.28;
  g.add(back);
  const roll = (r: number, y: number, z: number) => {
    const m = mesh(new THREE.CapsuleGeometry(r, width - 2 * r, 8, 24), fabric, [0, y, z]);
    m.rotation.z = Math.PI / 2;
    g.add(m);
  };
  roll(0.25, 0.27, 0.78); // front, at the floor
  roll(0.23, 0.55, 0.6); // seat edge
  for (let k = 0; k < 4; k++) roll(0.26 - k * 0.012, 0.72 + k * 0.29, -0.42 - k * 0.1); // back pleats
  return g;
}

function buildPillow(color: string, icon: keyof typeof ICON_PATHS, iconColor: string) {
  const g = new THREE.Group();
  const body = mesh(rounded(0.8, 0.8, 0.26, 0.12), new THREE.MeshPhysicalMaterial({ color, roughness: 0.85, sheen: 0.6 }), [0, 0, 0]);
  g.add(body);
  const decal = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshStandardMaterial({ map: iconTexture(icon, iconColor), transparent: true, roughness: 0.9 })
  );
  decal.position.z = 0.135;
  g.add(decal);
  return g;
}

function buildSnakePlant() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.42, 0.34, 0.75, 32), std(C.pot, { roughness: 0.5 }), [0, 0.375, 0]));
  const leaf = std(C.leaf, { roughness: 0.6 });
  const leafLight = std(C.leafLight, { roughness: 0.6 });
  const n = 9;
  for (let i = 0; i < n; i++) {
    const h = 1.5 + ((i * 37) % 9) / 10;
    const geo = new THREE.ConeGeometry(0.13, h, 4);
    geo.translate(0, h / 2, 0);
    const m = new THREE.Mesh(geo, i % 2 ? leaf : leafLight);
    m.scale.z = 0.35;
    const a = (i / n) * Math.PI * 2;
    m.position.set(Math.cos(a) * 0.16, 0.7, Math.sin(a) * 0.16);
    m.rotation.set(Math.sin(a) * 0.22, a, -Math.cos(a) * 0.22);
    m.castShadow = true;
    g.add(m);
  }
  return g;
}

function buildBushPlant(scale = 1) {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.6, 32), std(C.potWarm, { roughness: 0.6 }), [0, 0.3, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 8), std("#6b5a43"), [0, 0.95, 0]));
  const leaves = [std(C.leaf, { roughness: 0.65 }), std(C.leafLight, { roughness: 0.65 })];
  const blobs: [number, number, number, number][] = [
    [0, 1.55, 0, 0.55],
    [0.38, 1.35, 0.12, 0.42],
    [-0.36, 1.38, 0.1, 0.44],
    [0.1, 1.3, -0.36, 0.4],
    [-0.12, 1.88, -0.1, 0.38],
    [0.22, 1.82, 0.22, 0.34],
  ];
  blobs.forEach(([x, y, z, r], i) => {
    const m = mesh(new THREE.SphereGeometry(r, 24, 16), leaves[i % 2], [x, y, z]);
    m.scale.y = 0.85;
    g.add(m);
  });
  g.scale.setScalar(scale);
  return g;
}

function buildLamp() {
  const g = new THREE.Group();
  const dark = std("#3f3f46", { roughness: 0.4, metalness: 0.3 });
  g.add(mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.05, 32), dark, [0, 0.025, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 12), dark, [0, 1.3, 0]));
  const shade = mesh(
    new THREE.CylinderGeometry(0.32, 0.45, 0.5, 32, 1, true),
    std(C.lampShade, { side: THREE.DoubleSide, emissive: new THREE.Color("#ffe2b0"), emissiveIntensity: 0.35, roughness: 0.9 }),
    [0, 2.75, 0]
  );
  g.add(shade);
  const glow = new THREE.PointLight("#ffd7a0", 6, 5, 2);
  glow.position.set(0, 2.55, 0);
  g.add(glow);
  return g;
}

function buildCoffeeTable() {
  const g = new THREE.Group();
  const wood = std(C.table, { roughness: 0.55 });
  g.add(mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.12, 48), wood, [0, 0.52, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.46, 24), wood, [0, 0.23, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 32), wood, [0, 0.02, 0]));
  // Laptop, open, facing the sofa (-z).
  const laptop = new THREE.Group();
  const shell = std(C.laptop, { roughness: 0.35, metalness: 0.4 });
  laptop.add(mesh(rounded(0.8, 0.04, 0.55, 0.02), shell, [0, 0.02, 0]));
  const lid = new THREE.Group();
  lid.position.set(0, 0.04, -0.27);
  lid.rotation.x = 0.32;
  lid.add(mesh(rounded(0.8, 0.52, 0.03, 0.02), shell, [0, 0.26, 0]));
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.72, 0.44),
    new THREE.MeshBasicMaterial({ map: screenTexture(), toneMapped: false })
  );
  screen.position.set(0, 0.26, 0.017);
  lid.add(screen);
  laptop.add(lid);
  // Turned toward the viewer so the code on screen shows.
  laptop.rotation.y = 1.25;
  laptop.position.set(-0.15, 0.58, 0.05);
  g.add(laptop);
  // Mug
  g.add(mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.2, 24), std("#fafafa", { roughness: 0.4 }), [0.5, 0.68, 0.25]));
  return g;
}

function buildRoom() {
  const g = new THREE.Group();
  const half = ROOM / 2;
  // Floor slab, layered like a cut-away section.
  const floorMat = std(C.wood, { map: plankTexture(), roughness: 0.6 });
  g.add(mesh(rounded(ROOM, 0.2, ROOM, 0.05), floorMat, [0, -0.1, 0], false));
  const layers: [number, string][] = [
    [0.34, C.screed],
    [0.22, C.insulation],
    [0.55, C.concrete],
  ];
  let y = -0.2;
  for (const [h, color] of layers) {
    g.add(mesh(new THREE.BoxGeometry(ROOM - 0.04, h, ROOM - 0.04), std(color, { roughness: 0.95 }), [0, y - h / 2, 0], false));
    y -= h;
  }
  // Two walls, the far ones; the near ones are cut away.
  const wallMat = std(C.wall, { roughness: 0.95 });
  g.add(mesh(rounded(ROOM, WALL_H, WALL_T, 0.06), wallMat, [0, WALL_H / 2, -half + WALL_T / 2]));
  g.add(mesh(rounded(WALL_T, WALL_H, ROOM - WALL_T, 0.06), wallMat, [-half + WALL_T / 2, WALL_H / 2, WALL_T / 2]));
  // Skirting
  const skirt = std("#e6dfd5");
  g.add(mesh(new THREE.BoxGeometry(ROOM - WALL_T, 0.14, 0.05), skirt, [WALL_T / 2, 0.07, -half + WALL_T + 0.025], false));
  g.add(mesh(new THREE.BoxGeometry(0.05, 0.14, ROOM - WALL_T), skirt, [-half + WALL_T + 0.025, 0.07, WALL_T / 2], false));
  // Window on the left wall
  const win = new THREE.Group();
  win.add(mesh(rounded(0.1, 2.2, 1.9, 0.03), std("#ffffff", { roughness: 0.5 }), [0, 0, 0], false));
  win.add(mesh(new THREE.BoxGeometry(0.11, 2.0, 1.7), std(C.glass, { roughness: 0.15, emissive: new THREE.Color("#d8eef7"), emissiveIntensity: 0.5 }), [0.005, 0, 0], false));
  win.add(mesh(new THREE.BoxGeometry(0.13, 2.0, 0.05), std("#ffffff"), [0.01, 0, 0], false));
  win.add(mesh(new THREE.BoxGeometry(0.13, 0.05, 1.7), std("#ffffff"), [0.01, 0, 0], false));
  win.position.set(-half + WALL_T + 0.03, 2.55, 1.2);
  g.add(win);
  // Rug
  g.add(mesh(new THREE.CylinderGeometry(2.15, 2.15, 0.04, 64), std(C.rug, { roughness: 1 }), [0.55, 0.02, 0.55], false));
  return g;
}

function buildArt() {
  const g = new THREE.Group();
  g.add(mesh(rounded(2.3, 1.6, 0.08, 0.03), std(C.frame, { roughness: 0.5 }), [0, 0, 0]));
  const canvas = new THREE.Mesh(new THREE.PlaneGeometry(2.08, 1.38), std("#ffffff", { map: artTexture(), roughness: 0.9 }));
  canvas.position.z = 0.045;
  g.add(canvas);
  return g;
}

export default function LivingRoom({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the hero shows without the illustration.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.transform = "translateZ(0)";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.55;

    scene.add(new THREE.HemisphereLight("#ffffff", "#d9cbb8", 0.6));
    const sun = new THREE.DirectionalLight("#fff6ea", 2.4);
    sun.position.set(7, 11, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(isSmallScreen ? 1024 : 2048, isSmallScreen ? 1024 : 2048);
    const sc = sun.shadow.camera;
    sc.left = -8;
    sc.right = 8;
    sc.top = 8;
    sc.bottom = -8;
    sc.near = 1;
    sc.far = 40;
    sun.shadow.radius = 5;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    scene.add(sun);

    // Everything that turns with the pointer.
    const world = new THREE.Group();
    scene.add(world);
    world.add(buildRoom());

    // Soft shadow of the whole block on the page.
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.16 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.32;
    ground.receiveShadow = true;
    world.add(ground);

    // Props drop into the room one after another.
    type Prop = { object: THREE.Object3D; restY: number; delay: number };
    const props: Prop[] = [];
    const place = (object: THREE.Object3D, pos: [number, number, number], delay: number, rotY = 0) => {
      object.position.set(...pos);
      object.rotation.y = rotY;
      world.add(object);
      props.push({ object, restY: pos[1], delay });
      return object;
    };

    const sofa = place(buildSofa(), [0.35, 0, -2.55], 0.25);
    const pillows: THREE.Object3D[] = [];
    const pillowSpecs: [string, keyof typeof ICON_PATHS, string, number, number][] = [
      ["#27272a", "terminal", "#4ade80", -1.0, 0.12],
      ["#f4f4f5", "database", "#2563eb", 0.05, -0.04],
      ["#fcd34d", "braces", "#27272a", 1.05, -0.14],
    ];
    pillowSpecs.forEach(([color, icon, ink, x, tilt], i) => {
      const p = buildPillow(color, icon, ink);
      p.rotation.set(-0.32, tilt * 0.6, tilt);
      p.userData.pillow = true;
      pillows.push(p);
      place(p, [0.35 + x, 1.08, -2.55 - 0.02], 0.55 + i * 0.12);
    });
    place(buildArt(), [0.35, 3.1, -ROOM / 2 + WALL_T + 0.05], 0.15);
    place(buildSnakePlant(), [-3.05, 0, -3.05], 0.7);
    place(buildBushPlant(), [2.85, 0, -2.95], 0.8);
    place(buildBushPlant(0.55), [-3.1, 0, 2.4], 0.9);
    place(buildLamp(), [-2.0, 0, -3.15], 0.6);
    place(buildCoffeeTable(), [0.55, 0, 0.75], 0.45, 0);
    void sofa;

    // Camera: orthographic, looking at the open corner from above.
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    const LOOK = new THREE.Vector3(0, 1.0, 0);
    camera.position.copy(LOOK).add(new THREE.Vector3(1, 0.86, 1).normalize().multiplyScalar(30));
    camera.lookAt(LOOK);

    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h || (w === lastW && h === lastH)) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      const aspect = w / h;
      const narrow = aspect < 0.9;
      // On screen the room is ~5.7 units either side of its centre and ~5 above/below.
      // Wide: centre at 40% right of middle, sized so its left edge stays clear of the title.
      // Narrow: centred, in the upper part, sized so its bottom stays above the title.
      const ox = narrow ? 0 : 0.4;
      const oy = narrow ? 0.36 : 0.14;
      const halfH = narrow ? Math.max(10, 6.2 / aspect) : Math.max(6.6, 12.7 / aspect); // left edge stays right of the title column
      const halfW = halfH * aspect;
      camera.left = -halfW * (1 + ox);
      camera.right = halfW * (1 - ox);
      camera.top = halfH * (1 - oy);
      camera.bottom = -halfH * (1 + oy);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Pointer: the room turns a little toward the cursor. Touch is ignored so scrolling doesn't yank it.
    const target = { x: 0, y: 0 };
    let pointerActive = false;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointerActive = true;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Pressing a pillow squishes it.
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const squish = new Map<THREE.Object3D, number>();
    const pillowAt = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(pillows, true)[0];
      if (!hit) return null;
      let o: THREE.Object3D | null = hit.object;
      while (o && !o.userData.pillow) o = o.parent;
      return o;
    };
    const onCanvasDown = (e: PointerEvent) => {
      const p = pillowAt(e);
      if (p) squish.set(p, performance.now());
    };
    const onCanvasMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      renderer.domElement.style.cursor = pillowAt(e) ? "pointer" : "";
    };
    renderer.domElement.addEventListener("pointerdown", onCanvasDown);
    renderer.domElement.addEventListener("pointermove", onCanvasMove);

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) loop();
    });
    visibility.observe(container);

    const start = performance.now();
    const rot = { y: 0, x: 0 };
    const easeOutBack = (t: number) => {
      const c = 1.4;
      return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    };

    const renderFrame = (now: number) => {
      const t = (now - start) / 1000;
      if (!reduceMotion) {
        // Intro: the block rises, then props drop in.
        const rise = Math.min(t / 0.9, 1);
        world.position.y = -1.2 * Math.pow(1 - rise, 3);
        for (const p of props) {
          const k = THREE.MathUtils.clamp((t - p.delay) / 0.55, 0, 1);
          p.object.position.y = p.restY + (1 - easeOutBack(k)) * 3;
          p.object.visible = k > 0;
        }
        const idle = pointerActive ? 0 : Math.sin(t * 0.3) * 0.08;
        rot.y += (target.x * 0.2 + idle - rot.y) * 0.05;
        rot.x += (target.y * 0.04 - rot.x) * 0.05;
        world.rotation.set(rot.x, rot.y, 0);
      }
      for (const [p, at] of squish) {
        const k = (now - at) / 450;
        if (k >= 1) {
          p.scale.set(1, 1, 1);
          squish.delete(p);
          continue;
        }
        const s = Math.sin(k * Math.PI * 3) * (1 - k) * 0.18;
        p.scale.set(1 + s, 1 - s, 1 + s * 0.5);
      }
      renderer.render(scene, camera);
    };

    let frame = 0;
    let disposed = false;
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

    if (reduceMotion) {
      // Still picture; only the pillow squish animates, briefly.
      renderFrame(performance.now());
      const onDown = () => {
        const run = (now: number) => {
          renderFrame(now);
          if (squish.size) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      };
      renderer.domElement.addEventListener("pointerdown", onDown);
    } else loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          for (const m of mats) {
            for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
            m.dispose();
          }
        }
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
