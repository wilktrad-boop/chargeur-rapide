import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

export default function ChargeursIndex() {
  const posts = getCategoryPosts('chargeurs');
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <h1 className="my-8 text-3xl font-semibold text-textStrong">Chargeurs</h1>
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-border p-4 hover:shadow-soft">
              <h2 className="text-lg font-semibold"><Link href={`/${p.category}/${p.slug}`}>{p.title}</Link></h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-700">{p.description}</p>
              <div className="mt-3 text-xs text-slate-500">{new Date(p.date).toLocaleDateString('fr-FR')}</div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}












