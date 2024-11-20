import React from 'react';
import { Card, CardHeader, Badge, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { useParams } from 'react-router-dom';
import { useUserDetails } from './hooks/useUserDetails';
import Avatar from '@core/components/avatar';
import fMoment from 'moment-jalaali';
import courseFalbackImg from '@src/assets/images/courses-fallback.jpg';


fMoment.loadPersian();

export const UserCourseReserve = ({user}) => {

  const columnsReserve = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'نام دوره',
      selector: row => row.title,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.courseName}</span>
          </div>
        </div>
      ),
    },
    {
      name: 'تاریخ دوره',
      selector: row => fMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY'),
    },
    {
      name: 'وضعیت دوره',
      selector: row => row,
      cell: row => (
        <Badge color={row.accept ? 'light-success' : 'light-warning'}>
          {row.accept ? 'تایید شده' : 'در انتظار تایید'}
        </Badge>
      ),
    },
    {
      name: 'تاریخ رزرو',
      selector: row => fMoment(row.reserverDate).locale('fa').format('jD jMMMM jYYYY'),
    },
  ];

  return (
    <Card>
      <CardHeader tag='h4'> دوره های رزرو شده کاربر: </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          responsive
          columns={columnsReserve}
          data={user?.coursesReseves || []} // Fallback to empty array
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{ padding: '20px' }}>دوره ای موجود نمی باشد</div>}
        />
      </div>
    </Card>
  );
};

export default UserCourseReserve;
