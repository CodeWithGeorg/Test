import React from 'react';

/**
 * Pagination Component
 * Displays pagination controls for navigating through pages
 */
export default function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  maxButtons = 5,
  showFirstLast = true,
  showPrevNext = true,
}) {
  // Handle invalid inputs
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    
    // Adjust start if we're near the end
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1">
      {/* First Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          ariaLabel="First page"
        >
          ««
        </PaginationButton>
      )}

      {/* Previous Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          ariaLabel="Previous page"
        >
          «
        </PaginationButton>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => handlePageClick(page)}
          active={page === currentPage}
          ariaLabel={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </PaginationButton>
      ))}

      {/* Next Button */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          ariaLabel="Next page"
        >
          »
        </PaginationButton>
      )}

      {/* Last Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          ariaLabel="Last page"
        >
          »»
        </PaginationButton>
      )}
    </nav>
  );
}

function PaginationButton({ 
  children, 
  onClick, 
  disabled = false, 
  active = false,
  ariaLabel,
  ariaCurrent,
}) {
  const baseClasses = 'px-3 py-1 rounded-md text-sm font-medium transition-colors';
  const activeClasses = 'bg-blue-600 text-white';
  const inactiveClasses = 'bg-white text-gray-700 hover:bg-gray-100';
  const disabledClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${active ? activeClasses : disabled ? disabledClasses : inactiveClasses}`}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
}

/**
 * Pagination Info Component
 * Shows information about current page and total items
 */
export function PaginationInfo({ 
  currentPage = 1, 
  pageSize = 10, 
  totalItems = 0,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className="text-sm text-gray-600">
      Showing {startItem} to {endItem} of {totalItems} results
    </p>
  );
}

/**
 * Compact Pagination Component
 * Simple previous/next pagination
 */
export function CompactPagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
