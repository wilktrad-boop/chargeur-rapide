import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

export default function EntrepriseIndex() {
  const posts = getCategoryPosts('entreprise');

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {/* Hero section */}
        <section className="my-10">
          <h1 className="text-3xl font-semibold text-textStrong">Entreprise</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Ressources et outils pour les professionnels et entrepreneurs. Découvrez des plateformes, solutions et guides pour développer votre activité.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Plateformes business
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Outils professionnels
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Ressources entrepreneurs
            </span>
          </div>
        </section>

        {/* Liste des articles */}
        {posts.length > 0 ? (
          <section className="my-12">
            <h2 className="text-2xl font-semibold text-textStrong mb-6">
              Tous les articles
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug} className="group rounded-2xl border border-border bg-white p-6 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>Entreprise</span>
                    {p.readingTime && (
                      <>
                        <span>·</span>
                        <span>{p.readingTime} min de lecture</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">
                    <Link href={`/${p.category}/${p.slug}`} className="hover:text-primary">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-700">{p.description}</p>
                  <div className="mt-4 text-xs text-slate-500">
                    {new Date(p.date).toLocaleDateString('fr-FR')}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="text-center py-12 text-slate-600">
            <p>Aucun article disponible pour le moment.</p>
          </div>
        )}

        {/* Bloc newsletter */}
        <section className="my-16">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-accent/5 border border-primary/10 p-8 text-center">
            <h2 className="text-2xl font-semibold text-textStrong mb-3">
              Restez informé
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              Recevez nos derniers articles et ressources pour entrepreneurs directement dans votre boîte mail.
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 rounded-2xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Adresse email"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-primaryHover transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
