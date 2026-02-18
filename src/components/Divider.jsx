import React from 'react';

/**
 * Divider Component
 * Visual separator for content sections
 */
export default function Divider({
  orientation = 'horizontal',
  spacing = 'default',
  className = '',
}) {
  const spacingClasses = {
    small: 'my-2',
    default: 'my-4',
    medium: 'my-6',
    large: 'my-8',
    none: 'my-0',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`h-auto w-px bg-gray-200 mx-2 ${spacingClasses[spacing]} ${className}`}
      />
    );
  }

  return (
    <hr
      className={`border-t border-gray-200 w-full ${spacingClasses[spacing]} ${className}`}
    />
  );
}

/**
 * Divider with Label
 * Divider with text in the middle
 */
export function LabeledDivider({
  label,
  spacing = 'default',
  className = '',
}) {
  const spacingClasses = {
    small: 'my-2',
    default: 'my-4',
    medium: 'my-6',
    large: 'my-8',
    none: 'my-0',
  };

  return (
    <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
      <div className="flex-grow border-t border-gray-200" />
      <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">{label}</span>
      <div className="flex-grow border-t border-gray-200" />
    </div>
  );
}

/**
 * Dashed Divider
 * Divider with dashed style
 */
export function DashedDivider({
  orientation = 'horizontal',
  spacing = 'default',
  className = '',
}) {
  const spacingClasses = {
    small: 'my-2',
    default: 'my-4',
    medium: 'my-6',
    large: 'my-8',
    none: 'my-0',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`h-auto w-px border-l border-dashed border-gray-300 mx-2 ${spacingClasses[spacing]} ${className}`}
      />
    );
  }

  return (
    <hr
      className={`border-t border-dashed border-gray-300 w-full ${spacingClasses[spacing]} ${className}`}
    />
  );
}

/**
 * Vertical Divider Group
 * For creating vertical dividers between inline elements
 */
export function DividerGroup({ children, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < React.Children.count(children) - 1 && (
            <Divider orientation="vertical" spacing="none" className="mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Spaced Divider
 * Divider with configurable spacing on each side
 */
export function SpacedDivider({
  spacing = 4,
  className = '',
}) {
  return (
    <div className={`my-${spacing} ${className}`}>
      <Divider spacing="none" />
    </div>
  );
}
