<template>
	<aside class="menu column is-one-quarter">
		<p class="menu-label">Overview</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/sessions">Sessions</router-link></li>
			<li><router-link to="/analytics/users">Users</router-link></li>
			<li><router-link to="/analytics/apps">Apps &amp; modes</router-link></li>
		</ul>
		<p class="menu-label">Locations</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/countries">Countries</router-link></li>
			<li><router-link to="/analytics/cities">Cities</router-link></li>
			<li><router-link to="/analytics/regions">Regions</router-link></li>
			<li><router-link to="/analytics/zip">ZIP codes</router-link></li>
		</ul>
		<p class="menu-label">Technology</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/browsers">Browsers</router-link></li>
			<li><router-link to="/analytics/engines">Rendering engines</router-link></li>
			<li><router-link to="/analytics/os">Operating systems</router-link></li>
		</ul>
		<p class="menu-label">Devices</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/manufacturers">Manufacturers</router-link></li>
			<li><router-link to="/analytics/models">Models</router-link></li>
			<li><router-link to="/analytics/types">Types</router-link></li>
		</ul>
		<p class="menu-label">Website</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/domains">Domains</router-link></li>
			<li><router-link to="/analytics/pages">Pages</router-link></li>
			<li><router-link to="/analytics/referrers">Referrers</router-link></li>
			<li><router-link to="/analytics/referrer-pages">Referrer pages</router-link></li>
		</ul>
		<p class="menu-label">Developer</p>
		<ul class="menu-list">
			<li><router-link to="/analytics/export">Export</router-link></li>
			<li><a @click="clearCache">Refresh data</a></li>
		</ul>
	</aside>
</template>

<script>
export default {
	methods: {
		clearCache() {
			if ("localStorage" in window) {
				window.localStorage.clear();
				this.$toast.open("Your cache has been cleared");
			}
		}
	}
};
</script>
