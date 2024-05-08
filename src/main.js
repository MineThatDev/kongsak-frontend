import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import kongsakStyle from "./styles/kongsak/kongsak.scss";

createApp(App)
  .use(Quasar, quasarUserOptions, kongsakStyle)
  .use(store)
  .use(router)
  .mount("#app");
