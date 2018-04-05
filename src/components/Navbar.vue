<template>
	<nav class="navbar is-transparent" v-if="user">
		<div class="container">
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Agastya.svg" alt="Agastya logo" height="28"></router-link>
				<div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div id="navbarExampleTransparentExample" class="navbar-menu">
				<div class="navbar-start">
					<!-- <router-link class="navbar-item" to="/">Dashboard</router-link> -->
					<div class="navbar-item has-dropdown is-hoverable">
						<router-link class="navbar-link" to="/analytics/overview">Analytics</router-link>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/analytics/overview">Overview</router-link>
							<router-link class="navbar-item" to="/analytics/apps">Apps &amp; modes</router-link>
							<router-link class="navbar-item" to="/analytics/sessions">User sessions</router-link>
							<hr class="navbar-divider">
							<router-link class="navbar-item" to="/analytics/export">Export data</router-link>
						</div>
					</div>
					<div class="navbar-item has-dropdown is-hoverable">
						<router-link class="navbar-link" to="/customize/plugin">Customize</router-link>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/customize/plugin">Plugin settings</router-link>
							<router-link class="navbar-item" to="/customize/apps">Apps &amp; modes</router-link>
							<router-link class="navbar-item" to="/customize/domains">Domains</router-link>
						</div>
					</div>
				</div>
				<div class="navbar-end">
					<div class="navbar-item has-dropdown is-hoverable">
						<router-link class="navbar-link" to="/settings">
							<img :src="user.profile_picture" alt="" class="avatar">
							{{user.name}}
						</router-link>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/settings/account">Account</router-link>
							<router-link class="navbar-item" to="/settings/subscription">Subscription</router-link>
							<router-link class="navbar-item" to="/settings/billing">Billing</router-link>
							<router-link class="navbar-item" to="/settings/payment">Payment</router-link>
							<router-link class="navbar-item" to="/settings/invoices">Invoices</router-link>
							<hr class="navbar-divider">
							<router-link class="navbar-item" to="/settings/api-keys">Developer API</router-link>
							<a class="navbar-item ito-active" @click.prevent="logout">{{isLoading ? "Logging you out..." : "Logout"}}</a>
						</div>
					</div>
					<div class="navbar-item">
						<div class="field is-grouped">
						<p class="control">
							<router-link class="button is-primary" to="/customize/code">
								<span class="icon">
									<font-awesome-icon :icon="faCode" />
								</span>
								<span>Install code</span>
							</router-link>
						</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../modules/store";
import router from "../modules/router";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faCode from "@fortawesome/fontawesome-free-solid/faCode";
import { callApi } from "../modules/api";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			faCode: faCode,
			isLoading: false
		};
	},
	methods: {
		logout() {
			this.isLoading = true;
			callApi("settings/session/" + this.user.token.refresh, null, null, "DELETE").finally(() => {
				this.isLoading = false;
				if ("sessionStorage" in window) {
					window.sessionStorage.clear();
				}
				store.dispatch("logoutUser");
				router.push("/login");
			});
		}
	},
	components: {
		FontAwesomeIcon
	}
};
</script>
