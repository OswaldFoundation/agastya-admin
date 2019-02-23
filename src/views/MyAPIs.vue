<template>
  <v-layout class="margin">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Your API keys</h3>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="create" dark
            >Create a new key</v-btn
          >
        </v-card-title>
        <div>
          <div
            v-if="!loading && !apiKeys.length"
            class="text-sm-center empty-state"
          >
            <v-icon size="100">error</v-icon>
            <h1>You don't have any API keys</h1>
            <v-btn color="info" @click.prevent="create" large
              >Create your first API key</v-btn
            >
          </div>
          <v-data-table
            v-else
            :loading="loading"
            :headers="headers"
            :items="apiKeys"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.apiKey }}</td>
              <td class="text-xs-right">
                <v-btn color="primary" @click.prevent="select(props.item)" dark
                  >Select</v-btn
                >
              </td>
              <!-- <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td> -->
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      apiKeys: [],
      headers: [
        { text: "API key", value: "api-key" },
        { text: "", value: "select" }
      ]
    };
  },
  methods: {
    update() {
      this.loading = true;
      this.$http
        .get("/agastya/api-keys")
        .then(response => {
          this.apiKeys = [];
          Object.keys(response.data).forEach(key => {
            if (response.data.hasOwnProperty(key)) {
              this.apiKeys.push({ apiKey: key, ...response.data[key] });
            }
          });
          this.$store.commit("updateKeys", this.apiKeys);
          if (this.apiKeys.length === 1 && !this.$route.query.relax)
            this.select(this.apiKeys[0]);
        })
        .catch(() => {})
        .then(() => {
          this.loading = false;
        });
    },
    create() {
      this.loading = true;
      this.$http
        .put("/agastya/api-keys")
        .then(() => this.update())
        .catch(() => {})
        .then(() => {
          this.loading = false;
        });
    },
    select(key) {
      this.$router.push(`/${key.apiKey}/config`);
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style>
.margin {
  margin: 5rem 0;
}
.empty-state {
  padding: 2rem 0;
}
.empty-state h1 {
  margin: 1rem 0;
}
</style>
