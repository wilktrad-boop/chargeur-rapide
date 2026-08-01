export const AMAZON_TAG = 'rapide01-21';
export const AMAZON_HOST = 'https://www.amazon.fr';

/** Construit une URL produit Amazon.fr taggée. `subid` (optionnel) = suivi par page via ascsubtag. */
export function amazonUrl(asin: string, subid?: string): string {
  const params = new URLSearchParams({ tag: AMAZON_TAG, language: 'fr_FR' });
  if (subid) params.set('ascsubtag', subid);
  return `${AMAZON_HOST}/dp/${encodeURIComponent(asin)}?${params.toString()}`;
}

/** Construit une URL de recherche Amazon.fr taggée (utilisée quand l'ASIN n'est pas vérifié). */
export function amazonSearchUrl(query: string, subid?: string): string {
  const params = new URLSearchParams({ k: query, tag: AMAZON_TAG, language: 'fr_FR' });
  if (subid) params.set('ascsubtag', subid);
  return `${AMAZON_HOST}/s?${params.toString()}`;
}
