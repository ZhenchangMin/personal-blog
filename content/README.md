# Content

目前博客只发布 `essays/` 中的文章。没有真实内容的栏目先不建立，也不放示例数据。

## 写一篇文章

在 `content/essays/` 下新建 Markdown 文件，例如：

```text
2026-09-12-why-i-want-a-blog.md
```

推荐 frontmatter：

```yaml
---
title: "文章标题"
description: "一行简介"
date: 2026-09-12
status: draft          # private | draft | public
kind: essay            # essay | learn
tags: []
location: ""           # optional
heroImage: ""          # optional；只有配置时文章才显示头图
heroAlt: ""            # optional
---
```

正文直接使用 Markdown。当前文章样式支持标题、列表、引用、表格、图片、图注、行内代码和代码块。

## 发布状态

- `private`：不公开
- `draft`：正在写
- `public`：参与网站构建并发布

写完并确认要公开后，将 `status` 改为 `public`，commit + push 后 GitHub Pages 会自动部署。

以后如果真的开始写 Moments、阶段记录或其他内容，再根据真实需要增加对应的 content collection；在那之前不放占位内容。
