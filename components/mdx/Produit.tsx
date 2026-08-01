import { amazonUrl } from '@/config/affiliate';

interface ProduitProps {
  asin: string;
  titre: string;
  prix?: string;
  points?: string[];
  badge?: string;
  subid?: string;
}

export function Produit({ asin, titre, prix, points = [], badge, subid }: ProduitProps) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-border p-5">
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-textStrong">{titre}</div>
          {prix && <div className="mt-1 text-sm text-textMain">À partir de {prix}</div>}
        </div>
      </div>
      {points.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-textMain">
          {points.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      )}
      <a
        href={amazonUrl(asin, subid)}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primaryHover"
      >
        Voir le prix sur Amazon
      </a>
    </div>
  );
}
