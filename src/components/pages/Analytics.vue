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
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import { list } from "../../modules/api";
const analyticsList = {
	sessions: {
		column: "session_id",
		title: "Sessions"
	}
};
export default {
	data: () => {
		return {
			isLoading: false,
			meta: {}
		}
	},
	mounted() {
		const key = this.$route.params.category;
		if (!analyticsList[key]) {
			this.$router.push("/404");
		} else {
			this.meta = analyticsList[key];
			list(analyticsList[key].column, 1).then(result => {
				console.log("GOT", result);
			});
		}
	}
}
</script>
