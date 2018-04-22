<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Universal implementation</h2>
						<p>You can use the following code to add the Agastya web accessibility widget to any website using HTML and JavaScript.</p>
						<p>Copy and paste the following code before the <code>&lt;/body&gt;</code> tag on all your pages. Alternately, you can also place it before the the <code>&lt;/head&gt;</code> tag, because it's an asynchronously executing script.</p>
						<p><code>&lt;script src="https://api.oswaldlabs.com/agastya-loader/{{api_key}}.js" async defer&gt;&lt;/script&gt;</code></p>
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
