import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "热土",
      description: "欲买桂花同载酒 终不似 少年游",
    },
    "/": {
      lang: "en-US",
      title: "Return",
      description: "If you want to buy osmanthus and carry wine, it is not like a juvenile tour",
    },

  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
