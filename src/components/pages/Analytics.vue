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
						<h1 class="title is-4">{{meta.title}}</h1>
						<div v-if="isLoading" class="loader loader-2"></div>
						<table v-else :class="'table rank-full w-100 mb-0 rank-' + column">
							<thead>
								<tr>
									<th>#</th>
									<th>{{meta.column_title}}</th>
									<th>Events</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in data.results" :key="'data' + index" v-if="item.value !== 0">
									<td>{{index + ((data.currentPage - 1) * 25) + 1}}</td>
									<td :title="item.name">
										<router-link :to="`/analytics/${meta.singular}/${encode(item.name) || 'null'}`">
											<img v-if="icon(item.name)" class="flag-icon is-lg" alt="" :src="icon(item.name)">
											{{small(item.name) || "Unknown"}}
										</router-link>
									</td>
									<td style="width: 20%">{{item.value.toLocaleString()}}</td>
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
import { list } from "../../modules/api";
import iconify from "../../modules/iconify";
import constants from "../../modules/constants";
const analyticsList = constants.analyticsList;
export default {
	data: () => {
		return {
			isLoading: false,
			meta: {},
			data: {},
			column: ""
		}
	},
	mounted() {
		const key = this.$route.params.type ? (this.$route.params.type + "/" + this.$route.params.category) : this.$route.params.category;
		if (!analyticsList[key]) {
			this.$router.push("/404");
		} else {
			this.column = key;
			this.meta = analyticsList[key];
			this.isLoading = true;
			list(analyticsList[key].column, 1).then(result => {
				this.data = result;
				this.isLoading = false;
			});
		}
	},
	methods: {
		paginate() {},
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
		},
		icon(name) {
			if (this.column !== "regions") {
				if (["devices/manufacturers", "os"].includes(this.column)) {
					return iconify(name, "logo");
				} else if (["domains"].includes(this.column)) {
					return iconify(name, "favicon");
				} else if (["browsers/engines"].includes(this.column)) {
					return iconify(name, " browser logo");
				} else if (["devices/models"].includes(this.column)) {
					return iconify(name, " png");
				} else if (["website/referrers", "website/referrer-pages"].includes(this.column)) {
					if (this.column === "website/referrer-pages") {
						let hostname;
						if (name.indexOf("://") > -1) {
							hostname = name.split('/')[2];
						} else {
							hostname = name.split('/')[0];
						}
						hostname = hostname.split(':')[0];
						hostname = hostname.split('?')[0];
						return `https://logo.clearbit.com/${hostname}`;
					} else {
						return `https://logo.clearbit.com/${name}`;
					}
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
		}
	}
}
</script>