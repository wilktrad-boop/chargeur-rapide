import { amazonUrl, amazonSearchUrl } from '@/config/affiliate';

interface ProduitCompare {
  asin?: string;
  recherche?: string;
  titre: string;
  note?: number;
  prix?: string;
  pour: string[];
  contre: string[];
  badge?: string;
  subid?: string;
}

interface ComparatifProps {
  produits: ProduitCompare[];
}

export function Comparatif({ produits }: ComparatifProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': produits
      .filter((p) => typeof p.note === 'number')
      .map((p) => ({
        '@type': 'Product',
        name: p.titre,
        review: {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: p.note, bestRating: 5 },
          author: { '@type': 'Organization', name: 'Chargeur-Rapide' },
        },
      })),
  };
  return (
    <div className="not-prose my-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold text-textStrong">Produit</th>
              <th className="py-2 pr-4 font-semibold text-textStrong">Points forts</th>
              <th className="py-2 pr-4 font-semibold text-textStrong">Limites</th>
              <th className="py-2 font-semibold text-textStrong"></th>
            </tr>
          </thead>
          <tbody>
            {produits.map((p) => {
              const href = p.asin ? amazonUrl(p.asin, p.subid) : amazonSearchUrl(p.recherche ?? '', p.subid);
              return (
                <tr key={p.asin ?? p.recherche ?? p.titre} className="border-b border-border align-top">
                  <td className="py-3 pr-4">
                    <div className="font-semibold text-textStrong">{p.titre}</div>
                    {p.badge && <div className="text-xs text-accent">{p.badge}</div>}
                    {p.prix && <div className="text-xs text-textMain">{p.prix}</div>}
                    {typeof p.note === 'number' && (
                      <div className="text-xs text-textMain">★ {p.note}/5</div>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-textMain">{p.pour.join(', ')}</td>
                  <td className="py-3 pr-4 text-textMain">{p.contre.join(', ')}</td>
                  <td className="py-3">
                    <a
                      href={href}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primaryHover"
                    >
                      Voir sur Amazon
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {jsonLd['@graph'].length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </div>
  );
}
