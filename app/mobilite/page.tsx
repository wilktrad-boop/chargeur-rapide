import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleCard } from '@/components/ArticleCard';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

export default function MobiliteIndex() {
  const posts = getCategoryPosts('mobilite');
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <div className="my-8">
          <h1 className="text-3xl font-semibold text-textStrong">Mobilité</h1>
          <p className="mt-2 text-slate-700">Trottinettes, vélos électriques, bornes et infrastructures.</p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard
              key={p.slug}
              slug={p.slug}
              category={p.category}
              title={p.title}
              description={p.description}
              date={p.date}
              cover={p.cover}
              readingTime={p.readingTime}
            />
          ))}
        </ul>
        {posts.length === 0 && (
          <div className="text-center py-12 text-slate-600">
            <p>Aucun article disponible pour le moment.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
