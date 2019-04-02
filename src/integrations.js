export default {
  "eu-cookie-law": {
    emoji: "🍪",
    title: "EU Cookie Law",
    description: "Add compliance with the European Union's cookie law"
  },
  "conditional-markup": {
    emoji: "⚡",
    title: "Conditional Markup",
    description: "Conditionally render HTML on your webpage"
  },
  "google-analytics": {
    emoji: "📈",
    title: "Google Analytics",
    description: "Add Google Analytics to your site",
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
        type: "boolean",
        required: true
      }
    ]
  },
  sentry: {
    emoji: "🐛",
    title: "Sentry",
    description: "Track errors and bugs in your code",
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
  }
};
