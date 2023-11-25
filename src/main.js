import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import kongsakStyle from "./styles/kongsak/kongsak.scss";
window.fbAsyncInit = () => {
  // eslint-disable-next-line no-undef
  FB.init({
    appId: "1385356975396251",
    cookie: true,
    xfbml: true,
    version: "v18.0",
  });
  // eslint-disable-next-line no-undef
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

createApp(App)
  .use(Quasar, quasarUserOptions, kongsakStyle)
  .use(store)
  .use(router)
  .mount("#app");
