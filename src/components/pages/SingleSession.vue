<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box" v-if="!isLoading">
						<div class="columns">
							<div class="column" v-if="session.ip">
								<div><strong>IP address</strong></div>
								<div><router-link :to="`/sessions/user/${encode(session.ip)}`">{{session.ip}}</router-link></div>
							</div>
							<div class="column" v-if="session.created_at">
								<div><strong>Started at</strong></div>
								<div>{{datify(session.created_at).text}} ({{datify(session.created_at).fromNow}})</div>
							</div>
						</div>
						<div class="columns">
							<div class="column" v-if="session.session_id">
								<div><strong>Session ID</strong></div>
								<div>{{session.session_id}}</div>
							</div>
							<div class="column is-one-quarter">
								<div><strong>Pageviews</strong></div>
								<div>{{nPageviews}}</div>
							</div>
							<div class="column is-one-quarter" v-if="data.results.length">
								<div><strong>Events</strong></div>
								<div>{{data.results.length}}</div>
							</div>
						</div>
					</div>
					<div class="box" v-if="!isLoading">
						<img v-if="session.country_name" style="margin: -1.25rem -1.25rem 1rem -1.25rem; max-width: calc(100% + 2.5rem); width: calc(100% + 2.5rem)" alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + (session.zip_code ? (session.zip_code + ', ' + session.city + ', ' + session.country_name) : (session.city + ', ' + session.country_name)) + '&size=640x350&sensor=false'">
						<div class="columns">
							<div class="column" v-if="session.country_name">
								<div><strong>Country</strong></div>
								<div><router-link :to="`/sessions/country/${encode(session.country_name)}`">{{session.country_name}}</router-link></div>
							</div>
							<div class="column" v-if="session.region_name">
								<div><strong>Region</strong></div>
								<div><router-link :to="`/sessions/region/${encode(session.region_name)}`">{{session.region_name}}</router-link></div>
							</div>
							<div class="column" v-if="session.city">
								<div><strong>City</strong></div>
								<div><router-link :to="`/sessions/city/${encode(session.city)}`">{{session.city}}</router-link></div>
							</div>
							<div class="column" v-if="session.zip_code">
								<div><strong>ZIP code</strong></div>
								<div><router-link :to="`/sessions/zip/${encode(session.zip_code)}`">{{session.zip_code}}</router-link></div>
							</div>
						</div>
					</div>
					<div class="box" v-if="!isLoading">
						<h2 class="title is-5">Browser</h2>
						<div class="columns">
							<div class="column" v-if="session.browser_name">
								<img alt="" :src="icon(session.browser_name)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px;">
								<router-link :to="'/analytics/sessions/browser/' + encode(session.browser_name)">{{session.browser_name}}</router-link>
							</div>
							<div class="column" v-if="session.browser_version">
								<div><strong>Version</strong></div>
								<div><router-link :to="'/analytics/sessions/browser-version/' + encode(session.browser_version)">{{session.browser_version}}</router-link></div>
							</div>
							<div class="column" v-if="session.browser_subversion">
								<div><strong>Subversion</strong></div>
								<div><router-link :to="'/analytics/sessions/browser-subversion/' + encode(session.browser_subversion)">{{session.browser_subversion}}</router-link></div>
							</div>
							<div class="column" v-if="session.browser_engine">
								<div><strong>Rendering engine</strong></div>
								<div><router-link :to="'/analytics/sessions/engine/' + encode(session.browser_engine)">{{session.browser_engine}}</router-link></div>
							</div>
						</div>
						<h2 class="title is-5">Device</h2>
						<div class="columns">
							<div class="column" v-if="session.device_manufacturer">
								<img alt="" :src="icon(session.device_manufacturer)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px">
								<router-link :to="'/analytics/sessions/manufacturer/' + encode(session.device_manufacturer)">{{session.device_manufacturer}}</router-link>
							</div>
							<div class="column" v-if="session.device_model">
								<div><strong>Model</strong></div>
								<div><router-link :to="'/analytics/sessions/model/' + encode(session.device_model)">{{session.device_model}}</router-link></div>
							</div>
							<div class="column" v-if="session.device_type">
								<div><strong>Type</strong></div>
								<div style="text-transform: capitalize"><router-link :to="'/analytics/sessions/type/' + encode(session.device_type)">{{session.device_type}}</router-link></div>
							</div>
						</div>
						<h2 class="title is-5">Operating system</h2>
						<div class="columns">
							<div class="column" v-if="session.os_name">
								<img alt="" :src="icon(session.os_name)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px">
								<router-link :to="'/analytics/sessions/os/' + encode(session.os_name)">{{session.os_name}}</router-link>
							</div>
							<div class="column" v-if="session.os_version">
								<div><strong>Version</strong></div>
								<div><router-link :to="'/analytics/sessions/os-version/' + encode(session.os_version)">{{session.os_version}}</router-link></div>
							</div>
						</div>
					</div>
					<div class="box">
						<div v-if="isLoading" class="loader loader-2"></div>
						<table :class="'table rank-full w-100 mb-0 rank-' + column">
							<thead>
								<tr>
									<th>Event ID</th>
									<th>Page</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in data.results" :key="'data' + index" v-if="item.value !== 0">
									<td><router-link :to="`/event/${item.id}`">{{item.id}}</router-link></td>
									<td>
										<div :title="item.url"><i class="fas fa-globe fa-fw mr"></i>{{small(item.url)}}</div>
										<div><i class="fas fa-clock fa-fw mr"></i>{{datify(item.created_at).fromNow}} ({{datify(item.created_at).text}})</div>
									</td>
									<td>{{ucfirst(item.action)}} {{item.event}}</td>
								</tr>
							</tbody>
						</table>
						<b-pagination class="mt" v-if="data.pages > 0" @change="paginate" :total="data.records" :current.sync="data.currentPage" :simple="true" :per-page="data.perPage" />
					</div>
					<div class="box" v-if="!isLoading">
						<h2 class="title is-5" style="margin-bottom: 2.5rem">Referrer</h2>
						<div v-if="loadingMicroLink">
							<div class="loader loader-2"></div>
							<div style="text-align: center; margin-bottom: 3rem">Loading info for {{small(session.referrer)}}...</div>
						</div>
						<div v-else-if="metaData.data">
							<img v-if="metaData.data.screenshot.url" style="margin: -1.25rem -1.25rem 1rem -1.25rem; max-width: calc(100% + 2.5rem); width: calc(100% + 2.5rem)" alt=""
							:src="metaData.data.screenshot.url">
							<h1 v-if="metaData.data.title" class="title is-4 mt">{{metaData.data.publisher && metaData.data.publisher !== metaData.data.title ? metaData.data.publisher + ":" : ""}} {{metaData.data.title}}</h1>
							<div v-if="metaData.data.description" class="mb">{{metaData.data.description}}</div>
							<a :href="session.referrer" class="button" target="_blank">
								<img v-if="metaData.data.logo.url" alt="" :src="metaData.data.logo.url">
								Visit {{metaData.data.publisher || "webpage"}}
								<i class="fas fa-arrow-right"></i>
							</a>
						</div>
						<div v-else>
							<p>{{ipify(session.referrer)}}</p>
							<a :href="session.referrer" class="button mt" target="_blank">
								Visit webpage
								<i class="fas fa-arrow-right"></i>
							</a>
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>
<script>
import Menu from "../AnalyticsMenu.vue";
import { events } from "../../modules/api";
import datify from "../../modules/datify";
import iconify from "../../modules/iconify";
import constants from "../../modules/constants";
const analyticsList = constants.analyticsList;
export default {
	data: () => {
		return {
			isLoading: false,
			meta: {},
			metaData: {},
			loadingMicroLink: false,
			data: {
				results: []
			},
			column: "",
			sessionId: "",
			session: {},
			nPageviews: 0
		};
	},
	mounted() {
		this.sessionId = this.$route.params.sessionId;
		this.isLoading = true;
		events(this.sessionId, 1).then(result => {
			this.data = result;
			this.session = result.meta;
			this.isLoading = false;
			this.doAfterLoaded();
		});
	},
	methods: {
		getReferrerDetails(url) {
			this.loadingMicroLink = true;
			const infoTitle = "microlink__" + url;
			if ("sessionStorage" in window && window.sessionStorage[infoTitle]) {
				this.metaData = JSON.parse(window.sessionStorage.getItem(infoTitle));
				this.loadingMicroLink = false;
			} else {
				fetch("https://api.microlink.io/?url=" + url + "&screenshot")
					.then(response =>
						response.json().then(json => {
							window.sessionStorage.setItem(infoTitle, JSON.stringify(json));
							this.metaData = json;
						})
					)
					.catch(() => {})
					.finally(() => {
						this.loadingMicroLink = false;
					});
			}
		},
		doAfterLoaded() {
			if (this.session.referrer) {
				this.getReferrerDetails(this.session.referrer);
			}
			this.nPageviews = 0;
			for (let i = 0; i < this.data.results.length; i++) {
				if (this.data.results[i].action === "pageview") {
					this.nPageviews++;
				}
			}
		},
		paginate() {},
		encode(x) {
			return encodeURIComponent(x);
		},
		datify(d) {
			return datify(d);
		},
		icon(name) {
			return iconify(name, "icon");
		},
		ucfirst(x) {
			return x.charAt(0).toUpperCase() + x.slice(1);
		},
		encode(x) {
			return encodeURIComponent(x);
		},
		small(x) {
			let result = x;
			if (this.column === "sessions") {
				result = x.substring(0, 10);
			} else {
				if (x && x.length > 50) {
					result = x.substring(0, 50) + "...";
				}
			}
			if (this.column === "devices/types") {
				return result.charAt(0).toUpperCase() + result.slice(1);
			} else {
				return result;
			}
		}
	},
	components: {
		Menu
	}
};
</script>
