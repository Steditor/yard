import { Vec2 } from "@/yardAPI/controller/math";
import YardAPI from "@/yardAPI/YardAPI";
import Controller from "./Controller";

import { ref } from "vue";

export class TouchController extends Controller {
  public readonly origin = ref<null | Vec2>(null);
  public readonly target = ref<null | Vec2>(null);

  private readonly pointerDownListener: (event: PointerEvent) => any;
  private pointerDownElement: EventTarget | null = null;

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);

    this.pointerDownListener = (event: PointerEvent) => {
      this.origin.value = [ event.clientX, event.clientY ];
    };

    this.registerPointerDown(document); // fallback; should be replaced by the yard container as soon as it's mounted.

    document.addEventListener("pointermove", (event) => {
      if (this.origin.value && this.activePixel) {
        this.target.value = [ event.clientX, event.clientY ];
      }
    });
    const clear = () => {
      this.origin.value = null;
      this.target.value = null;
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
    if (!this.activePixel || !this.origin.value || !this.target.value) return;
    const angle = Math.atan2(
      this.origin.value[1] - this.target.value[1],
      this.target.value[0] - this.origin.value[0],
    );
    this._api.pixelAPI.move(this.activePixel, angle);
  }
}
