import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

http: Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		user: null,
		from: new Date(new Date().setDate(new Date().getDate() - 1)),
		to: new Date(new Date().setDate(new Date().getDate() + 1))
	},
	getters: {
		getUser: state => state.user,
		getFrom: state => state.from,
		getTo: state => state.to
	},
	mutations: {
		updateUser(state, user) {
			state.user = user;
		},
		updateFrom(state, from) {
			state.from = from;
		},
		updateTo(state, to) {
			state.to = to;
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
		updateFrom({ commit, state }, from) {
			if (from) {
				commit("updateFrom", from);
			}
		},
		updateTo({ commit, state }, to) {
			if (to) {
				commit("updateTo", to);
			}
		},
		logoutUser(context) {
			context.commit("logoutUser");
		}
	},
	plugins: [createPersistedState()]
});
