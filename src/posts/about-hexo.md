---
title: Some Issues Regarding HEXO
date: 2022-12-16 23:52:46
category:
 - Notes
tags:
---

During the use of HEXO, I have identified some aspects not covered in the official documentation. I'll document them here.

<!-- more -->

## Supplementary Information on Templates

[View Original](https://hexo.io/zh-cn/docs/templates)

The official documentation provides templates for `index`, `post`, `page`, `archive`, `category`, and `tag`.

Possibly due to my limited experience with blog frameworks, I found some conventions not very clear.

### Understanding `post & page`

Pages and posts are both forms of publishing in a blog.

- When you write a typical blog post, you are creating a log (article). These logs (articles) are displayed on the blog's homepage in reverse chronological order.

- Pages are for content like "About the Author" or "Contact the Author." They are not influenced by time and their content seldom changes. Pages help organize and manage static content. They share similarities with posts in terms of having titles and content, maintaining a consistent appearance through templates.

However, pages have distinct features compared to posts.

- Pages' content is less time-sensitive and is primarily used for sharing. Pages can use various templates, template tags, and other PHP code.

- Pages don't appear on the main page like posts do. Also, pages can't be associated with categories or assigned tags.

## Supplementary Information on Variables

[View Original](https://hexo.io/zh-cn/docs/variables)

### About `page.excerpt & post.excerpt`

These variables, described as page excerpts, are introduced in the default `landscape` theme, but their usage is not explicitly explained in the documentation.

* How to use:

Include `<!-- more -->` in your content while editing.

```
---
title: Some Issues Regarding HEXO
date: 2022-12-16 23:52:46
tags:
---

During the use of HEXO, I have identified some aspects not covered in the official documentation. I'll document them here.

<!-- more -->
```

Homepage display effect:

![Excerpt Example](/assets/images/about-hexo/image-20221217000842772.png)

* Implementation:

In `themes\landscape\layout\_partial\article.ejs`, there is a logic segment related to the display on the homepage and detail pages.

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

When the excerpt is not empty and the index flag is set to `true`, only the page excerpt is displayed. The original content is replaced by `theme.excerpt_link` (this configuration is in `themes\landscape\_config.yml`).