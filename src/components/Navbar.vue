<template>
	<nav class="navbar is-transparent" v-if="user">
		<div class="container">
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Oswald_Labs_Logo.svg" alt="Oswald Labs logo" height="28"></router-link>
				<div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div id="navbarExampleTransparentExample" class="navbar-menu">
				<div class="navbar-start">
					<router-link class="navbar-item" to="/Dashboard">Dashboard</router-link>
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="/analytics/overview">Analytics</a>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/analytics/overview">Overview</router-link>
							<router-link class="navbar-item" to="/analytics/apps">Apps &amp; modes</router-link>
							<router-link class="navbar-item" to="/analytics/user">User sessions</router-link>
							<hr class="navbar-divider">
							<router-link class="navbar-item" to="/analytics/export">Export data</router-link>
						</div>
					</div>
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="#">Customize</a>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/customize/plugin">Plugin settings</router-link>
							<router-link class="navbar-item" to="/customize/apps">Apps &amp; modes</router-link>
							<router-link class="navbar-item" to="/customize/domains">Domains</router-link>
						</div>
					</div>
				</div>
				<div class="navbar-end">
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="#">Anand Chowdhary</a>
						<div class="navbar-dropdown is-boxed">
							<router-link class="navbar-item" to="/settings/account">Account</router-link>
							<router-link class="navbar-item" to="/settings/subscription">Subscription</router-link>
							<router-link class="navbar-item" to="/settings/billing">Billing</router-link>
							<router-link class="navbar-item" to="/settings/payment">Payment</router-link>
							<router-link class="navbar-item" to="/settings/invoices">Invoices</router-link>
							<hr class="navbar-divider">
							<router-link class="navbar-item" to="/settings/api-keys">Developer API</router-link>
							<a class="navbar-item is-active" @click.prevent="logout">Logout</a>
						</div>
					</div>
					<div class="navbar-item">
						<div class="field is-grouped">
						<p class="control">
							<a class="button is-primary" href="/customize/code">
								<span class="icon">
									<font-awesome-icon :icon="faCode" />
								</span>
								<span>Install code</span>
							</a>
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
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			faCode: faCode
		};
	},
	methods: {
		logout() {
			store.dispatch("logoutUser");
			router.push("/");
		}
	},
	components: {
		FontAwesomeIcon
	}
};
</script>
