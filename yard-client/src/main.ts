import { createApp } from "vue";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "./styles/styles";

import App from "./App.vue";
import router from "./router";
import yardAPI from "./yardAPI";

const app = createApp(App)
  .use(router)
  .use(yardAPI)
;

app.use(PrimeVue);
app.use(ToastService);

export const vm = app.mount("#app");
