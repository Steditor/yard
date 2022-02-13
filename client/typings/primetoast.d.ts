// This should be done with declaration merging.
// However, the declaration of primevue seems non-mergeable.

export type ToastSeverity = "success" | "info" | "warn" | "error";

export interface ToastMessage {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  closable?: boolean;
  life?: number;
  group?: string;
}

export interface ToastServiceMethods {
  add(message: ToastMessage): any;

  removeGroup(group: string): void;

  removeAllGroups(): void;
}
