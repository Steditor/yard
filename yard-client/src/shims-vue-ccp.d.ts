import YardAPI from "./yardAPI/YardAPI";
import { ToastServiceMethods } from "../typings/primetoast";
import { ConfirmationServiceMethods } from "../typings/primeconfirmpopup";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $yardAPI: YardAPI;
    $confirm: ConfirmationServiceMethods;
    $toast: ToastServiceMethods;
  }
}
