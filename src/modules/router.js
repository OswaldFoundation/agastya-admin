import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/pages/Home.vue";
import Error404 from "../components/pages/Error404.vue";

import Login from "../components/pages/auth/Login.vue";

import settingsAccount from "../components/pages/settings/Account.vue";
import settingsSecurity from "../components/pages/settings/Security.vue";
import settingsSubscription from "../components/pages/settings/Subscription.vue";

import codeUnviersal from "../components/pages/customize/code/Universal.vue";
import codeNpm from "../components/pages/customize/code/Npm.vue";
import codeWordpress from "../components/pages/customize/code/Wordpress.vue";

import analyticsOverview from "../components/pages/analytics/Overview.vue";
import analyticsLocations from "../components/pages/analytics/locations/Locations.vue";
import analyticsLocationsColumn from "../components/pages/analytics/locations/Column.vue";
import analyticsSessionColumn from "../components/pages/analytics/sessions/Column.vue";
import analyticsSessionSingle from "../components/pages/analytics/Session.vue";

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
		path: "/analytics/overview",
		component: analyticsOverview,
		alias: "/analytics",
		meta: {
			title: "Overview / Analytics"
		}
	},
	{
		path: "/analytics/locations",
		component: analyticsLocations,
		meta: {
			title: "Locations / Analytics"
		}
	},
	{
		path: "/analytics/session/:sessionId",
		component: analyticsSessionSingle,
		meta: {
			title: "Session / Analytics"
		}
	},
	{
		path: "/analytics/locations/:column",
		component: analyticsLocationsColumn,
		meta: {
			title: "Locations / Analytics"
		}
	},
	{
		path: "/analytics/technology/:column",
		component: analyticsLocationsColumn,
		meta: {
			title: "Technology / Analytics"
		}
	},
	{
		path: "/analytics/website/:column",
		component: analyticsLocationsColumn,
		meta: {
			title: "Website / Analytics"
		}
	},
	{
		path: "/analytics/sessions/:column/:title",
		component: analyticsSessionColumn,
		meta: {
			title: "Sessions / Analytics"
		}
	},
	{
		path: "/analytics/:column/",
		component: analyticsLocationsColumn,
		meta: {
			title: "Analytics"
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
