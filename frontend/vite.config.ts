import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["care4skillsdash.duckdns.org"], // your frontend domain
    proxy: {
      "/api": {
        target: "https://care4skillsback.duckdns.org",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
