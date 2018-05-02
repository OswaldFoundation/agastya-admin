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
					<option value="custom">Select preset</option>
				</b-select>
			</b-field>
		</div>
		<div class="column">
			<b-field label="From">
				<b-datepicker placeholder="From" v-model="from_field" @input="updatePreset" :date-formatter="showDate" />
			</b-field>
		</div>
		<div class="column">
			<b-field label="To">
				<b-datepicker placeholder="To" v-model="to_field" @input="updatePreset" :date-formatter="showDate" />
			</b-field>
		</div>
		<div class="column" style="display: flex">
			<button class="button is-block is-light" style="align-self: flex-end" @click.prevent="updateRecords">Update</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
	data() {
		return {
			preset: "today",
			from_field: new Date(),
			to_field: new Date()
		};
	},
	props: ["update"],
	mounted() {
		this.preset = "custom";
		this.from_field = this.from;
		this.to_field = this.to;
		this.$store.dispatch("updateFrom", new Date(this.$store.state.from));
		this.$store.dispatch("updateTo", new Date(this.$store.state.to));
	},
	computed: {
		...mapGetters({
			from: "getFrom",
			to: "getTo"
		})
	},
	watch: {
		from() {
			if (typeof this.from.getMonth === "function") {
				this.from_field = this.from;
			} else {
				this.from_field = new Date(this.from);
			}
		},
		to() {
			if (typeof this.to.getMonth === "function") {
				this.to_field = this.to;
			} else {
				this.to_field = new Date(this.to);
			}
		},
		from_field() {
			this.$store.dispatch("updateFrom", this.from_field);
		},
		to_field() {
			this.$store.dispatch("updateTo", this.to_field);
		}
	},
	methods: {
		updateRecords() {
			if ("localStorage" in window) {
				const vuexStore = window.localStorage.getItem("vuex");
				window.localStorage.clear();
				window.localStorage.setItem("vuex", vuexStore);
			}
			if (typeof this.update === "function") {
				this.update();
			}
		},
		showDate(date) {
			if (date > new Date()) {
				return "Now";
			} else {
				const string = moment(date).fromNow();
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		},
		formatDate(date) {
			return date.getTime() / 1000;
		},
		updatePreset() {
			this.preset = "custom";
		},
		updateFilter() {
			const endOfDay = moment
				.utc()
				.endOf("day")
				.toDate();
			if (this.preset === "today") {
				this.$store.dispatch("updateFrom", new Date().setHours(0, 0, 0, 0));
				this.$store.dispatch("updateTo", endOfDay);
			} else if (this.preset === "week") {
				this.$store.dispatch(
					"updateFrom",
					moment(new Date(new Date().setDate(new Date().getDate() - 7)))
						.utc()
						.startOf("day")
						.toDate()
				);
				this.$store.dispatch("updateTo", endOfDay);
			} else if (this.preset === "month") {
				this.$store.dispatch(
					"updateFrom",
					moment(new Date(new Date().setDate(new Date().getDate() - 30)))
						.utc()
						.startOf("day")
						.toDate()
				);
				this.$store.dispatch("updateTo", endOfDay);
			} else if (this.preset === "quarter") {
				this.$store.dispatch(
					"updateFrom",
					moment(new Date(new Date().setDate(new Date().getDate() - 90)))
						.utc()
						.startOf("day")
						.toDate()
				);
				this.$store.dispatch("updateTo", endOfDay);
			} else if (this.preset === "year") {
				this.$store.dispatch(
					"updateFrom",
					moment(new Date(new Date().setDate(new Date().getDate() - 365)))
						.utc()
						.startOf("day")
						.toDate()
				);
				this.$store.dispatch("updateTo", endOfDay);
			}
		}
	}
};
</script>