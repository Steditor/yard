type ToastSeverity = "success" | "info" | "warn" | "error";

interface ToastMessage {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  closable?: boolean;
  life?: number;
  group?: string;
}

interface ToastServiceMethods {
  add(message: ToastMessage): any;
  removeGroup(group: string): void;
  removeAllGroups(): void;
}

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $toast: ToastServiceMethods;
  }
}
