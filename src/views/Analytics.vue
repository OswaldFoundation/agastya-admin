<template>
  <v-layout class="margin">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-layout align-center justify-center>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Most recent</h3>
            </div>
          </v-card-title>
        </v-layout>
        <v-data-table
          :headers="[
            { text: 'Date', value: 'date' },
            { text: 'Event', value: 'event' },
            { text: 'City', value: 'city' },
            { text: 'Browser', value: 'browser' },
            { text: 'Explore', value: 'explore' }
          ]"
          :loading="loading"
          :items="data"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ timeago(new Date(props.item._source.date)) }}</td>
            <td>{{ props.item._source.action }}</td>
            <td style="padding: 0 10px">
              <img
                v-if="props.item._source.country_code"
                class="tiny-flag"
                alt=""
                :src="
                  `https://lipis.github.io/flag-icon-css/flags/4x3/${(
                    props.item._source.country_code || ''
                  ).toLowerCase()}.svg`
                "
              />
              {{ props.item._source.city }}
            </td>
            <td>
              <img
                class="tiny-flag"
                alt=""
                :src="iconify(props.item._source.browser_name)"
              />
              {{ props.item._source.browser_name }}
              {{ props.item._source.os_name }}
            </td>
            <td>
              <router-link
                :to="`/${apiKey}/explore/${props.item._source.combined_fp}`"
                >Explore</router-link
              >
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import timeago from "time-ago";
export default {
  data() {
    return {
      loading: false,
      data: [],
      apiKey: ""
    };
  },
  mounted() {
    this.apiKey = this.$route.params.apiKey;
    this.loading = true;
    this.$http
      .post("/agastya/analytics/recents", {
        apiKey: this.apiKey,
        ago: "1d",
        size: 30
      })
      .then(response => (this.data = response.data.hits.hits))
      .catch(() => {})
      .then(() => (this.loading = false));
  },
  methods: {
    timeago(time) {
      return timeago.ago(time);
    }
  }
};
</script>

<style>
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
.tiny-flag {
  height: 2rem;
  vertical-align: middle;
  margin-right: 1rem;
}
</style>
