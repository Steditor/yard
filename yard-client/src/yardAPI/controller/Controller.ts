import throttle from "lodash/throttle";

import YardAPI from "@/yardAPI/YardAPI";
import { ref, watchEffect } from "vue";

export default abstract class Controller {
  protected readonly _api: YardAPI;

  protected constructor(api: YardAPI, isMainController: boolean) {
    this._api = api;
    if (isMainController) {
      watchEffect(() => this.grabPixel());
      this.startLoop();
    }
  }

  private readonly _activePixel = ref<null | string>(null);

  set activePixel(pixel: string | null) {
    if (pixel && pixel !== this._activePixel.value) {
      this._api.store.setPixelHighlight(pixel, true);
    }
    this._activePixel.value = pixel;
  }

  get activePixel(): string | null {
    return this._activePixel.value;
  }

  abstract sendMoveCommand(): void;

  private grabPixel(): void {
    const pixels = this._api.store.pixels;

    if (this.activePixel && !pixels.has(this.activePixel)) {
      this.activePixel = null;
    }

    if (!this.activePixel) {
      for (const [ pixelId, pixel ] of pixels.entries()) {
        if (pixel.player === this._api.store.sessionId) {
          this.activePixel = pixelId;
          break;
        }
      }
    }
  }

  private startLoop(): void {
    const throttledLoop = throttle(() => this.sendMoveCommand(), 1000 / 60, { leading: true });

    const loop = () => {
      throttledLoop();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
