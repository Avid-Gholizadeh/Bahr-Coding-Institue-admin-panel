import React from 'react';
import { Card, CardHeader, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { useParams } from 'react-router-dom';
import { useUserDetails } from './hooks/useUserDetails';
import Avatar from '@components/avatar';
import courseFalbackImg from '@src/assets/images/courses-fallback.jpg';
import fMoment from 'moment-jalaali';

fMoment.loadPersian();

export const UserProjectsList = ({user}) => {
console.log(user);
  const columns = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'نام دوره',
      selector: row => row.title,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar 
              className='me-1' 
              img={row.tumbImageAddress && row.tumbImageAddress !== 'null' ? row.tumbImageAddress : courseFalbackImg} 
              alt={row.title} 
              imgWidth='32' 
            />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
          </div>
        </div>
      ),
    },
    {
      name: 'تاریخ دوره',
      selector: row => row.lastUpdate ? fMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY') : 'نامشخص',
    },
  ];


  return (
    <Card>
      <CardHeader tag='h4'> دوره های کاربر: </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={user?.courses || []} // Ensure fallback for undefined data
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div style={{ padding: '20px' }}>دوره ای موجود نمی باشد</div>}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
