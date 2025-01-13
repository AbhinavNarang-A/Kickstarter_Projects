import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav
      className="pagination"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="prev"
          aria-label="Go to previous page"
        >
          Previous
        </button>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="next"
          aria-label="Go to next page"
        >
          Next
        </button>
      )}
    </nav>
  );
}

export default Pagination;
