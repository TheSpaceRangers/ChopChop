import { AlertCircle } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  error: string | null;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className = '',
}) => {
  if (!error) return null;

  return (
    <div
      className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 ${className}`}
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{error}</span>
    </div>
  );
};
