<template>
  <v-app>
    <Nav />
    <v-content>
      <router-view :key="$route.path" />
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

<style>
body {
  font-family: "Roboto", sans-serif;
}
.margin {
  margin: 4rem 0;
}
* + h2,
.mt {
  margin-top: 2rem;
}
h2 {
  font-weight: normal;
  margin-bottom: 1rem;
}
.tiny-flag {
  height: 2.5rem;
  vertical-align: middle;
  border-radius: 100%;
  margin-right: 1rem;
}
.recent-events a {
  color: inherit;
  text-decoration: none;
}

.form {
  padding: 4rem;
  padding-top: 2rem;
}
.v-input + .v-input {
  margin-top: 1.5rem;
}
.save-button {
  margin-top: 2.5rem;
  font-size: 125%;
}

.card--flex-toolbar {
  margin-top: -64px;
}
.form-reset {
  padding: 2rem;
}
.button-2 {
  margin-top: 1.5rem;
}

.empty-state {
  padding: 2rem 0;
}
.empty-state h1 {
  margin: 1rem 0;
}
.hljs {
  font-size: 100%;
  color: #c0392b;
}
.hljs-attr {
  color: #2980b9;
}
.hljs-string {
  color: #16a085;
}
.p-0 {
  padding: 0 !important;
}

.timeline-inner {
  margin: 0 2rem;
}
.timeline-inner a {
  display: block;
  text-decoration: none;
  margin: 0;
  color: inherit;
}
.unpadded {
  padding: 0;
}
.wrapped {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.tiny-icon {
  font-size: 120%;
  display: inline-block;
  margin-right: 0.25rem;
}
[role="listitem"] {
  border-bottom: 1px solid #ddd;
}
[role="listitem"]:first-of-type {
  border-top: 1px solid #ddd;
}

.recent-events a {
  color: inherit;
  text-decoration: none;
}

.domains-list {
  margin-top: 1.5rem;
}
.json-text code {
  padding: 2rem;
  width: 100%;
}
.json-text code::before,
.json-text code::after {
  display: none;
}
.color-preview {
  padding-left: 2rem;
}
.heading-preview {
  background-color: #aaa;
  padding: 1.5rem;
  border-radius: 0.2rem;
}
.heading-1 {
  font-size: 150%;
}
.heading-2 {
  font-size: 125%;
  opacity: 0.75;
}
.v-input + .v-input,
.elevation-1 + .v-input {
  margin-top: 1.5rem;
}
.circle-preview {
  background-color: gray;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  text-align: center;
  line-height: 5.72rem;
  border-radius: 4rem;
  margin-top: 2rem;
  margin-right: 2rem;
}
.colors {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.colors button {
  background-color: gray;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  margin-right: 1rem;
  position: relative;
}
.colors .inner-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.save-button {
  margin-top: 2.5rem;
  font-size: 125%;
}
.small-submit {
  margin-top: 2rem;
  margin-left: 0;
  margin-bottom: 2rem;
}
.unpadded {
  padding: 0 !important;
}
.integrations .v-card__title {
  padding: 1.9rem;
  padding-bottom: 0;
}
.integrations p {
  margin-bottom: 0.5rem;
}
.emoji-icon {
  margin-right: 1rem;
  font-size: 200%;
  vertical-align: middle;
}
.sample-agastya > div {
  border: 1px solid #aaa;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
}
.sample-agastya > div:first-child {
  margin-top: 0;
}
.sample-agastya .v-input + .v-input {
  margin-top: 0;
}
.fake-card-mode-card {
  width: 50% !important;
}
.emoji-heading {
  display: flex;
  align-items: center;
}
.v-chip .v-avatar.long-avatar {
  width: auto !important;
  border-radius: 100px !important;
  overflow: hidden;
  padding: 0 !important;
}
.v-chip .v-avatar.long-avatar span {
  padding: 1rem !important;
  color: #fff;
}
</style>
