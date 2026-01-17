interface SpecTableProps {
  data: Array<{
    spec: string;
    value: string;
    value2?: string;
    value3?: string;
    note?: string;
  }>;
}

export function SpecTable({ data }: SpecTableProps) {
  // Détermine le nombre de colonnes nécessaires
  const hasMultipleValues = data.some(row => row.value2 || row.value3);
  const hasValue3 = data.some(row => row.value3);
  
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead className="bg-bgSubtle">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-textStrong">Spécification</th>
            {hasMultipleValues ? (
              <>
                <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur 1</th>
                {hasValue3 ? (
                  <>
                    <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur 2</th>
                    <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur 3</th>
                  </>
                ) : (
                  <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur 2</th>
                )}
              </>
            ) : (
              <th className="px-4 py-3 text-left font-semibold text-textStrong">Valeur</th>
            )}
            <th className="px-4 py-3 text-left font-semibold text-textStrong">Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{row.spec}</td>
              {hasMultipleValues ? (
                <>
                  <td className="px-4 py-3">{row.value}</td>
                  {hasValue3 ? (
                    <>
                      <td className="px-4 py-3">{row.value2 || '—'}</td>
                      <td className="px-4 py-3">{row.value3 || '—'}</td>
                    </>
                  ) : (
                    <td className="px-4 py-3">{row.value2 || '—'}</td>
                  )}
                </>
              ) : (
                <td className="px-4 py-3">{row.value}</td>
              )}
              <td className="px-4 py-3 text-sm text-slate-600">{row.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}














