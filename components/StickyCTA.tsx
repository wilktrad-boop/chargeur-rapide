"use client";
import { useState } from 'react';

interface Props {
  label: string;
  url: string;
  note?: string;
}

export function StickyCTA({ label, url, note }: Props) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        {note && (
          <p className="text-sm text-slate-600 hidden sm:block truncate">{note}</p>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <a
            href={url}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="shrink-0 bg-primary text-white px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-primaryHover transition-colors"
          >
            {label}
          </a>
          <button
            onClick={() => setClosed(true)}
            aria-label="Fermer"
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
