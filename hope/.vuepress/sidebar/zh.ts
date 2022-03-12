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
      prefix: "linux/centos/",
      children: ["firewalld"],
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
  // "/lintcode": [
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
  "/java": [
    // "",
    // "home",
    {
      text: "Java 基础",
      icon: "creative",
      collapsable: true,
      prefix: "base/",
      children: ["regex", "file_reader"],
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
});
