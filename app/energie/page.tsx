import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

export default function EnergieIndex() {
  const posts = getCategoryPosts('energie');
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        <div className="my-8">
          <h1 className="text-3xl font-semibold text-textStrong">Énergie</h1>
          <p className="mt-2 text-slate-700">Innovation, GaN, solaire, efficacité énergétique.</p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-border p-4 hover:shadow-soft">
              <h2 className="text-lg font-semibold"><Link href={`/${p.category}/${p.slug}`} className="hover:text-primary">{p.title}</Link></h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-700">{p.description}</p>
              <div className="mt-3 text-xs text-slate-500">{new Date(p.date).toLocaleDateString('fr-FR')}</div>
            </li>
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
