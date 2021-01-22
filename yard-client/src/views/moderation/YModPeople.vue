<template>
  <Card>
    <template #title>
      People
    </template>
    <template #content>
      <DataTable :value="people" class="p-datatable-sm">
        <Column header="Username">
          <template #body="slotProps">
            {{slotProps.data.name}}
            <Tag v-if="slotProps.data.id === $yardAPI.store.sessionId" severity="info" value="It's you" />
          </template>
        </Column>
        <Column header="Kick User">
          <template #body="slotProps">
            <Button
              v-if="!slotProps.data.admin"
              icon="pi pi-times" class="p-button-danger p-button-rounded y-button-xs" title="Kick from server"
              @click="kick(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button/Button";
  import Card from "primevue/card/Card";
  import Column from "primevue/column/Column";
  import DataTable from "primevue/datatable/DataTable";
  import Tag from "primevue/tag/Tag";

  export default defineComponent({
    name: "YModPeople",
    components: { Button, Card, Column, DataTable, Tag },
    computed: {
      people() {
        return Array.from(this.$yardAPI.store.players.entries()).map(
          ([ id, player ]) => ({
            id,
            name: player.name,
            admin: player.admin,
          }),
        );
      },
    },
    methods: {
      kick(sessionId: string): void {
        this.$yardAPI.playerAPI.kick(sessionId);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .y-button-xs.p-button-rounded.p-button-icon-only {
    padding: 0;
    height: 1.5rem;
    width: 1.5rem;
  }
</style>
