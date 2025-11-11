/**
 * click router
 */

import { factories } from "@strapi/strapi";

export default {
  routes: [
    {
      method: "GET",
      path: "/clicks/all", // 👈 new endpoint
      handler: "click.findAll", // 👈 points to your new controller method
      config: {
        auth: false, // set true if you want to restrict access
      },
    },
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
