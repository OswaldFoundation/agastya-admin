<template>
  <v-layout class="margin">
    <v-snackbar v-model="hasMessage" :timeout="5000" bottom right>
      {{ message }}
      <v-btn
        flat
        @click="
          hasMessage = false;
          message = '';
        "
        >Close</v-btn
      >
    </v-snackbar>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-layout align-center justify-center>
          <v-card-title primary-title>
            <div>
              <h3 style="margin-top: 2rem" class="headline">Settings</h3>
            </div>
          </v-card-title>
        </v-layout>
        <v-form class="form" @submit.prevent="save">
          <v-text-field v-model="user.name" type="text" label="Name" required />
          <v-text-field
            v-model="user.email"
            type="text"
            label="Email"
            disabled
            required
          />
          <h2>Plan</h2>
          <p>
            Your subscription plan is
            <strong style="text-transform: capitalize">{{ user.plan }}</strong
            >, which gives you up to
            <strong>{{
              parseInt(user.max_pageviews || 1).toLocaleString()
            }}</strong>
            pageviews + custom events per month. This month, you have used
            {{ parseInt(user.pageviews_consumed || 0).toLocaleString() }}
            pageviews, i.e.
            <strong
              >{{
                (
                  (100 * parseInt(user.pageviews_consumed || 0)) /
                  parseInt(user.max_pageviews || 1)
                ).toFixed(2)
              }}%</strong
            >
            of your quota.
          </p>
          <v-progress-linear
            height="5"
            :value="
              (100 * parseInt(user.pageviews_consumed || 0)) /
                parseInt(user.max_pageviews || 1)
            "
          />
          <p>
            If you've recently changed your subscription, it may take up to 24
            hours to update here. Your usage was last updated
            {{
              timeago(new Date(parseInt(user.pageviews_updated || 0) * 1000))
            }}.
          </p>
          <v-btn
            type="button"
            :loading="loading"
            @click.prevent="updatePageviews"
            >Update data</v-btn
          >
          <h2>Service-level Agreement</h2>
          <p>
            We have a 100% uptime service-level agreement (SLA) available for
            entireprise customers. You can read the detailed SLA on our
            <a href="https://oswaldlabs.com/policies/sla/" target="_blank"
              >Policies page</a
            >. The current uptime is shown below:
          </p>
          <img
            alt="Uptime"
            src="https://img.shields.io/uptimerobot/ratio/m780781211-f53db30a0838a6d55f3560f6.svg"
          />
          <h2>Email notifications</h2>
          <p>
            You can receive emails to let you know when your quote is about to
            end.
          </p>
          <v-radio-group v-model="user.notifications">
            <v-radio label="Never" value="never" />
            <v-radio label="50% consumption" value="0.5" />
            <v-radio label="90% consumption" value="0.9" />
            <v-radio label="100% consumption" value="1" />
          </v-radio-group>
          <h2>Security</h2>
          <p>
            If you want to change your password, you can request a password
            reset: <a @click.prevent="passwordReset">Request</a>
          </p>
          <v-layout align-center justify-center>
            <v-btn
              class="save-button"
              type="submit"
              color="info"
              large
              :loading="loading"
              >Save your settings</v-btn
            ></v-layout
          >
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import timeago from "time-ago";
import { mapGetters } from "vuex";
import errors from "../errors";
export default {
  computed: {
    ...mapGetters(["auth"])
  },
  data() {
    return {
      loading: false,
      hasMessage: false,
      message: "",
      user: {}
    };
  },
  watch: {
    message() {
      this.hasMessage = !!this.message;
    },
    auth() {
      this.user = this.auth.user;
    }
  },
  mounted() {
    this.user = this.auth.user;
  },
  methods: {
    timeago(time) {
      return timeago.ago(time);
    },
    loadProfile() {
      this.loading = true;
      this.$http
        .get("/auth/details")
        .then(response => this.$store.commit("updateUser", response.data))
        .catch(error => errors(error))
        .catch(() => {})
        .then(() => (this.loading = false))
        .then(() => location.reload());
    },
    updatePageviews() {
      this.loading = true;
      this.$http
        .get("/agastya/analytics/quota", this.user)
        .then(() => (this.message = "Your quota has been updated."))
        .catch(error => errors(error))
        .catch(error => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            this.message = error.response.data.error;
          }
        })
        .then(() => (this.loading = false))
        .then(() => this.loadProfile());
    },
    save() {
      this.$http
        .patch("/auth/details", this.user)
        .then(() => (this.message = "Your settings have been updated."))
        .catch(error => errors(error))
        .catch(error => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            this.message = error.response.data.error;
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    passwordReset() {
      if (this.loading) return;
      this.loading = true;
      this.$http
        .post("/auth/forgot", {
          email: this.user.email
        })
        .then(() => (this.message = "A link has been sent to your email."))
        .catch(error => errors(error))
        .catch(error => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            this.message = error.response.data.error;
          }
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.form {
  padding: 4rem;
  padding-top: 2rem;
}
.margin {
  margin: 4rem 0;
}
* + h2 {
  margin-top: 2rem;
}
h2 {
  font-weight: normal;
  margin-bottom: 1rem;
}
.v-input + .v-input {
  margin-top: 1.5rem;
}
.save-button {
  margin-top: 2.5rem;
  font-size: 125%;
}
</style>
