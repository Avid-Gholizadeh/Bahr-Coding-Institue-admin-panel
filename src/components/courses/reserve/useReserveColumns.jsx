import Avatar from '@components/avatar'
import {Archive, CheckCircle, FileText, MoreVertical, Trash2, XCircle} from 'react-feather'
import {Link} from 'react-router-dom'
import {
    Badge,
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'
import {
    convertGrigorianDateToJalaali,
    isValidUrl,
    pirceFormatter,
} from '../../../@core/utils/formatter.utils'
import CourseFallback from '../../../assets/images/courses-fallback.jpg'
import userImageFallback from '@src/assets/images/portrait/small/avatar-s-11.jpg'

import {useSweetDelAlert} from '@Components/common/useSweetDelAlert'
import {deleteCourseReserve} from '@core/services/api/courses'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export function useReserveColumns({handleModalOpen, singleCourseId}) {
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

    const renderCourseAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={row.tumbImageAddress || row.imageAddress || CourseFallback}
                width="32"
                height="32"
            />
        )
    }

    const renderUserAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={userImageFallback}
                width="32"
                height="32"
            />
        )
    }

    function colorSelector(status) {
        if (status === 'شروع ثبت نام') return 'light-success'
        else if (status === 'منقضی شده') return 'light-danger'
        else if (status === 'درحال برگزاری') return 'light-warning'
    }

    return [
        {
            omit: singleCourseId,
            name: 'دوره',
            sortable: false,
            minWidth: '230px',
            sortField: 'courseName',
            selector: row => row.courseName,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderCourseAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/courses/${row.courseId}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder">{row.courseName}</span>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            name: 'دانشجو',
            sortable: false,
            minWidth: '220px',
            sortField: 'studentName',
            selector: row => row.studentName,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderUserAvatar()}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/user/view/${row.studentId}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder fs-5">{row.studentName}</span>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            name: <span className="text-success">تاریخ رزرو</span>,
            minWidth: '100px',
            sortable: true,
            sortField: 'reserverDate',
            selector: row => row.reserverDate,
            cell: row => (
                <span className="">{convertGrigorianDateToJalaali(row.reserverDate)}</span>
            ),
        },
        {
            name: <span className="text-success">وضعیت </span>,
            minWidth: '100px',
            sortable: true,
            sortField: 'accept',
            selector: row => row.accept,
            cell: row => (
                <>
                    {!singleCourseId && (
                        <Badge
                            className="text-capitalize"
                            color={row.accept ? 'light-success' : 'light-warning'}
                            pill
                        >
                            <span>{row.accept ? 'تایید شده' : 'در انتظار تایید'}</span>
                        </Badge>
                    )}
                    {singleCourseId && (
                        <>
                            {row.accept && (
                                <Badge
                                    className="text-capitalize"
                                    color={row.accept ? 'light-success' : 'light-warning'}
                                    pill
                                >
                                    <span>تایید شده</span>
                                </Badge>
                            )}
                            {!row.accept && (
                                <div className="d-flex">
                                    <Button.Ripple
                                        className="btn-icon"
                                        color="flat-info"
                                        onClick={() => handleModalOpen(row)}
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
                            )}
                        </>
                    )}
                </>
            ),
        },
        {
            omit: singleCourseId,
            name: 'سایر',
            minWidth: '100px',
            cell: row => (
                <div className="column-action ">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                tag={Link}
                                className="w-100"
                                to={`/courses/${row.courseId}`}
                            >
                                <FileText size={14} className="me-50" />
                                <span className="align-middle">جزئیات</span>
                            </DropdownItem>
                            {!row.accept && (
                                <>
                                    <DropdownItem
                                        className="w-100"
                                        onClick={() => handleModalOpen(row)}
                                    >
                                        <Archive size={14} className="me-50" />
                                        <span className="align-middle">تایید</span>
                                    </DropdownItem>

                                    <DropdownItem
                                        className="w-100"
                                        onClick={() => handleDeleteAlert(row.reserveId)}
                                    >
                                        <Trash2 size={14} className="me-50" />
                                        <span className="align-middle">حذف </span>
                                    </DropdownItem>
                                </>
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            ),
        },
    ]
}
