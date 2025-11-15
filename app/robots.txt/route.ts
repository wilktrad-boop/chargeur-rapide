import { NextResponse } from 'next/server';

export const revalidate = 3600;

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: /sitemap.xml`;
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}











