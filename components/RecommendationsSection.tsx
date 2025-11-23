import Link from 'next/link';

interface Recommendation {
  href: string;
  title: string;
  usage: string;
}

const recommendations: Recommendation[] = [
  {
    href: '/chargeurs/chargeur-usb-c-65w',
    title: 'Chargeur USB-C 65 W',
    usage: 'Idéal pour ultraportables et smartphones',
  },
  {
    href: '/chargeurs/chargeur-gan-100w',
    title: 'Chargeur GaN 100 W',
    usage: 'Pour PC portables gourmands et charge multi-appareils',
  },
  {
    href: '/chargeurs/cables-usb-c-choisir',
    title: 'Câbles USB-C',
    usage: 'Bien choisir son câble pour une charge optimale',
  },
];

export function RecommendationsSection() {
  return (
    <section className="mt-16 rounded-2xl border border-border bg-bgSubtle p-6">
      <h2 className="text-xl font-semibold text-textStrong">Nos recommandations rapides</h2>
      <ul className="mt-4 space-y-3">
        {recommendations.map((rec) => (
          <li key={rec.href} className="flex items-start gap-3">
            <span className="text-primary">→</span>
            <div>
              <Link
                href={rec.href}
                className="font-medium text-textStrong hover:text-primary transition-colors"
              >
                {rec.title}
              </Link>
              <p className="text-sm text-slate-500">{rec.usage}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
