<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">Analytics</h2>
						<p>If you're using a package manager like NPM or Yarn, you can use the following package, but additional configuration is required. Our NPM package has no dependences and creates a script to load the plugin.</p>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import Menu from "./Menu.vue";
export default {
	data: () => {
		return {
			api_key: ""
		};
	},
	mounted() {},
	components: {
		Menu
	}
};
</script>
