<template>
  <Dialog
    header="Edit Yard Background"
    v-model:visible="dialogVisible"
    :modal="true"
    :dismissableMask="true"
    :maximizable="true"
    ref="dialog"
    class="y-background-editor-dialog"
  >
    <div class="grid">
      <div class="col-7">
        <YMonacoEditor v-model="value" />
      </div>
      <div class="col-5">
        <YYard :background="sanitized" />
      </div>
    </div>
    <template #footer>
      <Button
        label="Reset"
        icon="pi pi-undo"
        class="p-button-danger"
        @click="reset"
      />
      <Button
        label="Abort"
        icon="pi pi-times"
        class="p-button-warning"
        @click="abort"
      />
      <Button
        label="Apply"
        icon="pi pi-check"
        class="p-button-success"
        @click="apply"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
  import DOMPurify from "dompurify";

  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Dialog from "primevue/dialog";

  import { SvgCodeSanitizer } from "@yard/common/svgCodeSanitizer";

  import YMonacoEditor from "../../../components/editor/YMonacoEditor.vue";
  import { settingsFieldModel } from "../../../yardAPI/helpers/fieldModels";
  import YYard from "../../yard/YYard.vue";

  export default defineComponent({
    name: "YModBackgroundEditor",
    components: { YYard, YMonacoEditor, Button, Dialog },
    props: {
      visible: Boolean,
    },
    setup() {
      return {
        sanitizer: new SvgCodeSanitizer(DOMPurify),
      };
    },
    data() {
      return {
        value: this.$yardAPI.store.settings.backgroundCode,
      };
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible;
        },
        set(visible: boolean) {
          this.$emit("update:visible", visible);
        },
      },
      backgroundCode: settingsFieldModel("backgroundCode"),
      sanitized() {
        this.sanitizer.check(this.value);
        return this.sanitizer.sanitized;
      },
    },
    watch: {
      backgroundCode() {
        this.reset();
      },
    },
    methods: {
      abort() {
        this.close();
        this.reset();
      },
      apply() {
        this.backgroundCode = this.sanitized;
        this.close();
        this.$toast.add({
          severity: "success",
          summary: "Background changed",
          detail: "The Yard background was set to your custom SVG code.",
          life: 2000,
        });
      },
      reset() {
        this.value = this.$yardAPI.store.settings.backgroundCode;
      },
      close() {
        this.dialogVisible = false;
      },
    },
  });
</script>

<style lang="scss">
  .y-background-editor-dialog {
    width: 90vw;
  }
  .y-background-editor-dialog .p-dialog-content {
    flex: 1 1 100vh;
  }
</style>
