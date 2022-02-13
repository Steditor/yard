// This should be done with declaration merging.
// However, the declaration of primevue seems non-mergeable.

export interface ConfirmMessage {
  target?: Element | null;
  message?: string | null;
  group?: string | null;
  icon?: string | null;
  accept?: (() => void) | null;
  reject?: (() => void) | null;
  acceptLabel?: string | null;
  rejectLabel?: string | null;
  acceptIcon?: string | null;
  rejectIcon?: string | null;
  acceptClass?: string | null;
  rejectClass?: string | null;
}

export interface ConfirmationServiceMethods {
  require(message: ConfirmMessage): any;
  close(): void;
}
