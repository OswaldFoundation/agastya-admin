<template>
	<div class="columns">
		<div class="column">
			<b-field label="Filter preset">
				<b-select v-model="preset" expanded @input="updateFilter">
					<option value="today">Today</option>
					<option value="week">Last 7 days</option>
					<option value="month">Last 30 days</option>
					<option value="quarter">Last 3 months</option>
					<option value="year">Last year</option>
					<option value="custom">Custom</option>
				</b-select>
			</b-field>
		</div>
		<div class="column">
			<b-field label="From">
				<b-datepicker placeholder="From" v-model="from_field" @input="updatePreset" />
			</b-field>
		</div>
		<div class="column">
			<b-field label="To">
				<b-datepicker placeholder="To" v-model="to_field" @input="updatePreset" />
			</b-field>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			preset: "today",
			from_field: new Date(),
			to_field: new Date()
		};
	},
	computed: {
		...mapGetters({
			from: "getFrom",
			to: "getTo"
		})
	},
	watch: {
		from() {
			this.from_field = this.from;
		},
		to() {
			this.to_field = this.to;
		},
		from_field() {
			this.$store.dispatch("updateFrom", this.from_field);
		},
		to_field() {
			this.$store.dispatch("updateTo", this.to_field);
		}
	},
	methods: {
		formatDate(date) {
			return date.getTime() / 1000;
		},
		updatePreset() {
			this.preset = "custom";
		},
		updateFilter() {
			if (this.preset === "today") {
				this.$store.dispatch("updateFrom", new Date(new Date().setDate(new Date().getDate() - 1)));
				this.$store.dispatch("updateTo", new Date(new Date().setDate(new Date().getDate())));
			} else if (this.preset === "week") {
				this.$store.dispatch("updateFrom", new Date(new Date().setDate(new Date().getDate() - 7)));
				this.$store.dispatch("updateTo", new Date(new Date().setDate(new Date().getDate())));
			} else if (this.preset === "month") {
				this.$store.dispatch("updateFrom", new Date(new Date().setDate(new Date().getDate() - 30)));
				this.$store.dispatch("updateTo", new Date(new Date().setDate(new Date().getDate())));
			} else if (this.preset === "quarter") {
				this.$store.dispatch("updateFrom", new Date(new Date().setDate(new Date().getDate() - 90)));
				this.$store.dispatch("updateTo", new Date(new Date().setDate(new Date().getDate())));
			} else if (this.preset === "year") {
				this.$store.dispatch("updateFrom", new Date(new Date().setDate(new Date().getDate() - 365)));
				this.$store.dispatch("updateTo", new Date(new Date().setDate(new Date().getDate())));
			}
		}
	}
};
</script>
