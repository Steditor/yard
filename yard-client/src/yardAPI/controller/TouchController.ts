import { Vec2 } from "@/yardAPI/controller/math";
import YardAPI from "@/yardAPI/YardAPI";
import Controller from "./Controller";

export class TouchController extends Controller {
  private origin: null | Vec2 = null;
  private angle: null | number = null;

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);

    document.addEventListener("pointerdown", (event) => {
      this.origin = [ event.screenX, event.screenY ];
    });
    document.addEventListener("pointermove", (event) => {
      if (this.origin) {
        this.angle = Math.atan2(this.origin[1] - event.screenY, event.screenX - this.origin[0]);
      }
    });
    const clear = () => {
      this.origin = null;
      this.angle = null;
    };
    document.addEventListener("pointerup", clear);
    document.addEventListener("pointercancel", clear);
    document.addEventListener("blur", clear);
  }

  sendMoveCommand(): void {
    if (!this.activePixel || !this.angle) return;

    this._api.pixelAPI.move(this.activePixel, this.angle);
  }
}
