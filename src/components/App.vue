<template>
	<div>
		<Navbar />
		<transition name="fade" mode="out-in">
			<router-view :key="$route.fullPath" />
		</transition>
		<footer class="footer">
			<div class="container">
				<div class="content has-text-centered">
					<p>
						&copy; 2018 <strong>Agastya</strong> by <a href="https://oswaldlabs.com">Oswald Labs</a>
					</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import Navbar from "./Navbar.vue";
import { mapGetters } from "vuex";
export default {
	components: {
		Navbar
	},
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	mounted() {
		if (!this.user) {
			this.$router.push("/login");
		}
	}
};
</script>
