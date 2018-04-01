<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Profile</h2>
						<form @submit.prevent="update">
							<b-field label="Name">
								<b-input type="text" v-model="fields.name" v-bind:disabled="isLoading" placeholder="Enter your full name" />
							</b-field>
							<b-field label="Email">
								<b-input type="email" v-model="fields.email" v-bind:disabled="isLoading" placeholder="Enter your email" />
							</b-field>
							<b-field label="Timezone">
								<b-select expanded v-model="fields.timezone" v-bind:disabled="isLoading" placeholder="Select your timezone">
									<option v-for="option in fields.timezones" :value="option" :key="option">
										{{ option }}
									</option>
								</b-select>
							</b-field>
							<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
								<span>Update settings</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</button>
						</form>
					</div>
					<div class="box">
						<h2 class="title is-4">Email notifications</h2>
						<p>As part of our compliance with the EU's General Data Protection Regulation (GDPR), starting on 25 May 2018, we'll only email you according to the notifications to which you've explicitly opted-in.</p>
						<p>We’re applying GDPR consent and privacy policies to all customers, regardless of location.</p>
						<form @submit.prevent="update">
							<div class="field">
								<b-radio v-model="fields.notifications" v-bind:disabled="isLoading" native-value="never">
									Never send me email notifications
								</b-radio>
							</div>
							<div class="field">
								<b-radio v-model="fields.notifications" v-bind:disabled="isLoading" native-value="0.5">
									When my pageview limit is 50% exhausted
								</b-radio>
							</div>
							<div class="field">
								<b-radio v-model="fields.notifications" v-bind:disabled="isLoading" native-value="0.1">
									When my pageview limit is 90% exhausted
								</b-radio>
							</div>
							<div class="field">
								<b-radio v-model="fields.notifications" v-bind:disabled="isLoading" native-value="1">
									When my pageview limit is 100% exhausted
								</b-radio>
							</div>
							<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
								<span>Update preference</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</button>
						</form>
					</div>

				</main>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import callApi from "../../../modules/api";
import Menu from "./Menu.vue";
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
			isLoading: false,
			fields: {},
			faArrowRight: faArrowRight
		};
	},
	mounted() {
		this.isLoading = true;
		callApi("settings/account")
			.then(response => {
				this.fields = response;
				if (response.timezone === "UTC") {
					fetch("https://freegeoip.net/json/")
						.then(response =>
							response.json().then(json => {
								this.fields.timezone = json.time_zone;
							})
						)
						.catch(error => console.log(error));
				}
			})
			.catch(error => {
				alert(error.message);
			})
			.finally(() => {
				this.isLoading = false;
			});
	},
	methods: {
		update() {
			this.isLoading = true;
			callApi("settings/account", {
				name: this.fields.name,
				email: this.fields.email,
				timezone: this.fields.timezone,
				notifications: this.fields.notifications
			})
				.then(response => {
					this.fields = response;
				})
				.catch(error => {
					alert(error.message);
				})
				.finally(() => {
					this.isLoading = false;
				});
		}
	},
	components: {
		Menu,
		FontAwesomeIcon
	}
};
</script>
