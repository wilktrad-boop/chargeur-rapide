import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

export default function GuidesIndex() {
  const posts = getCategoryPosts('guides');

  // Organisation thématique des guides
  const guidesByTheme = {
    comprendre: [
      'fonctionnement-chargeur-rapide',
      'charge-30w-65w-100w',
      'charge-sans-fil-vs-filaire',
    ],
    preserver: [
      'erreurs-batteries',
      'laisser-telephone-charge-toute-nuit',
      'charge-rapide-abime-batterie',
      'comment-charger-telephone-plus-vite',
    ],
    choisir: [
      'choisir-chargeur-rapide',
    ],
    mobilite: [
      'borne-recharge-domicile',
    ],
  };

  // Fonction pour récupérer les guides d'une section
  const getGuidesByTheme = (slugs: string[]) => {
    return slugs
      .map(slug => posts.find(p => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  };

  const comprehensionGuides = getGuidesByTheme(guidesByTheme.comprendre);
  const preservationGuides = getGuidesByTheme(guidesByTheme.preserver);
  const choiceGuides = getGuidesByTheme(guidesByTheme.choisir);
  const mobilityGuides = getGuidesByTheme(guidesByTheme.mobilite);

  // Guides pour le parcours débutant
  const starterGuides = [
    posts.find(p => p.slug === 'fonctionnement-chargeur-rapide'),
    posts.find(p => p.slug === 'charge-30w-65w-100w'),
    posts.find(p => p.slug === 'choisir-chargeur-rapide'),
  ].filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {/* Hero pédagogique */}
        <section className="my-10">
          <h1 className="text-3xl font-semibold text-textStrong">Guides</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Guides transverses pour comprendre la charge rapide, préserver vos batteries et choisir le bon matériel, sans jargon inutile.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Comprendre
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Optimiser
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Préserver la batterie
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-bgSubtle border border-border text-slate-700">
              Mobilité électrique
            </span>
          </div>
        </section>

        {/* Section 1 – Comprendre la charge et la puissance */}
        {comprehensionGuides.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold text-textStrong mb-6">
              Comprendre la charge et la puissance
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {comprehensionGuides.map((p) => (
                <li key={p.slug} className="group rounded-2xl border border-border bg-white p-6 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>Comprendre</span>
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
        )}

        {/* Section 2 – Préserver la batterie au quotidien */}
        {preservationGuides.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold text-textStrong mb-6">
              Préserver la batterie au quotidien
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {preservationGuides.map((p) => (
                <li key={p.slug} className="group rounded-2xl border border-border bg-white p-6 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>Préserver la batterie</span>
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
        )}

        {/* Section 3 – Bien choisir son matériel */}
        {choiceGuides.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold text-textStrong mb-6">
              Bien choisir son matériel
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {choiceGuides.map((p) => (
                <li key={p.slug} className="group rounded-2xl border border-border bg-white p-6 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>Bien choisir</span>
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
        )}

        {/* Section 4 – Mobilité électrique et recharge à domicile */}
        {mobilityGuides.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold text-textStrong mb-6">
              Mobilité électrique et recharge à domicile
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {mobilityGuides.map((p) => (
                <li key={p.slug} className="group rounded-2xl border border-border bg-white p-6 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>Mobilité électrique</span>
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
        )}

        {/* Bloc "Par où commencer si vous êtes perdu ?" */}
        {starterGuides.length > 0 && (
          <section className="my-16">
            <div className="rounded-2xl bg-bgSubtle border border-border p-8">
              <h2 className="text-2xl font-semibold text-textStrong mb-3">
                Par où commencer si vous êtes perdu ?
              </h2>
              <p className="text-slate-600 mb-6">
                Suivez ces 3 guides dans l'ordre pour maîtriser les bases de la charge rapide.
              </p>
              <ol className="space-y-4">
                {starterGuides.map((guide, index) => (
                  <li key={guide.slug} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <Link
                        href={`/${guide.category}/${guide.slug}`}
                        className="text-primary hover:text-primaryHover font-medium"
                      >
                        {guide.title}
                      </Link>
                      <p className="text-sm text-slate-600 mt-1">{guide.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Bloc newsletter spécifique guides */}
        <section className="my-16">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-accent/5 border border-primary/10 p-8 text-center">
            <h2 className="text-2xl font-semibold text-textStrong mb-3">
              Recevez nos prochains guides
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
              1 email par mois pour mieux comprendre la charge rapide, éviter les erreurs avec vos batteries et choisir le bon matériel.
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
