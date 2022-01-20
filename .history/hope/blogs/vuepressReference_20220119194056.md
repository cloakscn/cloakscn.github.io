---
icon: page
# 这是文章的标题
title: VuePress 使用手册
time: 2022-01-19
category: 面试
tag:
  - 手册
---

## Markdown 扩展

### 扩展数学公式

> 前提：vuepress 2.0 不支持

弄着还挺费劲的，对前端不太熟悉又把 `VUE` 看了一下

本次使用的是[markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3)，有兴趣可以看看博主[べ断桥烟雨ミ](https://blog.csdn.net/u011367208/article/details/120168954)的帖子，写的比较细

使用过程官方都写得比较清楚，我也不嫌烦就再写一次 ಥ_ಥ

```shell
# Install markdown-it
yarn add -D markdown-it
# Install the plugin
yarn add -D markdown-it-mathjax3
```

引用时要注意一下，[vuePress](https://v2.vuepress.vuejs.org/zh/)关于[markdown it](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html#extendsmarkdown)有详细介绍

只需在 `config.js` 中做如下配置即可

```javascript
var mathjax3 = require('markdown-it-mathjax3');

module.exports = {
    extendsMarkdown: (md) => {
        md.use(mathjax3)
      },
}
```

> 踩了很多坑，各种各样的问题，不过最重要的还是认真仔细阅读文档

可以看看最终效果，还不错哈 (^///^)

行内公式 $\sqrt{3x-1}+(1+x)^2$

块级公式

$$\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}$$

## 插件扩展

### 评论

暂时放弃，等自己搞明白了在弄吧 `vuepress 2.0` 好像不支持
