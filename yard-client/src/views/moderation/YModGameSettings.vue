<template>
  <Card>
    <template #title>
      Game Settings
    </template>
    <template #content>
      <div class="p-fluid p-formgrid">
        <div class="p-field p-grid">
          <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Pixel per Person</label>
          <div class="p-col-6 p-md-5">
            <InputNumber :min="0" v-model="minPixelPerPerson" />
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

  export default defineComponent({
    name: "YModGameSettings",
    components: { Card, InputNumber },
    computed: {
      roomId(): string {
        return this.$yardAPI.store.roomId ?? "";
      },
      minPixelPerPerson: {
        get(): number {
          return this.$yardAPI.store.gameSettings.minPixelPerPerson;
        },
        set(value: number) {
          this.$yardAPI.gameAPI.setSettings({ minPixelPerPerson: value });
        },
      },
    },
  });
</script>
