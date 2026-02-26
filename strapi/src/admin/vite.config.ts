import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ["care4skillsback.duckdns.org"],
    },
  });
};
