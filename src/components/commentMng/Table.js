import React from 'react';
import { Table } from 'reactstrap';
import {TableBodyContent} from './TableBodyContent';

const TableHover = ({ data }) => {
  const List = data ? data : [];
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>موضوع</th>
          <th>شرح</th>
          <th style={{ width: '20%' }}>نام دوره</th>
          <th style={{ width: '10%' }}>وضعیت</th>
          <th style={{ width: '10%' }}>عملیات</th>
        </tr>
      </thead>
      <TableBodyContent List={List} />
    </Table>
  );
};

export default TableHover;
