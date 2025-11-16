import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter, Newsreader } from 'next/font/google';
import { site } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s – ${site.name}`
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: site.name,
    url: site.url,
    description: site.description,
    siteName: site.name
  },
  twitter: { card: 'summary_large_image', creator: site.socials.twitter }
};

export const viewport: Viewport = {
  themeColor: '#0EA5E9'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}


