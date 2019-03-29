<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat />
    <v-layout row pb-2>
      <v-flex xs4 offset-xs4>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text"
              >Reset password</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-snackbar v-model="hasError" :timeout="5000" bottom right>
              {{ error }}
              <v-btn
                color="pink"
                flat
                @click="
                  hasError = false;
                  error = '';
                "
                >Close</v-btn
              >
            </v-snackbar>
            <v-form class="form" @submit.prevent="login">
              <v-text-field
                v-model="password"
                type="password"
                label="New password"
                required
              />
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="blue"
                class="white--text button-2"
                type="submit"
                block
              >
                Change your password
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <div style="padding: 2rem; text-align: center">
          <router-link to="/">Log in to your account</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      hasError: false,
      error: "",
      loading: false,
      password: "",
      resetCode: ""
    };
  },
  watch: {
    error() {
      this.hasError = !!this.error;
    }
  },
  mounted() {
    this.resetCode = this.$route.params.code;
  },
  methods: {
    login() {
      this.loading = true;
      this.$http
        .post("/auth/reset", {
          resetCode: this.resetCode,
          password: this.password
        })
        .then(response => {
          this.$store.commit("updateAuth", response.data);
          this.$router.push("/my-apis");
        })
        .catch(error => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            this.error = error.response.data.error;
          }
        })
        .then(() => {
          this.loading = false;
          this.password = "";
          this.resetCode = "";
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
.card--flex-toolbar {
  margin-top: -64px;
}
.form {
  padding: 2rem;
}
.button-2 {
  margin-top: 1.5rem;
}
</style>
