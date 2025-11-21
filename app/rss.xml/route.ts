import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import { site } from '@/config/site';

export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const items = posts
    .map(
      (p) => `    <item>\n      <title><![CDATA[${p.title}]]></title>\n      <link>${site.url}/${p.category}/${p.slug}</link>\n      <guid>${site.url}/${p.category}/${p.slug}</guid>\n      <description><![CDATA[${p.description}]]></description>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${site.name}</title>\n    <link>${site.url}</link>\n    <description>${site.description}</description>\n${items}\n  </channel>\n</rss>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
}














