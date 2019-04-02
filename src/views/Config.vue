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
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-tabs fixed-tabs color="grey lighten-3" v-model="activeTab">
          <v-tab :key="0">Configuration</v-tab>
          <v-tab :key="2">JSON</v-tab>
          <v-tab-item :key="0">
            <v-layout align-center justify-center>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline" style="margin-top: 2rem">
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
                <v-checkbox
                  v-model="key.variables.displayNone"
                  label="Hide the Agastya button from my website"
                  messages="Your users will not be able to open Agastya, you can still use the API"
                />
                <v-checkbox
                  v-model="key.variables.captioned"
                  label="Always show the Agastya button label"
                  messages="If you don't check this option, the label will appear on mouse over"
                />
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
                      v-model="key.layout.heading"
                      type="text"
                      label="Heading"
                      messages="This will be the title when a user opens the Agastya widget"
                    />
                    <v-text-field
                      @input="forceUpdate"
                      v-model="key.layout.subheading"
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
                <h2>Layout</h2>
                <v-layout row>
                  <v-flex xs6>
                    <v-card>
                      <v-card-title class="sample-agastya">
                        <div>
                          <div>{{ key.layout.heading }}</div>
                          <div>{{ key.layout.subheading }}</div>
                        </div>
                        <div
                          v-for="(card, index) in key.layout.cards"
                          :key="`card_${index}`"
                          :class="`fake-card fake-card-${card.type}`"
                        >
                          <div v-if="card.type === 'mode-card'">
                            <div>Mode</div>
                            <div>{{ card.slug }}</div>
                          </div>
                          <div v-else-if="card.type === 'intro-card'">
                            <div>Call-to-action card</div>
                            <v-text-field v-model="card.title" label="Title" />
                            <v-text-field
                              v-model="card.subtitle"
                              label="Subtitle"
                            />
                            <v-text-field
                              v-model="card.cta"
                              label="Button text"
                            />
                            <v-text-field v-model="card.url" label="URL" />
                          </div>
                          <div v-else-if="card.type === 'uptime-robot'">
                            <div>Uptime Robot monitor</div>
                            <v-text-field v-model="card.title" label="Title" />
                            <v-text-field v-model="card.key" label="API key" />
                          </div>
                          <div v-else-if="card.type === 'link-card'">
                            <div>Link</div>
                            <v-text-field v-model="card.title" label="Title" />
                            <v-text-field v-model="card.url" label="URL" />
                          </div>
                          <div v-else-if="card.type === 'app-card'">
                            <div>App: {{ card.slug }}</div>
                            <v-text-field v-model="card.title" label="Title" />
                          </div>
                          <div v-else>
                            {{ card }}
                          </div>
                          <div class="button-group">
                            <button
                              v-if="index !== 0"
                              type="button"
                              @click.prevent="layoutUp(index)"
                            >
                              <v-icon>arrow_upward</v-icon>
                            </button>
                            <button
                              v-if="index !== key.layout.cards.length - 1"
                              type="button"
                              @click.prevent="layoutDown(index)"
                            >
                              <v-icon>arrow_downward</v-icon>
                            </button>
                            <button
                              type="button"
                              @click.prevent="layoutDelete(index)"
                            >
                              <v-icon>delete</v-icon>
                            </button>
                          </div>
                        </div>
                        <div>User options</div>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex style="padding-left: 1.5rem">
                    <h3>Add a layout element:</h3>
                    <v-btn
                      v-for="(option, index) in layoutOptions"
                      :key="`option_${index}`"
                      @click.prevent="layoutAdd(option)"
                      block
                      >{{ option.name }}</v-btn
                    >
                  </v-flex>
                </v-layout>
                <v-btn
                  type="submit"
                  class="small-submit"
                  color="info"
                  :loading="loading"
                >
                  Save layout
                </v-btn>
                <h2>Integrations</h2>
                <v-container class="unpadded integrations" grid-list-xl>
                  <v-layout row wrap>
                    <v-flex
                      v-for="(service, slug) in integrations"
                      :key="`service_${slug}`"
                      xs4
                    >
                      <v-card>
                        <v-card-title>
                          <div>
                            <div class="emoji-heading">
                              <div class="emoji-icon">{{ service.emoji }}</div>
                              <h3>{{ service.title }}</h3>
                            </div>
                            <p>{{ service.description }}</p>
                            <div
                              v-if="service.enabled && service.visible"
                              class="additional-settings"
                            >
                              <h4>Configure</h4>
                              <div
                                v-for="(control, index) in service.enabled"
                                :key="`input_${slug}_${index}`"
                              >
                                <v-checkbox
                                  v-if="control.type === 'boolean'"
                                  :label="control.label"
                                  v-model="
                                    integrations[slug].enabled[index].value
                                  "
                                  :messages="control.message"
                                  :required="control.required"
                                />
                                <v-text-field
                                  v-else
                                  @input="forceUpdate"
                                  type="text"
                                  :label="control.label"
                                  v-model="
                                    integrations[slug].enabled[index].value
                                  "
                                  :messages="control.message"
                                  :required="control.required"
                                />
                              </div>
                            </div>
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
                          <span v-else>
                            <v-btn
                              type="button"
                              @click.prevent="disable(slug)"
                              flat
                              color="blue-grey"
                              >Disable</v-btn
                            >
                            <!-- <v-btn
                              type="button"
                              v-if="!!service.enabled"
                              @click.prevent="show(slug)"
                              flat
                              color="blue-grey"
                              >Edit</v-btn
                            > -->
                          </span>
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
                <h2>Advanced</h2>
                <v-layout row>
                  <v-flex md6>
                    <h3>Custom CSS</h3>
                  </v-flex>
                  <v-flex md6 style="text-align: right">
                    <v-dialog v-model="addCss" persistent max-width="600px">
                      <v-btn
                        slot="activator"
                        style="margin-bottom: 1rem; margin-top: -1rem"
                        >Add another rule</v-btn
                      >
                      <v-card>
                        <v-card-text>
                          <v-form @submit.prevent="addNewCss">
                            <v-select
                              :items="modes"
                              v-model="newCss.mode"
                              label="Mode"
                            />
                            <v-textarea
                              v-model="newCss.css"
                              label="Custom CSS"
                            />
                          </v-form>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="addCss = false">Delete</v-btn>
                            <v-btn color="blue" flat @click="addNewCss"
                              >Save</v-btn
                            >
                          </v-card-actions>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-data-table
                  :headers="[
                    { text: 'Accessibility mode', value: 'mode' },
                    { text: 'CSS', value: 'css' },
                    { text: 'Edit', value: 'edit' },
                    { text: 'Delete', value: 'delete' }
                  ]"
                  :items="key.customCss"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.mode }}</td>
                    <td>{{ props.item.css }}</td>
                    <td>
                      <v-icon small @click="editCss(props.item)">
                        edit
                      </v-icon>
                    </td>
                    <td>
                      <v-icon small @click="deleteCss(props.item)">
                        delete
                      </v-icon>
                    </td>
                  </template>
                </v-data-table>
                <v-text-field
                  @input="forceUpdate"
                  v-model="key.variables.readAloudSelector"
                  type="text"
                  label="Read aloud selector"
                  messages="A CSS selector for the main content of your page for read aloud (e.g., main#content)"
                />
                <v-text-field
                  @input="forceUpdate"
                  v-model="key.links.privacyPolicy"
                  type="text"
                  label="Privacy Policy link"
                  messages="Link to your privacy policy for EU cookie law compliance"
                />
                <v-text-field
                  @input="forceUpdate"
                  v-model="key.links.cookiePolicy"
                  type="text"
                  label="Cookie Policy link"
                  messages="Link to your cookie policy for EU cookie law compliance"
                />
                <v-btn
                  type="submit"
                  class="small-submit"
                  color="info"
                  :loading="loading"
                >
                  Save advanced
                </v-btn>
                <h2>Danger Zone</h2>
                <p>
                  <strong>Warning:</strong> Deleting an API key is not
                  reversable. Agastya will immediately stop working on your
                  website and all your configuration will be deleted. Enter this
                  API key to confirm.
                </p>
                <v-text-field
                  v-model="deleteApiKey"
                  type="text"
                  label="API key"
                  messages="Enter this API key to delete"
                />
                <v-btn
                  type="button"
                  class="small-submit"
                  color="red darken-3"
                  @click.prevent="deleteKey"
                  dark
                  :disabled="deleteApiKey !== $route.params.apiKey"
                  :loading="loading"
                >
                  Delete this API key
                </v-btn>
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
import errors from "../errors";
const defaultCards = [
  {
    type: "mode-card",
    slug: "dyslexia"
  },
  {
    type: "mode-card",
    slug: "blue-light-filter"
  },
  {
    type: "mode-card",
    slug: "large-font"
  },
  {
    type: "mode-card",
    slug: "night"
  },
  {
    type: "mode-card",
    slug: "read-aloud"
  },
  {
    type: "mode-card",
    slug: "translate"
  },
  {
    type: "link-card",
    title: "More accessibility features",
    url: "agastya-app:modes/all"
  },
  {
    type: "app-card",
    title: "Share this page",
    slug: "share"
  }
];
function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}
export default {
  data() {
    return {
      key: {
        layout: {
          cards: {}
        },
        integrations: {},
        customCss: [],
        variables: {},
        links: {}
      },
      integrations,
      deleteApiKey: "",
      json: "{}",
      activeTab: 0,
      loading: false,
      hasMessage: false,
      message: "",
      color: "#1ca085",
      addCss: false,
      newCss: {
        mode: "",
        css: ""
      },
      modes: ["dyslexia", "night", "blue-light-filter"],
      layoutOptions: [
        {
          name: "Intro call-to-action card",
          type: "intro-card",
          title: "Title",
          subtitle: "This is an example",
          cta: "Click here",
          url: "#"
        },
        {
          name: "Link card",
          type: "link-card",
          title: "More accessibility features",
          url: "agastya-app:modes/all"
        },
        {
          name: "Social share card",
          type: "app-card",
          title: "Share this page",
          slug: "share"
        },
        { name: "dyslexia", type: "mode-card", slug: "dyslexia" },
        {
          name: "Blue light filter",
          type: "mode-card",
          slug: "blue-light-filter"
        },
        { name: "Color blind", type: "mode-card", slug: "color-blind" },
        { name: "Night", type: "mode-card", slug: "night" },
        { name: "Large font", type: "mode-card", slug: "large-font" },
        { name: "Read aloud", type: "mode-card", slug: "read-aloud" },
        { name: "Translate", type: "mode-card", slug: "translate" },
        { name: "Reading mode", type: "mode-card", slug: "reading-mode" },
        { name: "Contrast", type: "mode-card", slug: "contrast" },
        {
          name: "Keyboard navigation",
          type: "mode-card",
          slug: "keyboard-navigation"
        },
        { name: "Desaturate", type: "mode-card", slug: "desaturate" },
        { name: "Big cursor", type: "mode-card", slug: "big-cursor" },
        { name: "Legible fonts", type: "mode-card", slug: "legible-fonts" },
        { name: "Highlight links", type: "mode-card", slug: "highlight-links" },
        { name: "Reading font", type: "mode-card", slug: "font-family" },
        { name: "Font size", type: "mode-card", slug: "font-size" },
        { name: "Letter spacing", type: "mode-card", slug: "letter-spacing" },
        { name: "Word spacing", type: "mode-card", slug: "word-spacing" },
        { name: "Line height", type: "mode-card", slug: "line-height" },
        {
          name: "Uptime Robot monitor",
          type: "uptime-robot",
          title: "Status",
          key: "m782086414-962c034e80dbd49655ca3a07"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["keys"])
  },
  mounted() {
    this.updateKeys();
    this.update();
    if (!this.key.layout.cards || !this.key.layout.cards.length)
      this.key.layout.cards = defaultCards;
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
    layoutAdd(element) {
      this.key.layout.cards.push(element);
    },
    layoutUp(index) {
      this.key.layout.cards = arrayMove(
        this.key.layout.cards,
        index,
        index - 1
      );
    },
    layoutDown(index) {
      this.key.layout.cards = arrayMove(
        this.key.layout.cards,
        index,
        index + 1
      );
    },
    layoutDelete(index) {
      this.key.layout.cards.splice(index, 1);
      this.forceUpdate();
    },
    deleteKey() {
      this.loading = true;
      this.$http
        .delete(`/agastya/api-keys/${this.$route.params.apiKey}`)
        .then(() => {
          this.$router.push("/my-apis/?relax=true");
        })
        .catch(error => errors(error))
        .catch(() => {})
        .then(() => (this.loading = false));
    },
    deleteCss(toDelete) {
      this.key.customCss.forEach((item, index) => {
        if (item.css === toDelete.css && item.mode === toDelete.mode)
          return this.key.customCss.splice(index, 1);
      });
    },
    editCss(toEdit) {
      this.deleteCss(toEdit);
      this.newCss.mode = toEdit.mode;
      this.newCss.css = toEdit.css;
      this.addCss = true;
    },
    addNewCss() {
      this.key.customCss.push({
        mode: this.newCss.mode,
        css: this.newCss.css
      });
      this.newCss.mode = "";
      this.newCss.css = "";
      this.addCss = false;
    },
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
      this.key.customCss = this.key.customCss || [];
      this.key.variables = this.key.variables || {};
      this.key.links = this.key.links || {};
      this.key.layout = this.key.layout || {};
      this.key.integrations = this.key.integrations || {};
      this.key.layout.heading =
        this.key.layout.heading || "Help & Accessibility";
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
        .catch(error => errors(error))
        .catch(() => {})
        .then(() => (this.loading = false));
    },
    save() {
      this.loading = true;
      const updateData = JSON.parse(JSON.stringify(this.key));
      delete updateData.owner;
      delete updateData.apiKey;
      this.$http
        .patch(`/agastya/api-keys/${this.$route.params.apiKey}`, updateData)
        .then(() => {
          this.message = "Your API has been updated!";
        })
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
          this.update();
        });
    }
  }
};
</script>
