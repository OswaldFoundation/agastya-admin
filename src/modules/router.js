import Vue from "vue";
import VueRouter from "vue-router";

import Error404 from "../components/pages/Error404.vue";
import Login from "../components/pages/auth/Login.vue";
import Callback from "../components/pages/auth/Callback.vue";

const routes = [
	{
		path: "/login",
		component: Login,
		meta: {
			title: "Login"
		}
	},
	{
		path: "/callback",
		component: Callback,
		meta: {
			title: "Callback"
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
