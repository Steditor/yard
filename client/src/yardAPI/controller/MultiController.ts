import YardAPI from "../YardAPI";
import Controller from "./Controller";
import { KeyboardController } from "./KeyboardController";
import { TouchController } from "./TouchController";

export class MultiController extends Controller {
  public readonly keyboard: KeyboardController | null = null;
  public readonly touch: TouchController | null = null;

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);
    this.keyboard = new KeyboardController(api, false);
    this.touch = new TouchController(api, false);
  }

  get activePixel(): string | null {
    return super.activePixel;
  }

  set activePixel(pixel: string | null) {
    super.activePixel = pixel;
    if (this.keyboard) {
      this.keyboard.activePixel = pixel;
    }
    if (this.touch) {
      this.touch.activePixel = pixel;
    }
  }

  sendMoveCommand(): void {
    this.keyboard?.sendMoveCommand();
    this.touch?.sendMoveCommand();
  }
}
