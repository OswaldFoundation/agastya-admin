<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Billing</h2>
						<h2 class="title is-5">Customer details</h2>
						<!-- {{fields}} -->
						<form @submit.prevent="update">
							<div class="columns">
								<div class="column">
									<b-field label="First name">
										<b-input type="text" v-model="fields.customer.first_name" v-bind:disabled="isLoading" placeholder="Enter your first name" />
									</b-field>
								</div>
								<div class="column">
									<b-field label="Last name">
										<b-input type="text" v-model="fields.customer.last_name" v-bind:disabled="isLoading" placeholder="Enter your last name" />
									</b-field>
								</div>
							</div>
							<b-field label="Email">
								<b-input type="email" v-model="fields.customer.email" v-bind:disabled="isLoading" placeholder="Enter your email" />
							</b-field>
							<b-field label="Phone">
								<b-input type="text" v-model="fields.customer.phone" v-bind:disabled="isLoading" placeholder="Enter your phone number" />
							</b-field>
							<b-field label="Company">
								<b-input type="text" v-model="fields.customer.company" v-bind:disabled="isLoading" placeholder="Enter your company name" />
							</b-field>
							<div style="margin: 1rem 0">
								<b-switch v-model="fields.customer.auto_collection" true-value="on" false-value="off">
									Automatically charge my card when a new invoice is generated
								</b-switch>
							</div>
							<h2 class="title is-5">Billing details</h2>
							<div class="columns">
								<div class="column">
									<b-field label="First name">
										<b-input type="text" v-model="fields.customer.billing_address.first_name" v-bind:disabled="isLoading" placeholder="Enter your first name" />
									</b-field>
								</div>
								<div class="column">
									<b-field label="Last name">
										<b-input type="text" v-model="fields.customer.billing_address.last_name" v-bind:disabled="isLoading" placeholder="Enter your last name" />
									</b-field>
								</div>
							</div>
							<b-field label="Address line 1">
								<b-input type="text" v-model="fields.customer.billing_address.line1" v-bind:disabled="isLoading" placeholder="Enter your address line 1" />
							</b-field>
							<b-field label="Address line 2">
								<b-input type="text" v-model="fields.customer.billing_address.line2" v-bind:disabled="isLoading" placeholder="Enter your address line 2" />
							</b-field>
							<b-field label="City">
								<b-input type="text" v-model="fields.customer.billing_address.city" v-bind:disabled="isLoading" placeholder="Enter your city" />
							</b-field>
							<b-field label="State">
								<b-input type="text" v-model="fields.customer.billing_address.state" v-bind:disabled="isLoading" placeholder="Enter your state or region" />
							</b-field>
							<b-field label="ZIP code">
								<b-input type="text" v-model="fields.customer.billing_address.zip" v-bind:disabled="isLoading" placeholder="Enter your PIN/ZIP code" />
							</b-field>
							<button :class="'button is-primary' + (isLoading ? ' is-loading' : '')">
								<span>Update settings</span>
								<span><i class="fas fa-arrow-right"></i></span>
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
import { callApi } from "../../../modules/api";
import Menu from "./Menu.vue";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			isLoading: false,
			fields: {
				customer: {
					billing_address: {},
					first_name: "",
					last_name: ""
				},
				card: {}
			}
		};
	},
	mounted() {
		this.isLoading = true;
		callApi("settings/billing")
			.then(response => {
				this.fields = JSON.parse(response).list[0];
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
			callApi("settings/billing", {
				first_name: this.fields.customer.first_name,
				last_name: this.fields.customer.last_name,
				email: this.fields.customer.email,
				phone: this.fields.customer.phone,
				company: this.fields.customer.company,
				auto_collection: this.fields.customer.auto_collection,
				billing_address_first_name: this.fields.customer.billing_address.first_name,
				billing_address_last_name: this.fields.customer.billing_address.last_name,
				billing_address_line1: this.fields.customer.billing_address.line1,
				billing_address_line2: this.fields.customer.billing_address.line2,
				billing_address_city: this.fields.customer.billing_address.city,
				billing_address_state: this.fields.customer.billing_address.state,
				billing_address_zip: this.fields.customer.billing_address.zip
			})
				.then(response => {
					this.fields = JSON.parse(response);
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
		Menu
	}
};
</script>
