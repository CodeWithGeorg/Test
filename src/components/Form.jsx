import React from 'react';

/**
 * Form Component
 * Wrapper for form elements with common styling
 */
export default function Form({ children, onSubmit, className = '', ...props }) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} {...props}>
      {children}
    </form>
  );
}

/**
 * FormField Component
 * Wrapper for form fields with label and error handling
 */
export function FormField({
  label,
  error,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

/**
 * FormGroup Component
 * Group multiple form fields together
 */
export function FormGroup({ children, className = '' }) {
  return <div className={`grid grid-cols-1 gap-4 ${className}`}>{children}</div>;
}

/**
 * FormActions Component
 * Container for form action buttons
 */
export function FormActions({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-end gap-3 pt-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * FormSection Component
 * Section within a form with optional heading
 */
export function FormSection({ title, description, children, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {(title || description) && (
        <div className="border-b border-gray-200 pb-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * FormLabel Component
 * Custom label for form fields
 */
export function FormLabel({ children, required = false, className = '' }) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

/**
 * FormError Component
 * Display form-level errors
 */
export function FormError({ error, className = '' }) {
  if (!error) return null;
  
  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
}

/**
 * FormSuccess Component
 * Display form-level success messages
 */
export function FormSuccess({ message, className = '' }) {
  if (!message) return null;
  
  return (
    <div className={`bg-green-50 border border-green-200 rounded-md p-4 ${className}`}>
      <p className="text-sm text-green-600">{message}</p>
    </div>
  );
}

/**
 * FormHint Component
 * Helper text for form fields
 */
export function FormHint({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
