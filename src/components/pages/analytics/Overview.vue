<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel />
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
								<div v-if="country_name.isLoading" class="loader loader-2"></div>
								<div v-else-if="country_name.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
									<div class="title is-6">No countries found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in country_name.results" :key="'country_name' + index">
											<td>{{index + ((country_name.currentPage - 1) * 5) + 1}}</td>
											<td><div>{{item.name}}</div></td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
								<b-pagination class="mt" v-if="country_name.pages > 0" @change="paginate('country_name')" :total="country_name.records" :current.sync="country_name.currentPage" :simple="true" :per-page="country_name.perPage" />
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Operating systems</h3>
								<div v-if="os_name.isLoading" class="loader loader-2"></div>
								<div v-else-if="os_name.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/mobile_apps_4wgf.svg">
									<div class="title is-6">No operating systems found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in os_name.results" :key="'os_name' + index">
											<td>{{index + ((os_name.currentPage - 1) * 5) + 1}}</td>
											<td><div><img class="flag-icon" alt="" :src="getBrowserIcon(item.name)">{{item.name}}</div></td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
								<b-pagination class="mt" v-if="os_name.pages > 0" @change="paginate('os_name')" :total="os_name.records" :current.sync="os_name.currentPage" :simple="true" :per-page="os_name.perPage" />
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Users</h3>
								<div v-if="ip.isLoading" class="loader loader-2"></div>
								<div v-else-if="ip.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/through_the_desert_fcin.svg">
									<div class="title is-6">No users found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in ip.results" :key="'ip' + index">
											<td>{{index + ((ip.currentPage - 1) * 5) + 1}}</td>
											<td><div>{{ipify(item.name)}}</div></td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
								<b-pagination class="mt" v-if="ip.pages > 0" @change="paginate('ip')" :total="ip.records" :current.sync="ip.currentPage" :simple="true" :per-page="ip.perPage" />
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Browsers</h3>
								<div v-if="browser_name.isLoading" class="loader loader-2"></div>
								<div v-else-if="browser_name.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/website_setup_5hr2.svg">
									<div class="title is-6">No browsers found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in browser_name.results" :key="'browser_name' + index">
											<td>{{index + ((browser_name.currentPage - 1) * 5) + 1}}</td>
											<td><div><img class="flag-icon" alt="" :src="getBrowserIcon(item.name)">{{item.name}}</div></td>
											<td>{{item.value}}</td>
										</tr>
									</tbody>
								</table>
								<b-pagination class="mt" v-if="browser_name.pages > 0" @change="paginate('browser_name')" :total="browser_name.records" :current.sync="browser_name.currentPage" :simple="true" :per-page="browser_name.perPage" />
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
import FilterPanel from "./FilterPanel.vue";
import { Bar } from "vue-chartjs";
import { callApi, analyticsList } from "../../../modules/api";
import iconify from "../../../modules/iconify";
import { mapState } from "vuex";
export default {
	data: () => {
		return {
			country_name: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			},
			os_name: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			},
			ip: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			},
			browser_name: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			}
		};
	},
	mounted() {
		analyticsList("country_name", 5).then(data => {
			this.country_name = data;
		});
		analyticsList("os_name", 5).then(data => {
			this.os_name = data;
		});
		analyticsList("ip", 5).then(data => {
			this.ip = data;
		});
		analyticsList("browser_name", 5).then(data => {
			this.browser_name = data;
		});
	},
	methods: {
		paginate(a) {
			this[a].results = [];
			this[a].isLoading = true;
			setTimeout(() => {
				analyticsList(a, 5, this[a].currentPage).then(data => {
					this[a] = data;
				});
			}, 1);
		},
		getBrowserIcon(name) {
			return iconify(name);
		},
		ipify(ip) {
			if (ip.length > 15) {
				return ip.substring(0, 15) + "...";
			} else {
				return ip;
			}
		}
	},
	components: {
		Menu,
		FilterPanel
	}
};
</script>
