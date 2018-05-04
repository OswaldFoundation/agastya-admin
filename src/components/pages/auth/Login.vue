<template></template>

<script>
import auth from "../../../modules/auth";
import { mapGetters } from "vuex";
import router from "../../../modules/router";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	mounted() {
		if (this.user) {
			router.push("/");
		} else {
			auth.login();
		}
	}
};
</script>
