import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",
  port: 8081,
  dest: "./docs",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Cloaks\' Blog',
      description: '热爱技术，乐于分享！',
    },
    "/en/": {
      lang: "en-US",
      title: "Cloaks\' Blog",
      description: "the sun in my heart!",
    },
  },

  themeConfig,
});
