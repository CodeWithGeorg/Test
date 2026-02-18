import React from 'react';

/**
 * Badge Component
 * Small status indicator for labels and tags
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'medium',
  rounded = false,
  dot = false,
  className = '',
}) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-sm',
    large: 'px-3 py-1 text-base',
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  const baseClasses = 'inline-flex items-center font-medium';

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${className}`}
    >
      {dot && (
        <span className={`mr-1.5 h-2 w-2 rounded-full ${variantClasses[variant].replace('text-', 'bg-')}`} />
      )}
      {children}
    </span>
  );
}

/**
 * Status Badge Component
 * Pre-configured badges for common statuses
 */
export function StatusBadge({ status }) {
  const statusConfig = {
    pending: { variant: 'warning', label: 'Pending', dot: true },
    processing: { variant: 'info', label: 'Processing', dot: true },
    shipped: { variant: 'purple', label: 'Shipped', dot: true },
    delivered: { variant: 'success', label: 'Delivered', dot: true },
    cancelled: { variant: 'danger', label: 'Cancelled', dot: true },
    active: { variant: 'success', label: 'Active', dot: true },
    inactive: { variant: 'default', label: 'Inactive', dot: true },
    draft: { variant: 'default', label: 'Draft', dot: true },
    published: { variant: 'success', label: 'Published', dot: true },
  };

  const config = statusConfig[status] || { variant: 'default', label: status, dot: false };

  return (
    <Badge variant={config.variant} dot={config.dot}>
      {config.label}
    </Badge>
  );
}

/**
 * Count Badge Component
 * Badge showing a count or number
 */
export function CountBadge({ count, max = 99, variant = 'primary' }) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <Badge variant={variant} rounded>
      {displayCount}
    </Badge>
  );
}

/**
 * Tag Component
 * Similar to badge but for tags/labels
 */
export function Tag({
  children,
  onRemove,
  className = '',
}) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-800 ${className}`}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <span className="sr-only">Remove</span>
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
}
