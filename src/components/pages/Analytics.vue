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
						<li class="subnav">
							<router-link to="/analytics/locations/countries">Locations</router-link>
							<ul>
								<li><router-link to="/analytics/locations/countries">Countries</router-link></li>
								<li><router-link to="/analytics/locations/cities">Cities</router-link></li>
								<li><router-link to="/analytics/locations/regions">Regions</router-link></li>
								<li><router-link to="/analytics/locations/zip">ZIP codes</router-link></li>
							</ul>
						</li>
					</ul>
					<p class="menu-label">Technology</p>
					<ul class="menu-list">
						<li class="subnav">
							<router-link to="/analytics/technology/browsers">Browsers</router-link>
							<ul>
								<li><router-link to="/analytics/technology/browsers/families">Families</router-link></li>
								<li><router-link to="/analytics/technology/browsers/engines">Engines</router-link></li>
								<li><router-link to="/analytics/technology/browsers/versions">Versions</router-link></li>
								<li><router-link to="/analytics/technology/browsers/subversions">Subversions</router-link></li>
							</ul>
						</li>
						<li class="subnav">
							<router-link to="/analytics/technology/os">Operating systems</router-link>
							<ul>
								<li><router-link to="/analytics/technology/os/families">Families</router-link></li>
								<li><router-link to="/analytics/technology/os/versions">Versions</router-link></li>
							</ul>
						</li>
						<li class="subnav">
							<router-link to="/analytics/technology/devices">Devices</router-link>
							<ul>
								<li><router-link to="/analytics/technology/devices/manufacturers">Manufacturers</router-link></li>
								<li><router-link to="/analytics/technology/devices/models">Models</router-link></li>
								<li><router-link to="/analytics/technology/devices/types">Types</router-link></li>
							</ul>
						</li>
					</ul>
					<p class="menu-label">Website</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/website/domains">Domains</router-link></li>
						<li><router-link to="/analytics/website/pages">Pages</router-link></li>
						<li><router-link to="/analytics/website/referrers">Referrers</router-link></li>
					</ul>
					<p class="menu-label">Developer</p>
					<ul class="menu-list">
						<li><router-link to="/analytics/export">Export</router-link></li>
					</ul>
				</aside>
				<main class="column">
					<div v-if="isLoading" class="loader loader-2"></div>
					<div v-else>
						<div class="box">
							<h1 class="title is-4">{{meta.title}}</h1>
							<table :class="'table rank-full w-100 mb-0 rank-' + column">
								<thead>
									<tr>
										<th>#</th>
										<th>{{meta.column_title}}</th>
										<th>Events</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in data.results" :key="'data' + index">
										<td>{{index + ((data.currentPage - 1) * 25) + 1}}</td>
										<td :title="item.name">
											<router-link :to="'/analytics/'">{{item.name}}</router-link>
										</td>
										<td style="width: 20%">{{item.value.toLocaleString()}}</td>
									</tr>
								</tbody>
							</table>
							<b-pagination class="mt" v-if="data.pages > 0" @change="paginate" :total="data.records" :current.sync="data.currentPage" :simple="true" :per-page="data.perPage" />
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import { list } from "../../modules/api";
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
		const key = this.$route.params.category;
		if (!analyticsList[key]) {
			this.$router.push("/404");
		} else {
			this.column = key;
			this.meta = analyticsList[key];
			list(analyticsList[key].column, 1).then(result => {
				this.data = result;
			});
		}
	},
	methods: {
		paginate() {}
	}
}
</script>
