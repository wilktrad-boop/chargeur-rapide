# ✅ Checklist de déploiement - Corrections ESM

## Avant de déployer (en local)

### 1. Vérifier les fichiers modifiés
- [ ] `tailwind.config.ts` utilise `import` au lieu de `require()`
- [ ] `next.config.mjs` contient la config `transpilePackages`
- [ ] `app/energie/[slug]/page.tsx` n'a plus le try/catch inutile

### 2. Tester le build
**PowerShell (Windows) :**
```powershell
cd chargeur-rapide
.\test-build.ps1
```

**Git Bash / WSL / Linux :**
```bash
cd chargeur-rapide
chmod +x test-build.sh
./test-build.sh
```

**Ou manuellement :**
```bash
# Nettoyer
rm -rf .next

# Vérifier TypeScript
npx tsc --noEmit

# Builder
npm run build

# Si tout passe, vous êtes prêt!
```

### 3. Tester en local
```bash
npm run start
```

Ouvrir dans le navigateur :
- http://localhost:3000/mobilite/velo-electrique-batterie
- http://localhost:3000/energie/innovation-gan-electronique
- http://localhost:3000/guides/choisir-chargeur-rapide

Vérifier qu'aucune erreur ne s'affiche.

---

## Déploiement

### 1. Commit et push
```bash
git add .
git commit -m "fix: résolution erreur ERR_REQUIRE_ESM avec next-mdx-remote

- Conversion tailwind.config.ts en import ESM
- Ajout configuration transpilePackages pour next-mdx-remote
- Harmonisation gestion erreurs routes dynamiques
- Suppression try/catch inutile dans route energie"

git push
```

### 2. Vérifier le déploiement Vercel
- [ ] Aller sur https://vercel.com/dashboard
- [ ] Vérifier que le build passe (vert ✓)
- [ ] Vérifier qu'il n'y a pas d'erreurs dans les logs

---

## Après le déploiement

### 1. Tester les routes en production
Tester ces URLs (remplacer par votre domaine) :

**Routes qui doivent retourner 200 :**
- [ ] https://votre-site.com/mobilite/velo-electrique-batterie
- [ ] https://votre-site.com/mobilite/trottinette-electrique-guide
- [ ] https://votre-site.com/mobilite/borne-recharge-domicile
- [ ] https://votre-site.com/energie/innovation-gan-electronique
- [ ] https://votre-site.com/energie/efficacite-energetique-optimiser
- [ ] https://votre-site.com/guides/choisir-chargeur-rapide
- [ ] https://votre-site.com/chargeurs/chargeur-usb-c-65w
- [ ] https://votre-site.com/batteries/batterie-externe-20000mah

**Routes avec slug inexistant (doivent retourner 404, PAS 500) :**
- [ ] https://votre-site.com/mobilite/slug-inexistant
- [ ] https://votre-site.com/energie/slug-inexistant

### 2. Vérifier les logs Vercel
- [ ] Aller dans Vercel Dashboard > Votre projet > Functions
- [ ] Vérifier qu'il n'y a **PLUS** d'erreur `ERR_REQUIRE_ESM`
- [ ] Vérifier qu'il n'y a **AUCUN** HTTP 500

### 3. Tester avec curl (optionnel)
```bash
# Doit retourner 200
curl -I https://votre-site.com/mobilite/velo-electrique-batterie

# Doit retourner 404 (pas 500!)
curl -I https://votre-site.com/mobilite/slug-inexistant
```

### 4. Soumettre à Google
- [ ] Aller sur [Google Search Console](https://search.google.com/search-console)
- [ ] Soumettre le sitemap : `https://votre-site.com/sitemap.xml`
- [ ] Demander l'indexation des pages principales

### 5. Vérifier l'indexation (dans quelques jours)
```
site:votre-site.com/mobilite
site:votre-site.com/energie
```

---

## ✅ Résultat attendu

| Avant | Après |
|-------|-------|
| ❌ HTTP 500 sur routes dynamiques | ✅ HTTP 200 ou 404 |
| ❌ Erreur ERR_REQUIRE_ESM | ✅ Plus d'erreur |
| ❌ Pages non indexables | ✅ Pages crawlables |
| ❌ require() dans tailwind | ✅ import ESM |

---

## 🆘 En cas de problème

### Si le build échoue en local :
1. Supprimer `node_modules` et `package-lock.json`
2. Réinstaller : `npm install`
3. Relancer : `npm run build`

### Si erreur persiste après déploiement :
1. Vérifier les logs Vercel pour l'erreur exacte
2. Vérifier que les changements sont bien dans le commit déployé
3. Forcer un nouveau déploiement : `git commit --allow-empty -m "redeploy" && git push`

### Si 404 au lieu de 200 :
- Vérifier que le fichier MDX existe dans `content/[categorie]/`
- Vérifier que le slug dans le frontmatter correspond au nom du fichier

---

**Date :** 18 janvier 2026  
**Version :** 1.0  
**Statut :** ⏳ À déployer
