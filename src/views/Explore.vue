<template>
  <v-layout class="margin">
    <v-layout align-center justify-center v-if="loading">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </v-layout>
    <v-flex v-else xs12 sm6 offset-sm3>
      <v-card>
        <v-layout align-center style="padding: 0 2rem">
          <v-card-title style="padding: 0 0 2rem 0" primary-title>
            <div>
              <h3 class="headline" style="padding-top: 2rem">Explore</h3>
            </div>
          </v-card-title>
          <v-spacer />
          <v-btn type="button" color="blue" dark @click.prevent="download">
            <v-icon style="margin-right: 1rem">cloud_download</v-icon>
            JSON
          </v-btn>
        </v-layout>
        <v-layout row>
          <v-flex
            v-if="data[data.length - 1]._source.latitude"
            md6
            :style="
              `background-image: url('https://maps.googleapis.com/maps/api/staticmap?center=${
                data[data.length - 1]._source.latitude
              },${
                data[data.length - 1]._source.longitude
              }&zoom=13&size=600x400&maptype=roadmap&key=AIzaSyDBZBxSdx_wsRAsqVLHPfUP-X-oa-_Cej0'); background-size: cover; background-position: center center; background-repeat: no-repeat;`
            "
          />
          <v-flex>
            <v-list two-line class="unpadded">
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img
                    :src="iconify(data[data.length - 1]._source.browser_name)"
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ data[data.length - 1]._source.browser_name }}
                    {{ data[data.length - 1]._source.browser_version }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Web browser
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img
                    :src="iconify(data[data.length - 1]._source.os_name || '')"
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ data[data.length - 1]._source.os_name || "Unknown OS" }}
                    {{ data[data.length - 1]._source.os_subversion }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Operating system
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img
                    :src="
                      `https://tse2.mm.bing.net/th?q=${data[data.length - 1]
                        ._source.device_manufacturer ||
                        'computer'}+logo&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`
                    "
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span
                      v-if="
                        !data[data.length - 1]._source.device_manufacturer &&
                          !data[data.length - 1]._source.device_model
                      "
                    >
                      Unknown device
                    </span>
                    {{ data[data.length - 1]._source.device_manufacturer }}
                    {{ data[data.length - 1]._source.device_model }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title style="text-transform: capitalize">
                    {{ data[data.length - 1]._source.device_identifier }}
                    {{ data[data.length - 1]._source.device_subtype }}
                    {{ data[data.length - 1]._source.device_type }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar v-if="data[data.length - 1]._source.city">
                <v-list-tile-avatar>
                  <img
                    :src="
                      `https://tse2.mm.bing.net/th?q=${
                        data[data.length - 1]._source.country_name
                      }+flag+circle&w=100&h=100&p=0&dpr=2&adlt=moderate&c=1`
                    "
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ data[data.length - 1]._source.city || "Unknown city" }},
                    {{
                      data[data.length - 1]._source.region_code ||
                        data[data.length - 1]._source.region_name
                    }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ data[data.length - 1]._source.zip_code }}
                    {{
                      data[data.length - 1]._source.country_name ||
                        "Unknown country"
                    }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
            </v-list>
          </v-flex>
        </v-layout>
        <v-timeline class="timeline-inner">
          <v-timeline-item v-for="(event, index) in data" :key="event._id">
            <span
              slot="opposite"
              v-if="index < data.length - 1 && data.length > 1"
            >
              After
              {{
                duration(
                  Math.abs(
                    parseInt(
                      new Date(data[index]._source.date).getTime() -
                        new Date(data[index + 1]._source.date).getTime()
                    )
                  )
                )
              }}
            </span>
            <v-card class="elevation-2">
              <v-card-text>
                <div>
                  <v-icon class="tiny-icon">extension</v-icon>
                  {{ text(event._source) }}
                  {{ event._source.description }}
                </div>
                <div>
                  <div class="wrapped">
                    <v-icon class="tiny-icon">link</v-icon>
                    {{
                      event._source.url &&
                      event._source.url.includes(event._source.url_domain)
                        ? event._source.url.split(event._source.url_domain)[1]
                        : event._source.url
                    }}
                  </div>
                </div>
                <div>
                  <v-icon class="tiny-icon">access_time</v-icon>
                  {{ new Date(event._source.date).toLocaleString() }}
                </div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
          <v-timeline-item
            color="white"
            :style="`text-align: ${data.length % 2 === 0 ? 'right' : 'left'}`"
          >
            <v-avatar slot="icon">
              <img
                v-if="
                  data.length > 0 &&
                    data[data.length - 1]._source.referrer_domain
                "
                style="width: 30px; height: 30px"
                :src="
                  `https://www.google.com/s2/favicons?sz=32&domain=${
                    data.length
                      ? data[data.length - 1]._source.referrer_domain
                      : ''
                  }`
                "
              />
            </v-avatar>
            <span>
              Referred by
              {{ referrer() }}
            </span>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import download from "downloadjs";
import duration from "humanize-duration";
export default {
  data() {
    return {
      loading: false,
      data: [{ _source: {} }],
      apiKey: "",
      fingerprint: ""
    };
  },
  mounted() {
    this.apiKey = this.$route.params.apiKey;
    this.fingerprint = this.$route.params.fingerprint;
    this.loading = true;
    this.$http
      .post("/agastya/analytics/explore", {
        apiKey: this.apiKey,
        fingerprint: this.fingerprint
      })
      .then(response => (this.data = response.data.hits.hits))
      .catch(() => {})
      .then(() => (this.loading = false));
  },
  methods: {
    referrer() {
      if (!this.data.length) return;
      let ref = this.data[this.data.length - 1]._source;
      if (
        ref.referrer === "android-app://com.google.android.googlequicksearchbox"
      ) {
        this.data[this.data.length - 1]._source.referrer_domain = "google.com";
        return "Google Quick Search for Android";
      }
      return ref.referrer_domain;
    },
    text(d) {
      if (d.action === "pageview") return "Pageview";
      if (d.action === "open") return "Open Agastya";
      if (d.action === "close") return "Close Agastya";
      if (d.action === "service") {
        let say = "Agastya service: ";
        if (d === "/") {
          say += "Home";
        } else {
          say += d;
        }
        return say;
      }
      if (d.action === "custom") {
        let say = "Custom event: ";
        Object.keys(d).forEach(key => {
          if (d.hasOwnProperty(key) && key.startsWith("custom_")) {
            say += key.substring(7) + " (" + d[key] + ") ";
          }
        });
        return say;
      }
      if (d.action === "cssClass") d.action = "Agastya mode: ";
      d =
        typeof d === "string" && d
          ? d.charAt(0).toUpperCase() + d.slice(1)
          : "";
      return d.action + " " + d;
    },
    download() {
      download(
        JSON.stringify(this.data, null, 2),
        `${this.apiKey}_${this.fingerprint}.json`
      );
    },
    duration(time) {
      return duration(time);
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
.timeline-inner {
  margin: 0 2rem;
}
.unpadded {
  padding: 0;
}
.wrapped {
  white-space: nowrap;
  overflow-x: auto;
}
.tiny-icon {
  font-size: 120%;
}
</style>
