import { defineThemeConfig } from "vuepress-theme-hope";
import * as navbar from "./navbar";
import * as sidebar from "./sidebar";

const event = new Date();

export default defineThemeConfig({
  hostname: "https://www.cloaks.cn",
  author: {
    name: "Cloaks",
    url: "https://www.cloaks.cn",
  },
  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",
  pure: true,
  repo: "https://github.com/cloakscn/cloakscn.github.io",
  repoLabel: "GitHub",
  repoDisplay: true,
  
  editLink: false,

  blog: {
    medias: {
      Gitee: "https://gitee.com/biliit",
      GitHub: "https://github.com/cloakscn",
      // Gitlab: "https://example.com",
      // Gmail: "https://example.com",
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
      // sidebar: 'auto',
      sidebar: sidebar.zh,

      footer: "忽有故人心上过，回首山河已是秋！",

      displayFooter: true,

      blog: {
        description: "迎着风，往前冲",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        // editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //     "/zh/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {

    
    blog: {
      autoExcerpt: true,
    },
    
    search: {
      locales: {
        '/en/': {
          placeholder: 'Search',
        },
        '/': {
          placeholder: '搜索',
        },
      },
      hotKeys: ['s', '/'],
      maxSuggestions: 5,
      isSearchable: (page) => page.path !== '/',
      getExtraFields: (page) => page.frontmatter.tags ?? [],
    },

    mdEnhance: {
      footnote: true,
      tasklist: true,
      tex: true,
      flowchart: true,
      mermaid: true,
      codegroup: true,
      demo: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    feed: {
      rss: true,
      channel: {
        title: "Cloaks' Blog",
        link: "https://cloaks.cn",
        description: "The Sun in My Heart!",
        copyright: "MIT Licensed | Copyright © 2018-present Cloaks",
        // pubDate: event.toISOString(),
        ttl: 360,
        author: {
            name: "Cloaks",
            email: "wy03290019@163.com",
            url: "https://www.cloaks.cn",
            // avator: 'string'
        }
      },
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
