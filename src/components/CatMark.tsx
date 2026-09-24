// Speckled cat mark for the favicon and Apple touch icon, matching the particle cat in the
// hero (Lucide "cat" geometry, ISC license, same path as hero/ParticleBust.tsx).
// Rendered by next/og, so it sticks to plain SVG.
const CAT_OUTLINE =
  "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z";
const EYE_LEFT = "M7.2 14.25a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0";
const EYE_RIGHT = "M15.2 14.25a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0";
const NOSE = "M11.1 16.2h1.8L12 17.1Z";

// Several fine dotted strokes, each nudged and given its own dot spacing so the dots
// don't line up, read as scattered particles. [dx, dy, spacing multiplier] in 24-unit
// icon space; fixed values keep the icon stable.
const LAYERS: [number, number, number][] = [
  [0, 0, 1],
  [0.34, -0.2, 1.17],
  [-0.3, 0.26, 0.83],
  [0.16, 0.38, 1.31],
  [-0.4, -0.14, 0.91],
  [0.44, 0.22, 1.07],
  [-0.12, -0.42, 1.23],
  [0.05, 0.12, 0.77],
];

// A plain function, not a component: next/og only accepts intrinsic elements inside <svg>.
function speckle(key: string, d: string, gap: number, width: number) {
  return LAYERS.map(([dx, dy, spacing], i) => (
    <path
      key={`${key}-${i}`}
      d={d}
      transform={`translate(${dx} ${dy})`}
      fill="none"
      stroke="url(#cat)"
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={`0 ${gap * spacing}`}
      strokeDashoffset={i * 0.37}
    />
  ));
}

export default function CatMark({ size, background }: { size: number; background?: string }) {
  // Coarser particles at favicon size so they don't blur into a solid line.
  const width = size < 100 ? 0.55 : 0.34;
  const gap = size < 100 ? 1.1 : 0.95;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: background ?? "transparent",
      }}
    >
      <svg width={size * 0.92} height={size * 0.92} viewBox="1.4 1.4 21.2 21.2">
        <defs>
          <linearGradient id="cat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#be123c" />
            <stop offset="1" stopColor="#f9a8d4" />
          </linearGradient>
        </defs>
        {speckle("outline", CAT_OUTLINE, gap, width)}
        {speckle("eye-l", EYE_LEFT, gap * 0.7, width)}
        {speckle("eye-r", EYE_RIGHT, gap * 0.7, width)}
        {speckle("nose", NOSE, gap * 0.7, width)}
      </svg>
    </div>
  );
}
