export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:5173",
        "https://care4skills.eu", // your production domain
        "https://www.care4skills.eu",
      ], // optional: www variant], // your React app origin
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
