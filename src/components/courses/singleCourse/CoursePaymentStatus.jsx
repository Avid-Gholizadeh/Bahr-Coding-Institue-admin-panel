import { getCoursePayment } from '@core/services/api/payment';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Button, Card, Spinner } from 'reactstrap';

export function CoursePaymentStatus({ singleCourseId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['course_payment_status'],
    queryFn: () => getCoursePayment(singleCourseId),
  });

  // State to toggle between "notDonePays" and "donePays"
  const [selectedTab, setSelectedTab] = useState('notDonePays');

  // Data to display based on the selected tab
  const currentData = data?.[selectedTab] || [];

  const columns = [
    {
      name: 'نام دانشجو',
      minWidth: 'w-25',
      selector: row => row.studentName,
    },
    {
      name: <span className='text-success'>وضعیت پرداختی کاربر </span>,
      minWidth: '200px',
      cell: row => (
        <Badge
          className="text-capitalize"
          color={row.peymentDone ? 'light-success' : 'light-warning'}
          pill
        >
          {row.peymentDone ? 'کامل' : 'ناقص'}
        </Badge>
      ),
    },
    {
      name: 'نام گروه',
      minWidth: 'w-25',
      cell: row => row.groupName,
    },
    {
      name: 'حذف شده',
      minWidth: '120px',
      cell: row => (
        <Badge
          className="text-capitalize"
          color={row.isDelete ? 'light-danger' : 'light-success'}
          pill
        >
          {row.isDelete ? 'بله' : 'خیر'}
        </Badge>
      ),
    },
  ];

  return (
    <Card>
      <div className="d-flex justify-content-between align-items-center p-2">
        {/* Toggle buttons for selecting tabs */}
        <Button
          color={selectedTab === 'notDonePays' ? 'primary' : 'secondary'}
          onClick={() => setSelectedTab('notDonePays')}
        >
          پرداختی ناقص 
        </Button>
        <Button
          color={selectedTab === 'donePays' ? 'primary' : 'secondary'}
          onClick={() => setSelectedTab('donePays')}
        >
          پرداختی کامل 
        </Button>
      </div>
      <div className="react-dataTable">
        <DataTable
          responsive
          className="react-dataTable"
          columns={columns}
          data={currentData}
          progressPending={isLoading}
          progressComponent={<Spinner color="primary" />}
          noDataComponent={
            <div style={{ padding: '20px' }}>داده‌ای برای نمایش وجود ندارد</div>
          }
        />
      </div>
    </Card>
  );
}
