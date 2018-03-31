import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/pages/Home.vue";
import Error404 from "../components/pages/Error404.vue";

import Login from "../components/pages/auth/Login.vue";

import settingsAccount from "../components/pages/settings/Account.vue";
import settingsSecurity from "../components/pages/settings/Security.vue";

const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/login",
		component: Login,
		meta: {
			title: "Login"
		}
	},
	{
		path: "/settings/account",
		component: settingsAccount,
		alias: "/settings",
		meta: {
			title: "Account / Settings"
		}
	},
	{
		path: "/settings/security",
		component: settingsSecurity,
		alias: "/settings",
		meta: {
			title: "Security / Settings"
		}
	},
	{
		path: "*",
		component: Error404,
		meta: {
			title: "404 Error"
		}
	}
];

Vue.use(VueRouter);
const router = new VueRouter({
	routes,
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		const position = savedPosition || {
			x: 0,
			y: 0
		};
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ x: 0, y: 0 });
			}, 200);
		});
	}
});

export default router;
