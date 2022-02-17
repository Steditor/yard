<template>
  <Card>
    <template #title>Game Settings</template>
    <template #content>
      <div class="p-fluid formgrid">
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Pixel per Person</label>
          <div class="col-12 sm:col-6 md:col-5">
            <InputNumber :min="0" v-model="minPixelPerPerson" />
          </div>
        </div>
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Rope</label>
          <div class="col-12 mb-3 sm:col-6 sm:mb-0 md:col-5 rope-switch-col">
            Hide
            <InputSwitch v-model="rope" class="ml-2 mr-2" />
            Show
          </div>
          <div class="col-12 sm:col-6 md:col-5">
            <Button
              label="Shuffle Rope Order"
              icon="pi pi-refresh"
              @click="shuffleRope"
            />
          </div>
        </div>
        <div class="field grid">
          <label class="col-12 mb-2 md:col-2 md:mb-0">Own pixels</label>
          <div class="col-12 mb-3 sm:col-6 sm:mb-0 md:col-5 rope-switch-col">
            Show
            <InputSwitch v-model="hideSelf" class="ml-2 mr-2" />
            Hide
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
      hideSelf: {
        get(): boolean {
          return this.$yardAPI.store.gameSettings.hideSelf;
        },
        set(value: boolean) {
          this.$yardAPI.gameAPI.setSettings({ hideSelf: value });
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
