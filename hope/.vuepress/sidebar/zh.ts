import { defineSidebarConfig } from "vuepress-theme-hope";

export const zh = defineSidebarConfig({
  // "/blog": [
  //   "",
  //   "home",
  //   "slide",
  //   {
  //     text: "如何使用",
  //     icon: "creative",
  //     prefix: "guide/",
  //     children: ["", "page", "markdown", "disable", "encrypt"],
  //   },
  //   {
  //     text: "文章",
  //     icon: "note",
  //     prefix: "posts/",
  //     children: [
  //       {
  //         text: "文章 1-4",
  //         icon: "note",
  //         collapsable: true,
  //         prefix: "article/",
  //         children: ["article1", "article2", "article3", "article4"],
  //       },
  //       {
  //         text: "文章 5-12",
  //         icon: "note",
  //         children: [
  //           {
  //             text: "文章 5-8",
  //             icon: "note",
  //             collapsable: true,
  //             prefix: "article/",
  //             children: ["article5", "article6", "article7", "article8"],
  //           },
  //           {
  //             text: "文章 9-12",
  //             icon: "note",
  //             children: ["article9", "article10", "article11", "article12"],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  "/reference": [
    // "",
    // "home",
    "docker",
    {
      text: "名词解释",
      icon: "folder",
      collapsable: true,
      // prefix: "/",
      children: ["cdn", "curl", "jupyter"],
    },
    {
      text: "Nginx",
      icon: "folder",
      collapsable: true,
      prefix: "nginx/",
      children: ["install"],
    },
    {
      text: "Linux",
      icon: "folder",
      collapsable: true,
      prefix: "linux/",
      children: [
        "base",
        {
          text: "CentOS",
          icon: "note",
          prefix: "centos/",
          collapsable: true,
          children: ["firewalld"],
        }],
    },
  ],
  "/cyber_security": [
    // "",
    // "home",
    {
      text: "网络安全",
      icon: "advance",
      // prefix: "guide/",
      children: ["cve_kb", "defense_in_depth_strategies"],
    },
    // {
    //   text: "文章",
    //   icon: "note",
    //   prefix: "posts/",
    //   children: [
    //     {
    //       text: "文章 1-4",
    //       icon: "note",
    //       collapsable: true,
    //       prefix: "article/",
    //       children: ["article1", "article2", "article3", "article4"],
    //     },
    //     {
    //       text: "文章 5-12",
    //       icon: "note",
    //       children: [
    //         {
    //           text: "文章 5-8",
    //           icon: "note",
    //           collapsable: true,
    //           prefix: "article/",
    //           children: ["article5", "article6", "article7", "article8"],
    //         },
    //         {
    //           text: "文章 9-12",
    //           icon: "note",
    //           children: ["article9", "article10", "article11", "article12"],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
  // "/dataStrcture": [
  //   "",
  //   "home",
  //   "slide",
  //   {
  //     text: "如何使用",
  //     icon: "creative",
  //     prefix: "guide/",
  //     children: ["", "page", "markdown", "disable", "encrypt"],
  //   },
  //   {
  //     text: "文章",
  //     icon: "note",
  //     prefix: "posts/",
  //     children: [
  //       {
  //         text: "文章 1-4",
  //         icon: "note",
  //         collapsable: true,
  //         prefix: "article/",
  //         children: ["article1", "article2", "article3", "article4"],
  //       },
  //       {
  //         text: "文章 5-12",
  //         icon: "note",
  //         children: [
  //           {
  //             text: "文章 5-8",
  //             icon: "note",
  //             collapsable: true,
  //             prefix: "article/",
  //             children: ["article5", "article6", "article7", "article8"],
  //           },
  //           {
  //             text: "文章 9-12",
  //             icon: "note",
  //             children: ["article9", "article10", "article11", "article12"],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  // "/nowcoder": [
  //   "",
  //   "home",
  //   "slide",
  //   {
  //     text: "如何使用",
  //     icon: "creative",
  //     prefix: "guide/",
  //     children: ["", "page", "markdown", "disable", "encrypt"],
  //   },
  //   {
  //     text: "文章",
  //     icon: "note",
  //     prefix: "posts/",
  //     children: [
  //       {
  //         text: "文章 1-4",
  //         icon: "note",
  //         collapsable: true,
  //         prefix: "article/",
  //         children: ["article1", "article2", "article3", "article4"],
  //       },
  //       {
  //         text: "文章 5-12",
  //         icon: "note",
  //         children: [
  //           {
  //             text: "文章 5-8",
  //             icon: "note",
  //             collapsable: true,
  //             prefix: "article/",
  //             children: ["article5", "article6", "article7", "article8"],
  //           },
  //           {
  //             text: "文章 9-12",
  //             icon: "note",
  //             children: ["article9", "article10", "article11", "article12"],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  "/lintcode": [
    // "",
    // "home",
    {
      text: "递归",
      icon: "structure",
      collapsable: true,
      // prefix: "guide/",
      children: ["fibonacci", "floor"],
    },
    {
      text: "字符串",
      icon: "structure",
      collapsable: true,
      // prefix: "posts/",
      children: [
        {
          text: "回文串",
          icon: "note",
          collapsable: true,
          // prefix: "article/",
          children: ["longestPalindrome"],
        },
        // {
        //   text: "文章 5-12",
        //   icon: "note",
        //   children: [
        //     {
        //       text: "文章 5-8",
        //       icon: "note",
        //       collapsable: true,
        //       prefix: "article/",
        //       children: ["article5", "article6", "article7", "article8"],
        //     },
        //     {
        //       text: "文章 9-12",
        //       icon: "note",
        //       children: ["article9", "article10", "article11", "article12"],
        //     },
        //   ],
        // },
      ],
    },
    {
      text: "查询",
      icon: "structure",
      collapsable: true,
      // prefix: "posts/",
      children: ["search"],
    },
    {
      text: "排序",
      icon: "structure",
      collapsable: true,
      // prefix: "posts/",
      children: ["sortIntegers"],
    },
    "twoPoint",
    "lru"
  ], 
  "/java": [
    // "",
    // "home",
    {
      text: "Java 基础",
      icon: "creative",
      collapsable: true,
      prefix: "base/",
      children: ["regex", "file_reader", "parse_json"],
    },
    "microservices2services",
    
    // {
    //   text: "文章",
    //   icon: "note",
    //   prefix: "posts/",
    //   children: [
    //     {
    //       text: "文章 1-4",
    //       icon: "note",
    //       collapsable: true,
    //       prefix: "article/",
    //       children: ["article1", "article2", "article3", "article4"],
    //     },
    //     {
    //       text: "文章 5-12",
    //       icon: "note",
    //       children: [
    //         {
    //           text: "文章 5-8",
    //           icon: "note",
    //           collapsable: true,
    //           prefix: "article/",
    //           children: ["article5", "article6", "article7", "article8"],
    //         },
    //         {
    //           text: "文章 9-12",
    //           icon: "note",
    //           children: ["article9", "article10", "article11", "article12"],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
});
