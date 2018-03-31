<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="box">
						<h2 class="title is-4">NPM package</h2>
						<p>If you're using a package manager like NPM or Yarn, you can use the following package, but additional configuration is required. Our NPM package has no dependences and creates a script to load the plugin.</p>
						<h3 class="title is-5">Yarn</h3>
						<p>We recommend using Yarn because it caches your packages. You can use the following line to install the <code>@oswaldlabs/agastya</code> package to your project.</p>
						<pre>yarn add @oswaldlabs/agastya</pre>
						<h3 class="title is-5">NPM</h3>
						<p>Alternately, if you're using the NPM client, you can use the following line instead.</p>
						<pre>npm install @oswaldlabs/agastya</pre>
						<h3 class="title is-5">Configuration</h3>
						<p>You need to do additional configuration and initialize the package. Add the following code to your entry file (<code>app.js</code> or <code>index.js</code>).</p>
						<p>If you're using ES6 imports and a bundler like Webpack, you can use the following line to import the package to your project.</p>
						<pre>import "@oswaldlabs/agastya"</pre>
						<p>Alternately, if you're using Node.js modules or a module loader like RequireJS, you can use this line instead.</p>
						<pre>require("@oswaldlabs/agastya")</pre>
						<p>Finally, add this token in the global <code>a11ySettings</code> object, and Agastya should be reading and working in your project.</p>
						<pre>window.a11ySettings = window.a11ySettings || {};<br>window.a11ySettings.token = "{{api_key}}";</pre>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";
import Menu from "../Menu.vue";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	data: () => {
		return {
			api_key: ""
		};
	},
	mounted() {
		const decoded = jwt_decode(this.user.token.auth);
		this.api_key = decoded.api_key;
	},
	components: {
		Menu
	}
};
</script>
