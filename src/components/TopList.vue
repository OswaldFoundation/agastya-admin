<template>
  <div>
    <v-layout v-if="!loading && !data.length" align-center justify-center>
      <div style="margin-bottom: 2rem">
        <v-btn type="button" @click.prevent="loadData" dark color="blue"
          >Load new data...</v-btn
        >
      </div>
    </v-layout>
    <v-data-table
      :headers="[
        { text: 'Name', value: 'name' },
        { text: 'Score', value: 'score' }
      ]"
      :loading="loading"
      :items="data"
      class="elevation-1 recent-events"
    >
      <template slot="items" slot-scope="props">
        <td>
          <img
            v-if="item.includes('domain')"
            class="tiny-flag"
            alt=""
            :src="
              `https://www.google.com/s2/favicons?sz=32&domain=${
                props.item.key
              }`
            "
          />
          <img v-else class="tiny-flag" alt="" :src="iconify(props.item.key)" />
          {{ props.item.key }}
        </td>
        <td>{{ parseInt(props.item.score) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import errors from "../errors";
export default {
  props: ["item", "apiKey"],
  data() {
    return {
      loading: false,
      data: []
    };
  },
  mounted() {},
  methods: {
    loadData() {
      this.loading = true;
      this.$http
        .post("/agastya/analytics/graphs", {
          apiKey: this.apiKey,
          key: this.item
        })
        .then(
          response => (this.data = response.data.aggregations.keywords.buckets)
        )
        .catch(error => errors(error))
        .catch(() => {})
        .then(() => (this.loading = false));
    }
  }
};
</script>

<style>
.tiny-flag {
  height: 2rem;
  vertical-align: middle;
  margin-right: 1rem;
}
</style>
