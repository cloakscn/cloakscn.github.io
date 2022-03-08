import { defineThemeConfig } from "vuepress-theme-hope";
import * as navbar from "./navbar";
import * as sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://www.cloaks.cn",
  author: {
    name: "Cloaks",
    url: "https://www.cloaks.cn",
  },
  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  // repo: "https://github.com/cloakscn/cloakscn.github.io",
  repoDisplay: false,

  docsDir: "demo/src",

  blog: {
    medias: {
      Baidu: "https://example.com",
      Bitbucket: "https://example.com",
      Dingding: "https://example.com",
      Discord: "https://example.com",
      Dribbble: "https://example.com",
      Email: "https://example.com",
      Evernote: "https://example.com",
      Facebook: "https://example.com",
      Flipboard: "https://example.com",
      Gitee: "https://example.com",
      GitHub: "https://example.com",
      Gitlab: "https://example.com",
      Gmail: "https://example.com",
      Instagram: "https://example.com",
      Lines: "https://example.com",
      Linkedin: "https://example.com",
      Pinterest: "https://example.com",
      Pocket: "https://example.com",
      QQ: "https://example.com",
      Qzone: "https://example.com",
      Reddit: "https://example.com",
      Rss: "https://example.com",
      Steam: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
      Weibo: "https://example.com",
      Whatsapp: "https://example.com",
      Youtube: "https://example.com",
      Zhihu: "https://example.com",
    },
  },

  // locales: {
  //   "/": {
  //     // navbar
  //     navbar: navbar.en,

  //     // sidebar
  //     sidebar: sidebar.en,

  //     footer: "Default footer",

  //     displayFooter: true,

  //     blog: {
  //       description: "A FrontEnd programmer",
  //       intro: "/intro.html",
  //     },

  //     metaLocales: {
  //       editLink: "Edit this page on GitHub",
  //     },
  //   },

  //   /**
  //    * Chinese locale config
  //    */
  //   "/zh/": {
  //     // navbar
  //     navbar: navbar.zh,

  //     // sidebar
  //     sidebar: sidebar.zh,

  //     footer: "默认页脚",

  //     displayFooter: true,

  //     blog: {
  //       description: "一个前端开发者",
  //       intro: "/zh/intro.html",
  //     },

  //     // page meta
  //     metaLocales: {
  //       editLink: "在 GitHub 上编辑此页",
  //     },
  //   },
  // },

  locales: {
    "/": {
      // navbar
      navbar: navbar.zh,

      // sidebar
      sidebar: 'auto',
      // sidebar: sidebar.zh,

      footer: "忽有故人心上过，回首山河已是秋！",

      displayFooter: true,

      blog: {
        description: "迎着风，往前冲",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
      "/zh/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // comment: {
    //   type: "waline",
    //   serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },

    mdEnhance: {
      footnote: true,
      tasklist: true,
      tex: true,
      flowchart: true,
      mermaid: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    feed: {
      rss: true,
      channel: {},
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      // apple: {
      //   icon: "/assets/icon/apple-icon-152.png",
      //   statusBarColor: "black",
      // },
      msTile: {
        image: "/assets/icon/mstile-150x150.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          // {
          //   src: "/assets/icon/chrome-mask-512.png",
          //   sizes: "512x512",
          //   purpose: "maskable",
          //   type: "image/png",
          // },
          // {
          //   src: "/assets/icon/chrome-mask-192.png",
          //   sizes: "192x192",
          //   purpose: "maskable",
          //   type: "image/png",
          // },
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
        // shortcuts: [
        //   {
        //     name: "Guide",
        //     short_name: "Guide",
        //     url: "/guide/",
        //     icons: [
        //       {
        //         src: "/assets/icon/guide-maskable.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/guide-monochrome.png",
        //         sizes: "192x192",
        //         purpose: "monochrome",
        //         type: "image/png",
        //       },
        //     ],
        //   },
        // ],
      },
    }
  },
});
