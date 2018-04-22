<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Subscription <span v-if="fields.status" :class="'tag ml ' + fields.status">{{fields.status}}</span></h2>
						<div v-if="isLoading" class="loader loader-2"></div>
						<div v-else>
							<div class="columns">
								<div class="column">
									<div><strong>Subscription ID</strong></div>
									<div>{{fields.id}}</div>
								</div>
								<div class="column">
									<div><strong>Customer ID</strong></div>
									<div>{{fields.customer_id}}</div>
								</div>
								<div class="column">
									<div><strong>Plan ID</strong></div>
									<div>{{fields.plan_id}}</div>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<div><strong>Plan quantity</strong></div>
									<div>{{fields.plan_quantity}}</div>
								</div>
								<div class="column">
									<div><strong>Unit price</strong></div>
									<div>{{fields.currency_code}} {{fields.plan_unit_price / 100}}</div>
								</div>
								<div class="column">
									<div><strong>Billing period</strong></div>
									<div>{{fields.billing_period}} {{fields.billing_period_unit}}</div>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<div><strong>Created</strong></div>
									<div>{{datify(fields.created_at * 1000).fromNow.replace("a ", "1 ")}}</div>
								</div>
								<div class="column">
									<div><strong>Term started</strong></div>
									<div>{{datify(fields.current_term_start * 1000).fromNow.replace("a ", "1 ")}}</div>
								</div>
								<div class="column">
									<div><strong>Next billing</strong></div>
									<div>{{datify(fields.next_billing_at * 1000).fromNow.replace("a ", "1 ")}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="box">
						<h2 class="title is-5">Change subscription</h2>
						<p>Select a new subscription. Your card will be charged right now.</p>
						<form @submit.prevent="update">
							<div class="field">
								<b-select v-model="newSubscription" expanded>
									<option value="pro-25m">25M pageviews/month for €4.999/month</option>
									<option value="pro-10m">10M pageviews/month for €3.999/month</option>
									<option value="pro-5m">5M pageviews/month for €1.999/month</option>
									<option value="pro-1m">1M pageviews/month for €649/month</option>
									<option value="pro-500k">500K pageviews/month for €399/month</option>
									<option value="pro-250k">250K pageviews/month for €249/month</option>
									<option value="pro-100k">100K pageviews/month for €99/month</option>
								</b-select>
							</div>
							<button class="button is-primary">
								<span>Update subscription</span>
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
import moment from "moment";
import datify from "../../../modules/datify";
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
			newSubscription: "pro-100k",
			isLoading: false,
			fields: {}
		};
	},
	mounted() {
		this.isLoading = true;
		callApi("settings/subscription")
			.then(response => {
				this.fields = JSON.parse(response).list[0].subscription;
			})
			.catch(error => {
				alert(error.message);
			})
			.finally(() => {
				this.isLoading = false;
			});
	},
	methods: {
		datify(a) {
			return datify(a);
		},
		update() {}
	},
	components: {
		Menu
	}
};
</script>
