import Link from 'next/link';
import Image from 'next/image';

interface Props {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  readingTime?: number;
  label?: string;
}

export function ArticleCard({ slug, category, title, description, date, cover, readingTime, label }: Props) {
  return (
    <li className="group rounded-2xl border border-border bg-white overflow-hidden hover:shadow-soft transition-all">
      <Link href={`/${category}/${slug}`} className="block h-full">
        {cover && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          {(label || readingTime) && (
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              {label && <span>{label}</span>}
              {label && readingTime && <span>·</span>}
              {readingTime && <span>{readingTime} min de lecture</span>}
            </div>
          )}
          <h3 className="text-lg font-semibold text-textStrong group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{description}</p>
          <div className="mt-3 text-xs text-slate-400">
            {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </Link>
    </li>
  );
}
