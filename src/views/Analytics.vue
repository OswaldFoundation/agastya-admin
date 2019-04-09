<template>
  <div>
    <v-layout class="margin">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title primary-title>
            <v-layout row>
              <v-flex style="padding-left: 1rem">
                <h3 class="headline">Events</h3>
              </v-flex>
              <v-flex style="text-align: right" md4>
                <v-btn @click.prevent="fetch">Refresh</v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-data-table
            :headers="[
              { text: 'Date', value: 'date' },
              { text: 'Event', value: 'event' },
              { text: 'Location', value: 'city' },
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
                  {{ text(props.item._source) }}
                </router-link>
              </td>
              <td style="padding: 0 10px">
                <router-link
                  :data-balloon="
                    `Filter users from ${props.item._source.country_code}`
                  "
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/country_code/${
                      props.item._source.country_code
                    }`
                  "
                >
                  <span v-if="props.item._source.country_code">
                    <img
                      v-if="props.item._source.country_code === 'do-not-track'"
                      class="tiny-flag"
                      alt=""
                      src="/img/logos/privacy.png"
                    />
                    <div
                      v-else
                      class="tiny-flag"
                      :style="
                        `background-color: #aaa; background-image: url('https://lipis.github.io/flag-icon-css/flags/4x3/${(
                          props.item._source.country_code || ''
                        ).toLowerCase()}.svg'); display: inline-block; vertical-align: middle; background-size: cover; background-position: center center; background-repeat: no-repeat; width: 2.5rem; height: 2.5rem; border-radius: 100%; box-sizing: border-box; border: 1px solid #eee`
                      "
                    ></div>
                  </span>
                </router-link>
                <router-link
                  v-if="props.item._source.city"
                  :data-balloon="`Filter users from ${props.item._source.city}`"
                  data-balloon-pos="up"
                  :to="`/${apiKey}/filter/city/${props.item._source.city}`"
                >
                  <span v-if="props.item._source.city === 'do-not-track'"
                    >Do not track</span
                  >
                  <span v-else>{{ props.item._source.city }}</span>
                </router-link>
              </td>
              <td>
                <router-link
                  v-if="props.item._source.browser_name"
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
                  <img
                    class="tiny-flag"
                    :alt="props.item._source.browser_name"
                    style="border-radius: 100%"
                    :src="iconify(props.item._source.browser_name)"
                  />
                </router-link>
                <router-link
                  v-if="props.item._source.os_name"
                  :data-balloon="`Filter ${props.item._source.os_name} users`"
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/os_name/${props.item._source.os_name}`
                  "
                >
                  <img
                    class="tiny-flag"
                    style="border-radius: 100%"
                    :alt="props.item._source.os_name"
                    :src="iconify(props.item._source.os_name)"
                  />
                </router-link>
                <router-link
                  v-if="props.item._source.device_manufacturer"
                  :data-balloon="
                    `Filter ${props.item._source.device_manufacturer} users`
                  "
                  data-balloon-pos="up"
                  :to="
                    `/${apiKey}/filter/device_manufacturer/${
                      props.item._source.device_manufacturer
                    }`
                  "
                >
                  <img
                    class="tiny-flag"
                    style="border-radius: 100%"
                    :alt="props.item._source.device_manufacturer"
                    :src="iconify(props.item._source.device_manufacturer)"
                  />
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
    <v-layout class="margin">
      <v-flex xs12 sm8 offset-sm2>
        <v-layout>
          <v-flex md6 style="padding-right: 1rem">
            <v-card>
              <v-layout align-center justify-center>
                <v-card-title primary-title>
                  <div>
                    <h3>Referrers</h3>
                  </div>
                </v-card-title>
              </v-layout>
              <TopList :apiKey="apiKey" item="referrer_domain" />
            </v-card>
          </v-flex>
          <v-flex md6 style="padding-left: 1rem">
            <v-card>
              <v-layout align-center justify-center>
                <v-card-title primary-title>
                  <div>
                    <h3>Categories</h3>
                  </div>
                </v-card-title>
              </v-layout>
              <TopList :apiKey="apiKey" item="url" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import TopList from "@/components/TopList.vue";
import timeago from "time-ago";
import errors from "../errors";
import textify from "../textify";
export default {
  components: {
    TopList
  },
  data() {
    return {
      loading: false,
      data: [],
      apiKey: "",
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: "date",
        totalItems: 0
      },
      total: 0
    };
  },
  mounted() {
    if ("URLSearchParams" in window) {
      try {
        const searchParams = new URLSearchParams(
          this.$route.hash.replace("#", "")
        );
        this.pagination.page = parseInt(searchParams.get("page")) || 1;
        this.pagination.rowsPerPage =
          parseInt(searchParams.get("rowsPerPage")) || 10;
        this.pagination.sortBy = searchParams.get("sortBy") || "date";
      } catch (e) {
        this.pagination.page = 1;
      }
    }
    this.apiKey = this.$route.params.apiKey;
  },
  watch: {
    pagination() {
      window.location.hash = `page=${this.pagination.page}&rowsPerPage=${
        this.pagination.rowsPerPage
      }&sortBy=${this.pagination.sortBy}`;
      this.fetch();
    }
  },
  methods: {
    text(data) {
      return textify(data);
    },
    fetch() {
      this.loading = true;
      this.$http
        .post("/agastya/analytics/recents", {
          apiKey: this.apiKey,
          size: this.pagination.rowsPerPage,
          page: this.pagination.page
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
