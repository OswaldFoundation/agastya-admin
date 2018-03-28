import Vue from "vue";
import "babel-polyfill";
import "whatwg-fetch";

import router from "./modules/router.js";

// Progressive Web App support
if (process.env.NODE_ENV === "production") {
	require("./modules/pwa");
}

import "@oswaldlabs/agastya";
// window.a11ySettings = { token: "5rlsghx", bottom: 75 };

// App
const app = new Vue({
	el: "#app",
	router,
	mounted() {},
	methods: {},
	render() {
		return (
			<div>
				{/* <Nav /> */}
				<transition name="fade" mode="out-in">
					<router-view />
				</transition>
			</div>
		);
	}
});
