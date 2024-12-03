import {acceptCoursePayment, getCoursesPayments} from '@core/services/api/payment'
import {useMutation, useQuery} from '@tanstack/react-query'
import moment from 'jalali-moment'
import React from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import {Badge, Button, Card, Spinner} from 'reactstrap'

export function CoursePaymentList({singleCourseId}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['course_allPayments'],
        queryFn: getCoursesPayments,
    })
    const coursePayment = data?.filter(payment => payment.courseId === singleCourseId)
    // console.log(coursePayment);

    const {
        mutate,
        isPending,
        isError: mutateError,
    } = useMutation({
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

    function handleAccept(paymentId) {
        const formData = new FormData()
        formData.append('PaymentId', paymentId)

        mutate(formData)
        console.log(paymentId)
    }

    const columns = [
        {
            name: 'مبلغ پرداختی',
            minWidth: '120px',
            cell: row => row.paid + 'تومان',
        },
        {
            name: 'باقی مانده',
            minWidth: '120px',
            cell: row => row.currentRemainder + 'تومان',
        },
        {
            name: ' تاریخ ثبت پرداخت',
            minWidth: '150px',
            cell: row => (
                <span className="text-capitalize">
                    {' '}
                    {moment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')}{' '}
                </span>
            ),
        },
        {
            name: ' وضعیت رزرو',
            minWidth: '100px',
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
                    <Button color="primary" className="w-100" onClick={() => handleAccept(row.id)}>
                        پذیرفتن
                    </Button>
                ) : (
                    <Button color="danger" disabled className="w-100">
                        رزرو تایید نشده
                    </Button>
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
                    data={coursePayment || []}
                    progressPending={isLoading}
                    progressComponent={<Spinner color="primary" size="md" />}
                    noDataComponent={<div style={{padding: '20px'}}> دوره پرداختی ای ندارد</div>}
                />
            </div>
        </Card>
    )
}
