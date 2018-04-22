import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/pages/Home.vue";
import Error404 from "../components/pages/Error404.vue";

import Login from "../components/pages/auth/Login.vue";
import Analytics from "../components/pages/Analytics.vue";

import settingsAccount from "../components/pages/settings/Account.vue";
import settingsBilling from "../components/pages/settings/Billing.vue";
import settingsSecurity from "../components/pages/settings/Security.vue";
import settingsSubscription from "../components/pages/settings/Subscription.vue";

import codeUnviersal from "../components/pages/customize/code/Universal.vue";
import codeNpm from "../components/pages/customize/code/Npm.vue";
import codeWordpress from "../components/pages/customize/code/Wordpress.vue";

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
		path: "/settings/billing",
		component: settingsBilling,
		meta: {
			title: "Billing / Settings"
		}
	},
	{
		path: "/settings/security",
		component: settingsSecurity,
		meta: {
			title: "Security / Settings"
		}
	},
	{
		path: "/settings/subscription",
		component: settingsSubscription,
		meta: {
			title: "Subscription / Settings"
		}
	},
	{
		path: "/customize/code",
		component: codeUnviersal,
		meta: {
			title: "Code / Customize"
		}
	},
	{
		path: "/customize/code/npm",
		component: codeNpm,
		meta: {
			title: "NPM / Code / Customize"
		}
	},
	{
		path: "/customize/code/wordpress",
		component: codeWordpress,
		meta: {
			title: "WordPress / Code / Customize"
		}
	},
	{
		path: "/analytics/:category",
		component: Analytics,
		meta: {
			title: "Analytics"
		}
	},
	{
		path: "/analytics/:type/:category",
		component: Analytics,
		meta: {
			title: "Analytics"
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
