'use client';

import clsx from 'clsx';

interface FilterChipsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange?: (filter: string) => void;
}

export function FilterChips({ filters, activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange?.(filter)}
          className={clsx(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeFilter === filter
              ? 'bg-primary text-white'
              : 'bg-bgSubtle text-textMain hover:bg-slate-200'
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
