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
        <div class="p-field p-grid">
          <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Rope</label>
          <div class="p-col-6 p-md-5 rope-switch-col">
            Hide
            <InputSwitch v-model="rope" class="p-ml-2 p-mr-2" />
            Show
          </div>
          <div class="p-col-6 p-md-5">
            <Button label="Shuffle Rope Order" icon="pi pi-refresh" @click="shuffleRope" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Card from "primevue/card";
  import InputNumber from "primevue/inputnumber";
  import InputSwitch from "primevue/inputswitch";

  export default defineComponent({
    name: "YModGameSettings",
    components: { Button, Card, InputNumber, InputSwitch },
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
      rope: {
        get(): boolean {
          return this.$yardAPI.store.gameSettings.rope;
        },
        set(value: boolean) {
          this.$yardAPI.gameAPI.setSettings({ rope: value });
        },
      },
    },
    methods: {
      shuffleRope() {
        this.$yardAPI.gameAPI.shuffleRope();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .rope-switch-col {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
