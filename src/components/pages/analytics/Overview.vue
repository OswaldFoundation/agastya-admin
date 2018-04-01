<template>
	<section class="section">
		<div class="container is-small">
			<div class="columns">
				<Menu />
				<main class="column">
					<div class="columns">
						<div class="column">
							<b-field label="From">
								<b-datepicker placeholder="From" v-model="from" />
							</b-field>
						</div>
						<div class="column">
							<b-field label="To">
								<b-datepicker placeholder="To" v-model="to" />
							</b-field>
						</div>
					</div>
					<div class="box">
						<h2 class="title is-4">Overview</h2>
						<div class="columns">
							<div class="column">
								<div class="title is-5 mb-0">0%</div>
								<div>quota</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>pageviews</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>events</div>
							</div>
							<div class="column">
								<div class="title is-5 mb-0">0</div>
								<div>sessions</div>
							</div>
						</div>
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
			from: new Date(),
			to: new Date()
		};
	},
	mounted() {},
	methods: {
		formatDate(date) {
			return date.getTime() / 1000;
		}
	},
	components: {
		Menu
	}
};
</script>
