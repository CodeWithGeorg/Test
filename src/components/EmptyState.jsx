import React from 'react';

/**
 * EmptyState Component
 * Displayed when there's no data to show
 */
export default function EmptyState({
  title = 'No data found',
  description = 'There are no items to display.',
  icon,
  action,
  actionLabel = 'Go Back',
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/**
 * EmptyState for Search Results
 */
export function EmptySearchResults({ searchQuery, onClear }) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find any results for "${searchQuery}". Try adjusting your search or filter criteria.`}
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      action={onClear}
      actionLabel="Clear Search"
    />
  );
}

/**
 * EmptyState for No Orders
 */
export function EmptyOrders({ onPlaceOrder }) {
  return (
    <EmptyState
      title="No orders yet"
      description="You haven't placed any orders yet. Start by placing your first order."
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      }
      action={onPlaceOrder}
      actionLabel="Place Order"
    />
  );
}

/**
 * EmptyState for No Data
 */
export function NoData({ message = 'No data available' }) {
  return (
    <EmptyState
      title={message}
      description="Check back later for updates."
      icon={
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      }
    />
  );
}
