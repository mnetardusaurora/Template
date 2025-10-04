import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

/**
 * Loading Spinner Component
 * Displays animated loading indicator
 */
export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          'animate-spin rounded-full border-gray-300 border-t-gray-900',
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <p className="text-sm text-gray-600">{label}</p>}
      <span className="sr-only">{label || 'Loading...'}</span>
    </div>
  );
}

/**
 * Full Page Loading Spinner
 * Covers entire viewport
 */
export function LoadingPage({ label }: { label?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}
