import Vue from "vue";
import axios from "axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iconify from "./iconify";
import VueHighlightJS from "vue-highlightjs";
import "./registerServiceWorker";

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
