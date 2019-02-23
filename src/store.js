import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    keys: [],
    lastKey: null
  },
  mutations: {
    updateAuth(store, auth) {
      store.auth = auth;
    },
    updateKeys(store, keys) {
      store.keys = keys;
    },
    updateLastKey(store, key) {
      store.lastKey = key;
    },
    updateKey(store, key, value) {
      store.keys[key] = value;
    },
    logout(store) {
      store.auth = null;
      store.keys = [];
      store.lastKey = null;
    }
  },
  actions: {},
  getters: {
    auth(store) {
      return store.auth;
    },
    lastKey(store) {
      return store.lastKey;
    },
    keys(store) {
      return store.keys;
    }
  },
  plugins: [createPersistedState()]
});
