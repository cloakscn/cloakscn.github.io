import { defineNavbarConfig } from "vuepress-theme-hope";

export const zh = defineNavbarConfig([
  "/",
  "/home",
  // { text: "镜像", icon: "snow", link: "https://mirrors.cloaks.cn" },
  { text: "镜像", icon: "snow", link: "https://mirrors.tuna.tsinghua.edu.cn/" },
  {
    text: "索引",
    icon: "any",
    // prefix: "/zh/posts/",
    children: [
      {
        text: "图标",
        icon: "pic",
        link: "https://vuepress-theme-hope.github.io/v2/zh/guide/interface/icon.html#iconfont-%E7%B2%BE%E9%80%89%E5%9B%BE%E6%A0%87"
      },
      // {
      //   text: "文章 1-4",
      //   icon: "edit",
      //   prefix: "article/",
      //   children: [
      //     { text: "文章 1", icon: "edit", link: "article1" },
      //     { text: "文章 2", icon: "edit", link: "article2" },
      //     "article3",
      //     "article4",
      //   ],
      // },
      // {
      //   text: "文章 5-12",
      //   icon: "edit",
      //   children: [
      //     {
      //       text: "文章 5",
      //       icon: "edit",
      //       link: "article/article5",
      //     },
      //     {
      //       text: "文章 6",
      //       icon: "edit",
      //       link: "article/article6",
      //     },
      //     "article/article7",
      //     "article/article8",
      //   ],
      // },
      // { text: "文章 9", icon: "edit", link: "article9" },
      // { text: "文章 10", icon: "edit", link: "article10" },
      // "article11",
      // "article12",
    ],
  },
  { text: "Join Us", icon: "group", link: "//qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&inviteCode=1cqtgP&from=246610&biz=ka#/pc" },
  // {
  //   text: "主题文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
