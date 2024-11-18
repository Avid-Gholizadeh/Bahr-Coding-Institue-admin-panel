import Avatar from '@components/avatar'
import {Archive, FileText, MoreVertical, Trash2} from 'react-feather'
import {Link} from 'react-router-dom'
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import {convertGrigorianDateToJalaali, pirceFormatter} from '../../@core/utils/formatter.utils'
import {useMutation} from '@tanstack/react-query'
import {deleteCourse} from '@core/services/api/courses'
import {useSweetDelAlert} from '@Components/common/useSweetDelAlert'
import CourseFallback from '../../assets/images/courses-fallback.jpg'

export function useTableColumns({setShowEdit, selectable}) {
    const {mutate: deleteMutate, isPending} = useMutation({
        mutationFn: deleteCourse,
    })

    const {handleDeleteAlert} = useSweetDelAlert({
        actionFn: courseId => handleDeleteCourse(courseId),
    })

    function handleDeleteCourse(courseId) {
        return new Promise((resolve, reject) => {
            deleteMutate(
                {active: true, id: courseId},
                {
                    onSuccess: data => {
                        return resolve(data)
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
                img={row.tumbImageAddress || CourseFallback}
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

    function handleCourseEdit(course) {
        setShowEdit(prevS => ({currentCourseId: course.courseId, show: !prevS.show}))
    }

    return [
        {
            name: 'دوره',
            sortable: true,
            minWidth: '230px',
            sortField: 'title',
            selector: row => row.title,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderCourseAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/courses/${row.courseId}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder">{row.title}</span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">{row.levelName}</small>
                    </div>
                </div>
            ),
        },
        {
            name: 'نوع کلاس',
            sortable: true,
            minWidth: '172px',
            sortField: 'typeName',
            selector: row => row.typeName,
            cell: row => <span className="">{row.typeName}</span>,
        },
        {
            name: 'قیمت',
            sortable: true,
            omit: selectable,
            minWidth: '172px',
            sortField: 'cost',
            selector: row => row.cost,
            cell: row => (
                <span className="fs-5">
                    {pirceFormatter(row.cost)}{' '}
                    <span
                        className=" position-relative text-info "
                        style={{bottom: '-3px', fontSize: '13px'}}
                    >
                        تومان
                    </span>
                </span>
            ),
        },
        {
            name: 'وضعیت',
            minWidth: '138px',
            sortable: true,
            sortField: 'statusName',
            selector: row => row.statusName,
            cell: row => (
                <Badge className="text-capitalize" color={colorSelector(row.statusName)} pill>
                    {row.statusName}
                </Badge>
            ),
        },
        {
            name: 'اخرین بروزرسانی',
            minWidth: '150px',
            sortable: true,
            sortField: 'lastUpdate',
            selector: row => row.lastUpdate,
            cell: row => <span className="">{convertGrigorianDateToJalaali(row.lastUpdate)}</span>,
        },
        {
            name: 'سایر',
            minWidth: '100px',
            omit: selectable,
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

                            <DropdownItem className="w-100" onClick={() => handleCourseEdit(row)}>
                                <Archive size={14} className="me-50" />
                                <span className="align-middle">ویرایش</span>
                            </DropdownItem>

                            <DropdownItem
                                className="w-100"
                                onClick={() => handleDeleteAlert(row.courseId)}
                            >
                                <Trash2 size={14} className="me-50" />
                                <span className="align-middle">حذف </span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            ),
        },
    ]
}
