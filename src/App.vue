<template>
  <v-app>
    <Nav />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Nav from "@/components/Nav.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["auth"])
  },
  components: {
    Nav
  },
  mounted() {
    if (this.auth && this.auth.token) {
      const instance = axios.create({
        baseURL: "https://developer.oswaldlabs.com/",
        headers: { Authorization: "Bearer " + this.auth.token }
      });
      Vue.prototype.$http = instance;
    }
  },
  watch: {
    auth() {
      if (this.auth && this.auth.token) {
        const instance = axios.create({
          baseURL: "https://developer.oswaldlabs.com/",
          headers: { Authorization: "Bearer " + this.auth.token }
        });
        Vue.prototype.$http = instance;
      }
    }
  }
};
</script>
