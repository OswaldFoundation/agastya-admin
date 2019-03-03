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
  drift: {
    emoji: "💬",
    title: "Live Chat by Drift",
    description: "Engage and chat with potential customers using Drift",
    enabled: [
      {
        model: "apiKey",
        value: "",
        label: "Drift API key",
        message: "Add your API key from your Drift account settings",
        type: "text",
        required: true
      }
    ]
  }
};
