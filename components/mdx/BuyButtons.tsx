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
    <div className="not-prose my-6">
      <h3 className="mb-4 text-lg font-semibold text-textStrong">Où acheter</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel={item.rel || 'nofollow noopener sponsored'}
            className="flex items-center justify-between rounded-2xl bg-primary p-4 !text-white hover:bg-primaryHover transition-colors focus-ring"
          >
            <div>
              <div className="font-semibold !text-white">{item.label}</div>
              {item.note && <div className="text-sm !text-sky-100">{item.note}</div>}
            </div>
            <span className="!text-sky-200">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}














