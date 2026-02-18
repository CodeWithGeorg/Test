import React from 'react';

/**
 * Skeleton Component
 * Loading placeholder with animated pulse effect
 */
export default function Skeleton({
  width,
  height,
  rounded = false,
  circle = false,
  className = '',
}) {
  const baseClasses = 'animate-pulse bg-gray-200';
  
  const classes = [
    baseClasses,
    circle ? 'rounded-full' : rounded ? 'rounded-lg' : 'rounded',
    className,
  ].filter(Boolean).join(' ');

  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  return <div className={classes} style={style} />;
}

/**
 * Skeleton Text Component
 * For loading text paragraphs
 */
export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? '70%' : '100%'}
          height="1rem"
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Card Component
 * For loading card content
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <Skeleton circle width="48px" height="48px" />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height="1rem" />
          <Skeleton width="40%" height="0.875rem" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton height="0.875rem" />
        <Skeleton height="0.875rem" />
        <Skeleton width="70%" height="0.875rem" />
      </div>
    </div>
  );
}

/**
 * Skeleton Table Component
 * For loading table content
 */
export function SkeletonTable({ rows = 5, columns = 4, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="1rem" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="0.875rem" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar Component
 */
export function SkeletonAvatar({ size = 'medium', className = '' }) {
  const sizes = {
    small: '32px',
    medium: '40px',
    large: '48px',
    xlarge: '64px',
  };

  return (
    <Skeleton
      circle
      width={sizes[size]}
      height={sizes[size]}
      className={className}
    />
  );
}

/**
 * Skeleton Button Component
 */
export function SkeletonButton({ className = '' }) {
  return (
    <Skeleton
      width="100px"
      height="2.5rem"
      rounded
      className={className}
    />
  );
}

/**
 * Skeleton Input Component
 */
export function SkeletonInput({ className = '' }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <Skeleton width="30%" height="0.75rem" />
      <Skeleton height="2.5rem" rounded />
    </div>
  );
}

/**
 * Skeleton Image Component
 */
export function SkeletonImage({ aspectRatio = '16/9', className = '' }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ aspectRatio }}
    />
  );
}
