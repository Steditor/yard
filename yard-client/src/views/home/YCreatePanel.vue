<template>
  <p>
    You want to create a new Yard for you and your friends?
  </p>
  <div class="p-field p-fluid">
    <Button label="Create Yard" icon="pi pi-plus" class="p-button-lg p-button-success" @click="createYard()" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YCreatePanel",
    methods: {
      async createYard(): Promise<void> {
        const roomId = await this.$yardConnection.createYard();
        if (roomId) {
          await this.$router.push({ name: "Moderation", params: { roomId } });
        } else {
          // TODO: error handling
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  i, span {
    vertical-align: middle;
  }
</style>
