import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function MentionsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">Mentions légales</h1>
        <div className="prose prose-lg mt-6">
          <h2>Éditeur</h2>
          <p>Nom de l'éditeur – Adresse – Contact.</p>
          <h2>Hébergeur</h2>
          <p>Nom de l'hébergeur – Adresse – Téléphone.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}













