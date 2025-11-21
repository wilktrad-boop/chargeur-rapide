import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">À propos</h1>
        
        <div className="prose prose-lg mt-6">
          <p>
            <strong>Chargeur-Rapide</strong> est un média français dédié à la charge,
            l'énergie mobile et la mobilité durable.
          </p>
          
          <h2>Notre mission</h2>
          <p>
            Nous publions des guides techniques, des comparatifs et des analyses pour vous aider 
            à comprendre les technologies de charge et d'énergie mobile. Notre objectif : 
            des informations fiables et pérennes.
          </p>
          
          <h2>Notre approche</h2>
          <p>
            Nos recommandations sont basées sur l'analyse technique et la qualité des produits.
            Nous nous efforçons de vous fournir des informations objectives pour vous aider
            à faire les meilleurs choix.
          </p>
          
          <h2>Contenu</h2>
          <p>
            Nos articles couvrent :
          </p>
          <ul>
            <li>Chargeurs rapides et connectique</li>
            <li>Batteries externes et stations portables</li>
            <li>Mobilité électrique (trottinettes, vélos)</li>
            <li>Innovations énergétiques</li>
            <li>Guides pratiques transverses</li>
          </ul>
          
          <h2>Contact</h2>
          <p>
            Pour toute question ou suggestion : <a href="/contact">page contact</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}












