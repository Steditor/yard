import { ConfirmationServiceMethods } from "../typings/primeconfirmpopup";
import { ToastServiceMethods } from "../typings/primetoast";
import YardAPI from "./yardAPI/YardAPI";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $yardAPI: YardAPI;
    $confirm: ConfirmationServiceMethods;
    $toast: ToastServiceMethods;
  }
}

// TODO!
