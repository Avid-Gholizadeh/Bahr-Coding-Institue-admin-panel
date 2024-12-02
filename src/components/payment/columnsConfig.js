import React from 'react';
import moment from 'moment-jalaali';
import { Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export const columnsConfig = (handleAccept,handleOpenModal) => [
  {
    name: 'مبلغ پرداختی',
    minWidth: '120px',
    selector: (row) => row.paid,
    cell: (row) => (
      <span
        className=" cursor-pointer fw-bolder text-primary"
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
      <span className="d-inline-block text-truncate">{row.groupName}</span>
    ),
  },
  {
    minWidth: '180px',
    cell: (row) =>
      row.accept ? (
        <Button
          color="primary"
          className="w-100"
          onClick={() => handleAccept(row.id)}
        >
          پذیرفتن
        </Button>
      ) : (
        <Button color="danger" disabled className="w-100">
          رزرو تایید نشده
        </Button>
      ),
  },
];
