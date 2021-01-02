<template>
  <p>
    You want to join an existing Yard?
    The creator can provide you with a direct link or send you a code to input here:
  </p>
  <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-key" />
      <InputText id="yard-code" type="text" v-model="yardCode" />
      <label for="yard-code">Enter the Yard code</label>
    </span>
  </div>
  <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-user" />
      <InputText id="username" type="text" v-model="username" />
      <label for="username">Choose a Username</label>
    </span>
  </div>
  <div class="p-field p-fluid">
    <Button label="Enter Yard" icon="pi pi-sign-in" class="p-button-lg" @click="joinYard()" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "YJoinPanel",
    data() {
      return {
        yardCode: "",
        username: "",
      };
    },
    methods: {
      async joinYard(): Promise<void> {
        const joined = await this.$yardConnection.joinYard(
          this.yardCode,
          { name: this.username },
        );
        if (joined) {
          await this.$router.push({ name: "Yard", params: { roomId: this.yardCode } });
        } else {
          // TODO: error handling
        }
      },
    },
  });
</script>
