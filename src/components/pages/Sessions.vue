<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<aside class="menu column is-one-quarter">
					<p class="menu-label">Overview</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/sessions">Sessions</router-link></li>
						<li><router-link to="/analytics/users">Users</router-link></li>
						<li><router-link to="/analytics/apps">Apps &amp; modes</router-link></li>
					</ul>
					<p class="menu-label">Locations</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/locations/countries">Countries</router-link></li>
						<li><router-link to="/analytics/locations/cities">Cities</router-link></li>
						<li><router-link to="/analytics/locations/regions">Regions</router-link></li>
						<li><router-link to="/analytics/locations/zip">ZIP codes</router-link></li>
					</ul>
					<p class="menu-label">Technology</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/browsers/families">Browsers</router-link></li>
						<li><router-link to="/analytics/browsers/engines">Rendering engines</router-link></li>
						<li><router-link to="/analytics/os">Operating systems</router-link></li>
					</ul>
					<p class="menu-label">Devices</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/devices/manufacturers">Manufacturers</router-link></li>
						<li><router-link to="/analytics/devices/models">Models</router-link></li>
						<li><router-link to="/analytics/devices/types">Types</router-link></li>
					</ul>
					<p class="menu-label">Website</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/website/domains">Domains</router-link></li>
						<li><router-link to="/analytics/website/pages">Pages</router-link></li>
						<li><router-link to="/analytics/website/referrers">Referrers</router-link></li>
						<li><router-link to="/analytics/website/referrer-pages">Referrer pages</router-link></li>
					</ul>
					<p class="menu-label">Developer</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/export">Export</router-link></li>
					</ul>
				</aside>
				<main class="column">
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
												<div><i class="fas fa-laptop fa-fw mr"></i>{{item.browser_name || "Unknown browser"}} {{item.browser_version || "Unknown version"}} on {{item.os_name || "Unknown OS"}} {{item.os_version || "Unknown version"}}</div>
												<div><i class="fas fa-globe fa-fw mr"></i>Referred from {{item.referrer_domain || "an unknown referrer"}}</div>
												<div><i class="fas fa-clock fa-fw mr"></i>{{datify(item.created_at).fromNow}} ({{datify(item.created_at).text}})</div>
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
import { sessions } from "../../modules/api";
import constants from "../../modules/constants";
import datify from "../../modules/datify";
const analyticsList = constants.analyticsList;
export default {
	data: () => {
		return {
			isLoading: false,
			data: {},
			column: ""
		}
	},
	mounted() {
		const columnValue = this.$route.params.columnValue;
		const keys = Object.keys(analyticsList);
		let columnName;
		keys.forEach(key => {
			if (analyticsList[key].singular === this.$route.params.columnName) {
				columnName = key;
			}
		});
		console.log(columnName);
		if (!columnName) {
			this.$router.push("/404");
		} else {
			this.column = columnName;
			this.isLoading = true;
			sessions(analyticsList[columnName].column, columnValue, 1).then(result => {
				this.data = result;
				this.isLoading = false;
			});
		}
	},
	methods: {
		paginate() {},
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
		}
	}
}
</script>