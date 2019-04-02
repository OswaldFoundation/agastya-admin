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
              }&zoom=13&size=600x600&maptype=roadmap&key=AIzaSyDBZBxSdx_wsRAsqVLHPfUP-X-oa-_Cej0'); background-size: cover; background-position: center center; background-repeat: no-repeat;`
            "
          />
          <v-flex>
            <v-list two-line class="unpadded">
              <v-list-tile
                v-if="data[data.length - 1]._source.browser_name"
                avatar
              >
                <v-list-tile-avatar>
                  <img
                    :src="iconify(data[data.length - 1]._source.browser_name)"
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{
                      data[data.length - 1]._source.browser_name ||
                        "Unknown browser"
                    }}
                    {{ data[data.length - 1]._source.browser_version }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Web browser
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="data[data.length - 1]._source.os_name" avatar>
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
              <v-list-tile
                v-if="
                  data[data.length - 1]._source.device_manufacturer ||
                    data[data.length - 1]._source.device_model ||
                    data[data.length - 1]._source.device_identifier ||
                    data[data.length - 1]._source.device_subtype ||
                    data[data.length - 1]._source.device_type
                "
                avatar
              >
                <v-list-tile-avatar>
                  <img
                    :src="
                      iconify(data[data.length - 1]._source.device_manufacturer)
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
              <v-list-tile
                v-if="
                  data[data.length - 1]._source.country_code === 'do-not-track'
                "
                avatar
              >
                <v-list-tile-avatar>
                  <img alt="" src="/img/logos/privacy.png" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Do not track</v-list-tile-title>
                  <v-list-tile-sub-title
                    >Geolocation not tracked
                    <a
                      href="https://help.oswaldlabs.com/usage-guidelines/do-not-track.html"
                      target="_blank"
                      >[?]</a
                    ></v-list-tile-sub-title
                  >
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar
                v-else-if="data[data.length - 1]._source.city"
              >
                <v-list-tile-avatar>
                  <div
                    :style="
                      `background-color: #aaa; background-image: url('https://lipis.github.io/flag-icon-css/flags/4x3/${(
                        data[data.length - 1]._source.country_code || ''
                      ).toLowerCase()}.svg'); background-size: cover; background-position: center center; background-repeat: no-repeat; width: 40px; height: 40px; border-radius: 100%; box-sizing: border-box; border: 1px solid #eee`
                    "
                  ></div>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ data[data.length - 1]._source.city || "Unknown city"
                    }}{{
                      data[data.length - 1]._source.region_code ||
                      data[data.length - 1]._source.region_name
                        ? ","
                        : ""
                    }}
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
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Agastya.svg"
                  />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Agastya v{{
                      data[data.length - 1]._source.version || "3.x"
                    }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Platform v{{
                      (data[data.length - 1]._source.client || "1.0").replace(
                        "platform-",
                        ""
                      )
                    }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
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
                <div class="wrapped">
                  <v-icon class="tiny-icon">extension</v-icon>
                  {{ text(event._source) }}
                </div>
                <div :data-balloon="event._source.title" data-balloon-pos="up">
                  <div v-if="event._source.title" class="wrapped">
                    <v-icon class="tiny-icon">info</v-icon>
                    {{ event._source.title }}
                  </div>
                </div>
                <a
                  target="_blank"
                  :href="event._source.url"
                  :data-balloon="event._source.url"
                  data-balloon-pos="up"
                >
                  <div class="wrapped">
                    <v-icon class="tiny-icon">link</v-icon>
                    {{
                      event._source.url &&
                      event._source.url.includes(event._source.url_domain)
                        ? event._source.url.split(event._source.url_domain)[1]
                        : event._source.url
                    }}
                  </div>
                </a>
                <div class="wrapped">
                  <v-icon class="tiny-icon">access_time</v-icon>
                  {{ new Date(event._source.date).toLocaleString() }}
                </div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
          <v-timeline-item
            color="white"
            :style="`text-align: ${data.length % 2 === 0 ? 'right' : 'left'}`"
            v-if="!this.singleDomain && referrer()"
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
          <span
            v-for="(param, index) in [
              'ref',
              'utm_source',
              'utm_medium',
              'utm_campaign',
              'utm_term',
              'utm_content'
            ]"
            :key="`params_${index}`"
          >
            <v-timeline-item
              color="grey"
              :style="`text-align: right`"
              v-if="data[data.length - 1]._source[`param_${param}`]"
            >
              <!-- <v-avatar slot="icon">ABC</v-avatar> -->
              <span>
                <strong>{{ param.replace(/_/g, " ") }}: </strong>
                {{ data[data.length - 1]._source[`param_${param}`] }}
              </span>
            </v-timeline-item>
          </span>
        </v-timeline>
      </v-card>
      <v-card class="mt">
        <v-card-text>
          <span
            v-for="(term, index) in [
              'availableResolution',
              'nativeResolution',
              'absoluteResolution',
              'adBlock',
              'cookies',
              'accuracy_radius',
              'latitude',
              'longitude',
              'session_id',
              'ua_fp',
              'combined_fp',
              'date'
            ]"
            :key="`chips_${index}`"
          >
            <v-chip
              @click.prevent="
                $router.push(
                  `/${apiKey}/filter/${term}/${
                    data[data.length - 1]._source[term]
                  }`
                )
              "
              v-if="data[data.length - 1]._source[term]"
            >
              <v-avatar class="long-avatar">
                <span :style="`background-color: ${randomColor()}`">{{
                  term
                }}</span>
              </v-avatar>
              {{ data[data.length - 1]._source[term] }}
            </v-chip>
          </span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import download from "downloadjs";
import randomColor from "randomcolor";
import duration from "humanize-duration";
import errors from "../errors";
import textify from "../textify";
export default {
  data() {
    return {
      loading: false,
      data: [{ _source: {} }],
      apiKey: "",
      fingerprint: "",
      singleDomain: true
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
      .then(response => {
        this.data = response.data.hits.hits;
        this.singleDomain = true;
        if (this.data.length) {
          let refDomain;
          for (let i = 0; i < this.data.length; i++) {
            if (refDomain) {
              if (this.data[i]._source.referrer_domain !== refDomain)
                this.singleDomain = false;
            } else {
              refDomain = this.data[i]._source.referrer_domain;
            }
          }
          if (refDomain !== this.data[this.data.length - 1]._source.url_domain)
            this.singleDomain = false;
        }
      })
      .catch(error => errors(error))
      .catch(() => {})
      .then(() => (this.loading = false));
  },
  methods: {
    randomColor() {
      return randomColor({ luminosity: "dark" });
    },
    referrer() {
      if (!this.data.length) return;
      let ref = this.data[this.data.length - 1]._source;
      if (!ref.referrer) return false;
      if (
        ref.referrer === "android-app://com.google.android.googlequicksearchbox"
      ) {
        this.data[this.data.length - 1]._source.referrer_domain = "google.com";
        return "Google Quick Search for Android";
      }
      if (typeof ref.referrer_domain !== "string") return;
      if (ref.referrer_domain === "t.co") return "Twitter";
      if (ref.referrer_domain.includes("google")) return "Google";
      if (ref.referrer_domain === "instagram.com") return "Instagram";
      if (ref.referrer_domain === "facebook.com") return "Facebook";
      return ref.referrer_domain;
    },
    text(data) {
      return textify(data);
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
