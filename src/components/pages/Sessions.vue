<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
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
									<img alt="" :src="icon(title)">
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
					<div class="box">
						<div v-if="isLoading" class="loader loader-2"></div>
						<table v-else :class="'table rank-full w-100 mb-0 rank-' + column">
							<thead>
								<tr>
									<th>#</th>
									<th>Event</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in data.results" :key="'data' + index" v-if="item.value !== 0">
									<td style="width: 2.5%">{{index + ((data.currentPage - 1) * 25) + 1}}</td>
									<td class="padded">
										<router-link :to="`/session/${item.session_id}`">
											<div>Session {{item.session_id}}</div>
											<div class="mt-05 " style="color: #363636">
												<div><i class="fas fa-map-marker fa-fw mr"></i>{{item.city || "Unknown city"}}, {{item.region_name || "Unknown region"}}, {{item.country_name || "Unknown country"}}</div>
												<div><i class="fas fa-laptop fa-fw mr"></i>{{item.browser_name || "Unknown browser"}} {{item.browser_version || "Unknown version"}} on {{item.os_name || "Unknown OS"}} {{item.os_version || "(Unknown version)"}}</div>
												<div><i class="fas fa-globe fa-fw mr"></i>Referred from {{item.referrer_domain || "an unknown referrer"}}</div>
												<div><i class="fas fa-clock fa-fw mr"></i>{{datify(item.created_at).fromNow}} {{datify(item.created_at).text}}</div>
												<div class="mt-05 is-size-7 has-text-grey">{{ucfirst(item.action) || "Unknown action"}} on {{item.domain || "Unknown domain"}}</div>
											</div>
										</router-link>
									</td>
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
import { sessions, wikipediaIntro } from "../../modules/api";
import Menu from "../AnalyticsMenu.vue";
import constants from "../../modules/constants";
import datify from "../../modules/datify";
import iconify from "../../modules/iconify";
const analyticsList = constants.analyticsList;
export default {
	data: () => {
		return {
			isLoading: false,
			data: {
				currentPage: 1
			},
			metaData: {
				data: {}
			},
			column: "",
			columnName: "",
			title: "",
			intro: "",
			loadingInfo: true
		};
	},
	mounted() {
		this.title = this.$route.params.columnValue;
		const keys = Object.keys(analyticsList);
		if (["city", "region"].includes(this.$route.params.columnName)) {
			this.title = this.title.split(", ")[0];
		}
		let columnName;
		wikipediaIntro(this.title)
			.then(intro => {
				this.intro = intro;
			})
			.catch(error => {});
		keys.forEach(key => {
			if (analyticsList[key].singular === this.$route.params.columnName) {
				columnName = key;
			}
		});
		if (!columnName) {
			this.$router.push("/404");
		} else {
			this.column = analyticsList[columnName].singular;
			this.columnName = analyticsList[columnName].column;
			this.updateRecords();
			if (columnName === "pages") {
				if ("sessionStorage" in window && window.sessionStorage[this.title]) {
					this.metaData = JSON.parse(window.sessionStorage.getItem(this.title));
					this.loadingInfo = false;
				} else {
					fetch("https://api.microlink.io/?url=" + this.title + "&screenshot")
						.then(response =>
							response.json().then(json => {
								window.sessionStorage.setItem(this.title, JSON.stringify(json));
								this.metaData = json;
							})
						)
						.catch(() => {})
						.finally(() => {
							this.loadingInfo = false;
						});
				}
			}
		}
	},
	methods: {
		updateRecords() {
			this.isLoading = true;
			sessions(this.columnName, this.title, this.data.currentPage).then(result => {
				this.data = result;
				this.isLoading = false;
			});
		},
		paginate(newPage) {
			this.data.currentPage = newPage;
			this.updateRecords();
			window.scrollTo(0, 0);
		},
		ucfirst(x) {
			return x.charAt(0).toUpperCase() + x.slice(1);
		},
		encode(x) {
			return encodeURIComponent(x);
		},
		small(x) {
			return x.substring(0, 10);
		},
		datify(d) {
			return datify(d);
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

		removeDomain(url) {
			if (!url) return;
			return url.replace(/^.*\/\/[^\/]+/, "");
		},
		icon(name) {
			return iconify(name);
		}
	},
	components: {
		Menu
	}
};
</script>
