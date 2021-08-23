import YardAPI from "@/yardAPI/YardAPI";
import Controller from "./Controller";
import { TouchController } from "@/yardAPI/controller/TouchController";
import { KeyboardController } from "@/yardAPI/controller/KeyboardController";

export class MultiController extends Controller {
  private readonly controllers: Controller[] = [];

  constructor(api: YardAPI, isMainController: boolean) {
    super(api, isMainController);
    this.controllers.push(
      new KeyboardController(api, false),
      new TouchController(api, false),
    );
  }

  get activePixel(): string | null {
    return super.activePixel;
  }

  set activePixel(pixel: string | null) {
    super.activePixel = pixel;
    // eslint-disable-next-line no-return-assign
    this.controllers.forEach((c) => c.activePixel = pixel);
  }

  sendMoveCommand(): void {
    this.controllers.forEach((c) => c.sendMoveCommand());
  }
}
