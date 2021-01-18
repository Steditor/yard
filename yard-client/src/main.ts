import { createApp } from "vue";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import OverlayPanel from "primevue/overlaypanel";
import InputText from "primevue/inputtext";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";

import "./styles/styles";

import App from "./App.vue";
import router from "./router";
import yardAPI from "./yardAPI";

const app = createApp(App)
  .use(router)
  .use(yardAPI)
;

app.use(PrimeVue);
app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("OverlayPanel", OverlayPanel);
app.component("TabPanel", TabPanel);
app.component("TabView", TabView);

export const vm = app.mount("#app");
