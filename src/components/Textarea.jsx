import React, { forwardRef } from 'react';

/**
 * Textarea Component
 * Multi-line text input
 */
const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    hint,
    rows = 4,
    resize = true,
    disabled = false,
    required = false,
    id,
    name,
    placeholder,
    className = '',
    ...props
  },
  ref
) {
  const textareaId = id || `textarea-${name}`;

  const resizeClasses = {
    true: 'resize',
    false: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'bg-white'} ${
          resizeClasses[resize] || 'resize'
        }`}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default Textarea;

/**
 * Auto-resize Textarea Component
 * Automatically adjusts height based on content
 */
export function AutoTextarea({
  label,
  error,
  hint,
  minRows = 3,
  maxRows = 10,
  disabled = false,
  required = false,
  id,
  name,
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) {
  const textareaRef = React.useRef(null);
  const [height, setHeight] = React.useState('auto');

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minRows * 24),
      maxRows * 24
    );
    setHeight(newHeight);
    textarea.style.height = `${newHeight}px`;
  };

  React.useEffect(() => {
    adjustHeight();
  }, [value, minRows, maxRows]);

  const textareaId = id || `autotextarea-${name}`;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{ height }}
        className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'bg-white'} resize-none overflow-hidden`}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

/**
 * Character Count Textarea
 * Shows remaining character count
 */
export function CharacterCountTextarea({
  label,
  error,
  hint,
  maxLength,
  showCount = true,
  rows = 4,
  disabled = false,
  required = false,
  id,
  name,
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) {
  const textareaId = id || `counttextarea-${name}`;
  const characterCount = value?.length || 0;
  const isOverLimit = maxLength && characterCount > maxLength;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        rows={rows}
        className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error || isOverLimit
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } ${disabled ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'bg-white'}`}
        {...props}
      />
      <div className="flex justify-between mt-1">
        <div>
          {hint && !error && (
            <p className="text-sm text-gray-500">{hint}</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
        {showCount && maxLength && (
          <p className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
