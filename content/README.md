# Content

目前博客只发布 `essays/` 中的文章。没有真实内容的栏目先不建立，也不放示例数据。

## 写一篇文章

在 `content/essays/` 下新建 Markdown 文件，例如：

```text
travel-notes.md            # 也可以用中文文件名，例如：旅行随记.md
```

推荐 frontmatter：

```yaml
---
title: "文章标题"
description: "一行简介"
date: 2026-10-19       # 你决定采用的发布日期，不依赖文件名
# updated: 2026-10-20  # optional：后续修订日期
# slug: travel-notes   # optional：网页 URL 的固定标识；不写则使用文件名
status: draft          # private | draft | public
kind: essay            # essay | tech
tags: []
heroImage: ""          # optional；只有配置时文章才显示头图
heroAlt: ""            # optional
---
```

**文件名不需要日期。** 网站的标题、时间排序、发布日期和标签以 frontmatter 为准。文章写几天都没关系，写完发布时再确定 `date` 即可；日后修订可以单独填写 `updated`。

网址默认根据 Markdown 文件名生成，也可以由 `slug` 明确指定。**建议文章发布后不要随意改变 `slug`**，否则旧链接会失效。已有公开文章保留了原来的 `slug`，即使源码文件已改名，旧网址仍可访问。中文文件名也支持；如果不希望网址包含中文，可指定简短英文 `slug`。

图片可按文章建立简短目录，例如 `content/essays/image/travel-notes/`，正文中引用 `![照片](image/travel-notes/photo.jpg)`，不用在目录名里重复日期。

正文直接使用 Markdown。当前文章样式支持标题、列表、引用、表格、图片、图注、行内代码和代码块。

## 发布状态

- `private`：不公开
- `draft`：正在写
- `public`：参与网站构建并发布

写完并确认要公开后，将 `status` 改为 `public`，commit + push 后 GitHub Pages 会自动部署。注意：`draft` / `private` 只控制网站是否展示文章；**如果把草稿提交到公开 GitHub 仓库，其源文件仍然是公开可见的**。不想公开的草稿请先保留在本地。

## 文章类型

- `kind: essay`：记录、随笔和思考。正文保持现在偏阅读型的衬线字体与宽松行距。
- `kind: tech`：技术文章。文章页会显示 `TECH · BUILD`，技术标签使用 `#tag` 形式；正文更宽、更紧凑，代码块、表格、引用和行内代码会使用更适合技术内容的样式。

技术文章仍然使用普通 Markdown，不需要额外语法。代码建议使用带语言名的 fenced code block，例如 ` ```bash `、` ```python `；图片和现有图注语法继续可用。