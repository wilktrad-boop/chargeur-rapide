import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MDXContent } from '@/components/mdx/MDXContent';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { serializePost, extractHeadings } from '@/lib/mdx-render';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : [],
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

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-4">
          <article className="lg:col-span-3">
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

            <MDXContent source={mdxSource} headings={headings} />
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-border bg-white p-4">
                <h3 className="mb-3 font-semibold text-textStrong">Auteur</h3>
                <p className="text-sm text-slate-700">{post.author}</p>
              </div>
              
              {post.tags.length > 0 && (
                <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                  <h3 className="mb-3 font-semibold text-textStrong">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-bgSubtle px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}


