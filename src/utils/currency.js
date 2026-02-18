/**
 * Currency Formatting Utilities
 * Helper functions for currency formatting and manipulation
 */

/**
 * Default currency settings
 */
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LOCALE = 'en-US';

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number as currency without symbol
 * @param {number} amount - Amount to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export function formatNumber(amount, decimals = 2) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }
  
  return Number(amount).toFixed(decimals);
}

/**
 * Parse currency string to number
 * @param {string} value - Currency string to parse
 * @returns {number} Parsed number
 */
export function parseCurrency(value) {
  if (!value) return 0;
  
  // Remove currency symbols and commas
  const cleaned = value.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export function calculateDiscount(originalPrice, discountedPrice) {
  if (!originalPrice || originalPrice <= 0) return 0;
  if (!discountedPrice || discountedPrice < 0) return 0;
  
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount * 100) / 100;
}

/**
 * Calculate subtotal from items
 * @param {Array} items - Array of items with price and quantity
 * @returns {number} Subtotal
 */
export function calculateSubtotal(items) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return 0;
  }
  
  return items.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);
}

/**
 * Calculate tax amount
 * @param {number} amount - Amount to calculate tax on
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns {number} Tax amount
 */
export function calculateTax(amount, taxRate) {
  if (!amount || amount < 0) return 0;
  if (!taxRate || taxRate < 0) return 0;
  
  return Math.round(amount * taxRate * 100) / 100;
}

/**
 * Calculate total with tax
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate as decimal
 * @returns {number} Total amount
 */
export function calculateTotal(subtotal, taxRate) {
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
}

/**
 * Format price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {string} Formatted price range
 */
export function formatPriceRange(min, max) {
  if (!min && !max) return '';
  if (!max) return formatCurrency(min);
  if (!min) return formatCurrency(max);
  
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

/**
 * Format cents to dollars
 * @param {number} cents - Amount in cents
 * @returns {number} Amount in dollars
 */
export function centsToDollars(cents) {
  if (!cents || isNaN(cents)) return 0;
  return cents / 100;
}

/**
 * Format dollars to cents
 * @param {number} dollars - Amount in dollars
 * @returns {number} Amount in cents
 */
export function dollarsToCents(dollars) {
  if (!dollars || isNaN(dollars)) return 0;
  return Math.round(dollars * 100);
}
