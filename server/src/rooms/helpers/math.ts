export function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

export function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}
