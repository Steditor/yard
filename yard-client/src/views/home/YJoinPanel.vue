<template>
  <p>
    You want to join an existing Yard?
    The creator can provide you with a direct link or send you a code to input here:
  </p>
  <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-key" />
      <InputText id="yard-code" type="text" v-model="yardCode" @keyup.enter="joinYard()" :class="yardCodeClass" />
      <label for="yard-code">Enter the Yard code</label>
    </span>
    <small class="p-invalid" v-if="roomNotFound">Yard not found.</small>
    <small class="p-invalid" v-if="unknownError">Could not join Yard due to an unknown error.</small>
  </div>
  <div class="p-field p-fluid">
    <span class="p-float-label p-input-icon-right">
      <i class="pi pi-user" />
      <InputText id="username" type="text" v-model="username" @keyup.enter="joinYard()" />
      <label for="username">Choose a Username</label>
    </span>
  </div>
  <div class="p-field p-fluid">
    <Button label="Enter Yard" icon="pi pi-sign-in" class="p-button-lg" @click="joinYard()" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { JoinYardResult } from "@/yardAPI/YardAPI";

  export default defineComponent({
    name: "YJoinPanel",
    data() {
      return {
        yardCode: "",
        username: "",
        joinYardResult: JoinYardResult.SUCCESSFUL as JoinYardResult,
      };
    },
    computed: {
      roomNotFound(): boolean {
        return this.joinYardResult === JoinYardResult.ROOM_NOT_FOUND;
      },
      unknownError(): boolean {
        return this.joinYardResult === JoinYardResult.UNKNOWN_ERROR;
      },
      yardCodeClass(): Record<string, boolean> {
        return {
          "p-invalid": this.joinYardResult !== JoinYardResult.SUCCESSFUL,
        };
      },
    },
    methods: {
      async joinYard(): Promise<void> {
        this.joinYardResult = await this.$yardAPI.joinYard(
          this.yardCode,
          { username: this.username },
        );
        if (this.joinYardResult === JoinYardResult.SUCCESSFUL) {
          await this.$router.push({ name: "Yard", params: { roomId: this.yardCode } });
        }
      },
    },
  });
</script>
