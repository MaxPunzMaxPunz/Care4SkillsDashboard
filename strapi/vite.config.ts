import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: [process.env.SERVER ?? "localhost"],
  },
});
