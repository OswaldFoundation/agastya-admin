<template>
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
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		from: {
			get() {
				return new Date(this.$store.getters.getFrom);
			}
			// set(value) {
			// 	this.$store.commit("updateFrom", value);
			// }
		},
		to: {
			get() {
				return new Date(this.$store.getters.getTo);
			}
			// set(value) {
			// 	this.$store.commit("updateTo", value);
			// }
		}
	},
	methods: {
		formatDate(date) {
			return date.getTime() / 1000;
		}
	}
};
</script>
