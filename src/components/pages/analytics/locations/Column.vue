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
							<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
							<div class="title is-6">No results found</div>
						</div>
						<table :class="'table rank-full w-100 mb-0 rank-' + column">
							<tbody>
								<tr v-for="(item, index) in data.results" :key="'data' + index">
									<td>{{index + ((data.currentPage - 1) * 25) + 1}}</td>
									<td :title="item.name"><router-link :to="'/analytics/' + (singular !== 'session' ? 'sessions/' + singular + '/' : 'session/') + slugify(item.name)"><img class="flag-icon is-lg" alt="" :src="getBrowserIcon(item.name)">{{ipify(removeDomain(item.name))}}</router-link></td>
									<td v-if="column === 'sessions'">{{datify(item.created_at).text}} ({{datify(item.created_at).fromNow}})</td>
									<td v-else>{{item.value.toLocaleString()}}</td>
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
import datify from "../../../../modules/datify";
import { callApi, analyticsList, wikipediaIntro } from "../../../../modules/api";
import iconify from "../../../../modules/iconify";
import { mapGetters } from "vuex";
import router from "../../../../modules/router";
const slugs = {
	countries: "country_name",
	cities: "city",
	regions: "region_name",
	zip: "zip_code",
	browsers: "browser_name",
	os: "os_name",
	devices: "device_manufacturer",
	domains: "domain",
	pages: "url",
	referrers: "referrer",
	apps: "event",
	users: "ip",
	sessions: "session_id"
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
			zip: "zip",
			browsers: "browser",
			os: "os",
			devices: "device",
			domains: "domain",
			pages: "page",
			referrers: "referrer",
			apps: "app",
			users: "user",
			sessions: "session"
		};
		if (singularList[this.$route.params.column]) {
			this.singular = singularList[this.$route.params.column];
		}
		const titleList = {
			countries: "Countries",
			cities: "Cities",
			regions: "Regions",
			zip: "ZIP codes",
			browsers: "Browsers",
			os: "Operating systems",
			devices: "Devices",
			domains: "Domains",
			pages: "Pages",
			referrers: "Referrers",
			apps: "Apps & Modes",
			users: "Users",
			sessions: "Sessions"
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
				analyticsList(slugs[this.column], 25)
					.then(data => {
						this.data = data;
					})
					.finally(() => {
						this.data.isLoading = true;
					});
			} else {
				router.push("/");
			}
		},
		paginate() {
			this.data.results = [];
			this.data.isLoading = true;
			setTimeout(() => {
				window.scrollTo(0, 0);
				analyticsList(slugs[this.column], 25, this.data.currentPage).then(data => {
					this.data = data;
				});
			}, 1);
		},
		getBrowserIcon(name) {
			if (this.column !== "regions") {
				if (["devices", "os"].includes(this.column)) {
					return iconify(name, "logo");
				} else if (["domains"].includes(this.column)) {
					return iconify(name, "favicon");
				} else if (["browsers"].includes(this.column)) {
					return iconify(name, "icon");
				} else {
					return iconify(name);
				}
			} else {
				if (iconify(name) === "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.9.0/flags/4x3/us.svg") {
					return iconify(name.split(", ")[0], "flag");
				} else {
					return iconify(name);
				}
			}
		},
		ipify(ip) {
			if (this.column === "sessions") {
				return ip.substring(0, 10);
			} else {
				if (ip && ip.length > 50) {
					return ip.substring(0, 50) + "...";
				} else {
					return ip;
				}
			}
		},
		slugify(x) {
			if (typeof x === "string") {
				x = encodeURIComponent(x);
				return x;
			}
			return x;
		},
		datify(d) {
			return datify(d);
		},
		removeDomain(url) {
			if (!url) return;
			return url.replace(/^.*\/\/[^\/]+/, "");
		}
	},
	components: {
		Menu,
		FilterPanel
	}
};
</script>
