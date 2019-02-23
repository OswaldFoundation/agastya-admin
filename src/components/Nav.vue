<template>
  <v-toolbar v-if="visible" dark color="primary">
    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>{{ title }}</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="item in keys" :key="item.apikey" @click="changeKey">
          <v-list-tile-title v-text="item.apiKey"></v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="changeKey">
          <v-list-tile-title>Create another API key</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Analytics</v-btn>
      <v-btn flat>Configuration</v-btn>
      <v-btn flat>Settings</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn flat @click.prevent="logout">Logout</v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["auth", "keys"])
  },
  data() {
    return {
      title: "Agastya by Oswald Labs",
      visible: false
    };
  },
  mounted() {
    if (this.auth && this.auth.token) this.visible = true;
  },
  updated() {
    if (this.auth && this.auth.token) this.visible = true;
  },
  watch: {
    auth() {
      if (this.auth && this.auth.token) this.visible = true;
    },
    $route() {
      if (this.$route.params.apiKey) {
        this.title = this.$route.params.title || this.$route.params.apiKey;
      } else {
        this.title = "Agastya by Oswald Labs";
      }
    }
  },
  methods: {
    changeKey() {},
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
      this.visible = false;
    }
  }
};
</script>
