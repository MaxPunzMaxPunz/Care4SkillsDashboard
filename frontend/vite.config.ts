import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["care4skillsfront.duckdns.org"], // your frontend domain
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
