<template>
	<section class="section level">
		<div class="container level-item">
			<div class="box">
				<h1 class="title">Login</h1>
				<form @submit.prevent="login">
					<b-field label="Email">
						<b-input type="email" placeholder="Enter your email" v-model="email" autofocus required />
					</b-field>
					<b-field label="Password">
						<b-input type="password" placeholder="Enter your password" v-model="password" password-reveal minlength="6" required />
					</b-field>
					<button :class="'button is-primary is-block is-medium' + (isLoading ? ' is-loading' : '')">
						<span><font-awesome-icon :icon="faLock" /></span>
						<span>Secure login</span>
					</button>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../../../modules/store";
import router from "../../../modules/router";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faLock from "@fortawesome/fontawesome-free-solid/faLock";
export default {
	computed: {
		...mapGetters({
			user: "getUser"
		})
	},
	mounted() {
		if (this.user) {
			router.push("/");
		}
	},
	data: () => {
		return {
			faLock: faLock,
			isLoading: false,
			email: "",
			password: ""
		};
	},
	methods: {
		login() {
			this.isLoading = true;
		}
	},
	components: {
		FontAwesomeIcon
	}
};
</script>

<style lang="scss" scoped>
.box {
	width: 400px;
	form {
		margin-top: 1rem;
	}
}
.is-block {
	width: 100%;
}
</style>
