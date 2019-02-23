import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    keys: []
  },
  mutations: {
    updateAuth(store, auth) {
      store.auth = auth;
    },
    updateKeys(store, keys) {
      store.keys = keys;
    },
    logout(store) {
      store.auth = null;
    }
  },
  actions: {},
  getters: {
    auth(store) {
      return store.auth;
    },
    keys(store) {
      return store.keys;
    }
  },
  plugins: [createPersistedState()]
});
