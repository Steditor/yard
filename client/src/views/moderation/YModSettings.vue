<template>
  <Card>
    <template #title>Yard Settings</template>
    <template #content>
      <div class="formgrid">
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Yard Size</label>
          <div class="col-12 mb-1 sm:col-6 sm:mb-0 md:col-5">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">Width:</span>
              <InputNumber suffix=" px" :min="100" v-model="yardWidth" />
            </div>
          </div>
          <div class="col-12 sm:col-6 md:col-5">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">Height:</span>
              <InputNumber suffix=" px" :min="100" v-model="yardHeight" />
            </div>
          </div>
        </div>
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Background</label>
          <div class="col-12 md:col-10">
            <YModBackground />
          </div>
        </div>
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Pixel Size</label>
          <div class="col-12 sm:col-6 md:col-5">
            <InputNumber suffix=" px" :min="1" v-model="pixelSize" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Card from "primevue/card";
  import InputNumber from "primevue/inputnumber";

  import { settingsFieldModel } from "../../yardAPI/helpers/fieldModels";
  import YModBackground from "./yard-background/YModBackground.vue";

  export default defineComponent({
    name: "YModSettings",
    components: {
      YModBackground,
      Card,
      InputNumber,
    },
    computed: {
      roomId(): string {
        return this.$yardAPI.store.roomId ?? "";
      },
      yardWidth: settingsFieldModel("canvasWidth"),
      yardHeight: settingsFieldModel("canvasHeight"),
      pixelSize: settingsFieldModel("pixelSize"),
    },
  });
</script>
