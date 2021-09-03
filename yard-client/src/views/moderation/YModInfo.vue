<template>
  <Card>
    <template #title>
      Yard Information
    </template>
    <template #content>
      <p>Hello {{$yardAPI.store.me()?.name}}!</p>
      <p>
        You're currently moderating yard <YCopyable :content="roomId" />.
        Others can join the yard with this key.
        They can also use the link <YCopyable :content="yardLink"><RouterLink :to="yardRoute" target="_blank">{{yardLink}}</RouterLink></YCopyable>
        or scan <a href="#" @click="showQRCode = true">this QR-Code</a>.
        <Dialog header="Yard QRCode" v-model:visible="showQRCode" modal dismissable-mask class="qr-dialog">
          <YQRCode :content="yardLink" :options="{ scale: 20 }" />
        </Dialog>
      </p>
      <p>If you want to allow others to moderate this yard, send them the moderation key in addition to the yard link: <YCopyable :content="moderationKey" secret />.</p>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { RouteLocationRaw } from "vue-router";

  import Card from "primevue/card";
  import Dialog from "primevue/dialog";

  import YCopyable from "@/components/YCopyable.vue";
  import YQRCode from "@/components/YQRCode.vue";

  export default defineComponent({
    name: "YModInfo",
    components: { YQRCode, YCopyable, Card, Dialog },
    data() {
      return {
        showQRCode: false,
      };
    },
    computed: {
      roomId(): string {
        return this.$yardAPI.store.roomId ?? "";
      },
      moderationKey(): string {
        return this.$yardAPI.store.settings.moderationKey ?? "";
      },
      yardRoute(): RouteLocationRaw {
        return { name: "Yard", params: { roomId: this.$yardAPI.store.roomId ?? "" } };
      },
      yardLink(): string {
        return document.location.protocol + "//" +
          document.location.host +
          this.$router.resolve(this.yardRoute).fullPath;
      },
    },
  });
</script>

<style lang="scss">
  .qr-dialog .p-dialog-content {
    display: flex;
  }
</style>
