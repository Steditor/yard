import { MovePayload } from "../../common/pixelInterface";
import { YardState } from "../src/rooms/schema/YardState";
import { Client, Room } from "colyseus.js";

export function requestJoinOptions(this: Client): Record<string, never> {
  return {};
}

let interval: NodeJS.Timeout | undefined;
let angle: Record<string, number> = { };

export function onJoin(this: Room): void {
  console.log(this.sessionId, "joined.");

  interval = setInterval(() => sendRandomMove(this), 20);
}

export function onLeave(this: Room): void {
  console.log(this.sessionId, "left.");
  if (interval) {
    clearInterval(interval);
  }
}

export function onError(this: Room, err: Error): void {
  console.log(this.sessionId, "!! ERROR !!", err.message);
}

function sendRandomMove(room: Room): void {
  const pixel = Array.from((room.state as YardState).pixels.entries())
    .filter(([ , pixel ]) => pixel.player === room.sessionId)[0];
  if (pixel) {
    room.send("move", randomMove(pixel[0]));
  }
}

function randomMove(pixel: string): MovePayload {
  angle[pixel] = randAngle(angle[pixel] ?? 0);

  return {
    p: pixel,
    a: Math.floor((angle[pixel] * (180 / Math.PI) + 360) % 360 / 3), // transport data is non-negative angle in 1/3 degrees
  };
}

function randAngle(oldAngle: number) {
  const rand = Math.random();
  const newAngle = Math.random() * 2 * Math.PI;
  if (rand < 99 / 100) {
    return oldAngle;
  } else {
    return newAngle;
  }
}
