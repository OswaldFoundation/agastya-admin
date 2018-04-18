<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel :update="updateRecords" />
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
											<td>{{index + ((country_name.currentPage - 1) * 10) + 1}}</td>
											<td :title="item.name"><router-link :to="'/analytics/sessions/country/' + slugify(item.name)"><img class="flag-icon" alt="" :src="getBrowserIcon(item.name)">{{ipify(item.name)}}</router-link></td>
											<td>{{item.value.toLocaleString()}}</td>
										</tr>
									</tbody>
								</table>
								<div class="columns">
									<div class="column">
										<b-pagination class="mt" v-if="country_name.pages > 0" @change="paginate('country_name')" :total="country_name.records" :current.sync="country_name.currentPage" :simple="true" :per-page="country_name.perPage" />
									</div>
									<div class="column r-b is-one-third">
										<router-link class="button" to="/analytics/locations/countries">More</router-link>
									</div>
								</div>
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Cities</h3>
								<div v-if="city.isLoading" class="loader loader-2"></div>
								<div v-else-if="city.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
									<div class="title is-6">No cities found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in city.results" :key="'city' + index">
											<td>{{index + ((city.currentPage - 1) * 10) + 1}}</td>
											<td :title="item.name"><router-link :to="'/analytics/sessions/city/' + slugify(item.name)">{{ipify(item.name)}}</router-link></td>
											<td>{{item.value.toLocaleString()}}</td>
										</tr>
									</tbody>
								</table>
								<div class="columns">
									<div class="column">
										<b-pagination class="mt" v-if="city.pages > 0" @change="paginate('city')" :total="city.records" :current.sync="city.currentPage" :simple="true" :per-page="city.perPage" />
									</div>
									<div class="column r-b is-one-third">
										<router-link class="button" to="/analytics/locations/cities">More</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Regions</h3>
								<div v-if="region_name.isLoading" class="loader loader-2"></div>
								<div v-else-if="region_name.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
									<div class="title is-6">No regions found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in region_name.results" :key="'region_name' + index">
											<td>{{index + ((region_name.currentPage - 1) * 10) + 1}}</td>
											<td :title="item.name"><router-link :to="'/analytics/sessions/region/' + slugify(item.name)">{{ipify(item.name)}}</router-link></td>
											<td>{{item.value.toLocaleString()}}</td>
										</tr>
									</tbody>
								</table>
								<div class="columns">
									<div class="column">
										<b-pagination class="mt" v-if="region_name.pages > 0" @change="paginate('region_name')" :total="region_name.records" :current.sync="region_name.currentPage" :simple="true" :per-page="region_name.perPage" />
									</div>
									<div class="column r-b is-one-third">
										<router-link class="button" to="/analytics/locations/regions">More</router-link>
									</div>
								</div>
							</div>
						</div>
						<div class="column">
							<div class="box">
								<h3 class="title is-5">ZIP codes</h3>
								<div v-if="zip_code.isLoading" class="loader loader-2"></div>
								<div v-else-if="zip_code.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
									<div class="title is-6">No ZIP codes found</div>
								</div>
								<table class="table rank-half w-100 mb-0">
									<tbody>
										<tr v-for="(item, index) in zip_code.results" :key="'zip_code' + index">
											<td>{{index + ((zip_code.currentPage - 1) * 10) + 1}}</td>
											<td :title="item.name"><router-link :to="'/analytics/sessions/zip/' + slugify(item.name)">{{ipify(item.name)}}</router-link></td>
											<td>{{item.value.toLocaleString()}}</td>
										</tr>
									</tbody>
								</table>
								<div class="columns">
									<div class="column">
										<b-pagination class="mt" v-if="zip_code.pages > 0" @change="paginate('zip_code')" :total="zip_code.records" :current.sync="zip_code.currentPage" :simple="true" :per-page="zip_code.perPage" />
									</div>
									<div class="column r-b is-one-third">
										<router-link class="button" to="/analytics/locations/zip">More</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import Menu from "../Menu.vue";
import FilterPanel from "../FilterPanel.vue";
import { Bar } from "vue-chartjs";
import { callApi, analyticsList, wikipediaIntro } from "../../../../modules/api";
import iconify from "../../../../modules/iconify";
import { mapGetters } from "vuex";
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
			city: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			},
			region_name: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			},
			zip_code: {
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
		this.updateRecords();
	},
	computed: {
		...mapGetters({
			from: "getFrom",
			to: "getTo"
		})
	},
	methods: {
		updateRecords() {
			this.country_name.isLoading = true;
			this.country_name.results = [];
			analyticsList("country_name", 10).then(data => {
				this.country_name = data;
			});
			this.city.isLoading = true;
			this.city.results = [];
			analyticsList("city", 10).then(data => {
				this.city = data;
			});
			this.region_name.isLoading = true;
			this.region_name.results = [];
			analyticsList("region_name", 10).then(data => {
				this.region_name = data;
			});
			this.zip_code.isLoading = true;
			this.zip_code.results = [];
			analyticsList("zip_code", 10).then(data => {
				this.zip_code = data;
			});
		},
		paginate(a) {
			this[a].results = [];
			this[a].isLoading = true;
			setTimeout(() => {
				analyticsList(a, 10, this[a].currentPage).then(data => {
					this[a] = data;
				});
			}, 1);
		},
		getBrowserIcon(name) {
			return iconify(name);
		},
		ipify(ip) {
			if (ip && ip.length > 15) {
				return ip.substring(0, 15) + "...";
			} else {
				return ip;
			}
		},
		slugify(x) {
			if (typeof x === "string") {
				x = encodeURIComponent(x);
				return x;
			}
			return x;
		}
	},
	components: {
		Menu,
		FilterPanel
	}
};
</script>
