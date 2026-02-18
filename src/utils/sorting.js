/**
 * Sorting Utilities
 * Helper functions for sorting arrays
 */

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export function sortBy(array, key, order = 'asc') {
  if (!Array.isArray(array) || !key) {
    return array;
  }

  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return order === 'asc' ? 1 : -1;
    if (bValue == null) return order === 'asc' ? -1 : 1;

    // Compare values
    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Sort by multiple keys
 * @param {Array} array - Array to sort
 * @param {Array} keys - Array of {key, order} objects
 * @returns {Array} Sorted array
 */
export function sortByMultiple(array, keys) {
  if (!Array.isArray(array) || !Array.isArray(keys) || keys.length === 0) {
    return array;
  }

  return [...array].sort((a, b) => {
    for (const { key, order = 'asc' } of keys) {
      const aValue = a[key];
      const bValue = b[key];

      let comparison = 0;
      if (aValue == null && bValue == null) {
        comparison = 0;
      } else if (aValue == null) {
        comparison = order === 'asc' ? 1 : -1;
      } else if (bValue == null) {
        comparison = order === 'asc' ? -1 : 1;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}

/**
 * Sort by date
 * @param {Array} array - Array to sort
 * @param {string} key - Date key
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export function sortByDate(array, key, order = 'asc') {
  if (!Array.isArray(array) || !key) {
    return array;
  }

  return [...array].sort((a, b) => {
    const aDate = new Date(a[key]);
    const bDate = new Date(b[key]);
    const comparison = aDate.getTime() - bDate.getTime();
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Sort options for select dropdowns
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

/**
 * Get sort function from option value
 * @param {string} option - Sort option value
 * @returns {Object} {key, order}
 */
export function getSortFromOption(option) {
  const sortMap = {
    'newest': { key: 'createdAt', order: 'desc' },
    'oldest': { key: 'createdAt', order: 'asc' },
    'price-asc': { key: 'price', order: 'asc' },
    'price-desc': { key: 'price', order: 'desc' },
    'name-asc': { key: 'name', order: 'asc' },
    'name-desc': { key: 'name', order: 'desc' },
  };

  return sortMap[option] || { key: 'createdAt', order: 'desc' };
}
