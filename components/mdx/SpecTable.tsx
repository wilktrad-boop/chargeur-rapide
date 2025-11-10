interface SpecTableProps {
  data: Array<{
    spec: string;
    value: string;
    note?: string;
  }>;
}

export function SpecTable({ data }: SpecTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead className="bg-bgSubtle">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-textStrong">Spécification</th>
            <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur</th>
            <th className="px-4 py-3 text-left font-semibold text-textStrong">Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{row.spec}</td>
              <td className="px-4 py-3">{row.value}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{row.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





