<template>
	<aside class="menu column is-one-quarter">
		<div>
			<p class="menu-label">General</p>
			<ul class="menu-list">
				<li><router-link to="/settings/account">Account</router-link></li>
				<li><router-link to="/settings/security">Security</router-link></li>
			</ul>
			<p class="menu-label">Subscription</p>
			<ul class="menu-list">
				<li><router-link to="/settings/subscription">Overview</router-link></li>
				<!-- <li>
					<router-link to="/settings/a">Manage Your Team</router-link>
					<ul>
						<li><router-link to="/settings/a">Members</router-link></li>
						<li><router-link to="/settings/a">Plugins</router-link></li>
						<li><router-link to="/settings/a">Add a member</router-link></li>
					</ul>
				</li> -->
				<li><router-link to="/settings/billing">Billing</router-link></li>
				<li><router-link to="/settings/payment">Payment</router-link></li>
				<li><router-link to="/settings/invoices">Invoices</router-link></li>
			</ul>
			<p class="menu-label">Developers</p>
			<ul class="menu-list">
				<li><router-link to="/settings/api-keys">API keys</router-link></li>
			</ul>
		</div>
	</aside>
</template>
