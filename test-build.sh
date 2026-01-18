#!/bin/bash
# Script de vérification du build avant déploiement
# Bash script pour Git Bash / WSL / Linux / macOS

echo "====================================="
echo "Test du build Next.js"
echo "====================================="
echo ""

# 1. Nettoyage
echo "[1/5] Nettoyage des anciens builds..."
rm -rf .next 2>/dev/null && echo "✓ Dossier .next supprimé" || echo "  Pas de .next à supprimer"
rm -rf node_modules/.cache 2>/dev/null && echo "✓ Cache node_modules nettoyé" || echo "  Pas de cache à nettoyer"
echo ""

# 2. Vérification TypeScript
echo "[2/5] Vérification TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✓ Pas d'erreurs TypeScript"
else
    echo "✗ Erreurs TypeScript détectées"
    exit 1
fi
echo ""

# 3. Build production
echo "[3/5] Build Next.js en mode production..."
npm run build
if [ $? -eq 0 ]; then
    echo "✓ Build réussi"
else
    echo "✗ Le build a échoué"
    exit 1
fi
echo ""

# 4. Vérification des routes
echo "[4/5] Vérification des routes dynamiques..."
routes=(
    "app/mobilite/[slug]/page.tsx"
    "app/energie/[slug]/page.tsx"
    "app/guides/[slug]/page.tsx"
    "app/chargeurs/[slug]/page.tsx"
    "app/batteries/[slug]/page.tsx"
)

for route in "${routes[@]}"; do
    if [ -f "$route" ]; then
        echo "✓ $route existe"
    else
        echo "✗ $route manquant"
    fi
done
echo ""

# 5. Vérification de la configuration
echo "[5/5] Vérification de la configuration..."
config_ok=true

# Vérifier que tailwind.config.ts n'utilise pas require()
if grep -q "require\s*(" tailwind.config.ts; then
    echo "✗ tailwind.config.ts utilise encore require()"
    config_ok=false
else
    echo "✓ tailwind.config.ts utilise import ESM"
fi

# Vérifier que next.config.mjs contient transpilePackages
if grep -q "transpilePackages" next.config.mjs; then
    echo "✓ next.config.mjs contient transpilePackages"
else
    echo "✗ next.config.mjs ne contient pas transpilePackages"
    config_ok=false
fi

echo ""

# Résumé
echo "====================================="
if [ "$config_ok" = true ] && [ $? -eq 0 ]; then
    echo "✓ TOUS LES TESTS PASSENT"
    echo "Le projet est prêt pour le déploiement!"
    echo ""
    echo "Prochaines étapes:"
    echo "1. git add ."
    echo "2. git commit -m 'fix: résolution erreur ERR_REQUIRE_ESM avec next-mdx-remote'"
    echo "3. git push"
    echo "4. Vérifier les logs Vercel après déploiement"
else
    echo "✗ DES ERREURS ONT ÉTÉ DÉTECTÉES"
    echo "Veuillez corriger les erreurs avant de déployer"
    exit 1
fi
echo "====================================="
