<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Subscription</h2>
						{{fields}}
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import callApi from "../../../modules/api";
import Menu from "./Menu.vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowRight from "@fortawesome/fontawesome-free-solid/faArrowRight";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			isLoading: false,
			fields: {},
			faArrowRight: faArrowRight,
			faCheck: faCheck,
			faTimes: faTimes
		};
	},
	mounted() {
		this.isLoading = true;
		callApi("settings/subscription")
			.then(response => {
				this.fields = response;
			})
			.catch(error => {
				alert(error.message);
			})
			.finally(() => {
				this.isLoading = false;
			});
	},
	components: {
		Menu,
		FontAwesomeIcon
	}
};
</script>
