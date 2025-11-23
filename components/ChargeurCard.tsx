import Link from 'next/link';
import clsx from 'clsx';

type BadgeType = 'PC portable' | 'Smartphone' | 'Multi-ports' | 'Sans fil' | 'Accessoire';

interface ChargeurCardProps {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  badge: BadgeType;
}

const badgeStyles: Record<BadgeType, string> = {
  'PC portable': 'bg-blue-100 text-blue-700',
  'Smartphone': 'bg-green-100 text-green-700',
  'Multi-ports': 'bg-purple-100 text-purple-700',
  'Sans fil': 'bg-orange-100 text-orange-700',
  'Accessoire': 'bg-slate-100 text-slate-700',
};

function truncateDescription(description: string, maxLength: number = 70): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + '…';
}

export function getBadgeFromSlug(slug: string, title: string): BadgeType {
  const lowerSlug = slug.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerSlug.includes('sans-fil') || lowerSlug.includes('magsafe') || lowerSlug.includes('qi')) {
    return 'Sans fil';
  }
  if (lowerSlug.includes('cable') || lowerTitle.includes('câble')) {
    return 'Accessoire';
  }
  if (lowerSlug.includes('100w') || lowerSlug.includes('65w') || lowerTitle.includes('100 w') || lowerTitle.includes('65 w')) {
    return 'PC portable';
  }
  if (lowerSlug.includes('multi') || lowerTitle.includes('multi')) {
    return 'Multi-ports';
  }
  return 'Smartphone';
}

export function ChargeurCard({ slug, category, title, description, date, badge }: ChargeurCardProps) {
  return (
    <li className="group rounded-2xl border border-border p-4 transition-shadow hover:shadow-soft">
      <div className="mb-2">
        <span className={clsx('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium', badgeStyles[badge])}>
          {badge}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-textStrong group-hover:text-primary transition-colors">
        <Link href={`/${category}/${slug}`}>{title}</Link>
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        <span className="font-medium text-slate-500">En bref :</span> {truncateDescription(description)}
      </p>
      <div className="mt-3 text-xs text-slate-400">
        {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </li>
  );
}
