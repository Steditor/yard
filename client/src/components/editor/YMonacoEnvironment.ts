import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (
      label === "html" ||
      label === "handlebars" ||
      label === "razor" ||
      label === "svg"
    ) {
      return new htmlWorker();
    }
    return new editorWorker();
  },
};
