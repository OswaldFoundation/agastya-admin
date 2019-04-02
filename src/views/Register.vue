<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat />
    <v-layout row pb-2>
      <v-flex xs4 offset-xs4>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text"
              >Register</v-toolbar-title
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
            <v-form class="form-reset" @submit.prevent="login">
              <v-text-field v-model="name" type="text" label="Name" required />
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                required
              />
              <v-text-field
                v-model="invitation_code"
                type="text"
                label="Invitation code"
                placeholder="You need an invitation code to register"
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
                Create a new account
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
      email: "",
      name: "",
      invitation_code: ""
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
        .post("/auth/register", {
          name: this.name,
          email: this.email,
          invitation_code: this.invitation_code
        })
        .then(() => {
          this.error = "Your account has been created, check your email!";
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
          this.name = "";
        });
    }
  }
};
</script>
