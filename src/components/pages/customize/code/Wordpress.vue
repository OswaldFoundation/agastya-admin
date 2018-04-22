<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Your WordPress plugin</h2>
						<p>If you have a WordPress website or blog, you can download and install our plugin, which automatically adds Agastya to your website and has your API key built-in, so it'll only work for you.</p>
						<p>
							<a href="#" target="_blank" rel="noopener noreferrer" class="button is-primary mr">
								<span>Download my plugin</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</a>
						</p>
					</div>
					<div class="box">
						<h2 class="title is-4">Universal WP plugin</h2>
						<p>You can also choose to download the universal WP plugin, but you'll have to first configure it with your API key from the dashboard.</p>
						<p>Your API key is <code>{{api_key}}</code>. The universal WP plugin will not work without it.</p>
						<p>
							<a href="#" target="_blank" rel="noopener noreferrer" class="button is-secondary">
								<span>Download universal plugin</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</a>
						</p>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";
import Menu from "../Menu.vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowRight from "@fortawesome/fontawesome-free-solid/faArrowRight";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			api_key: "",
			faArrowRight: faArrowRight
		};
	},
	mounted() {
		const decoded = jwt_decode(this.user.token.auth);
		this.api_key = decoded.api_key;
	},
	components: {
		Menu,
		FontAwesomeIcon
	}
};
</script>
