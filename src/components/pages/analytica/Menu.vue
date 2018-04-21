<template>
	<aside class="menu column is-one-quarter">
		<div>
			<p class="menu-label">Overview</p>
			<ul class="menu-list">
				<!-- <li><router-link to="/analytics/overview">Overview</router-link></li> -->
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
