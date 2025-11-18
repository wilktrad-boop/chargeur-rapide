# Chargeur-Rapide

Média français indépendant sur la charge, l'énergie mobile et la mobilité durable.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd chargeur-rapide

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
chargeur-rapide/
├── app/                    # App Router Next.js
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout global
│   ├── globals.css        # Styles globaux
│   ├── chargeurs/        # Pages catégorie chargeurs
│   ├── batteries/         # Pages catégorie batteries
│   ├── mobilite/          # Pages catégorie mobilité
│   ├── energie/           # Pages catégorie énergie
│   ├── guides/            # Pages guides
│   ├── a-propos/          # Pages légales
│   ├── contact/
│   ├── mentions-legales/
│   ├── confidentialite/
│   ├── plan-du-site/
│   ├── robots.txt/        # Route robots.txt
│   ├── sitemap.xml/       # Route sitemap.xml
│   ├── rss.xml/           # Route RSS
│   └── api/og/            # Générateur d'images OG
├── components/             # Composants React
│   ├── Header.tsx         # En-tête avec navigation
│   ├── Footer.tsx         # Pied de page
│   └── mdx/               # Composants MDX
│       ├── MDXContent.tsx
│       ├── TableOfContents.tsx
│       ├── ProsCons.tsx
│       ├── Callout.tsx
│       ├── SpecTable.tsx
│       ├── FAQ.tsx
│       └── BuyButtons.tsx
├── content/               # Contenu MDX
│   ├── chargeurs/         # Articles chargeurs
│   ├── batteries/         # Articles batteries
│   ├── mobilite/          # Articles mobilité
│   ├── energie/           # Articles énergie
│   └── guides/            # Guides longs
├── config/                # Configuration
│   └── site.ts           # Configuration du site
├── lib/                   # Utilitaires
│   ├── mdx.ts            # Gestion du contenu MDX
│   └── mdx-render.ts     # Rendu MDX
└── public/               # Assets statiques
    └── images/           # Images du site
```

## ✍️ Ajouter un article

### 1. Créer le fichier MDX
```bash
# Dans le dossier de catégorie approprié
touch content/chargeurs/mon-article.mdx
```

### 2. Remplir le frontmatter
```yaml
---
title: "Titre de l'article"
description: "Description SEO (150-160 caractères)"
slug: "mon-article"
date: "2025-01-15"
updated: "2025-01-15"  # Optionnel
author: "Rédaction"
category: "chargeurs"   # chargeurs|batteries|mobilite|energie|guides
tags: ["tag1", "tag2"]
cover: "/images/covers/mon-article.jpg"  # Optionnel
readingTime: 5
toc: true
schemaType: "Article"   # Article|HowTo|FAQPage
draft: false            # true pour exclure des sitemaps
---
```

### 3. Rédiger le contenu
```markdown
## Introduction

Votre contenu en Markdown...

<SpecTable data={[
  {spec: "Spécification", value: "Valeur", note: "Note optionnelle"}
]} />

<ProsCons 
  pros={["Avantage 1", "Avantage 2"]}
  cons={["Inconvénient 1", "Inconvénient 2"]}
/>

<Callout type="info">
Information importante
</Callout>

<FAQ items={[
  {q: "Question ?", a: "Réponse."}
]} />
```

### 4. Composants MDX disponibles

- `<TableOfContents />` : Table des matières automatique
- `<ProsCons pros={[]} cons={[]} />` : Avantages/inconvénients
- `<Callout type="info|warn|success">` : Encadrés colorés
- `<SpecTable data={...} />` : Tableaux de spécifications
- `<FAQ items={[{q:"",a:""}]} />` : Questions fréquentes
- `<BuyButtons items={[{label,url,note}]} />` : Boutons d'achat

### 5. Liens internes
Utilisez la syntaxe `[[slug]]` pour créer des liens automatiques :
```markdown
Voir notre guide [[choisir-chargeur-rapide]] pour plus d'informations.
```

## 🎨 Personnalisation

### Couleurs (Tailwind)
```typescript
// tailwind.config.ts
colors: {
  primary: '#0EA5E9',        // Bleu principal
  primaryHover: '#0284C7',   // Bleu hover
  accent: '#22C55E',         // Vert accent
  textMain: '#1F2937',       // Texte principal
  textStrong: '#0F172A',     // Texte fort
  bg: '#FFFFFF',             // Arrière-plan
  bgSubtle: '#F8FAFC',       // Arrière-plan subtil
  border: '#E5E7EB',         // Bordures
}
```

### Configuration du site
```typescript
// config/site.ts
export const site = {
  name: 'Chargeur-Rapide',
  description: 'Description du site...',
  url: 'https://www.chargeur-rapide.fr',
  // ...
}
```

## 🚀 Déploiement

### Vercel (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Netlify
```bash
# Build
npm run build

# Déployer le dossier .next
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

### Objectifs Core Web Vitals
- **LCP** : < 2,5s
- **FID** : < 100ms  
- **CLS** : < 0,05

### Optimisations incluses
- Images optimisées avec `next/image`
- Fonts avec `next/font`
- SSG/ISR pour les pages statiques
- Lazy loading des images
- Prefetch des liens internes

## 🔧 Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint
```

## 📝 Contenu existant

### Articles (15)
- **Chargeurs** : USB-C 65W, GaN 100W, câbles, sans-fil
- **Batteries** : 20000mAh, station solaire, solaire pliable
- **Mobilité** : trottinette électrique, vélo électrique, borne domicile
- **Énergie** : innovation GaN, efficacité énergétique, solaire portable

### Guides longs (5)
- Choisir un chargeur rapide
- Erreurs courantes avec les batteries
- 30W vs 65W vs 100W
- Sans-fil vs filaire
- Installer une borne domicile

## 🛡️ Sécurité

### Formulaire de contact
- Honeypot anti-spam
- Délai minimum de soumission
- Mini-captcha arithmétique
- Validation côté serveur

### Données personnelles
- Collecte minimale (prénom, email, message)
- Pas de cookies de tracking
- Conformité RGPD basique

## 📄 Pages légales

- `/a-propos/` : Présentation du média
- `/contact/` : Formulaire de contact
- `/mentions-legales/` : Mentions légales
- `/confidentialite/` : Politique de confidentialité
- `/plan-du-site/` : Sitemap HTML

## 🔗 URLs importantes

- `/sitemap.xml` : Sitemap XML
- `/robots.txt` : Instructions robots
- `/rss.xml` : Flux RSS
- `/api/og` : Générateur d'images OpenGraph

## 📞 Support

Pour toute question sur le développement ou l'ajout de contenu, consultez la documentation ou contactez l'équipe technique.











