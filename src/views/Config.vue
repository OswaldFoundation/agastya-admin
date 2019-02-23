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
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Editing {{ key.title || key.apiKey }}</h3>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="save" :loading="loading" dark
            >Save</v-btn
          >
        </v-card-title>
        <v-tabs fixed-tabs v-model="activeTab">
          <v-tab :key="0">Configuration</v-tab>
          <v-tab :key="2">JSON</v-tab>
          <v-tab-item :key="0">
            <v-card flat>
              <v-form class="form" @submit.prevent="save">
                <v-text-field
                  v-model="key.apiKey"
                  type="text"
                  label="API key"
                  messages="Your Agastya API key; you cannot change this"
                  disabled
                />
                <v-text-field
                  v-model="key.title"
                  type="text"
                  label="Name"
                  messages="A name to help you remember this API key (e.g., your website's name)"
                />
                <v-combobox
                  v-model="key.domains"
                  label="Domains"
                  messages="List of domains to allow running Agastya on, press tab to add new one"
                  :items="[]"
                  multiple
                  chips
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :selected="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                    >
                      <v-avatar>
                        <img
                          :src="
                            `https://www.google.com/s2/favicons?sz=32&domain=${
                              data.item
                            }`
                          "
                        />
                      </v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
                <h2>Branding</h2>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      v-model="key.backgroundColor"
                      type="text"
                      label="Brand color"
                      messages="Background color for the plugin icon and headers"
                    />
                    <v-text-field
                      v-model="key.foregroundColor"
                      type="text"
                      label="Text color"
                      messages="Text color for the plugin icon and headers"
                    />
                    <v-text-field
                      v-model="key.pages['/'].heading"
                      type="text"
                      label="Heading"
                      messages="This will be the title when a user opens the Agastya widget"
                    />
                    <v-text-field
                      v-model="key.pages['/'].subheading"
                      type="text"
                      label="Subheading"
                      messages="Add a subheading, e.g., your website name"
                    />
                  </v-flex>
                  <v-flex md6>
                    <div class="color-preview">
                      <div
                        class="heading-preview"
                        :style="
                          `background-color: ${key.backgroundColor}; color: ${
                            key.foregroundColor
                          }`
                        "
                      >
                        <div class="heading-1">
                          {{ key.pages["/"].heading }}
                        </div>
                        <div class="heading-2">
                          {{ key.pages["/"].subheading }}
                        </div>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="2">
            <v-card class="json-text" flat>
              <pre
                v-highlightjs="JSON.stringify(key, null, 2)"
              ><code class="json"></code></pre>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      key: {
        pages: {
          "/": {}
        }
      },
      json: "{}",
      activeTab: 0,
      loading: false,
      hasMessage: false,
      message: "",
      color: "#1ca085"
    };
  },
  computed: {
    ...mapGetters(["keys"])
  },
  mounted() {
    this.updateKeys();
  },
  watch: {
    keys() {
      this.updateKeys();
    },
    key() {
      this.json = JSON.stringify(this.key, null, 2);
    },
    message() {
      this.hasMessage = !!this.message;
    }
  },
  methods: {
    updateKeys() {
      this.key =
        this.keys.filter(key => key.apiKey === this.$route.params.apiKey)[0] ||
        {};
      delete this.key.owner;
      this.key.backgroundColor = this.key.backgroundColor || "#007bff";
      this.key.foregroundColor = this.key.foregroundColor || "#ffffff";
      this.key.pages = this.key.pages || {};
      this.key.pages["/"] = this.key.pages["/"] || {};
      this.key.pages["/"].heading =
        this.key.pages["/"].heading || "Help & Accessibility";
      this.key.pages["/"].subheading =
        this.key.pages["/"].subheading || this.key.title;
    },
    update() {
      this.loading = true;
      this.$http
        .get(`/agastya/api-keys/${this.$route.params.apiKey}`)
        .then(response => {
          this.$store.commit(
            "updateKey",
            this.$route.params.apiKey,
            response.data
          );
        })
        .catch(() => {})
        .then(() => (this.loading = false));
    },
    save() {
      this.loading = true;
      this.$http
        .patch(`/agastya/api-keys/${this.$route.params.apiKey}`, this.key)
        .then(() => {
          this.message = "Your API has been updated!";
        })
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
          this.update();
        });
    }
  }
};
</script>

<style>
.margin {
  margin: 4rem 0;
}
.domains-list {
  margin-top: 1.5rem;
}
.json-text code {
  padding: 2rem;
  width: 100%;
}
.json-text code::before,
.json-text code::after {
  display: none;
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
* + h2 {
  margin-top: 2rem;
}
h2 {
  font-weight: normal;
  margin-bottom: 1rem;
}
.color-preview {
  padding-left: 2rem;
}
.heading-preview {
  background-color: #aaa;
  padding: 1.5rem;
  border-radius: 0.2rem;
}
.heading-1 {
  font-size: 150%;
}
.heading-2 {
  font-size: 125%;
  opacity: 0.75;
}
.v-input + .v-input {
  margin-top: 1.5rem;
}
</style>
