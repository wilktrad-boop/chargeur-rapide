'use client';

interface SortSelectProps {
  value: string;
  onChange?: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-textMain focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="recent">Plus récents</option>
      <option value="popular">Populaires</option>
    </select>
  );
}
