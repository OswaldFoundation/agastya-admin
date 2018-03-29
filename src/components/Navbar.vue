<template>
	<nav class="navbar is-transparent">
		<div class="container">
			<div class="navbar-brand">
				<a class="navbar-item" href="https://bulma.io"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Oswald_Labs_Logo.svg" alt="Oswald Labs logo" height="28"></a>
				<div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div id="navbarExampleTransparentExample" class="navbar-menu">
				<div class="navbar-start">
					<a class="navbar-item" href="#">Dashboard</a>
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="#">Analytics</a>
						<div class="navbar-dropdown is-boxed">
							<a class="navbar-item" href="#">Overview</a>
							<a class="navbar-item" href="#">Apps &amp; modes</a>
							<a class="navbar-item" href="#">User sessions</a>
							<hr class="navbar-divider">
							<a class="navbar-item" href="#">Export data</a>
						</div>
					</div>
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="#">Customize</a>
						<div class="navbar-dropdown is-boxed">
							<a class="navbar-item" href="#">Plugin settings</a>
							<a class="navbar-item" href="#">Apps &amp; modes</a>
							<a class="navbar-item" href="#">Domains</a>
						</div>
					</div>
				</div>
				<div class="navbar-end">
					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link" href="#">Anand Chowdhary</a>
						<div class="navbar-dropdown is-boxed">
							<a class="navbar-item" href="#">Account</a>
							<a class="navbar-item" href="/form/general/">Subscription</a>
							<a class="navbar-item" href="/modifiers/syntax/">Billing</a>
							<a class="navbar-item" href="/columns/basics/">Payment</a>
							<a class="navbar-item" href="/layout/container/">Invoices</a>
							<hr class="navbar-divider">
							<a class="navbar-item" href="#">Developer API</a>
							<a class="navbar-item is-active" href="/components/breadcrumb/">Logout</a>
						</div>
					</div>
					<div class="navbar-item">
						<div class="field is-grouped">
						<p class="control">
							<a class="button is-primary" href="#">
								<span class="icon">
									<font-awesome-icon :icon="faCode" />
								</span>
								<span>Install code</span>
							</a>
						</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faCode from "@fortawesome/fontawesome-free-solid/faCode";
export default {
	data: () => {
		return {
			faCode: faCode
		};
	},
	components: {
		FontAwesomeIcon
	}
};
</script>
