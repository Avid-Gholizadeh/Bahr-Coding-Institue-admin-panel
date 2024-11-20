// ** Imports
import React from 'react'
import ReactPaginate from 'react-paginate'

// Custom Pagination Component
export function CustomPagination ({
  pageCount,
  forcePage,
  onPageChange,
  containerClassName = 'pagination react-paginate justify-content-center my-2 pe-1',
  pageClassName = 'page-item rtl',
  pageLinkClassName = 'page-link',
  previousClassName = 'page-item prev',
  previousLinkClassName = 'page-link',
  nextClassName = 'page-item next rtl',
  nextLinkClassName = 'page-link rtl',
}) {
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={pageCount}
      activeClassName='active'
      forcePage={forcePage}
      onPageChange={onPageChange}
      containerClassName={containerClassName}
      pageClassName={pageClassName}
      pageLinkClassName={pageLinkClassName}
      previousClassName={previousClassName}
      previousLinkClassName={previousLinkClassName}
      nextClassName={nextClassName}
      nextLinkClassName={nextLinkClassName}
    />
  )
}
