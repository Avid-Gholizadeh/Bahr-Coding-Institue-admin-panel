import {
    acceptCoursePayment,
    deleteCoursePayment,
    getCoursesPayments,
} from '@core/services/api/payment'
import {useMutation, useQuery} from '@tanstack/react-query'
import moment from 'jalali-moment'
import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
import {createPortal} from 'react-dom'
import {Check, MoreVertical, Trash} from 'react-feather'
import toast from 'react-hot-toast'
import {CustomPagination} from '@Components/common/CustomPagination'
import {CustomHeader} from '@Components/courses/reserve/CustomHeader'
import {
    Badge,
    Button,
    Card,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    UncontrolledDropdown,
} from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'

export function CoursePaymentList({singleCourseId}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
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
    let filteredPayments = coursePayment ? [...coursePayment] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredPayments = coursePayment.filter(
            item =>
                item.studentName?.includes(searchTerm) ||
                item.groupName?.includes(searchTerm) ||
                item.title?.includes(searchTerm)
        )
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }

    function dataToRender() {
        if (coursePayment) {
            const allData = [...filteredPayments]
            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }

    function handleSearch(val) {
        setSearchTerm(val)
        setCurrentPage(1)
    }

    function Pagination() {
        return (
            <>
                <CustomPagination
                    totalItem={filteredPayments.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                />
            </>
        )
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
            name: '  دانشجو',
            minWidth: '130px',
            cell: row => <span className="d-inline-block text-truncate"> {row.studentName} </span>,
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
            name: 'نام گروه',
            minWidth: '100px',
            cell: row => row.groupName,
        },
        {
            minWidth: '150px',
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
                    progressComponent={<Spinner color="primary" size="sm" />}
                    noDataComponent={<div style={{padding: '20px'}}>پرداختی ای موجود نیست</div>}
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
        </Card>
    )
}
