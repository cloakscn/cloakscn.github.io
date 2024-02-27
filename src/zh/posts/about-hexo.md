---
title: 关于 HEXO 存在的一些问题
date: 2022-12-16 23:52:46
category:
 - 札记
tags:
---

在使用 HEXO 的过程中我发现了一些官方文档中没有介绍到的一些内容，在此做下记录。

<!-- more -->

## 关于模板这一节的补充

[查看原文](https://hexo.io/zh-cn/docs/templates)

官方实现了 `index`、`post`、`page`、`archive`、`category`、`tag` 这几个模板

可能是我之前接触博客类的框架比较少，所以对其中一些约定俗成的概念不是很清楚

### 关于 `post & page` 的理解

page 和 post 都是博客的发布形式

* 当你撰写一般的博客文章时，就是撰写日志（文章）。这些日志（文章）会按逆时间顺序排列在博客首页上。

* 页面则是如“关于博主”， "联系博主"这样的内容，它们是不受时间规则影响的，其内容一般很少改变。你可以使用页面来组织和管理任意数量的内容。

一般说来，页面跟日志（文章）很相似，它们都有标题和内容，并且通过使用外观模板使外观风格保持一致

但在这一方面，页面却具有若干区别于日志（文章）的重要特点。

* 页面的内容较文章来说较少受到时间影响，更新少，主要用于分享；页面可以使用包含模板文件、模板标签以及其他PHP代码的各类页面模板。

* 页面不会像文章那样出现在主页上；并且页面无法与分类关联，也不能被指派标签。

## 关于变量这一节的补充

[查看原文](https://hexo.io/zh-cn/docs/variables)

### 关于 `page.excerpt & post.excerpt` 

这两个在文档中描述为页面摘要，默认的 `landspace` 主题也引入了该变量，但是并未明确说明如何使用

* 使用方法

在编辑时使用 `<!-- more -->`

```
---
title: 关于 HEXO 存在的一些问题
date: 2022-12-16 23:52:46
tags:
---

在使用 HEXO 的过程中我发现了一些官方文档中没有介绍到的一些内容，在此做下记录。

<!-- more -->
```

首页展示效果

![](/assets/images/about-hexo/image-20221217000842772.png)

* 实现原理

在 `themes\landscape\layout\_partial\article.ejs` 中有段逻辑是关于首页和详情页显示的

```ejs
<% if (post.excerpt && index){ %>
  <%- post.excerpt %> 
  <% if (theme.excerpt_link){ %>
    <p class="article-more-link">
      <a href="<%- url_for(post.path) %>#more"><%= theme.excerpt_link %></a>
    </p>
  <% } %>
<% } else { %>
  <%- post.content %>
<% } %>
```

当摘要不为空且首页标记 `index` 为 `true` 时仅显示页面摘要，原始内容被替换为 `theme.excerpt_link` (该配置在 `themes\landscape\_config.yml` 中)