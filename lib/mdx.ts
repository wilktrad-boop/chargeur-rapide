import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

export const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  author: z.string().default('Rédaction'),
  category: z.enum(['chargeurs', 'batteries', 'mobilite', 'energie', 'guides']),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  readingTime: z.number().optional(),
  toc: z.boolean().default(true),
  schemaType: z.enum(['Article', 'HowTo', 'FAQPage']).default('Article'),
  draft: z.boolean().optional()
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Post = Frontmatter & {
  filePath: string;
  content: string;
};

export function listMdxFiles() {
  const entries: string[] = [];
  const categories = ['chargeurs', 'batteries', 'mobilite', 'energie', 'guides'];
  for (const dir of categories) {
    const full = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full)) {
      if (f.endsWith('.mdx') || f.endsWith('.md')) entries.push(path.join(full, f));
    }
  }
  return entries;
}

export function parseMdxFile(filePath: string): Post | null {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const res = FrontmatterSchema.safeParse(data);
  if (!res.success) return null;
  return { ...res.data, filePath, content };
}

export function getAllPosts(): Post[] {
  return listMdxFiles()
    .map(parseMdxFile)
    .filter(Boolean) as Post[];
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getCategoryPosts(category: Frontmatter['category']): Post[] {
  return getAllPosts()
    .filter((p) => p.category === category && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}


