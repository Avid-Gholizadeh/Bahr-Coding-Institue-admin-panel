import {acceptCoursePayment, deleteCoursePayment, getUserPayList} from '@core/services/api/payment'
import {useMutation, useQuery} from '@tanstack/react-query'
import React from 'react'
import DataTable from 'react-data-table-component'
import {
    Badge,
    Card,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    UncontrolledDropdown,
} from 'reactstrap'
import jMoment from 'jalali-moment'
import toast from 'react-hot-toast'
import {Check, MoreVertical, Trash} from 'react-feather'
import {createPortal} from 'react-dom'

export function UserPayments({userId}) {
    const {
        data: paymentData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['userPayment'],
        queryFn: () => getUserPayList(userId),
    })
    const{mutate ,isPending, isError:mutateError} = useMutation({
        mutationFn: acceptCoursePayment,
        onSuccess: response => {
            if (response.success) {
                toast.success(' پرداخت پذیرفته شد ' + response.message)
            } else {
                toast.error(' پذیرش ناموفق ')
            }
        },
        onError: err => {
            console.log('response', err)
            toast.error(' پذیرش ناموفق ')
        },
    })
    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteCoursePayment,
        onSuccess: response => {
            if (response.success) {
                toast.success('حذف شد')
            } else {
                toast.error('حذف ناموفق')
            }
        },
        onError: err => {
            console.log('response', err)
            toast.error('حذف ناموفق')
        },
    })

    function handleAccept(paymentId) {
        const formData = new FormData()
        formData.append('PaymentId', paymentId)
        mutate(formData)
    }
    function handleDelete(paymentId) {
        const formData = new FormData()
        formData.append('PaymentId', paymentId)

        deleteMutate(formData)
    }
    const PortalDropdownMenu = ({children}) => {
        return createPortal(children, document.getElementById('portal-root'))
    }
    const columns = [
        {
            name: 'مبلغ پرداختی',
            minWidth: '100px',
            selector: row => row.paid + 'تومان',
        },
        {
            name: ' تاریخ ثبت پرداخت',
            minWidth: '150px',
            cell: row => (
                <span className="text-capitalize">
                    {' '}
                    {jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')}{' '}
                </span>
            ),
        },
        {
            name: ' وضعیت پرداخت',
            minWidth: '120px',
            cell: row => (
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
            name: 'نام گروه',
            minWidth: '100px',
            cell: row => row.groupName,
        },
        {
            minWidth: '180px',
            cell: row =>
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
                            caret
                        >
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <PortalDropdownMenu>
                            <DropdownMenu>
                                <DropdownItem
                                    className="text-primary"
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault()
                                        handleAccept(row.id)
                                    }}
                                >
                                    <Check className="me-50" size={15} />{' '}
                                    <span className="align-middle"> تایید </span>
                                </DropdownItem>
                                <DropdownItem
                                    className="text-danger"
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault()
                                        handleDelete(row.id)
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
    ]
    return (
        <Card>
            <div className="react-dataTable">
                <DataTable
                    responsive
                    className="react-dataTable"
                    columns={columns}
                    data={paymentData || []}
                    progressPending={isLoading}
                    progressComponent={<Spinner color="primary" />}
                    noDataComponent={<div style={{padding: '20px'}}> کاریر پرداختی ای ندارد</div>}
                />
            </div>
        </Card>
    )
}
