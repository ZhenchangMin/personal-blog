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
kind: essay            # essay | tech
tags: []
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

## 文章类型

- `kind: essay`：记录、随笔和思考。正文保持现在偏阅读型的衬线字体与宽松行距。
- `kind: tech`：技术文章。文章页会显示 `TECH · BUILD`，技术标签使用 `#tag` 形式；正文更宽、更紧凑，代码块、表格、引用和行内代码会使用更适合技术内容的样式。

技术文章仍然使用普通 Markdown，不需要额外语法。代码建议使用带语言名的 fenced code block，例如 ` ```bash `、` ```python `；图片和现有图注语法继续可用。