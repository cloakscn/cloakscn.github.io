import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
  ],
  "/zh/design-patterns/": [
    {
      text: "设计模式",
      icon: "book",
      link: "/zh/design-patterns/",
      collapsible: false,
      children: [
        {
          text: "行为模式",
          icon: "book",
          collapsible: false,
          prefix: "behavioral-patterns/",
          link: "behavioral-patterns/",
          children: "structure",
        },
        {
          text: "创建型模式",
          icon: "book",
          collapsible: false,
          prefix: "creational-patterns/",
          link: "creational-patterns/",
          children: "structure",
        },
        {
          text: "建造者模式",
          icon: "book",
          collapsible: false,
          prefix: "structural-patterns/",
          link: "structural-patterns/",
          children: "structure",
        },
      ],
    }
  ],
  "/zh/refactoring/": [
    {
      text: "重构",
      icon: "book",
      link: "/zh/refactoring/",
      collapsible: false,
      children: [
        {
          text: "什么是重构",
          icon: "book",
          collapsible: false,
          prefix: "what-is-refactoring/",
          link: "what-is-refactoring/",
          children: "structure",
        },
        {
          text: "代码特征",
          icon: "book",
          collapsible: false,
          prefix: "code-smells/",
          link: "code-smells/",
          children: "structure",
        },
        {
          text: "解决方案",
          icon: "book",
          collapsible: false,
          prefix: "techniques/",
          link: "techniques/",
          children: "structure",
        },
      ]
    }
  ],
},
);
