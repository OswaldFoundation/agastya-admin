<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel />
					<div class="box">
						<h3 class="title is-5">{{title}}</h3>
						<div v-if="data.isLoading" class="loader loader-2"></div>
						<div v-else-if="data.results.length === 0" class="empty-state">
							<img v-if="column === 'countries'" alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
							<div class="title is-6">No results found</div>
						</div>
						<table class="table rank-full w-100 mb-0">
							<tbody>
								<tr v-for="(item, index) in data.results" :key="'data' + index">
									<td>{{index + ((data.currentPage - 1) * 25) + 1}}</td>
									<td :title="item.name"><router-link :to="'/analytics/sessions/' + singular + '/' + slugify(item.name)"><img class="flag-icon is-lg" alt="" :src="getBrowserIcon(item.name)">{{ipify(item.name)}}</router-link></td>
									<td>{{item.value.toLocaleString()}}</td>
								</tr>
							</tbody>
						</table>
						<b-pagination class="mt" v-if="data.pages > 0" @change="paginate" :total="data.records" :current.sync="data.currentPage" :simple="true" :per-page="data.perPage" />
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
import router from "../../../../modules/router";
const slugs = {
	countries: "country_name",
	cities: "city",
	regions: "region_name",
	zip: "zip_code"
};
export default {
	data: () => {
		return {
			column: "",
			title: "",
			singular: "country",
			data: {
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
		this.column = this.$route.params.column;
		this.updateRecords();
		const singularList = {
			countries: "country",
			cities: "city",
			regions: "region",
			zip: "zip"
		};
		if (singularList[this.$route.params.column]) {
			this.singular = singularList[this.$route.params.column];
		}
		const titleList = {
			countries: "Countries",
			cities: "Cities",
			regions: "Regions",
			zip: "ZIP codes"
		};
		if (titleList[this.$route.params.column]) {
			this.title = titleList[this.$route.params.column];
		}
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
			this.data.isLoading = true;
			this.data.results = [];
			if (slugs[this.column]) {
				analyticsList(slugs[this.column], 25).then(data => {
					this.data = data;
				});
			} else {
				router.push("/");
			}
		},
		paginate() {
			this.data.results = [];
			this.data.isLoading = true;
			setTimeout(() => {
				analyticsList(slugs[this.column], 25, this.data.currentPage).then(data => {
					window.scrollTo(0, 0);
					this.data = data;
				});
			}, 1);
		},
		getBrowserIcon(name) {
			return iconify(name);
		},
		ipify(ip) {
			if (ip && ip.length > 50) {
				return ip.substring(0, 50) + "...";
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
