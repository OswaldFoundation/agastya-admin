<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Password</h2>
						<p>You can change your password by entering your current password and new password below. <span v-if="fields.password_last_updated">You last changed your password {{timeify(fields.password_last_updated)}}.</span><span v-else>You've never changed your password before.</span></p>
						<form @submit.prevent="update">
							<b-field label="Current password">
								<b-input type="password" v-model="fields.password" v-bind:disabled="isLoading" placeholder="Enter your password" />
							</b-field>
							<b-field label="New password">
								<b-input type="password" v-model="fields.new_password" v-bind:disabled="isLoading" placeholder="Enter your new password" />
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
							<button @click="start2fa" :class="'button is-primary' + (isLoading ? ' is-loading' : '')" disabled>
								<span>Enable 2FA</span>
								<span><font-awesome-icon :icon="faArrowRight" /></span>
							</button>
							<p class="mt is-size-7 has-text-grey">Get in touch with us if you want to activate two-factor authentication with UNLOQ.</p>
						<!-- </form> -->
					</div>
					<b-modal ref="2famodal" :active.sync="modal">
						<div class="box">
							<h2 class="title is-4">Configutation</h2>
							<p>Scan this QR code in your TOTP authenticator app (like Google Authenticator or 1Password) and enter the one-time password (OTP) below to continue.</p>
							<p v-if="isLoading">Please wait while we generate a QT code for you...</p>
							<div v-else>
								<div style="text-align: center">
									<img alt="QR code" :src="image.src">
								</div>
								<form @submit.prevent="verify2fa">
									<b-field label="One-time password">
										<b-input type="text" v-model="fields.otp" v-bind:disabled="isLoading" placeholder="Enter your one-time password" />
									</b-field>
									<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
										<span>Confirm 2FA</span>
										<span><font-awesome-icon :icon="faArrowRight" /></span>
									</button>
								</form>
							</div>
						</div>
					</b-modal>
					<div class="box">
						<h2 class="title is-4">Active sessions</h2>
						<p>These are all the currently active sessions from your account.</p>
						<table class="table w-100">
							<thead>
								<tr>
									<th>Details</th>
									<th>Created</th>
									<th>Destroy</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="result in fields.sessions" :key="result.token">
									<td>{{result.details}}<strong v-if="result.current"> (current)</strong></td>
									<td>{{timeify(result.createdat)}}</td>
									<td v-if="result.current"><a @click.prevent="deleteSession(result.token)">Logout</a></td>
									<td v-else><a @click.prevent="deleteSession(result.token)">End session</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { callApi } from "../../../modules/api";
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
			modal: false,
			fields: {},
			image: {},
			faArrowRight: faArrowRight,
			faCheck: faCheck,
			faTimes: faTimes
		};
	},
	mounted() {
		this.isLoading = true;
		callApi("settings/security")
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
					alert("Your password has been updated");
				})
				.catch(error => {
					alert(error.message);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		start2fa() {
			this.modal = true;
			this.isLoading = true;
			callApi("user/2fa")
				.then(response => {
					this.image = response.image;
				})
				.catch(error => {
					alert(error.message);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		verify2fa() {
			this.isLoading = true;
			console.log(this.fields.otp);
			callApi("user/2fa", {
				otp: this.fields.otp
			})
				.then(response => {
					// this.fields = response;
					this.$refs["2famodal"].close();
				})
				.catch(error => {
					alert(error.message);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		deleteSession(sessionId) {
			this.isLoading = true;
			callApi("settings/session/" + sessionId, null, null, "DELETE")
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
