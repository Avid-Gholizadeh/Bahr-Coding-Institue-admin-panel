import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomPagination } from '@Components/common/CustomPagination';
import { acceptCoursePayment, getCoursesPayments } from '@core/services/api/payment';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { Badge, Button, Card, Spinner } from 'reactstrap';
import { CustomHeader } from '@Components/courses/reserve/CustomHeader';
import { ModalPayment } from './ModalPayment';
import moment from 'jalali-moment';

function AllPayments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerpage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(null);
  const [centeredModal, setCenteredModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  function handleOpenModal(payment) {
    setSelectedPayment(payment); // Set the selected payment data
    setCenteredModal(true); // Open the modal
  }

  const { data: coursesPayment, isLoading, isError } = useQuery({
    queryKey: ['course_allPayments'],
    queryFn: getCoursesPayments,
  });

  const { mutate, isPending, isError: mutateError } = useMutation({
    mutationFn: acceptCoursePayment,
    onSuccess: (response) => {
      if (response.success) {
        toast.success('پرداخت پذیرفته شد ' + response.message);
      } else {
        toast.error('پذیرش ناموفق');
      }
    },
    onError: (err) => {
      console.log('response', err);
      toast.error('پذیرش ناموفق');
    },
  });

  let filteredReserves = coursesPayment ? [...coursesPayment] : [];
  if (searchTerm && searchTerm?.trim().length !== 0) {
    filteredReserves = coursesPayment.filter(
      (item) =>
        item.studentName?.includes(searchTerm) ||
        item.groupName?.includes(searchTerm) ||
        item.title?.includes(searchTerm)
    );
  }

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  function handlePerPage(e) {
    const value = parseInt(e.currentTarget.value);
    setRowsPerpage(value);
  }

  function dataToRender() {
    if (coursesPayment) {
      const allData = [...filteredReserves];
      return allData?.filter(
        (_, index) =>
          index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
      );
    }
  }

  function handleSearch(val) {
    setSearchTerm(val);
    setCurrentPage(1);
  }

  function handleAccept(paymentId) {
    if (!paymentId) {
        console.error('No paymentId provided!');
        return;
      }
    const formData = new FormData();
    formData.append('PaymentId', paymentId);
    console.log('formData', formData);
    mutate(formData);
  }

  function Pagination() {
    return (
      <>
        <CustomPagination
          totalItem={filteredReserves.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </>
    );
  }

  const columns = [
    {
      name: 'مبلغ پرداختی',
      minWidth: '120px',
      selector: (row) => row.paid,
      cell: (row) => (
        <span
          className="cursor-pointer fw-bolder text-primary"
          onClick={() => handleOpenModal(row)}
        >
          {row.paid} تومان
        </span>
      ),
    },
    {
      name: 'باقی مانده',
      minWidth: '120px',
      cell: (row) => `${row.currentRemainder} تومان`,
    },
    {
      name: 'تاریخ ثبت پرداخت',
      minWidth: '150px',
      cell: (row) => (
        <span className="text-capitalize">
          {moment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')}
        </span>
      ),
    },
    {
      name: 'وضعیت رزرو',
      minWidth: '100px',
      cell: (row) => (
        <Badge
          className="text-capitalize"
          color={row.accept ? 'light-success' : 'light-warning'}
          pill
        >
          {row.accept ? 'پذیرفته' : 'در انتظار'}
        </Badge>
      ),
    },
    {
      name: 'نام دوره',
      minWidth: '150px',
      cell: (row) => (
        <span className="d-inline-block text-truncate">{row.title}</span>
      ),
    },
    {
      name: 'نام گروه',
      minWidth: '100px',
      cell: (row) => (
        <span className="d-inline-block text-truncate">{row.studentName}</span>
      ),
    },
    {
      minWidth: '180px',
      cell: (row) =>
        row.accept ? (
          <Button color="danger" disabled className="w-100">
            پذیرفته
          </Button>
        ) : (
          <Button
            color="primary"
            className="w-100"
            onClick={()=>handleAccept(row.id)}
          >
            پذیرفتن
          </Button>
        ),
    },
  ];


  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable app-user-list">
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          className="react-dataTable"
          columns={columns}
          progressPending={isLoading}
          progressComponent={<Spinner color="primary" size="md" />}
          noDataComponent={<div style={{ padding: '20px' }}>پرداختی ای موجود نیست</div>}
          data={dataToRender()}
          paginationComponent={Pagination}
          subHeaderComponent={
            <CustomHeader
              RowsOfPage={rowsPerPage}
              handlePerPage={handlePerPage}
              onSearch={handleSearch}
              title="دسته‌بندی"
            />
          }
        />
      </div>
      <ModalPayment centeredModal={centeredModal} setCenteredModal={setCenteredModal} modalData={selectedPayment} />
    </Card>
  );
}

export default AllPayments;
