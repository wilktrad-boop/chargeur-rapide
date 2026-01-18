# Script de vérification du build avant déploiement
# PowerShell script pour Windows

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Test du build Next.js" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. Nettoyage
Write-Host "[1/5] Nettoyage des anciens builds..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ Dossier .next supprimé" -ForegroundColor Green
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✓ Cache node_modules nettoyé" -ForegroundColor Green
}
Write-Host ""

# 2. Vérification TypeScript
Write-Host "[2/5] Vérification TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Pas d'erreurs TypeScript" -ForegroundColor Green
} else {
    Write-Host "✗ Erreurs TypeScript détectées" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 3. Build production
Write-Host "[3/5] Build Next.js en mode production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build réussi" -ForegroundColor Green
} else {
    Write-Host "✗ Le build a échoué" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 4. Vérification des routes
Write-Host "[4/5] Vérification des routes dynamiques..." -ForegroundColor Yellow
$routes = @(
    "app/mobilite/[slug]/page.tsx",
    "app/energie/[slug]/page.tsx",
    "app/guides/[slug]/page.tsx",
    "app/chargeurs/[slug]/page.tsx",
    "app/batteries/[slug]/page.tsx"
)

foreach ($route in $routes) {
    if (Test-Path $route) {
        Write-Host "✓ $route existe" -ForegroundColor Green
    } else {
        Write-Host "✗ $route manquant" -ForegroundColor Red
    }
}
Write-Host ""

# 5. Vérification de la configuration
Write-Host "[5/5] Vérification de la configuration..." -ForegroundColor Yellow
$configOk = $true

# Vérifier que tailwind.config.ts n'utilise pas require()
$tailwindConfig = Get-Content "tailwind.config.ts" -Raw
if ($tailwindConfig -match "require\s*\(") {
    Write-Host "✗ tailwind.config.ts utilise encore require()" -ForegroundColor Red
    $configOk = $false
} else {
    Write-Host "✓ tailwind.config.ts utilise import ESM" -ForegroundColor Green
}

# Vérifier que next.config.mjs contient transpilePackages
$nextConfig = Get-Content "next.config.mjs" -Raw
if ($nextConfig -match "transpilePackages") {
    Write-Host "✓ next.config.mjs contient transpilePackages" -ForegroundColor Green
} else {
    Write-Host "✗ next.config.mjs ne contient pas transpilePackages" -ForegroundColor Red
    $configOk = $false
}

Write-Host ""

# Résumé
Write-Host "=====================================" -ForegroundColor Cyan
if ($configOk -and $LASTEXITCODE -eq 0) {
    Write-Host "✓ TOUS LES TESTS PASSENT" -ForegroundColor Green
    Write-Host "Le projet est prêt pour le déploiement!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Prochaines étapes:" -ForegroundColor Yellow
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'fix: résolution erreur ERR_REQUIRE_ESM avec next-mdx-remote'" -ForegroundColor White
    Write-Host "3. git push" -ForegroundColor White
    Write-Host "4. Vérifier les logs Vercel après déploiement" -ForegroundColor White
} else {
    Write-Host "✗ DES ERREURS ONT ÉTÉ DÉTECTÉES" -ForegroundColor Red
    Write-Host "Veuillez corriger les erreurs avant de déployer" -ForegroundColor Red
    exit 1
}
Write-Host "=====================================" -ForegroundColor Cyan
