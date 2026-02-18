import { useState, useMemo } from 'react';

/**
 * usePagination Hook
 * Custom hook for managing pagination state and calculations
 */
export function usePagination({
  totalItems = 0,
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 0;
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  // Calculate if there's a next/previous page
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Go to specific page
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Go to next page
  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Go to previous page
  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Go to first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Change page size
  const changePageSize = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Get pagination info
  const paginationInfo = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalItems);
    
    return {
      startIndex,
      endIndex,
      totalItems,
      currentPage,
      pageSize,
      totalPages,
    };
  }, [currentPage, pageSize, totalItems, totalPages]);

  // Reset pagination
  const reset = () => {
    setCurrentPage(1);
    setPageSize(initialPageSize);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    pageSizeOptions,
    paginationInfo,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    setCurrentPage,
    reset,
  };
}

export default usePagination;
