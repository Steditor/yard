import { createApp } from "vue";

import PrimeVue from "primevue/config";

import "./styles/styles";

import App from "./App.vue";
import router from "./router";
import yardAPI from "./yardAPI";

const app = createApp(App)
  .use(router)
  .use(yardAPI)
;

app.use(PrimeVue);

export const vm = app.mount("#app");
