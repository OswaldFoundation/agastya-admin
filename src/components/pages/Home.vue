<template>
	<section class="section">
		<div class="container">
			<h1 class="title">Home</h1>
			<p class="subtitle">Welcome!</p>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../../modules/router";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	mounted() {
		if (!this.user) {
			router.push("/login");
		}
	}
};
</script>
