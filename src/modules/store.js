import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

http: Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: null
	},
	getters: {
		getUser: state => state.user
	},
	mutations: {
		updateUser(state, user) {
			state.user = user;
		},
		logoutUser(state) {
			state.user = null;
		}
	},
	actions: {
		updateUser({ commit, state }, user) {
			if (user) {
				commit("updateUser", user);
			}
		},
		logoutUser(context) {
			context.commit("logoutUser");
		}
	},
	plugins: [createPersistedState()]
});
