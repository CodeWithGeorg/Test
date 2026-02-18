import React from 'react';

/**
 * Card Component
 * A flexible container component for displaying content
 */
export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  hoverable = false,
  bordered = true,
  padding = true,
  onClick,
}) {
  const baseClasses = 'bg-white rounded-lg';
  const borderClasses = bordered ? 'border border-gray-200' : '';
  const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
  const paddingClasses = padding ? 'p-4' : '';
  
  const cardClasses = `${baseClasses} ${borderClasses} ${hoverClasses} ${paddingClasses} ${className}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={`mb-4 ${headerClassName}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div className={bodyClassName}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={`mt-4 pt-4 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * Card Header Component
 */
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Body Component
 */
export function CardBody({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/**
 * Card Footer Component
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card Image Component
 */
export function CardImage({ src, alt, className = '', ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-48 object-cover rounded-lg ${className}`}
      {...props}
    />
  );
}

/**
 * Card Actions Component
 */
export function CardActions({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 mt-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Stat Card Component
 * For displaying statistics and metrics
 */
export function StatCard({ title, value, change, changeType, icon }) {
  const changeClasses = changeType === 'positive' 
    ? 'text-green-600' 
    : changeType === 'negative' 
      ? 'text-red-600' 
      : 'text-gray-600';

  return (
    <Card hoverable>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeClasses}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
