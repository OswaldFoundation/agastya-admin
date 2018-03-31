<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Password</h2>
						<p>You can change your password by entering your current password and new password below. <span v-if="fields.password_last_updated">You last changed your password {{timeify(fields.password_last_updated)}}.</span><span v-else>You've never changed your password before.</span></p>
						<form @submit.prevent="update">
							<b-field label="Current password">
								<b-input type="text" v-model="fields.password" v-bind:disabled="isLoading" placeholder="Enter your password" />
							</b-field>
							<b-field label="New password">
								<b-input type="email" v-model="fields.new_password" v-bind:disabled="isLoading" placeholder="Enter your new password" />
							</b-field>
							<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
								<span>Change password</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</button>
						</form>
					</div>
					<div class="box">
						<h2 class="title is-4">Two-factor authentication</h2>
						<p>
							<span v-if="fields['2fa']" class="has-text-success mr"><font-awesome-icon :icon="faCheck" /></span>
							<span v-else class="has-text-danger mr"><font-awesome-icon :icon="faTimes" /></span>
							<strong>2FA is currently {{fields["2fa"] ? "enabled" : "disabled"}}</strong>
						</p>
						<p>You can use an authenticator application that supports TOTP (like Google Authenticator or 1Password) which can be used to conveniently secure your account. A new token is generated every 30 seconds.</p>
						<!-- <form @submit.prevent="update"> -->
							<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
								<span>Enable 2FA</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</button>
						<!-- </form> -->
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
		callApi("settings/2fa")
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
	methods: {
		update() {
			this.isLoading = true;
			callApi("settings/security", {
				password: this.fields.password,
				new_password: this.fields.new_password
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
		},
		timeify(time) {
			return moment.unix(time).fromNow();
		}
	},
	components: {
		Menu,
		FontAwesomeIcon
	}
};
</script>
