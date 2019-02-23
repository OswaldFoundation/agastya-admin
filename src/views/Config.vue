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
        <v-tabs fixed-tabs color="grey lighten-3" v-model="activeTab">
          <v-tab :key="0">Configuration</v-tab>
          <v-tab :key="2">JSON</v-tab>
          <v-tab-item :key="0">
            <v-layout align-center justify-center>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline">
                    Editing {{ key.title || key.apiKey }}
                  </h3>
                </div>
              </v-card-title>
            </v-layout>
            <v-card flat>
              <v-form class="form" @submit.prevent="save">
                <v-text-field
                  @input="fupdate"
                  v-model="key.apiKey"
                  type="text"
                  label="API key"
                  messages="Your Agastya API key; you cannot change this"
                  disabled
                />
                <v-text-field
                  @input="fupdate"
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
                      @input="fupdate"
                      v-model="key.backgroundColor"
                      type="text"
                      label="Brand color"
                      messages="Background color for the plugin icon and headers"
                    />
                    <div class="colors">
                      <button
                        type="button"
                        v-for="color in [
                          { name: 'blue', hex: '#007bff' },
                          { name: 'green', hex: '#1abc9c' },
                          { name: 'yellow', hex: '#f1c40f' },
                          { name: 'orange', hex: '#e67e22' },
                          { name: 'red', hex: '#e74c3c' },
                          { name: 'purple', hex: '#9b59b6' },
                          { name: 'gray', hex: '#34495e' }
                        ]"
                        @click.prevent="
                          key.backgroundColor = color.hex;
                          fupdate();
                        "
                        :aria-label="color.name"
                        :style="`background-color: ${color.hex}`"
                        :key="color.hex"
                      >
                        <v-icon
                          class="inner-icon"
                          v-if="color.hex === key.backgroundColor"
                          color="white"
                          >done</v-icon
                        >
                      </button>
                    </div>
                    <v-text-field
                      @input="fupdate"
                      v-model="key.foregroundColor"
                      type="text"
                      label="Text color"
                      messages="Text color for the plugin icon and headers"
                    />
                    <v-text-field
                      @input="fupdate"
                      v-model="key.home.heading"
                      type="text"
                      label="Heading"
                      messages="This will be the title when a user opens the Agastya widget"
                    />
                    <v-text-field
                      @input="fupdate"
                      v-model="key.home.subheading"
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
                        <div class="heading-1">Example Heading</div>
                        <div class="heading-2">Website name</div>
                      </div>
                      <div
                        class="circle-preview"
                        :style="
                          `background-color: ${key.backgroundColor}; color: ${
                            key.foregroundColor
                          }`
                        "
                      >
                        <v-icon :color="key.foregroundColor" size="40"
                          >accessibility</v-icon
                        >
                      </div>
                      <div
                        class="circle-preview"
                        :style="
                          `background-color: ${key.backgroundColor}; color: ${
                            key.foregroundColor
                          }`
                        "
                      >
                        <v-icon :color="key.foregroundColor" size="40"
                          >help</v-icon
                        >
                      </div>
                      <div
                        class="circle-preview"
                        :style="
                          `background-color: ${key.backgroundColor}; color: ${
                            key.foregroundColor
                          }`
                        "
                      >
                        <v-icon :color="key.foregroundColor" size="40"
                          >build</v-icon
                        >
                      </div>
                    </div>
                  </v-flex> </v-layout
                ><v-layout align-center justify-center>
                  <v-btn
                    class="save-button"
                    type="submit"
                    color="info"
                    large
                    :loading="loading"
                    >Save your configuration</v-btn
                  ></v-layout
                >
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
        home: {}
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
    fupdate() {
      this.$forceUpdate();
    },
    updateKeys() {
      this.key =
        this.keys.filter(key => key.apiKey === this.$route.params.apiKey)[0] ||
        {};
      delete this.key.owner;
      this.key.backgroundColor = this.key.backgroundColor || "#007bff";
      this.key.foregroundColor = this.key.foregroundColor || "#ffffff";
      this.key.home = this.key.home || {};
      this.key.home.heading = this.key.home.heading || "Help & Accessibility";
      this.key.home.subheading = this.key.home.subheading || this.key.title;
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
.form {
  padding: 4rem;
  padding-top: 2rem;
}
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
.headline {
  margin-top: 2rem;
}
.v-input + .v-input {
  margin-top: 1.5rem;
}
.circle-preview {
  background-color: gray;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  text-align: center;
  line-height: 5.72rem;
  border-radius: 4rem;
  margin-top: 2rem;
  margin-right: 2rem;
}
.colors {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.colors button {
  background-color: gray;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  margin-right: 1rem;
  position: relative;
}
.colors .inner-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.save-button {
  margin-top: 2.5rem;
  font-size: 125%;
}
</style>
