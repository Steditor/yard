import { Client } from "colyseus";

import { ToastMessage } from "@yard/client/typings/primetoast";

export function sendToast(client: Client, message: ToastMessage): void {
  client.send("toast", message);
}
