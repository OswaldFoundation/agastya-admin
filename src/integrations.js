export default {
  "eu-cookie-law": {
    emoji: "🍪",
    title: "EU Cookie Law",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  "conditional-markup": {
    emoji: "⚡",
    title: "Conditional Markup",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  drift: {
    emoji: "💬",
    title: "Live Chat by Drift",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
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
