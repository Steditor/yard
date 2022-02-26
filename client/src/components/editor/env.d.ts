import { Environment } from "monaco-editor";

declare global {
  interface Window {
    MonacoEnvironment?: Environment | undefined;
  }
}
