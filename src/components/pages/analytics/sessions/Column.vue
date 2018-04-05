<template>
	<section class="section">
		<div class="container is-medium">
			<div class="columns">
				<Menu />
				<main class="column">
					<FilterPanel />
					<div class="box">
						<div v-if="column === 'country'">
							<div class="columns">
								<div class="column">
									<img alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + title + '&size=600x450&sensor=false'">
								</div>
								<div class="column">
									<img alt="" :src="getBrowserIcon(title)">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + title + '+culture' + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
							</div>
						</div>
						<div v-if="column === 'city' || column === 'region'">
							<div class="columns">
								<div class="column">
									<img alt="" :src="'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCuiZevIb1G87KAoLRSECEdWNBQ06JCMjU&center=' + title + '&size=600x450&sensor=false'">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + only(title) + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
								<div class="column">
									<img alt="" :src="'https://tse2.mm.bing.net/th?q=' + title + '&w=400&h=300&p=0&dpr=2&adlt=moderate&c=1'">
								</div>
							</div>
						</div>
						<h1 class="title is-4 mb-0 mt">{{title}}</h1>
						<div class="content mt">{{intro}}</div>
					</div>
					<div class="columns">
						<div class="column">
							<div class="box">
								<h3 class="title is-5">Countries</h3>
								{{data}}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</section>
</template>

<script>
import Menu from "../Menu.vue";
import FilterPanel from "../FilterPanel.vue";
import { Bar } from "vue-chartjs";
import { callApi, analyticsList, wikipediaIntro } from "../../../../modules/api";
import iconify from "../../../../modules/iconify";
import { mapGetters } from "vuex";
export default {
	data: () => {
		return {
			title: "",
			column: "",
			intro: "",
			searchColumn: "",
			data: {
				isLoading: true,
				results: [],
				records: 0,
				pages: 0,
				perPage: 0,
				currentPage: 0
			}
		};
	},
	mounted() {
		this.title = this.$route.params.title;
		this.column = this.$route.params.column;
		let wikiTitle = this.title;
		if (["city", "region"].includes(this.$route.params.column)) {
			wikiTitle = wikiTitle.split(", ")[0];
		}
		wikipediaIntro(wikiTitle)
			.then(intro => {
				this.intro = intro;
			})
			.catch(error => {});
		const searchCols = {
			country: "country_name"
		};
		if (searchCols[this.$route.params.column]) {
			this.searchColumn = searchCols[this.$route.params.column];
		} else {
			this.$router.push("/");
		}
		this.updateRecords();
	},
	computed: {
		...mapGetters({
			from: "getFrom",
			to: "getTo"
		})
	},
	watch: {
		// from() {
		// 	this.updateRecords();
		// },
		// to() {
		// 	this.updateRecords();
		// }
	},
	methods: {
		updateRecords() {
			console.log(this.from);
			// const perPage = 10;
			// let currentPage = 1;
			// const from = parseInt(this.from.getTime() / 1000);
			// const to = parseInt(this.to.getTime() / 1000);
			// const dataTitle = "session_list__" + this.searchColumn + perPage + currentPage + from + to + dataTitle;

			// if ("sessionStorage" in window && window.sessionStorage[dataTitle]) {
			// 	this.data = JSON.parse(window.sessionStorage.getItem(dataTitle));
			// } else {
			// 	callApi("analytics/sessions", {
			// 		column: this.searchColumn,
			// 		perPage: perPage,
			// 		currentPage: currentPage,
			// 		from: from,
			// 		to: to
			// 	})
			// 		.then(data => {
			// 			if ("sessionStorage" in window) {
			// 				window.sessionStorage.setItem(dataTitle, JSON.stringify(data));
			// 			}
			// 			this.data = data;
			// 		})
			// 		.catch(error => {
			// 			reject(error);
			// 		});
			// }
		},
		paginate() {
			// this.data.results = [];
			// this.data.isLoading = true;
			// setTimeout(() => {
			// 	analyticsList(a, 10, this.currentPage).then(data => {
			// 		this.data = data;
			// 	});
			// }, 1);
		},
		getBrowserIcon(name) {
			return iconify(name);
		},
		ipify(ip) {
			if (ip.length > 15) {
				return ip.substring(0, 15) + "...";
			} else {
				return ip;
			}
		},
		slugify(x) {
			if (typeof x === "string") {
				x = encodeURIComponent(x);
				return x;
			}
			return x;
		},
		only(title) {
			return title.split(", ")[0];
		}
	},
	components: {
		Menu,
		FilterPanel
	}
};
</script>
