import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
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

}
