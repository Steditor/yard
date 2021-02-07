export type Vec2 = [number, number];

export function toDegrees(angle: number): number {
  return angle * (180 / Math.PI);
}

export function addVec2(out: Vec2, v1: Vec2, v2: Vec2): Vec2 {
  out[0] = v1[0] + v2[0];
  out[1] = v1[1] + v2[1];
  return out;
}
