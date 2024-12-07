import React from 'react';
import { Badge, Button } from 'reactstrap';
import { CheckCircle, XCircle } from 'react-feather';
import fMoment from 'moment-jalaali';

fMoment.loadPersian();

const useColumnsReserve = (handleDeleteAlert) => {
  return [
    {
      minWidth: '150px',
      name: 'نام دوره',
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.courseName}</span>
          </div>
        </div>
      ),
    },
    {
      name: 'تاریخ دوره',
      selector: (row) =>
        fMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY'),
    },
    {
      name: 'تاریخ رزرو',
      selector: (row) =>
        fMoment(row.reserverDate).locale('fa').format('jD jMMMM jYYYY'),
    },
    {
      name: 'وضعیت رزرو',
      selector: (row) => row,
      cell: (row) =>
        row.accept ? (
          <Badge color="light-success">پذیرفته</Badge>
        ) : (
          <Badge color="light-warning">در انتظار</Badge>
          // <div className="d-flex">
          // <Button.Ripple
          //     className="btn-icon"
          //     color="flat-info"
          //     // onClick={() => handleModalOpen(row)}
          // >
          //     <CheckCircle size={20} />
          // </Button.Ripple>
          //   <Button.Ripple
          //     className="btn-icon"
          //     color="flat-danger"
          //     onClick={() => handleDeleteAlert(row.reserveId)}
          //   >
          //     <XCircle size={20} />
          //   </Button.Ripple>
          // </div>
        ),
    },
  ];
};

export default useColumnsReserve;
