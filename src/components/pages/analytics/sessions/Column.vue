<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel />
					<div class="box" v-if="column === 'page'">
						<div v-if="loadingInfo">
							<div class="loader loader-2"></div>
							<div style="text-align: center; margin-bottom: 3rem">Loading info for {{title}}...</div>
						</div>
						<div v-else>
							<img v-if="metaData.data.screenshot.url" style="margin: -1.25rem -1.25rem 1rem -1.25rem; max-width: calc(100% + 2.5rem); width: calc(100% + 2.5rem)" alt=""
							:src="metaData.data.screenshot.url">
							<h1 v-if="metaData.data.title" class="title is-4 mt">{{metaData.data.title}}</h1>
							<div v-if="metaData.data.description">{{metaData.data.description}}</div>
							<a :href="title" class="button mt" target="_blank">
								<img v-if="metaData.data.logo.url" alt="" :src="metaData.data.logo.url">
								Visit webpage
								<i class="fas fa-arrow-right"></i>
							</a>
						</div>
					</div>
					<div v-else class="box">
						<div v-if="column === 'country'">
							<div class="columns">
								<div class="column">
									<img alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + title + '&size=600x450&sensor=false'">
								</div>
								<div class="column">
									<img alt="" :src="getBrowserIcon(title)">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + title + '+culture' + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
							</div>
						</div>
						<div v-if="column === 'city' || column === 'region'">
							<div class="columns">
								<div class="column">
									<img alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + title + '&size=600x450&sensor=false'">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + only(title) + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + title + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
							</div>
						</div>
						<h1 class="title is-4 mb-0 mt">{{title}}</h1>
						<div class="content mt">{{intro}}</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Sessions</h3>
								<div v-if="data.isLoading" class="loader loader-2"></div>
								<div v-else-if="data.results.length === 0" class="empty-state">
									<img alt="" src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/address_udes.svg">
									<div class="title is-6">No results found</div>
								</div>
								<table class="table rank-full w-100 mb-0 rank-sessions">
									<tbody>
										<tr v-for="(item, index) in data.results" :key="'data' + index">
											<td>{{index + ((data.currentPage - 1) * 25) + 1}}</td>
											<td :title="item.name"><router-link :to="'/analytics/session/' + item.session_id">{{ipify(removeDomain(item.session_id))}}</router-link></td>
											<td>{{datify(item.created_at).text}} ({{datify(item.created_at).fromNow}})</td>
										</tr>
									</tbody>
								</table>
								<b-pagination class="mt" v-if="data.pages > 0" @change="paginate" :total="data.records" :current.sync="data.currentPage" :simple="true" :per-page="data.perPage" />
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
import datify from "../../../../modules/datify";
export default {
	data: () => {
		return {
			title: "",
			column: "",
			intro: "",
			searchColumn: "",
			loadingInfo: false,
			metaData: {},
			data: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 1
			}
		};
	},
	mounted() {
		this.title = this.$route.params.title;
		this.column = this.$route.params.column;
		let wikiTitle = this.title;
		if (["city", "region"].includes(this.$route.params.column)) {
			wikiTitle = wikiTitle.split(", ")[0];
		}
		wikipediaIntro(wikiTitle)
			.then(intro => {
				this.intro = intro;
			})
			.catch(error => {});
		const searchCols = {
			user: "ip",
			country: "country_name",
			region: "region_name",
			city: "city",
			zip: "zip_code",
			browser: "browser_name",
			"browser-version": "browser_version",
			"browser-subversion": "browser_subversion",
			engine: "browser_engine",
			manufacturer: "device_manufacturer",
			model: "device_model",
			type: "device_type",
			os: "os_name",
			"os-version": "os_version",
			page: "url",
			app: "event",
			domain: "domain",
			referrer: "referrer"
		};
		if (searchCols[this.$route.params.column]) {
			this.searchColumn = searchCols[this.$route.params.column];
		} else {
			this.$router.push("/");
		}
		this.updateRecords();
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
			const perPage = 20;
			let currentPage = this.data.currentPage;
			const from = parseInt(this.from.getTime() / 1000);
			const to = parseInt(this.to.getTime() / 1000);
			const dataTitle = "session_list__" + this.searchColumn + perPage + "_" + currentPage + "_" + from + to + this.title;
			if ("sessionStorage" in window && window.sessionStorage[dataTitle]) {
				this.data = JSON.parse(window.sessionStorage.getItem(dataTitle));
			} else {
				callApi("analytics/sessions", {
					column: this.searchColumn,
					value: this.title,
					perPage: perPage,
					currentPage: currentPage,
					from: from,
					to: to
				})
					.then(data => {
						if ("sessionStorage" in window) {
							window.sessionStorage.setItem(dataTitle, JSON.stringify(data));
						}
						this.data = data;
					})
					.catch(error => {});
			}
			this.loadingInfo = true;
			const infoTitle = "microlink__" + this.title;
			if (this.column === "page") {
				if ("sessionStorage" in window && window.sessionStorage[infoTitle]) {
					this.metaData = JSON.parse(window.sessionStorage.getItem(infoTitle));
					this.loadingInfo = false;
				} else {
					fetch("https://api.microlink.io/?url=" + this.title + "&screenshot")
						.then(response =>
							response.json().then(json => {
								window.sessionStorage.setItem(infoTitle, JSON.stringify(json));
								this.metaData = json;
							})
						)
						.catch(() => {})
						.finally(() => {
							this.loadingInfo = false;
						});
				}
			}
		},
		paginate() {
			this.data.results = [];
			this.data.isLoading = true;
			setTimeout(() => {
				this.updateRecords();
			}, 1);
		},
		getBrowserIcon(name) {
			return iconify(name);
		},
		ipify(ip) {
			if (ip) {
				return ip.substring(0, 10);
			}
		},
		slugify(x) {
			if (typeof x === "string") {
				x = encodeURIComponent(x);
				return x;
			}
			return x;
		},
		only(title) {
			return title.split(", ")[0];
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
