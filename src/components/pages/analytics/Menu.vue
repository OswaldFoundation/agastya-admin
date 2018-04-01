<template>
	<aside class="menu column is-one-quarter">
		<div>
			<p class="menu-label">General</p>
			<ul class="menu-list">
				<li><router-link to="/customize/plugin">Settings</router-link></li>
				<li><router-link to="/customize/domains">Domains</router-link></li>
			</ul>
			<p class="menu-label">Apps &amp; Modes</p>
			<ul class="menu-list">
				<li><router-link to="/customize/apps">Modes</router-link></li>
				<li>
					<router-link to="/customize/apps">Apps</router-link>
					<ul>
						<li><router-link to="/customize/apps/live-chat">Live chat</router-link></li>
					</ul>
				</li>
			</ul>
			<p class="menu-label">Code</p>
			<ul class="menu-list">
				<li><router-link to="/customize/code">Universal</router-link></li>
				<li><router-link to="/customize/code/npm">NPM package</router-link></li>
				<li><router-link to="/customize/code/wordpress">WordPress</router-link></li>
			</ul>
		</div>
	</aside>
</template>
