import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">Confidentialité</h1>
        <div className="prose prose-lg mt-6">
          <p>Nous collectons le minimum de données nécessaires (formulaire de contact).</p>
          <ul>
            <li>Cookies essentiels uniquement (performances Core Web Vitals).</li>
            <li>Droit d'accès, de rectification et d'effacement.</li>
          </ul>
          <p>Pour toute demande RGPD : utilisez la <a href="/contact">page contact</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}













