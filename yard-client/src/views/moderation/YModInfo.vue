<template>
  <Card>
    <template #title>
      Yard information
    </template>
    <template #content>
      <p>Hello {{$yardAPI.store.me()?.name}}!</p>
      <p>
        You're currently moderating yard <YCopyable :content="roomId" />.
        Others can join the yard with this key.
        They can also use the link <YCopyable :content="yardLink"><RouterLink :to="yardRoute" target="_blank">{{yardLink}}</RouterLink></YCopyable>.
      </p>
      <p>If you want to allow others to moderate this yard, send them the moderation key <YCopyable :content="moderationKey" /> in addition to the yard link.</p>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Card from "primevue/card/Card";
  import YCopyable from "@/components/YCopyable.vue";
  import { RouteLocationRaw } from "vue-router";

  export default defineComponent({
    name: "YModInfo",
    components: { YCopyable, Card },
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

<style lang="scss" scoped>
</style>
