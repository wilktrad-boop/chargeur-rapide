import Link from 'next/link';

export function QuickGuideCard() {
  return (
    <div className="rounded-2xl border border-border bg-bgSubtle p-6">
      <h2 className="text-lg font-semibold text-textStrong">Comment choisir rapidement ?</h2>
      <ul className="mt-4 space-y-2 text-sm text-textMain">
        <li className="flex items-start gap-2">
          <span className="text-primary">•</span>
          <span><strong>Pour smartphone uniquement :</strong> 20 à 30 W suffisent dans la plupart des cas.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">•</span>
          <span><strong>Pour PC portable :</strong> viser 65 W ou plus, vérifier la compatibilité USB-C PD.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">•</span>
          <span><strong>En voyage :</strong> privilégier les chargeurs multi-ports GaN compacts.</span>
        </li>
      </ul>
      <div className="mt-4">
        <Link
          href="/guides/choisir-chargeur-rapide"
          className="text-sm font-medium text-primary hover:text-primaryHover transition-colors"
        >
          Voir le guide complet : Choisir un chargeur rapide →
        </Link>
      </div>
    </div>
  );
}
