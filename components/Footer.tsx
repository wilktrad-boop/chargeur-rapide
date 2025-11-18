import Link from 'next/link';
import { site } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bgSubtle" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pied de page</h2>
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 font-semibold text-textStrong">Rubriques</div>
          <ul className="space-y-2 text-sm">
            {site.nav.slice(0, 5).map((item) => (
              <li key={item.href}><Link className="hover:text-primary" href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold text-textStrong">Guides populaires</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guides/choisir-chargeur-rapide" className="hover:text-primary">Choisir un chargeur rapide</Link></li>
            <li><Link href="/guides/charge-30w-65w-100w" className="hover:text-primary">30 W vs 65 W vs 100 W</Link></li>
            <li><Link href="/guides/erreurs-batteries" className="hover:text-primary">Erreurs avec les batteries</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold text-textStrong">À propos</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/a-propos" className="hover:text-primary">Le média</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} {site.name}.</div>
    </footer>
  );
}



