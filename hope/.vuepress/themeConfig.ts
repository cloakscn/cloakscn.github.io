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
  // pure: true,

  repo: "https://github.com/cloakscn/",
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
        avatar: "/avatar.png"
      },

      // page meta
      metaLocales: {
        // editLink: "在 GitHub 上编辑此页",
      },
    },
    /**
     * English locale config
     */
    "/en/": {
      // navbar
      // navbar: navbar.zh,

      // sidebar
      // sidebar: sidebar.zh,

      // footer: "默认页脚",

      // displayFooter: true,

      // blog: {
      //   description: "一个前端开发者",
      //   intro: "/zh/intro.html",
      // },

      // page meta
      // metaLocales: {
      //   editLink: "在 GitHub 上编辑此页",
      // },
    },
  },

  encrypt: {
    config: {
      "/files.html": ["cloaks.cn"],
    },
  },

  plugins: {

    comment: {
      type: "giscus",
      repo: "cloakscn/cloakscn.github.io",
      repoId: "R_kgDOGswhtg",
      category: "Announcements",
      categoryId: "DIC_kwDOGswhts4COEtZ",
    },

    
    blog: {
      autoExcerpt: true,
    },

    docsearch: {
      appId: "KSKSOSLFVW",
      apiKey: "d6bdc520b47969a0d59af06c01d17632",
      indexName: "cloaks",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                openIssueText: "你认为该查询应该有结果？",
                openIssueLinkText: "点击反馈",
              },
            },
          },
        },
      },
    },
    
    // search: {
    //   locales: {
    //     '/en/': {
    //       placeholder: 'Search',
    //     },
    //     '/': {
    //       placeholder: '搜索',
    //     },
    //   },
    //   hotKeys: ['s', '/'],
    //   maxSuggestions: 5,
    //   isSearchable: (page) => page.path !== '/',
    //   getExtraFields: (page) => page.frontmatter.tags ?? [],
    // },

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
      update: "hint",
      favicon: "/favicon.ico",
      themeColor: "#2196f3",
      appendBase: true,
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
