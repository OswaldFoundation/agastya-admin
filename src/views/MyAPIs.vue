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
              <td>{{ props.item.title || props.item.apiKey }}</td>
              <td class="text-xs-center p-0">
                <router-link
                  class="v-btn theme--light"
                  :to="`/${props.item.apiKey}/analytics`"
                  >Analytics</router-link
                >
              </td>
              <td class="text-xs-center p-0">
                <v-btn
                  @click.stop="
                    addKey = props.item.apiKey;
                    showAdd = true;
                  "
                  >Add to your site</v-btn
                >
              </td>
              <td class="text-xs-right p-0">
                <v-btn @click.prevent="select(props.item)">Configuration</v-btn>
              </td>
            </template>
          </v-data-table>
          <v-dialog v-model="showAdd" max-width="600">
            <v-card>
              <v-card-text>
                <p>
                  Copy and paste the following line just before
                  <code>&lt;/body&gt;</code>:
                </p>
                <pre
                  v-highlightjs="
                    `<script src=&quot;https://agastya-loader.oswaldlabs.com/${addKey}.js&quot; async defer></script>`
                  "
                ><code class="js"></code></pre>
                <p style="margin-top: 2rem">
                  If you're bundling a webapp, you can also include Agastya from
                  NPM. You can learn more on the
                  <a
                    target="_blank"
                    href="https://help.oswaldlabs.com/developers/installation.html"
                    >Installation</a
                  >
                  page on our Developers' Help website.
                </p>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import errors from "../errors";
export default {
  data() {
    return {
      loading: false,
      apiKeys: [],
      headers: [
        { text: "API key", value: "api-key" },
        { text: "", value: "implement" },
        { text: "", value: "analytics" },
        { text: "", value: "configure" }
      ],
      addKey: "",
      showAdd: false
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
        .catch(error => errors(error))
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
        .catch(error => errors(error))
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
.hljs {
  font-size: 100%;
  color: #c0392b;
}
.hljs-attr {
  color: #2980b9;
}
.hljs-string {
  color: #16a085;
}
.p-0 {
  padding: 0 !important;
}
</style>
