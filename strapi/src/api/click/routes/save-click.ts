export default {
  routes: [
    {
      method: "POST",
      path: "/clicks",
      handler: "click.saveClick",
      config: {
        auth: false,
      },
    },
  ],
};
