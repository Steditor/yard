import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Button from "primevue/components/button/Button";

import "./styles/styles";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)
  .use(store)
  .use(router);

app.use(PrimeVue);
app.component("Button", Button);

app.mount("#app");
