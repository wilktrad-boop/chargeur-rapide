"use client";
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  variant?: 'inline' | 'sidebar';
}

export function TableOfContents({ headings, variant = 'sidebar' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(variant !== 'inline');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // En inline : n'afficher que les h2 pour réduire la longueur
  const visibleHeadings = variant === 'inline'
    ? headings.filter((h) => h.level === 2)
    : headings;

  const containerClasses =
    variant === 'inline'
      ? 'mb-8'
      : 'sticky top-24 hidden lg:block';

  return (
    <nav className={containerClasses} aria-label="Table des matières">
      <div className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 font-semibold text-textStrong hover:bg-bgSubtle transition-colors"
          aria-expanded={open}
        >
          <span>Sommaire</span>
          <span className={clsx('text-slate-400 transition-transform duration-200', open && 'rotate-180')}>
            ▾
          </span>
        </button>
        {open && (
          <ul className="space-y-1 text-sm px-4 pb-3">
            {visibleHeadings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => variant === 'inline' && setOpen(false)}
                  className={clsx(
                    'block rounded-lg px-2 py-1 transition-colors',
                    heading.level === 3 && 'ml-4',
                    heading.level === 4 && 'ml-8',
                    activeId === heading.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-bgSubtle'
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}









