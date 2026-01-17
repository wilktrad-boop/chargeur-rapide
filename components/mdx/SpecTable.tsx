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
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  
  // Détermine le nombre de colonnes nécessaires
  const hasMultipleValues = data.some(row => (row && row.value2) || (row && row.value3));
  const hasValue3 = data.some(row => row && row.value3);
  
  // Détermine les en-têtes de colonnes
  const headers = ['Spécification'];
  if (hasMultipleValues) {
    headers.push('Valeur 1');
    if (hasValue3) {
      headers.push('Valeur 2', 'Valeur 3');
    } else {
      headers.push('Valeur 2');
    }
  } else {
    headers.push('Valeur');
  }
  headers.push('Note');
  
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead className="bg-bgSubtle">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3 text-left font-semibold text-textStrong">
                {header}
              </th>
            ))}
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














