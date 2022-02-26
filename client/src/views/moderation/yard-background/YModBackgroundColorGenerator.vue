<template>
  <Dialog
    header="Generate Yard Background Color"
    v-model:visible="dialogVisible"
    :modal="true"
    :dismissableMask="true"
    ref="dialog"
    class="y-background-color-generator-dialog"
  >
    <ColorPicker v-model="value" :inline="true" />
    <template #footer>
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
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import ColorPicker from "primevue/colorpicker";
  import Dialog from "primevue/dialog";

  import { settingsFieldModel } from "../../../yardAPI/helpers/fieldModels";

  export default defineComponent({
    name: "YModBackgroundColorGenerator",
    components: { Button, ColorPicker, Dialog },
    props: {
      visible: Boolean,
    },
    data() {
      return {
        value: "#ffffff",
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
    },
    methods: {
      abort() {
        this.close();
      },
      apply() {
        this.backgroundCode = `<rect x="0" y="0" width="${this.$yardAPI.store.settings.canvasWidth}" height="${this.$yardAPI.store.settings.canvasHeight}" fill="#${this.value}" />`;
        this.close();
        this.$toast.add({
          severity: "success",
          summary: "Background changed",
          detail: `The Yard background color was set to #${this.value}.`,
          life: 2000,
        });
      },
      close() {
        this.dialogVisible = false;
      },
    },
  });
</script>

<style lang="scss">
  .y-background-color-generator-dialog .p-dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
