import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';

export default function HomePage() {
  const posts = getAllPosts()
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = posts.slice(0, 6);
  const guides = posts.filter((p) => p.category === 'guides').slice(0, 5);

  // Images pour les articles - rotation pour avoir de la variété
  const articleImages = [
    '/images/charging-phone-4874592_1280.jpg',
    '/images/convenient-charger-8062070_1280.jpg',
    '/images/smartphone-2568602_1280.jpg',
    '/images/two-pin-3509490_1280.jpg',
    '/images/iphone-2618080_1280.jpg',
    '/images/photovoltaic-2138992_1280.jpg',
  ];

  const guideImages = [
    '/images/carsharing-4382651_1280.jpg',
    '/images/electric-car-4276419_1280.jpg',
    '/images/e-scooter-5432641_1280.jpg',
    '/images/battery-pack-1049668_1280.jpg',
    '/images/smartphone-1641906_1280.jpg',
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="my-10 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 shadow-soft overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8">
              <h1 className="text-3xl font-semibold text-textStrong">Chargeur‑Rapide</h1>
              <p className="mt-3 text-slate-700">Média indépendant sur la charge, l'énergie mobile et la mobilité durable. Guides, comparatifs et explications techniques.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/guides" className="rounded-2xl bg-primary px-4 py-2 text-white hover:bg-primaryHover">Guides</Link>
                <Link href="/chargeurs" className="rounded-2xl border border-primary px-4 py-2 text-primary hover:bg-primary/10">Chargeurs</Link>
              </div>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src="/images/charging-phone-4874592_1280.jpg"
                alt="Chargement de téléphone"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Rubriques */}
        <section className="grid gap-6 md:grid-cols-3 my-12">
          {[
            { href: '/chargeurs', title: 'Chargeurs', desc: 'USB‑C, PD, PPS, câbles.', img: '/images/apple-3595603_1280.jpg' },
            { href: '/batteries', title: 'Batteries', desc: 'Externes, stations, solaire.', img: '/images/battery-pack-1049667_1280.jpg' },
            { href: '/mobilite', title: 'Mobilité', desc: 'Trottinettes, vélos, bornes.', img: '/images/electric-scooters-7340440_1280.jpg' },
            { href: '/energie', title: 'Énergie', desc: 'GaN, solaire, efficacité.', img: '/images/solar-panel-2396278_1280.jpg' },
            { href: '/guides', title: 'Guides', desc: 'Méthodes et bonnes pratiques.', img: '/images/wireless-charger-8062082_1280.jpg' },
          ].map((r) => (
            <Link key={r.href} href={r.href} prefetch className="group rounded-2xl border border-border overflow-hidden hover:shadow-soft focus-ring transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold text-textStrong">{r.title}</div>
                <div className="mt-1 text-sm text-slate-600">{r.desc}</div>
              </div>
            </Link>
          ))}
        </section>

        {/* Derniers articles */}
        <section className="my-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-textStrong">Derniers articles</h2>
            <Link href="/guides" className="text-sm text-primary hover:text-primaryHover">Tous les guides →</Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {latest.map((p, index) => (
              <li key={p.slug} className="group rounded-2xl border border-border overflow-hidden hover:shadow-soft transition-all">
                <Link href={`/${p.category}/${p.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={articleImages[index % articleImages.length]}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-700">{p.description}</p>
                    <div className="mt-3 text-xs text-slate-500">{new Date(p.date).toLocaleDateString('fr-FR')}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Guides populaires */}
        <section className="my-12">
          <h2 className="mb-4 text-2xl font-semibold text-textStrong">Guides populaires</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              'choisir-chargeur-rapide',
              'charge-30w-65w-100w',
              'erreurs-batteries',
              'charge-sans-fil-vs-filaire',
              'borne-recharge-domicile',
            ].map((slug, index) => {
              const g = guides.find((x) => x.slug === slug) || posts.find((x) => x.slug === slug);
              return g ? (
                <li key={slug} className="group rounded-2xl border border-border overflow-hidden hover:shadow-soft transition-all">
                  <Link href={`/${g.category}/${g.slug}`} className="flex gap-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={guideImages[index % guideImages.length]}
                        alt={g.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <div className="font-medium hover:text-primary">{g.title}</div>
                      <div className="mt-1 text-sm text-slate-600 line-clamp-2">{g.description}</div>
                    </div>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>

        {/* Média indépendant */}
        <section className="my-16 rounded-2xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto min-h-[250px]">
              <Image
                src="/images/iphone-2618080_1280.jpg"
                alt="Média indépendant"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-textStrong">Média indépendant</h2>
              <p className="mt-3 text-slate-700">Aucune vente, aucun partenariat d'affiliation. Objectif : des informations techniques fiables et pérennes.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
