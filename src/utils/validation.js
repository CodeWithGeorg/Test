/**
 * Form Validation Utilities
 * Reusable validation functions for forms
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Minimum length validation
export const hasMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

// Maximum length validation
export const hasMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

// Phone number validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate form field
export const validateField = (value, rules) => {
  const errors = [];
  
  if (rules.required && !isRequired(value)) {
    errors.push('This field is required');
  }
  
  if (rules.email && value && !isValidEmail(value)) {
    errors.push('Please enter a valid email address');
  }
  
  if (rules.minLength && value && !hasMinLength(value, rules.minLength)) {
    errors.push(`Must be at least ${rules.minLength} characters`);
  }
  
  if (rules.maxLength && value && !hasMaxLength(value, rules.maxLength)) {
    errors.push(`Must be no more than ${rules.maxLength} characters`);
  }
  
  if (rules.phone && value && !isValidPhone(value)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (rules.url && value && !isValidUrl(value)) {
    errors.push('Please enter a valid URL');
  }
  
  if (rules.custom && typeof rules.custom === 'function') {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }
  
  return errors;
};

// Validate entire form
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  for (const field in validationRules) {
    const fieldErrors = validateField(formData[field], validationRules[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  }
  
  return { isValid, errors };
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 6,
  },
  confirmPassword: {
    required: true,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    required: false,
    phone: true,
  },
};
