import { DOMPurifyI } from "dompurify";

export class SvgCodeSanitizer {
  private originalCode = "";
  private sanitizedCode = "";
  private errorFree = true;

  constructor(private DOMPurify: DOMPurifyI) {}

  check(code: string) {
    this.originalCode = code;
    if (!this.originalCode.startsWith("<svg")) {
      this.originalCode = `<svg xmlns="http://www.w3.org/2000/svg">\n${this.originalCode}\n</svg>`;
    }
    this.sanitizedCode = this.DOMPurify.sanitize(this.originalCode, {
      USE_PROFILES: { svg: true, svgFilters: true },
      NAMESPACE: "http://www.w3.org/2000/svg",
    });
    this.errorFree = this.DOMPurify.removed.length <= 1;
  }

  get isErrorFree() {
    return this.errorFree;
  }

  get sanitized() {
    return this.sanitizedCode;
  }
}
