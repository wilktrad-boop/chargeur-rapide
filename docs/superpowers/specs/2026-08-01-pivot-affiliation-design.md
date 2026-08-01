# Pivot Chargeur-Rapide vers l'affiliation pure — Design

**Date :** 2026-08-01
**Auteur :** Willy Paul (+ Claude)
**Statut :** Design validé → à transformer en plan d'implémentation

---

## 1. Contexte & diagnostic

Chargeur-Rapide.fr (Next.js 14, App Router, contenu MDX) a été **déclassé par Google**
(probablement lié aux pages « fake keyword » / vente de liens présentes dans l'historique).
La vente de liens n'est donc plus possible.

**Mais le site est bien vivant** sur l'écosystème Bing. Données Rybbit (30 jours, tendance +55 %) :

- Référents : Bing 36, DuckDuckGo 33, Qwant 24, Yahoo 7, Ecosia 5 — **tous adossés à l'index Bing**
  (~105 sessions), + Brave 7 + Google 15 encore résiduel. ~150 sessions organiques/mois.
- Pages les plus visitées = **intention d'achat chargeur**, mais **non monétisées** :

| Page | Sessions | Monétisée ? |
|---|---|---|
| `/chargeurs/chargeur-samsung-galaxy-s25` | 18 | ❌ |
| `/guides/chargeur-25w-vs-45w` | 18 | ❌ |
| `/guides/usb-power-delivery-explication` | 13 | ❌ |
| `/chargeurs/chargeur-induction-guide` | 11 | ❌ |
| `/mobilite/prise-type-2-voiture-electrique` | 11 | ❌ |
| `/chargeurs/chargeur-voiture-usb-c` | 9 | ❌ |
| `/energie/compteur-edf-plomb` | 9 | junk (0 achat) |
| `/energie/veol-edf-intranet` | ~9 | junk (0 achat) |

**Conclusion :** le trafic acheteur et la monétisation sont sur des pages différentes. Le gisement
immédiat est de brancher l'affiliation sur les pages qui ont déjà le trafic.

Mécanique existante : liens `amzn.to` (SiteStripe) posés en dur dans certains MDX. Fonctionnels mais
tag non vérifiable et dispersés.

## 2. Objectif

Faire de Chargeur-Rapide un **site 100 % affiliation**, optimisé pour monétiser le trafic Bing
existant et le faire croître. Approche retenue : **B — refonte affiliation complète**.

## 3. Décisions actées

- **Tag Amazon** : `rapide01-21` (marché : Amazon.fr).
- **Sélection produits** : réalisée par Claude — recommandations de modèles/types pertinents par page.
- **Pages junk** : **redirection 301 vers la home** (`/`), fichiers MDX supprimés.

### Amendement 2026-08-01 — liens de recherche taggés (pas d'ASIN)

Les outils disponibles (WebSearch US-only, WebFetch bloqué sur amazon.fr, navigateur amazon.fr refusé)
ne permettent **pas** de récupérer/vérifier des ASIN amazon.fr de façon fiable. Décision de Willy :
les CTA pointent vers des **liens de recherche amazon.fr taggés** (ex.
`https://www.amazon.fr/s?k=chargeur+Samsung+45W+USB-C&tag=rapide01-21`) — autorisé par le programme
Amazon Associates, fonctionnel immédiatement. Le prop `asin` des composants est **conservé** pour un
remplacement ultérieur par des liens produits précis (approche mixte). Aucun ASIN inventé n'est utilisé.

## 4. Architecture de monétisation

### 4.1 Config centralisée — `config/affiliate.ts`
```ts
export const AMAZON_TAG = 'rapide01-21';
export const AMAZON_HOST = 'https://www.amazon.fr';
// amazonUrl('B0XXXX', 'samsung-s25') => https://www.amazon.fr/dp/B0XXXX?tag=rapide01-21&language=fr_FR
export function amazonUrl(asin: string, subid?: string): string;
```
Un seul endroit détient le tag. `subid` optionnel (réservé au suivi par page, activable plus tard).

### 4.2 Composants MDX
- **`<Produit asin titre prix points[] badge? />`** — carte produit : titre, prix indicatif,
  2-4 arguments, CTA « Voir le prix sur Amazon » (`rel="sponsored nofollow noopener"`, `target=_blank`),
  badge optionnel (« Notre choix »). Lien construit via `amazonUrl()`.
- **`<Comparatif produits=[{asin,titre,note,prix,pour,contre}] />`** — tableau comparatif multi-produits,
  un CTA par ligne, émet le **schema Review/Product** (JSON-LD).
- **`<DisclosureAffiliation />`** — mention affiliation visible (exigence playbook + conformité),
  insérée en haut de chaque page monétisée.

### 4.3 Migration des liens existants
Les `amzn.to` en dur sont progressivement remplacés par des liens taggés `rapide01-21` via les
composants, au fur et à mesure des vagues. Aucun lien `amzn.to` non vérifié conservé sur une page retravaillée.

## 5. Couverture affiliée par vagues

**Vague 1 — les gagnants (revenus immédiats)** : monétiser les 6 pages qui reçoivent déjà le trafic.
Pour chacune : sélection produits Amazon.fr vérifiés, bloc `<Produit>`/`<Comparatif>`, disclosure,
3 CTA (haut/milieu/bas), maillage interne, schema Review.
- `chargeurs/chargeur-samsung-galaxy-s25`
- `guides/chargeur-25w-vs-45w`
- `guides/usb-power-delivery-explication`
- `chargeurs/chargeur-induction-guide`
- `mobilite/prise-type-2-voiture-electrique`
- `chargeurs/chargeur-voiture-usb-c`

**Vague 2 — le reste du cœur de niche** : toutes les autres pages chargeurs/batteries/mobilité à
intention d'achat non encore couvertes (ex. `chargeur-iphone-15-16`, `chargeur-multiport-bureau`,
`chargeur-usb-c-ordinateur-portable`, `batterie-externe-charge-rapide`, `batterie-externe-magsafe`,
`chargeur-trottinette-electrique`, `chargeur-velo-electrique`, `quad-electrique-enfant`, guides
restants, etc.). Même traitement.

