import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickGuideCard } from '@/components/QuickGuideCard';
import { RecommendationsSection } from '@/components/RecommendationsSection';
import { ChargeurCard, getBadgeFromSlug } from '@/components/ChargeurCard';
import { getCategoryPosts } from '@/lib/mdx';

export const revalidate = 300;

const filters = ['Tous', 'Smartphone', 'PC portable', 'Multi-ports / voyage', 'Charge sans fil'];

export default function ChargeursIndex() {
  const posts = getCategoryPosts('chargeurs');

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-12">
        {/* En-tête */}
        <section className="my-8">
          <h1 className="text-3xl font-semibold text-textStrong">Chargeurs USB-C et GaN</h1>
          <p className="mt-3 text-textMain">
            Comparatifs, tests et guides d'achat pour chargeurs USB-C, GaN et multiports.
            <br />
            Pour smartphone, PC portable, tablette et voyage.
          </p>
        </section>

        {/* Bloc "Comment choisir rapidement" */}
        <section className="mb-10">
          <QuickGuideCard />
        </section>

        {/* Filtres et tri */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-bgSubtle text-textMain hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div>
            <select
              className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-textMain focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue="recent"
            >
              <option value="recent">Plus récents</option>
              <option value="popular">Populaires</option>
            </select>
          </div>
        </section>

        {/* Grille d'articles */}
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <ChargeurCard
              key={p.slug}
              slug={p.slug}
              category={p.category}
              title={p.title}
              description={p.description}
              date={p.date}
              badge={getBadgeFromSlug(p.slug, p.title)}
            />
          ))}
        </ul>

        {/* Recommandations rapides */}
        <RecommendationsSection />
      </main>
      <Footer />
    </>
  );
}
