import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MDXContent } from '@/components/mdx/MDXContent';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { getPostBySlug, getCategoryPosts } from '@/lib/mdx';
import { serializePost, extractHeadings } from '@/lib/mdx-render';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StickyCTA } from '@/components/StickyCTA';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getCategoryPosts('chargeurs').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const canonicalUrl = `/${post.category}/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : [],
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const mdxSource = await serializePost(post);
  const headings = extractHeadings(post.content);

  const siteUrl = 'https://www.chargeur-rapide.fr';
  const articleUrl = `${siteUrl}/${post.category}/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': post.schemaType === 'HowTo' ? 'HowTo' : 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: articleUrl,
    author: { '@type': 'Organization', name: 'Chargeur-Rapide', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'Chargeur-Rapide', url: siteUrl },
    ...(post.cover ? { image: `${siteUrl}${post.cover}` } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className={`mx-auto max-w-6xl px-4${post.cta ? ' pb-24' : ''}`}>
        <div className="grid gap-8">
          <article>
            <div className="mb-8">
              <nav className="mb-4 text-sm">
                <Link href="/" className="text-primary hover:text-primaryHover">Accueil</Link>
                <span className="mx-2">/</span>
                <Link href={`/${post.category}`} className="text-primary hover:text-primaryHover capitalize">
                  {post.category}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-600">{post.title}</span>
              </nav>
              
              <h1 className="text-3xl font-semibold text-textStrong">{post.title}</h1>
              
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </time>
                {post.updated && post.updated !== post.date && (
                  <>
                    <span>•</span>
                    <span>Mis à jour le {new Date(post.updated).toLocaleDateString('fr-FR')}</span>
                  </>
                )}
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min de lecture</span>
                  </>
                )}
              </div>

              {post.cover && (
                <div className="mt-6">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="rounded-2xl"
                    priority
                  />
                </div>
              )}
            </div>

            {headings.length > 0 && (
              <TableOfContents headings={headings} variant="inline" />
            )}

            <MDXContent source={mdxSource} />
          </article>
        </div>
      </main>
      <Footer />
      {post.cta && (
        <StickyCTA label={post.cta.label} url={post.cta.url} note={post.cta.note} />
      )}
    </>
  );
}


