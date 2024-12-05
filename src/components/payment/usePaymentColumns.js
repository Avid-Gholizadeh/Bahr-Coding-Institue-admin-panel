// src/hooks/usePaymentColumns.js
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Check, MoreVertical, Trash } from 'react-feather';
import { createPortal } from 'react-dom';
import moment from 'jalali-moment';

export const usePaymentColumns = ({ handleOpenModal, handleAccept, handleDelete }) => {
  const PortalDropdownMenu = ({ children }) => {
    return createPortal(children, document.getElementById('portal-root'));
  };

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
      name: 'وضعیت پرداخت',
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
      name: 'دانشجو',
      minWidth: '100px',
      cell: (row) => (
        <span className="d-inline-block text-truncate">{row.studentName}</span>
      ),
    },
    {
      minWidth: '180px',
      cell: (row) =>
        row.accept ? (
          <Badge color="light-success" className="">
            پذیرفته
          </Badge>
        ) : (
          <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow"
              color="transparent"
              size="sm"
              caret>
              <MoreVertical size={15} />
            </DropdownToggle>
            <PortalDropdownMenu>
              <DropdownMenu>
                <DropdownItem
                  className="text-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAccept(row.id);
                  }}
                >
                  <Check className="me-50" size={15} />{' '}
                  <span className="align-middle"> تایید </span>
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(row.id);
                  }}
                >
                  <Trash className="me-50" size={15} />{' '}
                  <span className="align-middle">رد کردن</span>
                </DropdownItem>
              </DropdownMenu>
            </PortalDropdownMenu>
          </UncontrolledDropdown>
        ),
    },
  ];

  return columns;
};
