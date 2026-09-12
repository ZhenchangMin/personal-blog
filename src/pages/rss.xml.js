import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/url';

export async function GET(context) {
  const items = (await getCollection('essays'))
    .filter((entry) => entry.data.status === 'public')
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: withBase(`/writing/${entry.id}`),
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'min的博客',
    description: 'min的个人博客',
    site: new URL(import.meta.env.BASE_URL, context.site),
    items,
    customData: '<language>zh-CN</language>',
  });
}
