<template>
  <div class="y-full-size y-flex-center">
    <Card class="login-card">
      <template #title>
        Login required
      </template>
      <template #content>
        <div class="p-field p-fluid">
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText id="moderationKey" type="text" v-model="moderationKey" @keyup.enter="login()" />
            <label for="moderationKey">Enter the yard's moderation key</label>
          </span>
        </div>
      </template>
      <template #footer>
        <div class="p-field p-fluid">
          <Button label="Login" icon="pi pi-login" class="p-button-lg p-button-success" @click="login()" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Card from "primevue/card";
  import InputText from "primevue/inputtext";

  export default defineComponent({
    name: "YModLogin",
    components: { InputText, Button, Card },
    data() {
      return {
        moderationKey: "",
      };
    },
    methods: {
      login() {
        this.$yardAPI.playerAPI.makeAdmin(this.moderationKey);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .login-card {
    width: 500px;
  }
</style>
