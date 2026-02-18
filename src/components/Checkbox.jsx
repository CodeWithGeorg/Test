import React from 'react';

/**
 * Checkbox Component
 * Reusable checkbox input with label
 */
export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  id,
  name,
  value,
  className = '',
  ...props
}) {
  const inputId = id || `checkbox-${name}-${value}`;
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        {...props}
      />
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-2 block text-sm text-gray-900 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="ml-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

/**
 * Checkbox Group Component
 * Group multiple checkboxes together
 */
export function CheckboxGroup({
  label,
  options = [],
  selectedValues = [],
  onChange,
  disabled = false,
  error,
  className = '',
}) {
  const handleChange = (value) => {
    if (disabled) return;
    
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    
    onChange(newValues);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

/**
 * Switch Component
 * Toggle switch styled checkbox
 */
export function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  name,
  className = '',
  ...props
}) {
  const inputId = id || `switch-${name}`;

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        role="switch"
        id={inputId}
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-3 block text-sm font-medium text-gray-900 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

/**
 * Radio Button Component
 */
export function Radio({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  name,
  value,
  className = '',
  ...props
}) {
  const inputId = id || `radio-${name}-${value}`;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        {...props}
      />
      {label && (
        <label
          htmlFor={inputId}
          className={`ml-2 block text-sm text-gray-900 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

/**
 * Radio Group Component
 */
export function RadioGroup({
  label,
  options = [],
  selectedValue,
  onChange,
  disabled = false,
  className = '',
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            name={option.name || 'radio-group'}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => !disabled && onChange(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
    </div>
  );
}
