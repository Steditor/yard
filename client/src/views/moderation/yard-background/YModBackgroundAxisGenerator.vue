<template>
  <Dialog
    header="Generate Yard Background Coordinate System"
    v-model:visible="dialogVisible"
    :modal="true"
    :dismissableMask="true"
    ref="dialog"
  >
    <Fieldset legend="Horizontal Axis">
      <div class="p-fluid formgrid">
        <div class="field">
          Hide
          <InputSwitch v-model="hUse" clas="ml-2 mr-2" />
          Show
        </div>
        <div class="field grid">
          <label class="col-5">Main Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="hMain" />
          </div>
        </div>
        <div class="field grid">
          <label class="col-5">Left Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="hLeft" />
          </div>
        </div>
        <div class="field grid">
          <label class="col-5">Right Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="hRight" />
          </div>
        </div>
      </div>
    </Fieldset>
    <Fieldset legend="Vertical Axis">
      <div class="p-fluid formgrid">
        <div class="field">
          Hide
          <InputSwitch v-model="vUse" clas="ml-2 mr-2" />
          Show
        </div>
        <div class="field grid">
          <label class="col-5">Main Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="vMain" />
          </div>
        </div>
        <div class="field grid">
          <label class="col-5">Up Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="vUp" />
          </div>
        </div>
        <div class="field grid">
          <label class="col-5">Down Label</label>
          <div class="col-7">
            <InputText type="text" placeholder="<none>" v-model="vDown" />
          </div>
        </div>
      </div>
    </Fieldset>
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
  import Dialog from "primevue/dialog";
  import Fieldset from "primevue/fieldset";
  import InputSwitch from "primevue/inputswitch";
  import InputText from "primevue/inputtext";

  import { settingsFieldModel } from "../../../yardAPI/helpers/fieldModels";

  export default defineComponent({
    name: "YModBackgroundAxisGenerator",
    components: { Button, Dialog, Fieldset, InputSwitch, InputText },
    props: {
      visible: Boolean,
    },
    data() {
      return {
        hUse: true,
        hMain: "",
        hLeft: "",
        hRight: "",
        vUse: true,
        vMain: "",
        vUp: "",
        vDown: "",
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
        // prettier-ignore
        let code =
`  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5"
      markerWidth="5" markerHeight="5"
      orient="auto-start-reverse">
      <path d="M0 0L9 5L0 10z" />
    </marker>
  </defs>`;
        const width = this.$yardAPI.store.settings.canvasWidth;
        const height = this.$yardAPI.store.settings.canvasHeight;
        if (this.hUse) {
          // prettier-ignore
          code += `
  <path d="M10 ${height / 2} H${width - 10}" stroke="black" marker-start="url(#arrowhead)" marker-end="url(#arrowhead)" stroke-width="5" />
  <text x="${width / 2 + (this.vUse ? 5 : 0)}" y="${height / 2 - 5}" text-anchor="${this.vUse ? "start" : "middle"}">${this.hMain}</text>
  <text x="30" y="${height / 2 - 5}" text-anchor="start">${this.hLeft}</text>
  <text x="${width - 30}" y="${height / 2 - 5}" text-anchor="end">${this.hRight}</text>`;
        }
        if (this.vUse) {
          // prettier-ignore
          code += `
  <path d="M${width / 2} 10 V${height - 10}" stroke="black" marker-start="url(#arrowhead)" marker-end="url(#arrowhead)" stroke-width="5" />
  <text text-anchor="${this.hUse ? "start" : "middle"}" transform="translate(${width / 2 - 5}, ${height / 2 - (this.hUse ? 5 : 0)}), rotate(-90)">${this.vMain}</text>
  <text text-anchor="end" transform="translate(${width / 2 - 5}, 30), rotate(-90)">${this.vUp}</text>
  <text text-anchor="start" transform="translate(${width / 2 - 5}, ${height - 30}), rotate(-90)">${this.vDown}</text>`;
        }
        this.backgroundCode = code;
        this.close();
        this.$toast.add({
          severity: "success",
          summary: "Background changed",
          detail: `The Yard background is now a coordinate system.`,
          life: 2000,
        });
      },
      close() {
        this.dialogVisible = false;
      },
    },
  });
</script>
