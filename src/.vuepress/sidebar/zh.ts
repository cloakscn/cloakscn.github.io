import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "设计模式",
      icon: "book",
      collapsible: true,
      prefix: "design-patterns/",
      link: "design-patterns/",
      children: [
        {
          text: "行为模式",
          icon: "book",
          collapsible: true,
          prefix: "behavioral-patterns/",
          link: "behavioral-patterns/",
          children: "structure",
        },
        {
          text: "创建型模式",
          icon: "book",
          collapsible: true,
          prefix: "creational-patterns/",
          link: "creational-patterns/",
          children: "structure",
        },
        {
          text: "建造者模式",
          icon: "book",
          collapsible: true,
          prefix: "structural-patterns/",
          link: "structural-patterns/",
          children: "structure",
        },
      ],
    },
    // {
    //   text: "重构",
    //   icon: "book",
    //   collapsible: true,
    //   prefix: "refactoring/",
    //   link: "refactoring/",
    //   children: [
    //     {
    //       text: "什么是重构？",
    //       icon: "book",
    //       collapsible: true,
    //       prefix: "what-is-refactoring/",
    //       link: "what-is-refactoring/",
    //       children: "structure",
    //     },
    //     {
    //       text: "代码特征",
    //       icon: "book",
    //       collapsible: true,
    //       prefix: "code-smells/",
    //       link: "code-smells/",
    //       children: "structure",
    //     },
    //     {
    //       text: "解决方案",
    //       icon: "book",
    //       collapsible: true,
    //       prefix: "techniques/",
    //       link: "techniques/",
    //       children: "structure",
    //     },
    //   ]
    // },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
