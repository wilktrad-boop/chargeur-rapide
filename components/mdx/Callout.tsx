import clsx from 'clsx';

interface CalloutProps {
  type: 'info' | 'warn' | 'success';
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
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
    <div className={clsx('my-4 rounded-2xl border p-4', styles[type])}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}













