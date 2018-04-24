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
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	mounted() {
		setTimeout(() => {
			if (!this.user) {
				this.$router.push("/login");
			} else {
				this.$router.push("/analytics/sessions");
			}
			
		}, 100);
	},
	watch: {
		user() {
			if (!this.user) {
				this.$router.push("/login");
			} else {
				this.$router.push("/analytics/sessions");
			}
		}
	}
};
</script>
