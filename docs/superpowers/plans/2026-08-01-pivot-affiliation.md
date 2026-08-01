# Pivot Affiliation Chargeur-Rapide — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer Chargeur-Rapide en site 100 % affiliation en monétisant le trafic Bing existant : centraliser le tag Amazon, brancher l'affiliation sur les pages qui reçoivent déjà le trafic, et nettoyer les pages junk.

**Architecture:** Build Next.js 14 serveur (pas d'export statique). Un moteur d'affiliation centralisé (`config/affiliate.ts` + composants MDX réutilisables) remplace les liens `amzn.to` dispersés. Le contenu MDX consomme ces composants. Les 11 pages junk sont supprimées et redirigées 301 vers la home via `next.config.mjs`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, MDX (`next-mdx-remote`), Tailwind. Pas de framework de test → vérification par `npx tsc --noEmit` + `npm run build` + inspection ciblée de la sortie.

## Global Constraints

- **Tag Amazon :** `rapide01-21` — marché **amazon.fr** uniquement.
- **Forme d'URL affiliée :** `https://www.amazon.fr/dp/{ASIN}?tag=rapide01-21&language=fr_FR` (construite via `amazonUrl()`, jamais en dur).
- **Attributs des liens sortants :** `target="_blank"` + `rel="sponsored nofollow noopener noreferrer"`.
- **ASIN :** uniquement des ASIN **réels et vérifiés** sur amazon.fr (fetch de la fiche produit). Aucun ASIN inventé.
- **Disclosure :** `<DisclosureAffiliation />` visible en haut de toute page monétisée.
- **Avis honnêtes :** pros ET cons pour chaque produit (playbook affiliation).
- **Pas de nouvelle dépendance npm.** Enregistrer tout nouveau composant MDX dans la map de `components/mdx/MDXContent.tsx` (même schéma que `BuyButtons`).
- **Vérification :** `npx tsc --noEmit` doit être propre et `npm run build` doit réussir avant chaque commit de tâche (les flags `ignoreBuildErrors`/`ignoreDuringBuilds` masquent les erreurs en build — toujours lancer `tsc` à part).

---

## Gabarit « page monétisée » (référencé par les tâches Vague 1 et Vague 2)

Chaque page monétisée suit ce gabarit, dans cet ordre :

1. En haut de l'article (après le H1/intro), insérer `<DisclosureAffiliation />`.
2. **Recherche produits** : identifier 1 à 3 produits Amazon.fr correspondant exactement à l'intention de la page (best-sellers actuels, bien notés). Pour chacun : `WebSearch` puis `WebFetch` de la fiche `amazon.fr/dp/{ASIN}` pour **confirmer** ASIN + titre + disponibilité.
3. Insérer un `<Comparatif>` (si ≥ 2 produits) OU des `<Produit>` individuels, avec pour chaque produit : titre réel, prix indicatif, 2-4 arguments, 1 point faible honnête.
4. **3 CTA** répartis : un bloc produit haut (après l'intro), un milieu d'article, un `<Comparatif>` ou CTA final en bas.
5. Maillage interne : 1-2 liens `[[slug]]` vers des pages complémentaires du site.
6. S'assurer que le frontmatter a `schemaType: "Review"` si la page est centrée sur un produit comparé (sinon laisser `Article`) — le schema Review est émis par `<Comparatif>`.
7. Retirer tout ancien lien `amzn.to` en dur de la page (remplacé par les composants taggés).

**Vérification d'une page monétisée :**
- `npx tsc --noEmit` propre.
- `npm run build` réussit.
- Lancer `npm run start`, ouvrir la page, confirmer visuellement : disclosure présente, 3 CTA, cartes produit.
- `curl -s http://localhost:3000/{cat}/{slug} | grep -o 'amazon.fr/dp/[A-Z0-9]*?tag=rapide01-21'` → renvoie les liens taggés attendus.

---

## Task 1: Moteur d'affiliation (config + composants MDX)

**Files:**
- Create: `config/affiliate.ts`
- Create: `components/mdx/Produit.tsx`
- Create: `components/mdx/Comparatif.tsx`
- Create: `components/mdx/DisclosureAffiliation.tsx`
- Modify: `components/mdx/MDXContent.tsx` (enregistrer les 3 nouveaux composants)

**Interfaces:**
- Produces:
  - `AMAZON_TAG: string`, `amazonUrl(asin: string, subid?: string): string` depuis `config/affiliate.ts`
  - `<Produit asin titre prix points badge? subid? />`
  - `<Comparatif produits={ProduitCompare[]} />` où `ProduitCompare = { asin: string; titre: string; note?: number; prix?: string; pour: string[]; contre: string[]; badge?: string }`
  - `<DisclosureAffiliation />`

- [ ] **Step 1: Créer la config affiliée**

Create `config/affiliate.ts`:
```ts
export const AMAZON_TAG = 'rapide01-21';
export const AMAZON_HOST = 'https://www.amazon.fr';

/** Construit une URL produit Amazon.fr taggée. `subid` (optionnel) = suivi par page via ascsubtag. */
export function amazonUrl(asin: string, subid?: string): string {
  const params = new URLSearchParams({ tag: AMAZON_TAG, language: 'fr_FR' });
  if (subid) params.set('ascsubtag', subid);
  return `${AMAZON_HOST}/dp/${encodeURIComponent(asin)}?${params.toString()}`;
}
```

- [ ] **Step 2: Créer le composant DisclosureAffiliation**

Create `components/mdx/DisclosureAffiliation.tsx`:
```tsx
export function DisclosureAffiliation() {
  return (
    <p className="not-prose my-4 rounded-lg border border-border bg-bgSubtle px-4 py-3 text-sm text-textMain">
      Certains liens de cette page sont des liens affiliés Amazon : si vous achetez via
      ces liens, nous percevons une commission, sans surcoût pour vous. Cela nous aide à
      maintenir le site. Nos recommandations restent indépendantes.
    </p>
  );
}
```

- [ ] **Step 3: Créer le composant Produit**

Create `components/mdx/Produit.tsx`:
```tsx
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
```

- [ ] **Step 4: Créer le composant Comparatif (avec schema Review JSON-LD)**

Create `components/mdx/Comparatif.tsx`:
```tsx
import { amazonUrl } from '@/config/affiliate';

interface ProduitCompare {
  asin: string;
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
            {produits.map((p) => (
              <tr key={p.asin} className="border-b border-border align-top">
                <td className="py-3 pr-4">
                  <div className="font-semibold text-textStrong">{p.titre}</div>
                  {p.badge && <div className="text-xs text-accent">{p.badge}</div>}
                  {p.prix && <div className="text-xs text-textMain">{p.prix}</div>}
                </td>
                <td className="py-3 pr-4 text-textMain">{p.pour.join(', ')}</td>
                <td className="py-3 pr-4 text-textMain">{p.contre.join(', ')}</td>
                <td className="py-3">
                  <a
                    href={amazonUrl(p.asin, p.subid)}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-block rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primaryHover"
                  >
                    Voir sur Amazon
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {jsonLd['@graph'].length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 5: Enregistrer les composants dans la map MDX**

Modify `components/mdx/MDXContent.tsx` — ajouter les imports et les entrées de la map :
```tsx
import { Produit } from './Produit';
import { Comparatif } from './Comparatif';
import { DisclosureAffiliation } from './DisclosureAffiliation';
```
Et dans l'objet `components` ajouter : `Produit,`, `Comparatif,`, `DisclosureAffiliation,`.

- [ ] **Step 6: Vérifier types + build**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

Run: `npm run build`
Expected: build réussi (les 3 composants compilent).

- [ ] **Step 7: Commit**

```bash
git add config/affiliate.ts components/mdx/Produit.tsx components/mdx/Comparatif.tsx components/mdx/DisclosureAffiliation.tsx components/mdx/MDXContent.tsx
git commit -m "feat: moteur d'affiliation centralisé (tag rapide01-21) + composants Produit/Comparatif/Disclosure"
```

---

## Task 2: Suppression des pages junk + redirections 301

**Files:**
- Delete: les 11 fichiers MDX junk (liste ci-dessous)
- Modify: `next.config.mjs` (ajouter `async redirects()`)

**Interfaces:**
- Consumes: rien.
- Produces: 11 redirections 301 `{ancienne URL} → /`.

- [ ] **Step 1: Supprimer les 11 fichiers MDX junk**

```bash
git rm \
  content/energie/compteur-edf-plomb.mdx \
  content/energie/compteur-texte-egc-vendee.mdx \
  content/energie/unite-technique-operationnelle-edf.mdx \
  content/energie/veol-edf-intranet.mdx \
  content/chargeurs/epershand-net-chargeurs-promotion.mdx \
  content/mobilite/co-valence-fr-mobilite-electrique.mdx \
  content/mobilite/trackr-fr-tech-localisation.mdx \
  content/guides/sabradou-trouver-chargeurs.mdx \
  content/entreprise/corexiapro-fr.mdx \
  content/entreprise/nexterprise-fr.mdx \
  content/entreprise/zone-business-fr.mdx
```

- [ ] **Step 2: Ajouter les redirections 301 dans next.config.mjs**

Modify `next.config.mjs` — ajouter dans l'objet `nextConfig` la fonction :
```js
  async redirects() {
    const junk = [
      '/energie/compteur-edf-plomb',
      '/energie/compteur-texte-egc-vendee',
      '/energie/unite-technique-operationnelle-edf',
      '/energie/veol-edf-intranet',
      '/chargeurs/epershand-net-chargeurs-promotion',
      '/mobilite/co-valence-fr-mobilite-electrique',
      '/mobilite/trackr-fr-tech-localisation',
      '/guides/sabradou-trouver-chargeurs',
      '/entreprise/corexiapro-fr',
      '/entreprise/nexterprise-fr',
      '/entreprise/zone-business-fr',
    ];
    return junk.map((source) => ({ source, destination: '/', permanent: true }));
  },
```

- [ ] **Step 3: Vérifier qu'aucun lien interne ne pointe vers les pages supprimées**

Run:
```bash
grep -rn "compteur-edf-plomb\|compteur-texte-egc-vendee\|unite-technique-operationnelle-edf\|veol-edf-intranet\|epershand-net-chargeurs-promotion\|co-valence-fr-mobilite-electrique\|trackr-fr-tech-localisation\|sabradou-trouver-chargeurs\|corexiapro-fr\|nexterprise-fr\|zone-business-fr" content/ components/ app/ config/
```
Expected: aucun résultat (les redirects couvrent tout lien externe restant ; corriger tout lien interne `[[slug]]` trouvé en le retirant ou le repointant).

- [ ] **Step 4: Vérifier build + 301**

Run: `npm run build` → réussi.
Run: `npm run start` puis `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/energie/veol-edf-intranet`
Expected: `308` ou `301` avec redirection vers `/`. (Next `permanent: true` = 308 ; acceptable et équivalent SEO.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: suppression des 11 pages junk (vente de liens) + 301 vers la home"
```

---

## Task 3: Navigation resserrée (sortir « Énergie »)

**Files:**
- Modify: `config/site.ts` (retirer l'entrée nav Énergie)
- Modify: `app/guides/page.tsx` (surfacer les pages énergie utiles restantes — vérifier le nom réel du fichier d'index Guides)

**Interfaces:**
- Consumes: `config/site.ts` nav.
- Produces: nav sans Énergie ; pages `/energie/*` utiles conservées à leur URL, liées depuis Guides.

Pages énergie utiles conservées (URLs inchangées, pas de redirect) : `innovation-gan-electronique`, `gan-vs-silicium`, `solaire-portable-technologies`, `efficacite-energetique-optimiser`.

- [ ] **Step 1: Retirer Énergie de la nav**

Modify `config/site.ts` — supprimer la ligne `{ label: 'Énergie', href: '/energie' },` du tableau `nav`. Laisser le reste de la map `categories` intact (la route `/energie/[slug]` continue de fonctionner pour les 4 pages conservées).

- [ ] **Step 2: Lier les pages énergie utiles depuis la page Guides**

Ouvrir la page d'index Guides (`app/guides/page.tsx`). Ajouter une petite section « À lire aussi » avec des liens vers les 4 pages énergie conservées :
```tsx
{/* Ajouter dans le JSX de la page Guides, avant la fermeture du conteneur principal */}
<section className="mt-10">
  <h2 className="mb-3 text-xl font-semibold text-textStrong">À lire aussi</h2>
  <ul className="space-y-1">
    <li><a className="text-primary hover:underline" href="/energie/innovation-gan-electronique">L'innovation GaN en électronique</a></li>
    <li><a className="text-primary hover:underline" href="/energie/gan-vs-silicium">GaN vs silicium</a></li>
    <li><a className="text-primary hover:underline" href="/energie/solaire-portable-technologies">Technologies du solaire portable</a></li>
    <li><a className="text-primary hover:underline" href="/energie/efficacite-energetique-optimiser">Optimiser son efficacité énergétique</a></li>
  </ul>
</section>
```
(Adapter le JSX au style existant de la page Guides.)

- [ ] **Step 3: Vérifier build + nav**

Run: `npx tsc --noEmit` → propre.
Run: `npm run build` → réussi.
Run: `npm run start`, ouvrir `http://localhost:3000`, confirmer que « Énergie » n'est plus dans le menu et que la page Guides liste les 4 pages.

- [ ] **Step 4: Commit**

```bash
git add config/site.ts app/guides/page.tsx
git commit -m "feat: nav resserrée sur l'achat — sortie d'Énergie du menu, pages utiles reliées depuis Guides"
```

---

## Task 4: Vague 1 — page `chargeur-samsung-galaxy-s25` (gabarit de référence)

**Files:**
- Modify: `content/chargeurs/chargeur-samsung-galaxy-s25.mdx`

**Interfaces:**
- Consumes: `<Produit>`, `<Comparatif>`, `<DisclosureAffiliation>` (Task 1).

- [ ] **Step 1: Rechercher et vérifier les produits**

Intention : chargeur rapide compatible Samsung Galaxy S25 (25W/45W USB-C PD/PPS).
Produits cibles à rechercher (`WebSearch` « chargeur Samsung 45W USB-C amazon.fr », puis `WebFetch` de chaque fiche `amazon.fr/dp/{ASIN}` pour confirmer ASIN + titre + dispo) :
- le chargeur secteur **Samsung 45W** officiel (USB-C, Super Fast Charging 2.0) ;
- une alternative **GaN 45W** bien notée (ex. UGREEN / Anker) ;
- éventuellement un **câble USB-C 5A** compatible 45W.
Noter les ASIN vérifiés + titres exacts + prix indicatif.

- [ ] **Step 2: Intégrer le gabarit page monétisée**

Appliquer le **Gabarit « page monétisée »** (voir section dédiée en haut du plan) à `content/chargeurs/chargeur-samsung-galaxy-s25.mdx` :
- `<DisclosureAffiliation />` après l'intro ;
- un `<Produit ... badge="Notre choix" />` (le chargeur recommandé) après l'intro ;
- un `<Comparatif produits={[...]} />` en milieu/bas avec les 2-3 produits (note, pour, contre), ASIN vérifiés ;
- un 3ᵉ CTA `<Produit>` en fin d'article ;
- 1-2 liens `[[slug]]` vers `charge-30w-65w-100w` et/ou `chargeur-usb-c-65w` ;
- retirer tout `amzn.to` en dur s'il y en a.

- [ ] **Step 3: Vérifier la page**

Run: `npx tsc --noEmit` → propre.
Run: `npm run build` → réussi.
Run: `npm run start` puis
```bash
curl -s http://localhost:3000/chargeurs/chargeur-samsung-galaxy-s25 | grep -o 'amazon.fr/dp/[A-Z0-9]*?tag=rapide01-21' | sort -u
```
Expected: les ASIN vérifiés apparaissent, tous taggés `rapide01-21`. Vérifier visuellement disclosure + 3 CTA.

- [ ] **Step 4: Commit**

```bash
git add content/chargeurs/chargeur-samsung-galaxy-s25.mdx
git commit -m "feat(affiliation): monétise chargeur-samsung-galaxy-s25 (vague 1)"
```

---

## Task 5: Vague 1 — 5 pages gagnantes restantes

Appliquer le **Gabarit « page monétisée »** et la procedure exacte de la Task 4 (Steps 1→4, **un commit par page**) à chacune des pages suivantes, avec les intentions/produits cibles indiqués. Recherche et vérification ASIN obligatoires pour chaque.

**Files (une page = un commit) :**
- Modify: `content/guides/chargeur-25w-vs-45w.mdx`
- Modify: `content/guides/usb-power-delivery-explication.mdx`
- Modify: `content/chargeurs/chargeur-induction-guide.mdx`
- Modify: `content/mobilite/prise-type-2-voiture-electrique.mdx`
- Modify: `content/chargeurs/chargeur-voiture-usb-c.mdx`

- [ ] **Step 1: `chargeur-25w-vs-45w`** — comparatif : un chargeur **25W** (ex. Samsung 25W) vs un **45W** (ex. Samsung 45W / GaN 45W). `<Comparatif>` central avec les 2, `<Produit>` pour le gagnant. Maillage vers `chargeur-samsung-galaxy-s25`. Vérif (curl grep tag) + commit `feat(affiliation): monétise chargeur-25w-vs-45w (vague 1)`.

- [ ] **Step 2: `usb-power-delivery-explication`** — produits : chargeurs **USB-C PD** polyvalents (ex. GaN 65W multiport, chargeur PD 30W). `<Comparatif>` PD 30/65/100W. Maillage vers `charge-30w-65w-100w`, `chargeur-usb-c-65w`. Vérif + commit `feat(affiliation): monétise usb-power-delivery-explication (vague 1)`.

- [ ] **Step 3: `chargeur-induction-guide`** — produits : chargeurs **à induction Qi/Qi2 / MagSafe** (ex. chargeur MagSafe, station 3-en-1). `<Comparatif>`. Maillage vers `charge-sans-fil-magsafe-qi`, `charge-sans-fil-vs-filaire`. Vérif + commit `feat(affiliation): monétise chargeur-induction-guide (vague 1)`.

- [ ] **Step 4: `prise-type-2-voiture-electrique`** — produits : **câbles de recharge Type 2** (ex. câble T2 32A triphasé), éventuellement une **prise renforcée**. `<Comparatif>`. Maillage vers `borne-recharge-domicile`, `wallbox-maison-guide`. Vérif + commit `feat(affiliation): monétise prise-type-2-voiture-electrique (vague 1)`.

- [ ] **Step 5: `chargeur-voiture-usb-c`** — produits : **chargeurs allume-cigare USB-C PD** (ex. double USB-C 45W). `<Comparatif>`. Maillage vers `cables-usb-c-choisir`. Vérif + commit `feat(affiliation): monétise chargeur-voiture-usb-c (vague 1)`.

- [ ] **Step 6: Vérification globale Vague 1**

Run: `npm run build` → réussi.
```bash
for u in chargeurs/chargeur-samsung-galaxy-s25 guides/chargeur-25w-vs-45w guides/usb-power-delivery-explication chargeurs/chargeur-induction-guide mobilite/prise-type-2-voiture-electrique chargeurs/chargeur-voiture-usb-c; do
  echo "== $u =="; curl -s "http://localhost:3000/$u" | grep -oc 'tag=rapide01-21';
done
```
Expected: chaque page renvoie un compte ≥ 1 de liens taggés.

---

## Task 6: Vague 2 — couverture du reste du cœur de niche

Appliquer le **Gabarit « page monétisée »** (procedure Task 4, **un commit par page**) aux pages chargeurs/batteries/mobilité à intention d'achat non encore monétisées. Traiter page par page ; recherche + vérification ASIN obligatoires.

**Files (candidats — traiter celles sans couverture affiliée existante, un commit chacune) :**
- `content/chargeurs/chargeur-iphone-15-16.mdx`
- `content/chargeurs/chargeur-multiport-bureau.mdx`
- `content/chargeurs/chargeur-usb-c-ordinateur-portable.mdx`
- `content/chargeurs/chargeur-gan-guide.mdx`
- `content/chargeurs/chargeur-induction-guide.mdx` (si non fait en Vague 1)
- `content/batteries/batterie-externe-charge-rapide.mdx`
- `content/batteries/batterie-externe-magsafe.mdx`
- `content/batteries/meilleure-batterie-externe-2025.mdx`
- `content/mobilite/chargeur-trottinette-electrique.mdx`
- `content/mobilite/chargeur-velo-electrique.mdx`
- `content/mobilite/quad-electrique-enfant.mdx`
- `content/mobilite/velo-electrique-batterie.mdx`
- `content/mobilite/wallbox-7kw-vs-11kw.mdx`, `content/mobilite/wallbox-maison-guide.mdx`, `content/mobilite/recharge-rapide-voiture-electrique.mdx`
- guides restants à intention d'achat : `content/guides/charge-30w-65w-100w.mdx`, `content/guides/borne-recharge-domicile.mdx`

- [ ] **Step 1: Établir la liste finale**

Run pour repérer les pages déjà couvertes (à exclure) :
```bash
grep -rL "Produit\|Comparatif\|amzn\|BuyButtons" content/chargeurs content/batteries content/mobilite
```
Traiter les pages listées (non couvertes) à intention d'achat.

- [ ] **Step 2: Traiter chaque page (un commit par page)**

Pour chaque page retenue : appliquer le Gabarit (produits vérifiés → Produit/Comparatif → 3 CTA → maillage → disclosure), `npx tsc --noEmit` + `npm run build` propres, puis :
```bash
git add content/{cat}/{slug}.mdx
git commit -m "feat(affiliation): monétise {slug} (vague 2)"
```

- [ ] **Step 3: Vérification finale**

Run: `npx tsc --noEmit` → propre.
Run: `npm run build` → réussi.
```bash
grep -rl "amzn.to" content/   # doit être vide ou ne concerner que des pages non retravaillées
grep -rn "tag=rapide01-21" .next 2>/dev/null | head   # confirme la présence des liens taggés dans le build
```

---

## Task 7: Vérification globale & handoff déploiement

**Files:** aucun (vérification).

- [ ] **Step 1: Build + types complet**

Run: `npx tsc --noEmit` → propre.
Run: `rm -rf .next && npm run build` → réussi, aucune page en erreur.

- [ ] **Step 2: Contrôles SEO/affiliation**

```bash
# Sitemap ne contient plus les pages junk
npm run start & sleep 4
curl -s http://localhost:3000/sitemap.xml | grep -c "edf\|co-valence\|trackr\|sabradou\|corexiapro\|nexterprise\|zone-business"   # attendu: 0
# Les 301 fonctionnent
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/energie/compteur-edf-plomb   # attendu: 308/301
# Aucun lien Amazon non taggé sur les pages retravaillées
curl -s http://localhost:3000/chargeurs/chargeur-samsung-galaxy-s25 | grep -o 'amazon.fr/[^"]*' | grep -v 'tag=rapide01-21' || echo "OK: tous taggés"
```

- [ ] **Step 3: Récapitulatif des critères de succès (spec §9)**

Cocher manuellement contre le spec : 6 gagnants monétisés, tag centralisé, 11 junk supprimées + 301, nav sans Énergie, build/tsc OK, ASIN réels vérifiés.

- [ ] **Step 4: Commit final éventuel + note déploiement**

Si des ajustements ont été faits :
```bash
git add -A && git commit -m "chore: vérifications finales pivot affiliation"
```
Déploiement : `git push` (déclenche le déploiement Vercel). Après déploiement, resoumettre le sitemap dans **Bing Webmaster Tools** pour accélérer la reprise en compte des suppressions/301.

---

## Self-Review (contrôle spec → plan)

- **§4 Architecture** → Task 1 (config + 3 composants + registration). ✅
- **§5 Vague 1** → Tasks 4-5 (6 pages, un commit chacune). ✅
- **§5 Vague 2** → Task 6. ✅
- **§6 Junk 301** → Task 2 (suppression + redirects). ✅
- **§7 Nav** → Task 3. ✅
- **§8 Conformité** (disclosure, rel, honnêteté) → Gabarit + Task 1 (Disclosure) + attributs `rel` dans les composants. ✅
- **§9 Critères de succès** → Task 7. ✅
- **§3 Tag centralisé / ASIN vérifiés** → Global Constraints + Gabarit Step 2. ✅
- Types cohérents : `amazonUrl`, `Produit`, `Comparatif`/`ProduitCompare`, `DisclosureAffiliation` définis en Task 1 et consommés partout sous les mêmes noms. ✅
- Pas de placeholder : chaque composant/redirect fourni en entier. Vague 2 = procédure répétable + liste de pages (contenu par page dépend de la recherche produits, par nature). ✅
