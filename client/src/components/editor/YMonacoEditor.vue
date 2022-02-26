<template>
  <div class="y-monaco-container">
    <div ref="mount" class="y-monaco-editor"></div>
  </div>
</template>

<script lang="ts">
  import * as monaco from "monaco-editor";

  import { defineComponent } from "vue";

  import "./YMonacoEnvironment";

  export default defineComponent({
    name: "YMonacoEditor",
    props: {
      language: {
        type: String,
        default: "xml",
      },
      modelValue: {
        type: String,
        default: "",
      },
    },
    setup() {
      return {
        editor: undefined as monaco.editor.IStandaloneCodeEditor | undefined,
        lastValue: "",
      };
    },
    watch: {
      modelValue(value) {
        if (value !== this.lastValue) {
          this.editor?.setValue(value);
          this.lastValue = value;
        }
      },
    },
    mounted() {
      this.editor = monaco.editor.create(this.$refs.mount as HTMLDivElement, {
        value: this.modelValue,
        language: this.language,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        theme: "vs-dark",
        automaticLayout: true,
      });
      this.lastValue = this.modelValue;
      this.editor.onDidChangeModelContent(() => {
        this.lastValue = this.editor?.getValue() ?? "";
        this.$emit("update:modelValue", this.lastValue);
      });
    },
  });
</script>

<style lang="scss" scoped>
  .y-monaco-container {
    overflow: hidden;
    height: 100%;
    min-height: 2em;
  }
  .y-monaco-editor {
    height: 100%;
  }
</style>
