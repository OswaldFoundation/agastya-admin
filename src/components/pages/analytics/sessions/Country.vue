<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel />
					<div class="columns">
						<div class="column">
							<div class="card">
								<div class="card-image">
									<figure class="image">
										<img alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + title + '&size=640x400&sensor=false'">
									</figure>
								</div>
								<div class="card-content">
									<h1 class="title is-4 mb-0">{{title}}</h1>
									<div class="content mt">{{intro}}</div>
								</div>
							</div>
						</div>
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
											<td :title="item.name"><router-link :to="'/sessions/country/' + slugify(item.name)"><img class="flag-icon" alt="" :src="getBrowserIcon(item.name)">{{ipify(item.name)}}</router-link></td>
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
			title: "",
			column: "",
			intro: "",
			country_name: {
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
		this.title = this.$route.params.title;
		this.column = this.$route.params.column;
		this.updateRecords();
		wikipediaIntro(this.title)
			.then(intro => {
				this.intro = intro;
			})
			.catch(error => {});
	},
	computed: {
		...mapGetters({
			from: "getFrom",
			to: "getTo"
		})
	},
	watch: {
		from() {
			this.updateRecords();
		},
		to() {
			this.updateRecords();
		}
	},
	methods: {
		updateRecords() {
			this.country_name.isLoading = true;
			this.country_name.results = [];
			analyticsList("country_name", 10).then(data => {
				this.country_name = data;
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
			if (ip.length > 15) {
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
