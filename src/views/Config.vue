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
                  @input="forceUpdate"
                  v-model="key.apiKey"
                  type="text"
                  label="API key"
                  messages="Your Agastya API key; you cannot change this"
                  disabled
                />
                <v-text-field
                  @input="forceUpdate"
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
                <v-btn
                  type="submit"
                  class="small-submit"
                  color="info"
                  :loading="loading"
                >
                  Save settings
                </v-btn>
                <h2>Branding</h2>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      @input="forceUpdate"
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
                          forceUpdate();
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
                      @input="forceUpdate"
                      v-model="key.foregroundColor"
                      type="text"
                      label="Text color"
                      messages="Text color for the plugin icon and headers"
                    />
                    <v-text-field
                      @input="forceUpdate"
                      v-model="key.home.heading"
                      type="text"
                      label="Heading"
                      messages="This will be the title when a user opens the Agastya widget"
                    />
                    <v-text-field
                      @input="forceUpdate"
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
                  </v-flex>
                </v-layout>
                <v-btn
                  type="submit"
                  class="small-submit"
                  color="info"
                  :loading="loading"
                >
                  Save branding
                </v-btn>
                <h2>Integrations</h2>
                {{ key }}
                <v-container class="unpadded integrations" grid-list-xl>
                  <v-layout row wrap>
                    <v-flex
                      v-for="(service, slug) in integrations"
                      :key="`service_${slug}`"
                      xs6
                    >
                      <v-card>
                        <v-card-title>
                          <div class="emoji-icon">{{ service.emoji }}</div>
                          <h3>{{ service.title }}</h3>
                          <p>{{ service.description }}</p>
                          <div
                            v-if="service.enabled && service.visible"
                            class="additional-settings"
                          >
                            <h4>Configure</h4>
                            <v-text-field
                              v-for="(control, index) in service.enabled"
                              :key="`input_${slug}_${index}`"
                              @input="forceUpdate"
                              type="text"
                              :label="control.label"
                              v-model="integrations[slug].enabled[index].value"
                              :messages="control.message"
                              :required="control.required"
                            />
                          </div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            type="button"
                            @click.prevent="
                              service.enabled ? show(slug) : enable(slug)
                            "
                            v-if="!key.integrations[slug]"
                            flat
                            color="blue"
                            >Enable</v-btn
                          >
                          <v-btn
                            type="button"
                            @click.prevent="disable(slug)"
                            v-else
                            flat
                            color="blue-grey"
                            >Disable</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-btn
                  type="submit"
                  class="small-submit"
                  color="info"
                  :loading="loading"
                >
                  Save integrations
                </v-btn>
                <v-layout align-center justify-center>
                  <v-btn
                    class="save-button"
                    type="submit"
                    color="info"
                    large
                    :loading="loading"
                    >Save your configuration</v-btn
                  >
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
import integrations from "../integrations";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      key: {
        home: {},
        integrations: {}
      },
      integrations,
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
    show(slug) {
      if (!this.integrations[slug].visible) {
        this.integrations[slug].visible = true;
      } else {
        this.integrations[slug].visible = false;
        this.enable(slug);
      }
      this.forceUpdate();
    },
    enable(slug) {
      let updateObject = {};
      if (
        this.integrations[slug] &&
        this.integrations[slug].enabled &&
        typeof this.integrations[slug].enabled === "object"
      ) {
        for (let i = 0; i < this.integrations[slug].enabled.length; i++) {
          updateObject[
            this.integrations[slug].enabled[i].model
          ] = this.integrations[slug].enabled[i].value;
        }
      }
      this.key.integrations[slug] = Object.keys(updateObject).length
        ? updateObject
        : true;
      this.forceUpdate();
    },
    disable(slug) {
      delete this.key.integrations[slug];
      this.forceUpdate();
    },
    forceUpdate() {
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
      this.key.integrations = this.key.integrations || {};
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
.small-submit {
  margin-top: 2rem;
  margin-left: 0;
  margin-bottom: 2rem;
}
.unpadded {
  padding: 0 !important;
}
.integrations .v-card__title {
  padding: 1.9rem;
  padding-bottom: 0;
}
.integrations p {
  margin-bottom: 0.5rem;
}
.emoji-icon {
  margin-right: 1rem;
  font-size: 200%;
  vertical-align: middle;
}
</style>
