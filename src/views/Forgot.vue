<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat />
    <v-layout row pb-2>
      <v-flex xs4 offset-xs4>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text"
              >Forgot password</v-toolbar-title
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
                v-model="email"
                type="email"
                label="Email"
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
                Request a password reset link
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
import errors from "../errors";
export default {
  data() {
    return {
      hasError: false,
      error: "",
      loading: false,
      email: ""
    };
  },
  watch: {
    error() {
      this.hasError = !!this.error;
    }
  },
  mounted() {
    if (this.$store.state.auth && this.$store.state.auth.token)
      this.$router.push("/my-apis");
  },
  methods: {
    login() {
      this.loading = true;
      this.$http
        .post("/auth/forgot", {
          email: this.email
        })
        .then(() => {
          this.error = "A link has been sent";
        })
        .catch(error => errors(error))
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
          this.email = "";
          this.password = "";
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
