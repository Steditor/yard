import { Vec2 } from "@/yardAPI/controller/math";
import YardAPI from "@/yardAPI/YardAPI";
import Controller from "./Controller";

export class TouchController extends Controller {
  private origin: null | Vec2 = null;
  private angle: null | number = null;

  private readonly pointerDownListener: (event: PointerEvent) => any;
  private pointerDownElement: EventTarget | null = null;

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);

    this.pointerDownListener = (event: PointerEvent) => {
      this.origin = [ event.screenX, event.screenY ];
    };

    this.registerPointerDown(document); // fallback; should be replaced by the yard container as soon as it's mounted.

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

  registerPointerDown(target: EventTarget): void {
    if (this.pointerDownElement) {
      this.pointerDownElement.removeEventListener("pointerdown", this.pointerDownListener as EventListener);
    }
    this.pointerDownElement = target;
    target.addEventListener("pointerdown", this.pointerDownListener as EventListener);
  }

  sendMoveCommand(): void {
    if (!this.activePixel || !this.angle) return;

    this._api.pixelAPI.move(this.activePixel, this.angle);
  }
}
