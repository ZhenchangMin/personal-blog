import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum(['private', 'draft', 'public']).default('draft');

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    location: z.string().optional(),
    status,
    kind: z.enum(['essay', 'learn']).default('essay'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const moments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/moments' }),
  schema: z.object({
    date: z.coerce.date(),
    status,
    location: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
  }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/logs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    location: z.string().optional(),
    status,
    tags: z.array(z.string()).default([]),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/now' }),
  schema: z.object({
    date: z.coerce.date(),
    status,
    location: z.string().optional(),
    summary: z.string(),
    learning: z.string().optional(),
    building: z.string().optional(),
    thinking: z.string().optional(),
    wanting: z.string().optional(),
  }),
});

export const collections = { essays, moments, logs, now };
