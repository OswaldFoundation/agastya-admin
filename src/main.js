import Vue from "vue";
import axios from "axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iconify from "./iconify";
import VueHighlightJS from "vue-highlightjs";
import * as Sentry from "@sentry/browser";
import "./registerServiceWorker";
Sentry.init({
  dsn: "https://f42354e3dbdc4cf091ea761f2ed52ed4@sentry.io/1427894"
});

Vue.config.productionTip = false;
const instance = axios.create({
  baseURL: "https://developer.oswaldlabs.com/"
});
Vue.prototype.$http = instance;
Vue.prototype.iconify = iconify;
Vue.use(VueHighlightJS);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
