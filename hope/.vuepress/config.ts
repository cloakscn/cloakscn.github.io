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

  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Theme Demo",
  //     description: "A demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "主题演示",
  //     description: "vuepress-theme-hope 的演示",
  //   },
  // },

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Cloaks',
      description: '热爱技术，乐于分享！',
    },
  },

  themeConfig,
});
