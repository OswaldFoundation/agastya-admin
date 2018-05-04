<template>
	<div>Callback</div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
	mounted() {
		const hashData = this.$route.hash
			.split("&")
			.map(el => el.split("="))
			.reduce((pre, cur) => {
				pre[cur[0]] = cur[1];
				return pre;
			}, {});
		const newUserElement = {
			token: hashData.id_token,
			token_type: hashData.token_type,
			user: jwt_decode(hashData.id_token)
		};
		this.$store.dispatch("updateUser", newUserElement);
		this.$router.replace("/");
	}
};
</script>
