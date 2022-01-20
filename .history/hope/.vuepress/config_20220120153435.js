const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Cloaks",
  description: "热爱技术，乐于分享！",
  dest: "./docs",
  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Cloaks',
      description: '热爱技术，乐于分享！',

    },
  },
  themeConfig: {
    logo: "/logo.svg",
    hostname: "https:/cloaks.cn",
    author: "Cloaks",
    nav: [
      { text: "博客", link: "/", icon: "markdown" },
      { text: "项目", link: "/home/", icon: "creative" },
      {
        text: "索引",
        icon: "info",
        items: [
          {
            text: "精选分类",
            icon: "markdown",
            items: [
              { text: "力扣", link: "/category/力扣/" },
              { text: "读书笔记", link: "/book/" },
            ],
          },
        ],
      },
      { text: "Gitee", link: "https://gitee.com/biliit" },
    ],
    sidebar: 'auto',
    blog: {
      logo: "/logo.svg",
      avatar: "/avatar.png",
      name: "Cloaks",
      author: "Cloaks",
      intro: "/intro/",
      sidebarDisplay: "mobile",
      timeline: "白驹过隙",
      links: {
        Email: "wy03290019@163.com",
        Github: "https://github.com/cloakscn",
      },
    },
    footer: {
      display: true,
      content: "忽有故人心上过，回首山河已是秋！",
    },
    comment: {
      type: "vssue",
      // set `platform` rather than `api`
      platform: "github",
      // all other options of Vssue are allowed
      owner: "cloakscn",
      repo: "cloaks.github.io",
      clientId: "56b83c57d772180c7906",
      clientSecret: "d5b185999c6982295c4ae491b211021ae63253c1",
      autoCreateIssue: true
    },
    copyright: {
      status: "global",
    },
    git: {
      timezone: "Asia/Shanghai",
    },
    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },
    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-touch-icon.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/mstile-150x150.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/android-chrome-256x256.png",
            sizes: "256x256",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
