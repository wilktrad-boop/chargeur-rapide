interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="my-6 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
        <h4 className="mb-3 font-semibold text-accent">✓ Avantages</h4>
        <ul className="space-y-2 text-sm">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">•</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <h4 className="mb-3 font-semibold text-red-600">✗ Inconvénients</h4>
        <ul className="space-y-2 text-sm">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">•</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}













