<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<Filter />
					<div class="box">
						<h2 class="title is-4">Overview</h2>
						<div class="columns">
							<div class="column">
								<div class="title is-5 mb-0">0%</div>
								<div>quota</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>pageviews</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>events</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>sessions</div>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Countries</h3>
								<table class="table w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in countries.results" :key="'countries' + index">
											<td>{{index + 1}}</td>
											<td>{{item.name}}</td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
								<b-pagination :total="countries.records" :current.sync="countries.currentPage" :simple="true" :per-page="countries.perPage" />
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Operating systems</h3>
								<table class="table w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in oses.results" :key="'oses' + index">
											<td>{{index + 1}}</td>
											<td>{{item.name}}</td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Users</h3>
								<table class="table w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in users.results" :key="'users' + index">
											<td>{{index + 1}}</td>
											<td>{{item.name}}</td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Browsers</h3>
								<table class="table w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in browsers.results" :key="'browsers' + index">
											<td>{{index + 1}}</td>
											<td>
												<img class="flag-icon" alt="" :src="'https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/' + item.name.toLowerCase().replace(/\s+/g, '-') + '/' + item.name.toLowerCase().replace(/\s+/g, '-') + '_48x48.png'">
												{{item.name}}
											</td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import Menu from "./Menu.vue";
import Filter from "./Filter.vue";
import { Bar } from "vue-chartjs";
import { callApi, analyticsList } from "../../../modules/api";
import { mapState } from "vuex";
export default {
	data: () => {
		return {
			countries: [],
			oses: [],
			browsers: [],
			users: [],
			isLoading: false
		};
	},
	mounted() {
		analyticsList("country_name", 5).then(data => {
			this.countries = data;
		});
		analyticsList("os_name", 5).then(data => {
			this.oses = data;
		});
		analyticsList("ip", 5).then(data => {
			this.users = data;
		});
		analyticsList("browser_name", 5).then(data => {
			this.browsers = data;
		});
	},
	components: {
		Menu,
		Filter
	}
};
</script>
