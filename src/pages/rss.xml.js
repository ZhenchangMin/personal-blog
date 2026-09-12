import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/url';

export async function GET(context) {
  const essays = (await getCollection('essays')).filter((entry) => entry.data.status === 'public');
  const logs = (await getCollection('logs')).filter((entry) => entry.data.status === 'public');

  const items = [
    ...essays.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: withBase(`/writing/${entry.id}`),
    })),
    ...logs.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: withBase(`/logs/${entry.id}`),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'min的博客',
    description: '记录做过的事、想过的问题，以及那些不值得被忘记的普通瞬间。',
    site: new URL(import.meta.env.BASE_URL, context.site),
    items,
    customData: '<language>zh-CN</language>',
  });
}