**Hors périmètre de refonte** : les avis SaaS `entreprise/` (emelia, waalaxy, wispr-flow, textexpander,
lsp-expert, iclosed, perplexity, rybbit, superlist) — déjà monétisés, vraie affiliation, conservés tels quels.

## 6. Nettoyage des pages junk (301 → `/`)

Supprimer le MDX + ajouter une redirection 301 vers la home dans `next.config.mjs` (`async redirects()`,
build serveur Next — natif) :

- `energie/compteur-edf-plomb`
- `energie/compteur-texte-egc-vendee`
- `energie/unite-technique-operationnelle-edf`
- `energie/veol-edf-intranet`
- `chargeurs/epershand-net-chargeurs-promotion`
- `mobilite/co-valence-fr-mobilite-electrique`
- `mobilite/trackr-fr-tech-localisation`
- `guides/sabradou-trouver-chargeurs`
- `entreprise/corexiapro-fr`
- `entreprise/nexterprise-fr`
- `entreprise/zone-business-fr`

Retirer ces URLs du sitemap, du maillage interne et de la nav. (Le trafic Bing sur les EDF/co-valence
est non-monétisable ; on l'abandonne au profit d'un site propre et topiquement cohérent.)

## 7. Navigation resserrée

`config/site.ts` — nav cible :
`Chargeurs · Batteries · Mobilité · Guides · Entreprise · À propos · Contact`

- Sortir **Énergie** du menu principal. Les 3 pages utiles restantes (`innovation-gan-electronique`,
  `gan-vs-silicium`, `solaire-portable-technologies`, `efficacite-energetique-optimiser`) basculent
  dans Guides ou Chargeurs ; les 4 pages EDF junk sont supprimées (section 6).

## 8. Conformité

- Disclosure affiliation visible sur toute page monétisée.
- Liens sortants Amazon : `rel="sponsored nofollow noopener noreferrer"`, `target="_blank"`.
- Avis honnêtes (pros ET cons) conformément au playbook affiliation.

## 9. Critères de succès

- [ ] Les 6 pages « gagnantes » ont chacune ≥ 1 produit Amazon taggé `rapide01-21` + disclosure + 3 CTA.
- [ ] Tag centralisé dans `config/affiliate.ts` ; aucun lien `amzn.to` non vérifié sur une page retravaillée.
- [ ] Les 11 pages junk supprimées + 301 vers `/` + hors sitemap/nav/maillage.
- [ ] Nav resserrée sans « Énergie ».
- [ ] `npm run build` passe sans erreur ; `npx tsc --noEmit` OK.
- [ ] Tous les ASIN utilisés sont réels et vérifiés sur amazon.fr.

## 10. Hors périmètre (YAGNI / plus tard)

- **Approche C** (croissance Bing-first : pages « meilleur X 2026 », soumission Bing Webmaster,
  parasite SEO « coucou » Medium/Overblog) — itération suivante.
- Suivi SubID par page (le hook est prévu dans `amazonUrl`, activation ultérieure).
- Tentative de récupération Google — non prioritaire tant que Bing porte le trafic.

## 11. Notes techniques

- Build **serveur** Next 14 (pas d'export statique) → `redirects()` natif disponible. Le dossier `out/`
  est un résidu à ignorer.
- Sélection produits : à faire via recherche web + **fetch de la fiche amazon.fr** pour confirmer
  ASIN/titre/disponibilité avant intégration (interdiction d'ASIN non vérifié).
- `eslint.ignoreDuringBuilds` et `typescript.ignoreBuildErrors` sont à `true` — ne pas s'y fier,
  lancer `tsc --noEmit` manuellement.
