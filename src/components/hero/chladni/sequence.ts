// A curated set of (n, m) harmonic pairs that produce visually distinct,
// pleasant Chladni figures — the autonomous background drifts between
// these rather than picking uniformly at random (many pairs, e.g. n === m,
// look sparse or repetitive).
const PATTERNS: Array<[number, number]> = [
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [2, 5],
  [5, 6],
  [1, 6],
  [4, 6],
  [3, 7],
  [2, 7],
  [5, 7],
];

/** Picks the next pattern in the drift, never immediately repeating. */
export function pickNextPattern(current: [number, number]): [number, number] {
  const choices = PATTERNS.filter(
    ([n, m]) => n !== current[0] || m !== current[1]
  );
  return choices[Math.floor(Math.random() * choices.length)];
}

export const INITIAL_PATTERN: [number, number] = [3, 4];
