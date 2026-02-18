import React from 'react';

/**
 * Loading Spinner Component
 * Displays a loading animation while content is being fetched
 */
export default function Spinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

/**
 * Full Page Loading Spinner
 * Used when the entire page is loading
 */
export function FullPageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="large" />
    </div>
  );
}

/**
 * Inline Loading Spinner
 * Used within components or forms
 */
export function InlineSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-2">
      <Spinner size="small" />
      <span className="text-gray-600">{text}</span>
    </div>
  );
}
