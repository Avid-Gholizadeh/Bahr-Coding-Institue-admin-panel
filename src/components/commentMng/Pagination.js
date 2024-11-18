import React from 'react';
import ReactPaginate from 'react-paginate';

export function Pagination ({ 
  pageCount, 
  onPageChange, 
  forcePage, 
  containerClassName = 'pagination react-paginate justify-content-center' 
}) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      breakLabel="..."
      previousLabel=""
      nextLabel=""
      marginPagesDisplayed={3}
      forcePage={forcePage - 1}
      onPageChange={(page) => onPageChange(page.selected + 1)}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      nextClassName="page-item next"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      previousClassName="page-item prev"
      containerClassName={containerClassName}
    />
  );
};
