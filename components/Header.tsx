"use client";
import Link from 'next/link';
import { site } from '@/config/site';
import { useState } from 'react';
import clsx from 'clsx';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-textStrong focus-ring">
            <span className="inline-block rounded-lg bg-primary px-2 py-1 text-white">CR</span>
            <span>Chargeur-Rapide</span>
          </Link>
          <nav className="hidden gap-6 md:flex" aria-label="Navigation principale">
            {site.nav.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} prefetch className="text-sm hover:text-primary focus-ring">
                {item.label}
              </Link>
            ))}
            <Link href="/a-propos" className="text-sm hover:text-primary focus-ring">À propos</Link>
            <Link href="/contact" className="text-sm hover:text-primary focus-ring">Contact</Link>
          </nav>
          <button aria-label="Ouvrir le menu" onClick={() => setOpen(!open)} className="md:hidden focus-ring rounded-xl border border-border p-2">
            <span className="i-ph-list text-2xl">≡</span>
          </button>
        </div>
      </div>
      <div className={clsx('md:hidden border-t border-border', open ? 'block' : 'hidden')}>
        <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 gap-3">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl bg-bgSubtle p-3 hover:bg-white focus-ring">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}



