export default {
  "eu-cookie-law": {
    emoji: "🍪",
    title: "EU Cookie Law",
    description:
      "Add a popup message for increased compliance with the European Union's cookie law."
  },
  "conditional-markup": {
    emoji: "⚡",
    title: "Conditional Markup",
    description:
      'Conditionally render HTML on your webpage with custom "if" rules based on tracking data.'
  },
  "google-analytics": {
    emoji: "📈",
    title: "Google Analytics",
    description:
      "Add Google Analytics to your site to track pageviews, Agastya events, and custom events.",
    enabled: [
      {
        model: "trackingId",
        value: "UA-XXXXXXXX-XX",
        label: "Tracking ID",
        message:
          "Copy and paste the tracking ID from your Google Analytics property",
        type: "text",
        required: true
      },
      {
        model: "trackPageviews",
        value: "",
        label: "Also track pageviews",
        message: "Don't check this if you already have GA on your website",
        type: "boolean"
      }
    ]
  },
  sentry: {
    emoji: "🐛",
    title: "Sentry",
    description:
      "Track errors and bugs in your code using Sentry's open-source error tracking software.",
    enabled: [
      {
        model: "dsn",
        value: "https://example@sentry.io/example",
        label: "DSN",
        message: "Copy and paste the DNS from your Sentry project client keys",
        type: "text",
        required: true
      }
    ]
  },
  "extra-tracking": {
    emoji: "📊",
    title: "Extra Tracking",
    description:
      "Track even more events on your website, like clicks and external links for heatmaps.",
    enabled: [
      {
        model: "clicks",
        value: "",
        label: "Clicks",
        message: "Track when users click on buttons, links, and other elements",
        type: "boolean"
      },
      {
        model: "externalLinks",
        value: "",
        label: "External links",
        message: "Track when users go to another website from your site",
        type: "boolean"
      },
      {
        model: "unload",
        value: "",
        label: "Time spent",
        message: "Track exact time spent on a page using unload events",
        type: "boolean"
      },
      {
        model: "selection",
        value: "",
        label: "Selection",
        message: "Track when users select text on your website",
        type: "boolean"
      }
    ]
  }
};
