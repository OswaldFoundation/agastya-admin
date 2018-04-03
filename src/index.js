import Vue from "vue";

import Buefy from "buefy";
Vue.use(Buefy, {
	defaultIconPack: "fas"
});

import "buefy/lib/buefy.css";
import css from "./styles.scss";

import "babel-polyfill";
import "whatwg-fetch";

import store from "./modules/store";
import router from "./modules/router";

import App from "./components/App.vue";

// Progressive Web App support
if (process.env.NODE_ENV === "production") {
	require("./pwa");
}

// import "@oswaldlabs/agastya";
// window.a11ySettings = { token: "5rlsghx", bottom: 75 };

// App
const app = new Vue({
	el: "#app",
	router,
	store,
	mounted() {},
	methods: {},
	render() {
		return <App />;
	}
});
