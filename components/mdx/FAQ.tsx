interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="my-6">
      <h3 className="mb-4 text-xl font-semibold text-textStrong">Questions fréquentes</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="rounded-2xl border border-border bg-white">
            <summary className="cursor-pointer p-4 font-medium hover:bg-bgSubtle">
              {item.q}
            </summary>
            <div className="border-t border-border p-4 text-sm text-slate-700">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}










