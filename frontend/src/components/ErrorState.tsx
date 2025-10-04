import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  error?: Error | string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Error State Component
 * Displays error messages with retry option
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this content.',
  error,
  onRetry,
  className,
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <Card className={cn('p-12 border-red-200 bg-red-50', className)}>
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 max-w-sm mx-auto">{description}</p>
        {errorMessage && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded text-left max-w-lg mx-auto">
            <p className="text-sm text-red-800 font-mono break-all">{errorMessage}</p>
          </div>
        )}
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
