<template>
  <Card>
    <template #title>
      {{ numberOfPeople }} {{ numberOfPeople === 1 ? "Person" : "People" }} on
      the Yard
    </template>
    <template #content>
      <DataTable :value="people" class="p-datatable-sm">
        <Column header="Username">
          <template #body="slotProps">
            <span>
              {{ slotProps.data.name }}
              <Tag
                v-if="slotProps.data.id === $yardAPI.store.sessionId"
                severity="success"
                value="It's you"
                class="ml-1"
              />
              <Tag
                v-if="slotProps.data.spectator"
                severity="help"
                value="spectator"
                class="ml-1 p-tag-help"
              />
              <Tag
                v-if="slotProps.data.admin"
                severity="warning"
                value="admin"
                class="ml-1"
              />
            </span>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-help p-button-rounded y-button-xs"
              title="Convert to spectator"
              v-if="!slotProps.data.spectator"
              @click="convertPlayer(slotProps.data.id, true)"
            />
            <Button
              icon="pi pi-user"
              class="p-button-info p-button-rounded y-button-xs"
              title="Convert to player"
              v-if="slotProps.data.spectator"
              @click="convertPlayer(slotProps.data.id, false)"
            />
            <Button
              :disabled="slotProps.data.id === $yardAPI.store.sessionId"
              icon="pi pi-angle-double-up"
              class="p-button-warning p-button-rounded y-button-xs ml-1"
              title="Upgrade to admin"
              v-if="!slotProps.data.admin"
              @click="convertUser(slotProps.data.id, true)"
            />
            <Button
              :disabled="slotProps.data.id === $yardAPI.store.sessionId"
              icon="pi pi-angle-double-down"
              class="p-button-info p-button-rounded y-button-xs ml-1"
              title="Downgrade to user"
              v-if="slotProps.data.admin"
              @click="convertUser(slotProps.data.id, false)"
            />
            <Button
              :disabled="slotProps.data.admin"
              icon="pi pi-ban"
              class="p-button-danger p-button-rounded y-button-xs ml-1"
              title="Kick from server"
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
          ([id, player]) => ({
            id,
            name: player.name,
            admin: player.admin,
            spectator: player.spectator,
          }),
        );
      },
      numberOfPeople() {
        return this.$yardAPI.store.players.size;
      },
    },
    methods: {
      convertPlayer(sessionId: string, spectator: boolean): void {
        this.$yardAPI.playerAPI.convertPlayer(sessionId, spectator);
      },
      convertUser(sessionId: string, admin: boolean): void {
        this.$yardAPI.playerAPI.convertUser(sessionId, admin);
      },
      kick(event: MouseEvent, sessionId: string): void {
        const player = this.$yardAPI.store.players.get(sessionId);
        if (player) {
          this.$confirm.require({
            target: event.currentTarget as HTMLElement,
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
