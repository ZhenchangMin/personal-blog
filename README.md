# personal-blog · 留痕

一个长期维护的个人博客 / 数字花园 / 生活档案。

这里不只是技术博客，也不是把私人日记原样公开。它更像一个经过整理的个人生活档案：记录做过的事、想过的问题、学到的东西，以及那些不值得被忘记的普通瞬间。

## 技术栈

- Astro 7
- TypeScript
- Astro Content Collections
- Markdown / MDX 内容
- GitHub Pages + GitHub Actions（0 成本部署方案）

## 本地开发

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
```

当前构建要求保持 `astro check` 为 0 errors / 0 warnings / 0 hints。

## 内容结构

- `content/essays/`：完整思考、学习记录和长文
- `content/moments/`：没有标题压力的短记录 / 生活片段
- `content/logs/`：月记、旅行、阶段总结
- `content/now/`：当前阶段的个人快照

每份内容都有 `private / draft / public` 状态。网站只发布 `public` 内容。

## 首页多背景

配置文件：

```text
src/config/site.ts
```

图片建议放在：

```text
public/images/hero/
```

然后加入：

```ts
{
  src: '/images/hero/my-photo.jpg',
  alt: '',
  credit: 'Photo by min',
}
```

首页支持两种策略：

```ts
mode: 'random'
```

每次进入首页随机选择另一张背景，适合目前“安静的生活档案”气质。

也可以改为：

```ts
mode: 'slideshow'
intervalMs: 9000
```

页面停留期间会以淡入淡出的方式切换图片。系统开启“减少动态效果”时不会自动轮播。

> 不建议直接把网络上找到的艺人写真放进仓库公开发布。只有自己拥有使用权、明确授权再利用，或许可协议允许的图片才适合作为正式公开背景。

## GitHub Pages

项目已包含：

```text
.github/workflows/deploy.yml
```

使用 Astro 官方 GitHub Pages Action，在推送到 `main` 后自动构建并部署。

`astro.config.mjs` 会在 GitHub Actions 中自动判断：

- 仓库叫 `<username>.github.io`：发布到站点根路径 `/`
- 普通仓库，例如 `personal-blog`：发布到 `/<repo-name>`

因此不需要现在提前写死 GitHub 用户名或仓库名。

真正上传 GitHub 后还需要在仓库：

```text
Settings → Pages → Source → GitHub Actions
```

选择 GitHub Actions。

当前部署计划使用普通仓库：

```text
personal-blog
```

因此 GitHub Pages 地址会是：

```text
https://<username>.github.io/personal-blog/
```

`<username>.github.io` 专属仓库保留给未来单独的个人主页。

## 站点基础设施

当前正式实现还包含：

- `/about`：关于这个博客和当前的自己
- `/projects`：以项目故事而不是技术栈为主的项目页
- `/404.html`：与 D3 视觉一致的自定义 404，并设置 `noindex`
- `/rss.xml`：公开 Essays / Logs 的 RSS 订阅
- `sitemap-index.xml`：构建时自动生成 sitemap
- canonical URL、Open Graph、Twitter Card 元信息
- `public/favicon.svg`：站点 favicon
- `public/images/social-card.png`：默认 1200×630 分享卡片

以上路径都经过 `personal-blog` GitHub Pages 子路径模拟验证。

## 设计基线

当前首页设计基线是 D3，原型保留在：

```text
prototype/d3-polished/
```

正式 Astro 实现位于 `src/`。设计原型不会覆盖，方便后续视觉回归对比。

当前原则：

1. 不证明自己。
2. 允许普通。
3. 让时间留下来。
4. 不强迫每个想法长成文章。
5. 公开但克制。
