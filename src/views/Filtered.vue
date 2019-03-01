<template>
  <div>
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
              { text: 'Timeline', value: 'explore' }
            ]"
            :loading="loading"
            :items="data"
            :pagination.sync="pagination"
            :total-items="pagination.totalItems"
            class="elevation-1 recent-events"
          >
            <template slot="items" slot-scope="props">
              <td>{{ timeago(new Date(props.item._source.date)) }}</td>
              <td>
                <router-link
                  :to="`/${apiKey}/filter/action/${props.item._source.action}`"
                  :data-balloon="`Filter ${props.item._source.action}s`"
                  data-balloon-pos="up"
                >
                  {{ props.item._source.action }}
                </router-link>
              </td>
              <td style="padding: 0 10px">
                <router-link
                  :data-balloon="
                    `Filter users from ${props.item._source.country_name}`
                  "
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/country_code/${
                      props.item._source.country_code
                    }`
                  "
                >
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
                </router-link>
                <router-link
                  :data-balloon="`Filter users from ${props.item._source.city}`"
                  data-balloon-pos="up"
                  :to="`/${apiKey}/filter/city/${props.item._source.city}`"
                >
                  {{ props.item._source.city }}
                </router-link>
              </td>
              <td>
                <img
                  class="tiny-flag"
                  alt=""
                  :src="iconify(props.item._source.browser_name)"
                />
                <router-link
                  :data-balloon="
                    `Filter ${props.item._source.browser_name} users`
                  "
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/browser_name/${
                      props.item._source.browser_name
                    }`
                  "
                >
                  {{ props.item._source.browser_name }}
                </router-link>
                /
                <router-link
                  :data-balloon="`Filter ${props.item._source.os_name} users`"
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/os_name/${props.item._source.os_name}`
                  "
                >
                  {{ props.item._source.os_name }}
                </router-link>
              </td>
              <td>
                <router-link
                  :data-balloon="`View journey timeline`"
                  data-balloon-pos="up"
                  :to="`/${apiKey}/explore/${props.item._source.combined_fp}`"
                >
                  <strong>Explore</strong>
                </router-link>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import timeago from "time-ago";
import errors from "../errors";
export default {
  data() {
    return {
      loading: false,
      data: [],
      apiKey: "",
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 5,
        sortBy: "date",
        totalItems: 0
      },
      page: 1,
      total: 0,
    };
  },
  mounted() {
    this.apiKey = this.$route.params.apiKey;
  },
  watch: {
    pagination() {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.loading = true;
      this.$http
      .post("/agastya/analytics/sorted", {
        apiKey: this.apiKey,
        size: this.pagination.rowsPerPage,
        page: this.pagination.page,
        key: this.$route.params.key,
        value: this.$route.params.value
      })
      .then(response => {
        this.pagination.totalItems = response.data.hits.total;
        this.data = response.data.hits.hits;
      })
        .catch(error => errors(error))
        .catch(() => {})
        .then(() => (this.loading = false));
    },
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
.recent-events a {
  color: inherit;
  text-decoration: none;
}
</style>
