import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("./views/Forgot.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/reset/:code",
      name: "reset",
      component: () => import("./views/Reset.vue")
    },
    {
      path: "/my-apis",
      name: "my-apis",
      component: () => import("./views/MyAPIs.vue")
    },
    {
      path: "/:apiKey/analytics",
      name: "analytics",
      component: () => import("./views/Analytics.vue")
    },
    {
      path: "/:apiKey/filter/:key/:value",
      name: "filtered",
      component: () => import("./views/Filtered.vue")
    },
    {
      path: "/:apiKey/explore/:fingerprint",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/:apiKey/config",
      name: "config",
      component: () => import("./views/Config.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/Settings.vue")
    }
  ]
});
