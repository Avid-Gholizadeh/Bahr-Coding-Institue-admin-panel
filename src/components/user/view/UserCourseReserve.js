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
import useColumnsReserve from './hooks/useColumnsReserve';

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
                          queryClient.setQueryData(['getDetailUser'])
                          queryClient.invalidateQueries(['getDetailUser'])
                          return resolve(data)
                      }
                  },
                  onError: err => reject(err),
              }
          )
      })
  }


  const columnsReserve = useColumnsReserve(handleDeleteAlert);

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
