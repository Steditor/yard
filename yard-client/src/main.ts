import { createApp } from "vue";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
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
app.use(ConfirmationService);
app.use(ToastService);

export const vm = app.mount("#app");
