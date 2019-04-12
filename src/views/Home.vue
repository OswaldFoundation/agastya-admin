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
            <v-form v-if="step1" class="form-reset" @submit.prevent="login">
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
              <v-btn class="button-2" block to="/register"
                >Sign up for a new account</v-btn
              >
            </v-form>
            <div v-if="step2">
              <v-card-text>
                Scan the QR code below with any mobile authentication apps like <a href="">Google Authenticator</a> or <a href="">Authy</a>. Alternatively, you can enter the code manually.
              </v-card-text>
              <v-card-text class="text-xs-center">
                <img :src="dialog2FA.imageUrl" />
                <code style="display: block; width: 60%; margin: 0 auto; box-shadow: none; font-size: 1em; padding: 1.5%; color: #000; overflow: scroll;">{{ dialog2FA.backupCode }}</code>
              </v-card-text>
              <v-form class="form-reset" @submit.prevent="authenticate2fa">
                <v-text-field
                  v-model="OTPCode"
                  type="number"
                  label="OTP"
                  required
                />
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="blue"
                  class="white--text button-2"
                  type="submit"
                  block>
                  Verify OTP
                </v-btn>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
        <div style="padding: 2rem; text-align: center">
          <router-link to="/forgot">Forgot your password?</router-link>
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
      password: "",
      step1: true,
      step2: false,
      OTPCode: "",
      token_2fa: "",
      dialog2FA: {
        imageUrl: "",
        backupCode: ""
      }
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
          if (response.data.token_2fa) {
            this.dialog2FA.imageUrl = response.data.imageUrl;
            this.dialog2FA.backupCode = response.data.backupCode;
            this.step1 = false;
            this.step2 = true;
            this.loading = false;
            this.$store.commit("updateAuth", { token: response.data.token_2fa });
          } else {
            this.$store.commit("updateAuth", response.data);
            this.$router.push("/my-apis");
          }
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
    },
    authenticate2fa() {
      if (this.loading) return;
      this.loading = true;
      this.$http
        .post("/auth/2fa/authenticate", { otp_code: this.OTPCode })
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
        });
    }
  }
};
</script>
