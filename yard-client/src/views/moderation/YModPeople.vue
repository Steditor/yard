<template>
  <Card>
    <template #title>
      {{numberOfPeople}} {{numberOfPeople === 1 ? 'Person' : 'People'}} on the Yard
    </template>
    <template #content>
      <DataTable :value="people" class="p-datatable-sm">
        <Column header="Username">
          <template #body="slotProps">
            <span>
              {{slotProps.data.name}}
              <Tag v-if="slotProps.data.id === $yardAPI.store.sessionId" severity="info" value="It's you" />
            </span>
          </template>
        </Column>
        <Column header="Kick User">
          <template #body="slotProps">
            <Button
              v-if="!slotProps.data.admin"
              icon="pi pi-times" class="p-button-danger p-button-rounded y-button-xs" title="Kick from server"
              @click="kick($event, slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import Button from "primevue/button";
  import Card from "primevue/card";
  import Column from "primevue/column";
  import DataTable from "primevue/datatable";
  import Tag from "primevue/tag";

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
      numberOfPeople() {
        return this.$yardAPI.store.players.size;
      },
    },
    methods: {
      kick(event: MouseEvent, sessionId: string): void {
        const player = this.$yardAPI.store.players.get(sessionId);
        if (player) {
          this.$confirm.require({
            target: event.currentTarget as Element,
            message: `Are you sure you want to kick ${player.name}?`,
            icon: "pi pi-question-circle",
            accept: () => this.$yardAPI.playerAPI.kick(sessionId),
            acceptClass: "p-button-danger",
          });
        }
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
