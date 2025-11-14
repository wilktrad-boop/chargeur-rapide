'use client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    prenom: '',
    email: '',
    message: '',
    captcha: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus('success');
        setFormData({ prenom: '', email: '', message: '', captcha: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Erreur lors de l\'envoi du message');
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-textStrong">Contact</h1>
        <p className="mt-2 text-slate-700">Une question, une suggestion ? Écrivez-nous.</p>

        {status === 'success' && (
          <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-4">
            <p className="text-green-800">✓ Message envoyé avec succès! Nous vous répondrons bientôt.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-4">
            <p className="text-red-800">✗ {errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="prenom">
              Prénom *
            </label>
            <input
              id="prenom"
              name="prenom"
              required
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="w-full rounded-2xl border border-border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-2xl border border-border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-2xl border border-border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="captcha">
              Mini-captcha : 2 + 7 = ? *
            </label>
            <input
              id="captcha"
              name="captcha"
              inputMode="numeric"
              required
              value={formData.captcha}
              onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
              className="w-32 rounded-2xl border border-border px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-2xl bg-primary px-5 py-2 font-medium text-white hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}






