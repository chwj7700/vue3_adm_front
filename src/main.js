import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import App from "./App.vue";
import pinia from "./stores";

import "./style.css";
import "vuetify/styles";
import "./styles/settings.scss";

const app = createApp(App);

app.use(vuetify).use(router).use(pinia).mount("#app");
