import clsx from 'clsx';

interface CalloutProps {
  type: 'info' | 'warn' | 'warning' | 'success';
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  // 'warning' est un alias toléré de 'warn' (utilisé dans certains MDX)
  const key = type === 'warning' ? 'warn' : type;

  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warn: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    success: 'border-green-200 bg-green-50 text-green-800'
  };

  const icons = {
    info: 'ℹ️',
    warn: '⚠️',
    success: '✅'
  };

  return (
    <div className={clsx('not-prose my-4 rounded-2xl border p-4', styles[key])}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[key]}</span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}














