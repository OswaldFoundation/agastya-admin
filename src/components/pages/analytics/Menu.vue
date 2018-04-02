<template>
	<aside class="menu column is-one-quarter">
		<div>
			<p class="menu-label">Overview</p>
			<ul class="menu-list">
				<li><router-link to="/analytics/overview">Overview</router-link></li>
				<li><router-link to="/analytics/sessions">Sessions</router-link></li>
				<li><router-link to="/analytics/apps">Apps &amp; modes</router-link></li>
				<li>
					<router-link to="/analytics/locations">Locations</router-link>
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
				<li><router-link to="/analytics/browsers">Browsers</router-link></li>
				<li><router-link to="/analytics/os">Operating systems</router-link></li>
				<li><router-link to="/analytics/devices">Devices</router-link></li>
			</ul>
			<p class="menu-label">Website</p>
			<ul class="menu-list">
				<li><router-link to="/analytics/domains">Domains</router-link></li>
				<li><router-link to="/analytics/pages">Pages</router-link></li>
				<li><router-link to="/analytics/referrers">Referrers</router-link></li>
			</ul>
			<p class="menu-label">Developer</p>
			<ul class="menu-list">
				<li><router-link to="/analytics/export">Export</router-link></li>
				<li><a @click.prevent="clearCache">Clear cache</a></li>
			</ul>
		</div>
	</aside>
</template>

<script>
export default {
	methods: {
		clearCache() {
			if ("sessionStorage" in window) {
				window.sessionStorage.clear();
			}
			alert("Cache has been cleared!");
		}
	}
};
</script>
