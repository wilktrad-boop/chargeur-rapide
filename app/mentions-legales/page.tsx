import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function MentionsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">Mentions légales</h1>
        <div className="prose prose-lg mt-6">

          <h2>Éditeur du site</h2>
          <p>
            <strong>Willy Paul</strong><br />
            12 rue de Metz, 34070 Montpellier<br />
            Email : <a href="mailto:hello@willypaul.fr">hello@willypaul.fr</a>
          </p>
          <p>Directeur de la publication : Willy Paul</p>

          <h2>Hébergeur</h2>
          <p>
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes) est la propriété exclusive de Willy Paul,
            sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>

          <h2>Liens affiliés</h2>
          <p>
            Ce site contient des liens affiliés. Cela signifie que si vous achetez un produit via un lien présent sur ce site,
            une commission peut être perçue, sans frais supplémentaires pour vous.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Ce site ne collecte aucune donnée personnelle sans votre consentement. Pour toute demande relative à vos données,
            contactez : <a href="mailto:hello@willypaul.fr">hello@willypaul.fr</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site est susceptible d'utiliser des cookies à des fins statistiques et de fonctionnement.
            Vous pouvez les désactiver dans les paramètres de votre navigateur.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question : <a href="mailto:hello@willypaul.fr">hello@willypaul.fr</a>
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
















