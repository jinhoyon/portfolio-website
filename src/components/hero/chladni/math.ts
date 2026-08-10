// Chladni plate equation and its analytic gradient.
// z(x,y) = a*sin(pi*n*x)*sin(pi*m*y) + b*sin(pi*m*x)*sin(pi*n*y)

export function chladni(
  x: number,
  y: number,
  a: number,
  b: number,
  n: number,
  m: number
): number {
  return (
    a * Math.sin(Math.PI * n * x) * Math.sin(Math.PI * m * y) +
    b * Math.sin(Math.PI * m * x) * Math.sin(Math.PI * n * y)
  );
}

// Analytic gradient of z(x,y), used to push particles toward nodal lines
// (z ≈ 0) via gradient descent on z^2.
export function chladniGradient(
  x: number,
  y: number,
  a: number,
  b: number,
  n: number,
  m: number,
  out: [number, number]
): void {
  out[0] =
    a * Math.PI * n * Math.cos(Math.PI * n * x) * Math.sin(Math.PI * m * y) +
    b * Math.PI * m * Math.cos(Math.PI * m * x) * Math.sin(Math.PI * n * y);
  out[1] =
    a * Math.PI * m * Math.sin(Math.PI * n * x) * Math.cos(Math.PI * m * y) +
    b * Math.PI * n * Math.sin(Math.PI * m * x) * Math.cos(Math.PI * n * y);
}
