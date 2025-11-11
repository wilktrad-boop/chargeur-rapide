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
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

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

  return (
    <nav className="sticky top-24 hidden lg:block" aria-label="Table des matières">
      <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
        <h3 className="mb-3 font-semibold text-textStrong">Sommaire</h3>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
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
      </div>
    </nav>
  );
}






