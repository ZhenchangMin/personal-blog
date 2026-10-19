import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum(['private', 'draft', 'public']).default('draft');

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/essays', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    slug: z.string().regex(/^[\p{L}\p{N}][\p{L}\p{N}-]*$/u).optional(),
    updated: z.coerce.date().optional(),
    status,
    kind: z.enum(['essay', 'tech']).default('essay'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  }),
});

export const collections = { essays };
