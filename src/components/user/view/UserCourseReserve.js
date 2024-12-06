import React from 'react';
import { Card, CardHeader, Badge, Spinner, Button } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { CheckCircle, ChevronDown, XCircle } from 'react-feather';
import { useParams } from 'react-router-dom';
import { useUserDetails } from './hooks/useUserDetails';
import Avatar from '@core/components/avatar';
import fMoment from 'moment-jalaali';
import courseFalbackImg from '@src/assets/images/courses-fallback.jpg';
import { deleteCourseReserve } from '@core/services/api/courses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useSweetDelAlert} from '@Components/common/useSweetDelAlert'

fMoment.loadPersian();

export const UserCourseReserve = ({user}) => {
  const queryClient = useQueryClient()
  const {mutate: deleteMutate, isPending} = useMutation({
      mutationFn: deleteCourseReserve,
  })

  const {handleDeleteAlert} = useSweetDelAlert({
      actionFn: reserveId => handleDeleteCourseReserve(reserveId),
  })

  function handleDeleteCourseReserve(reserveId) {
      return new Promise((resolve, reject) => {
          deleteMutate(
              {id: reserveId},
              {
                  onSuccess: data => {
                      if (data.success) {
                          queryClient.setQueryData(['all-course-reserve'], oldReserves =>
                              oldReserves.filter(reserve => reserve.reserveId !== reserveId)
                          )
                          return resolve(data)
                      }
                  },
                  onError: err => reject(err),
              }
          )
      })
  }


  const columnsReserve = [
    {
      minWidth: '150px',
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
      name: 'تاریخ رزرو',
      selector: row => fMoment(row.reserverDate).locale('fa').format('jD jMMMM jYYYY'),
    },
    {
      name: 'وضعیت رزرو',
      selector: row => row,
      cell: row => row.accept? (
        <Badge color='light-success' >
          پذیرفته
        </Badge>
      ) :
        (
          <div className="d-flex">
          <Button.Ripple
              className="btn-icon"
              color="flat-info"
              // onClick={() => handleModalOpen(row)}
          >
              <CheckCircle size={20} />
          </Button.Ripple>
          <Button.Ripple
              className="btn-icon"
              color="flat-danger"
              onClick={() => handleDeleteAlert(row.reserveId)}
          >
              <XCircle size={20} />
          </Button.Ripple>
      </div>
      ),
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
