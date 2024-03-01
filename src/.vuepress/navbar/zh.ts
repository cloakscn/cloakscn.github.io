import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "博文",
    icon: "pen-to-square",
    link: "zh/posts/"
  },
  {
    text: "合集",
    icon: "book",
    prefix: "/zh/",
    children: [
      {
        text: "设计模式",
        icon: "pen-to-square",
        link: "design-patterns/",
      },
      {
        text: "重构",
        icon: "pen-to-square",
        link: "refactoring/",
      },
    ]
  },
]);
