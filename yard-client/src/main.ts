import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Button from "primevue/components/button/Button";
import Card from "primevue/components/card/Card";
import InputText from "primevue/components/inputtext/InputText";
import TabPanel from "primevue/components/tabpanel/TabPanel";
import TabView from "primevue/components/tabview/TabView";

import "./styles/styles";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import yardConnection from "./yardConnection";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(yardConnection)
;

app.use(PrimeVue);
app.component("Button", Button);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Card", Card);
app.component("InputText", InputText);

export const vm = app.mount("#app");
