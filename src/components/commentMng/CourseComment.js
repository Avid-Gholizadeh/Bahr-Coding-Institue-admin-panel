import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, CardHeader, CardTitle, Col, Input, Row, Spinner } from 'reactstrap';
import TableHover from './Table';
import {Pagination} from './Pagination';
import {TableCardHeader} from './TableCardHeader';
import { getCommentsForAddmin } from '../../@core/services/api/comments/ForAdmin';

export function CourseComment() {
  const [sortingCol, setSortingCol] = useState('');
  const [sortType, setSortType] = useState('InsertDate');
  const [rowsOfPage, setRowsOfPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [isAccept, setIsAccept] = useState(null);

  const { data: commentsList, isLoading, isError, refetch } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      getCommentsForAddmin(pageNumber, rowsOfPage, sortingCol, sortType, query, isAccept),
  });
  console.log(commentsList);
  const totalCount = commentsList?.totalCount || 1;
  console.log(isAccept);
  useEffect(()=>{
    refetch()
  },[pageNumber, rowsOfPage, sortingCol, sortType, query, isAccept,refetch])
  return (
    <>
    {/* <Card>
      <CardHeader>
        <CardTitle tag='h4'>فیلتر ها</CardTitle>
      </CardHeader>
      <CardBody>

      </CardBody>
    </Card> */}
    <Card>
      <CardHeader>
      <TableCardHeader
          rowsOfPage={rowsOfPage}
          setRowsOfPage={setRowsOfPage}
          query={query}
          setQuery={setQuery}
          isAccept={isAccept}
          setIsAccept={setIsAccept}
          sortingCol={sortingCol}
          setSortingCol={setSortingCol}
        />
      </CardHeader>
      {isLoading ? (
        <div className="m-auto">
          <Spinner color="primary" />
        </div>
      ) : (
        <TableHover data={commentsList.comments} />
      )}
      {isError && <p className="text-danger m-auto">مشکلی پیش آمد</p>}
      <Pagination
        pageCount={Math.ceil(totalCount / rowsOfPage)}
        forcePage={pageNumber}
        onPageChange={(newPage) => setPageNumber(newPage)}
      />
    </Card>
    </>
  );
}
