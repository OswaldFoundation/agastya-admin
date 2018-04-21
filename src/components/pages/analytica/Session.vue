<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<div v-if="isLoading" class="loader loader-2"></div>
					<div v-else>
						<div class="box">
							<h1 class="title is-4">Session</h1>
							<div class="columns">
								<div class="column" v-if="session.ip">
									<div><strong>IP address</strong></div>
									<div><router-link :to="'/analytics/sessions/user/' + urlencode(session.ip)">{{session.ip}}</router-link></div>
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
								<div class="column is-one-quarter" v-if="sessions.length">
									<div><strong>Events</strong></div>
									<div>{{sessions.length}}</div>
								</div>
							</div>
						</div>
						<div class="box">
							<img v-if="session.country_name" style="margin: -1.25rem -1.25rem 1rem -1.25rem; max-width: calc(100% + 2.5rem); width: calc(100% + 2.5rem)" alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + (session.zip_code ? (session.zip_code + ', ' + session.city + ', ' + session.country_name) : (session.city + ', ' + session.country_name)) + '&size=640x350&sensor=false'">
							<div class="columns">
								<div class="column" v-if="session.country_name">
									<div><strong>Country</strong></div>
									<div><router-link :to="'/analytics/sessions/country/' + urlencode(session.country_name)">{{session.country_name}}</router-link></div>
								</div>
								<div class="column" v-if="session.region_name">
									<div><strong>Region</strong></div>
									<div><router-link :to="'/analytics/sessions/region/' + urlencode(session.region_name)">{{session.region_name}}</router-link></div>
								</div>
								<div class="column" v-if="session.city">
									<div><strong>City</strong></div>
									<div><router-link :to="'/analytics/sessions/city/' + urlencode(session.city)">{{session.city}}</router-link></div>
								</div>
								<div class="column" v-if="session.zip_code">
									<div><strong>ZIP code</strong></div>
									<div><router-link :to="'/analytics/sessions/zip/' + urlencode(session.zip_code)">{{session.zip_code}}</router-link></div>
								</div>
							</div>
						</div>
						<div class="box">
							<h2 class="title is-5">Browser</h2>
							<div class="columns">
								<div class="column" v-if="session.browser_name">
									<img alt="" :src="getBrowserIcon(session.browser_name)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px;">
									<router-link :to="'/analytics/sessions/browser/' + urlencode(session.browser_name)">{{session.browser_name}}</router-link>
								</div>
								<div class="column" v-if="session.browser_version">
									<div><strong>Version</strong></div>
									<div><router-link :to="'/analytics/sessions/browser-version/' + urlencode(session.browser_version)">{{session.browser_version}}</router-link></div>
								</div>
								<div class="column" v-if="session.browser_subversion">
									<div><strong>Subversion</strong></div>
									<div><router-link :to="'/analytics/sessions/browser-subversion/' + urlencode(session.browser_subversion)">{{session.browser_subversion}}</router-link></div>
								</div>
								<div class="column" v-if="session.browser_engine">
									<div><strong>Rendering engine</strong></div>
									<div><router-link :to="'/analytics/sessions/engine/' + urlencode(session.browser_engine)">{{session.browser_engine}}</router-link></div>
								</div>
							</div>
							<h2 class="title is-5">Device</h2>
							<div class="columns">
								<div class="column" v-if="session.device_manufacturer">
									<img alt="" :src="getBrowserIcon(session.device_manufacturer)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px">
									<router-link :to="'/analytics/sessions/manufacturer/' + urlencode(session.device_manufacturer)">{{session.device_manufacturer}}</router-link>
								</div>
								<div class="column" v-if="session.device_model">
									<div><strong>Model</strong></div>
									<div><router-link :to="'/analytics/sessions/model/' + urlencode(session.device_model)">{{session.device_model}}</router-link></div>
								</div>
								<div class="column" v-if="session.device_type">
									<div><strong>Type</strong></div>
									<div style="text-transform: capitalize"><router-link :to="'/analytics/sessions/type/' + urlencode(session.device_type)">{{session.device_type}}</router-link></div>
								</div>
							</div>
							<h2 class="title is-5">Operating system</h2>
							<div class="columns">
								<div class="column" v-if="session.os_name">
									<img alt="" :src="getBrowserIcon(session.os_name)" style="vertical-align: middle; margin-right: 0.5rem; height: 50px">
									<router-link :to="'/analytics/sessions/os/' + urlencode(session.os_name)">{{session.os_name}}</router-link>
								</div>
								<div class="column" v-if="session.os_version">
									<div><strong>Version</strong></div>
									<div><router-link :to="'/analytics/sessions/os-version/' + urlencode(session.os_version)">{{session.os_version}}</router-link></div>
								</div>
							</div>
						</div>
						<div class="box">
							<h2 class="title is-5">Session details</h2>
							<table class="table w-100 mb-0">
								<thead>
									<tr>
										<th>Time</th>
										<th>Page</th>
										<th>Event</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in sessions" :key="'item_' + index">
										<td>{{datify(item.created_at).text}}</td>
										<td><router-link :to="'/analytics/sessions/page/' + urlencode(item.url)">{{removeDomain(item.url)}}</router-link></td>
										<td>{{item.action}} {{item.event}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="box">
							<h2 class="title is-5" style="margin-bottom: 2.5rem">Referrer</h2>
							<div v-if="loadingMicroLink">
								<div class="loader loader-2"></div>
								<div style="text-align: center; margin-bottom: 3rem">Loading info for {{ipify(session.referrer)}}...</div>
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
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import Menu from "./Menu.vue";
import { Bar } from "vue-chartjs";
import { callApi } from "../../../modules/api";
import iconify from "../../../modules/iconify";
import datify from "../../../modules/datify";
import { mapGetters } from "vuex";
import router from "../../../modules/router";
export default {
	data: () => {
		return {
			metaData: {},
			sessionId: "Loading...",
			session: {},
			sessions: [],
			isLoading: false,
			nPageviews: 0,
			loadingMicroLink: true,
		};
	},
	methods: {
		urlencode(s) {
			return encodeURIComponent(s);
		},
		getBrowserIcon(name) {
			return iconify(name, "icon");
		},
		datify(d) {
			return datify(d);
		},
		removeDomain(url) {
			return url.replace(/^.*\/\/[^\/]+/, "");
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
			for (let i = 0; i < this.sessions.length; i++) {
				if (this.sessions[i].action === "pageview") {
					this.nPageviews++;
				}
			}
		}
	},
	mounted() {
		this.isLoading = true;
		this.sessionId = this.$route.params.sessionId;
		if ("sessionStorage" in window && window.sessionStorage["session_" + this.$route.params.sessionId]) {
			this.session = JSON.parse(window.sessionStorage["session_" + this.$route.params.sessionId]).session;
			this.sessions = JSON.parse(window.sessionStorage["session_" + this.$route.params.sessionId]).sessions;
			this.isLoading = false;
			this.doAfterLoaded();
		} else {
			callApi("analytics/session/" + this.$route.params.sessionId)
				.then(data => {
					if ("sessionStorage" in window) {
						window.sessionStorage.setItem("session_" + this.$route.params.sessionId, JSON.stringify(data));
					}
					this.session = data.session;
					this.sessions = data.sessions;
				})
				.catch(error => {})
				.finally(() => {
					this.isLoading = false;
					this.doAfterLoaded();
				});
		}
	},
	components: {
		Menu
	}
};
</script>
