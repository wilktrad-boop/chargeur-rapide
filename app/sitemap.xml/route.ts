import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import { site } from '@/config/site';

export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const urls = posts
    .map((p) => `  <url>\n    <loc>${site.url}/${p.category}/${p.slug}</loc>\n    <lastmod>${(p.updated || p.date).split('T')[0]}</lastmod>\n  </url>`) 
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site.url}</loc>\n  </url>\n  <url>\n    <loc>${site.url}/a-propos</loc>\n  </url>\n  <url>\n    <loc>${site.url}/contact</loc>\n  </url>\n${urls}\n</urlset>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}








