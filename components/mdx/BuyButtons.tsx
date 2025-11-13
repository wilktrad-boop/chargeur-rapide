interface BuyButtonItem {
  label: string;
  url: string;
  rel?: string;
  note?: string;
}

interface BuyButtonsProps {
  items: BuyButtonItem[];
}

export function BuyButtons({ items }: BuyButtonsProps) {
  return (
    <div className="my-6">
      <h3 className="mb-4 text-lg font-semibold text-textStrong">Où acheter</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel={item.rel || 'noopener'}
            className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 hover:shadow-soft focus-ring"
          >
            <div>
              <div className="font-medium">{item.label}</div>
              {item.note && <div className="text-sm text-slate-600">{item.note}</div>}
            </div>
            <span className="text-primary">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}







