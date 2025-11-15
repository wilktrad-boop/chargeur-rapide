import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Post, getAllPosts } from '@/lib/mdx';

function resolveInternalLinks(raw: string) {
  const all = getAllPosts();
  const bySlug = new Map(all.map((p) => [p.slug, p] as const));
  return raw.replace(/\[\[([a-z0-9-]+)\]\]/gi, (_, s: string) => {
    const hit = bySlug.get(s);
    if (hit) return `[${hit.title}](/${hit.category}/${hit.slug})`;
    return s;
  });
}

export async function serializePost(post: Post) {
  const withLinks = resolveInternalLinks(post.content);
  return serialize(withLinks, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug
      ],
    },
  });
}

export function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ id, text, level });
  }

  return headings;
}
