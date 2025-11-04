import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function HtmlSitemapPage() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const byCat = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">Plan du site</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {Object.entries(byCat).map(([cat, list]) => (
            <section key={cat} className="rounded-2xl border border-border p-4">
              <h2 className="mb-3 text-xl font-semibold capitalize">{cat}</h2>
              <ul className="space-y-2 text-sm">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.category}/${p.slug}`} className="hover:text-primary">{p.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}




