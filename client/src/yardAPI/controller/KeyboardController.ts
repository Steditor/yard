import YardAPI from "../YardAPI";
import Controller from "./Controller";
import { Vec2, addVec2 } from "./math";

type Direction = "left" | "right" | "up" | "down";

const keyMapping: Record<string, Direction> = {
  ArrowLeft: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
  ArrowUp: "up",
  w: "up",
  ArrowDown: "down",
  s: "down",
};

const vecMapping: Record<Direction, Vec2> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, 1],
  down: [0, -1],
};

export class KeyboardController extends Controller {
  private readonly keys = {
    up: false,
    right: false,
    down: false,
    left: false,
  };

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);

    document.addEventListener("keydown", (event) => {
      if (event.target instanceof HTMLInputElement) {
        return;
      }
      if (event.key in keyMapping) {
        this.keys[keyMapping[event.key]] = true;
        event.preventDefault();
      }
      if (event.key === "Tab") {
        if (!this.activePixel) return;

        const myPixels = api.store.myPixels();
        const currentIndex = myPixels.findIndex(
          ([id]) => id === this.activePixel,
        );

        const direction = event.shiftKey ? -1 : 1;
        const nextPixel =
          myPixels[
            (currentIndex + direction + myPixels.length) % myPixels.length
          ];
        if (nextPixel) {
          api.controller.activePixel = nextPixel[0];
        }

        event.preventDefault();
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key in keyMapping) {
        this.keys[keyMapping[event.key]] = false;
        event.preventDefault();
      }
    });
    document.addEventListener("blur", () => {
      this.keys.left = false;
      this.keys.right = false;
      this.keys.up = false;
      this.keys.down = false;
    });
  }

  sendMoveCommand(): void {
    if (!this.activePixel) return;

    const vec: Vec2 = [0, 0];
    for (const [direction, isPressed] of Object.entries(this.keys) as [
      Direction,
      boolean,
    ][]) {
      if (isPressed) {
        addVec2(vec, vec, vecMapping[direction]);
      }
    }

    if (vec[0] !== 0 || vec[1] !== 0) {
      this._api.pixelAPI.move(this.activePixel, Math.atan2(vec[1], vec[0]));
    }
  }
}
