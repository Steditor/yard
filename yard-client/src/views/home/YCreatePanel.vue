<template>
  <p>
    You want to create a new Yard for you and your friends?
  </p>
  <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-user" />
      <InputText id="username" type="text" v-model="username" @keyup.enter="createYard()" />
      <label for="username">Choose a Username</label>
    </span>
  </div>
  <div class="p-field p-fluid">
    <Button label="Create Yard" icon="pi pi-plus" class="p-button-lg p-button-success" @click="createYard()" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import InputText from "primevue/inputtext";

  export default defineComponent({
    name: "YCreatePanel",
    components: { Button, InputText },
    data() {
      return {
        username: "",
      };
    },
    methods: {
      async createYard(): Promise<void> {
        const roomId = await this.$yardAPI.createYard(this.username);
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
