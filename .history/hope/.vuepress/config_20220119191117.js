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
    '/en/': {
      lang: 'en-US',
      title: 'Cloaks',
      description: 'The Sun in My Heart.',

    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https:/cloaks.cn",

    author: "Cloaks",
    repo: "https://github.com/cloakscn/cloakscn.github.io",

    nav: [
      { text: "博客主页", link: "/", icon: "home" },
      { text: "项目主页", link: "/home/", icon: "home" },
      {
        text: "如何使用",
        icon: "creative",
        link: "/guide/",
      },
    ],

    sidebar: {
      // "/": [
      //   "",
      //   "home",
      //   "slides",
      //   "layout",
      //   {
      //     title: "如何使用",
      //     icon: "creative",
      //     prefix: "guide/",
      //     children: ["", "page", "markdown", "disable", "encrypt"],
      //   },
      // ],
      '/blogs/': [
        {
          text: '博客',
          collapsible: true,
          children: [
            '/blogs/如何快速提高自己的代码质量.md',
            '/blogs/计算机网络.md',
            '/blogs/vuepressReference.md',
            '/blogs/middleware.md',
          ],
        },
        {
          text: '面试',
          collapsible: true,
          children: [
            // '/blogs/面试/README.md',
            '/blogs/面试/基础篇.md',
            '/blogs/面试/并发篇.md',
            '/blogs/面试/虚拟机.md',
            '/blogs/面试/框架篇.md',
          ],
        },
        {
          text: '力扣',
          collapsible: true,
          children: [
            // '/blogs/力扣/README.md',
            '/blogs/lintcode/longestPalindrome.md',
            '/blogs/lintcode/twoPoint.md',
            '/blogs/lintcode/sortIntegers.md',
            '/blogs/lintcode/search.md',
            '/blogs/lintcode/fibonacci.md',
            '/blogs/lintcode/LRU.md',
          ]
        },
        {
          text: '牛客',
          collapsible: true,
          children: [
            // '/blogs/牛客/README.md',
            '/blogs/牛客/反转链表.md'
          ]
        },
        {
          text: '数据结构',
          collapsible: true,
          children: [
            // '/blogs/数据结构/README.md',
            '/blogs/数据结构/链表.md',
          ]
        },
      ],
      '/projects/': [
        {
          text: '项目',
          children: [
            // '/projects/README.md',
            '/projects/redPacket.md',
            // '/projects/blog1 copy.md',
            // '/projects/blog1 copy 2.md',
            // '/projects/blog1 copy 3.md',
            // '/projects/blog1 copy 4.md'
          ],
        },
      ],
      '/notes/': [
        {
          text: '笔记',
          children: [
            // '/notes/README.md',
            '/notes/英语.md',
            '/notes/六级.md',
            // '/notes/blog1 copy.md',
            // '/notes/blog1 copy 3.md',
            // '/notes/blog1 copy 4.md'
          ],
        },
      ],
    
    },

    locales: {
      "/en/": {
        nav: [
          { text: "Blog Home", link: "/en/", icon: "home" },
          { text: "Project Home", link: "/en/home/", icon: "home" },
          {
            text: "Guide",
            icon: "creative",
            link: "/en/guide/",
          },
        ],
        sidebar: {
          "/en/": [
            "",
            "home",
            "slides",
            "layout",
            {
              title: "Guide",
              icon: "creative",
              prefix: "/en/guide/",
              children: ["", "page", "markdown", "disable", "encrypt"],
            },

          ],
        },
      },
    },

    blog: {
      logo: "/logo.svg",
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
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
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
