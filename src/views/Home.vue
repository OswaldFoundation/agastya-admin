<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
    <v-layout row pb-2>
      <v-flex xs4 offset-xs4>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
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
              <v-text-field
                v-model="password"
                type="password"
                label="Password"
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
                Log in with Oswald Labs
              </v-btn>
              <v-btn class="button-2" block>Login with Google</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
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
      email: "anandchowdhary+4@gmail.com",
      password: "password"
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
        .post("/auth/login", {
          email: this.email,
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
