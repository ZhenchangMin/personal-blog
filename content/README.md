# Content Model

这里存博客真正的内容。当前阶段先保持文件结构简单，不绑定任何框架。

## 内容类型

### essays/

比较完整的文章与思考。

适合：
- 对人生、学习、科研、职业的完整思考
- 技术理解与学习记录
- 一次经历之后整理出的文章

建议最小元信息：

```yaml
title: "..."
date: 2026-09-05
location: "Nanjing"   # optional
status: draft          # private | draft | public
tags: []               # optional, 少量即可
```

### moments/

没有标题压力的短记录。

适合：
- 一句话
- 一张照片 + 一句话
- 某天突然想到的东西
- 很短的学习发现
- 一首歌 / 一本书 / 一个链接留下的感受

建议最小元信息：

```yaml
date: 2026-09-05 14:30
status: draft          # private | draft | public
location: "Nanjing"   # optional
photos: []             # optional
```

标题不是必填字段。

### logs/

月记、旅行记录、阶段总结。

重点不是“总结得多完整”，而是保存一个阶段的生活切片。

### projects/

项目故事。

重点写：
- 为什么开始
- 最初想解决什么
- 中间发生了什么
- 学到了什么
- 现在是什么状态
- 未来还想不想继续

不要只写技术栈和 GitHub 链接。

## 内容状态

统一使用：

```text
private -> draft -> public
```

- `private`：只给自己看
- `draft`：正在整理，暂不发布
- `public`：可以出现在博客

公开不是默认动作。

## 文件命名

文章：

```text
2026-09-05-why-i-want-a-blog.md
```

Moment 可以按日期或 UUID；第一版建议按日期：

```text
2026-09-05.md
```

同一天多条 Moment 时，可在一个文件中存多条，避免产生大量微小文件。真正实现时再根据框架的 content collection 能力调整。

## 原则

内容结构服务于“容易留下东西”，而不是服务于 CMS 的复杂性。

在技术栈确定前，不把这些约定写死成某个框架的 frontmatter schema。
