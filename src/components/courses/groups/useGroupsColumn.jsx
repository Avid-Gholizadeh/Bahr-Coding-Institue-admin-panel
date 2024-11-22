import Avatar from '@components/avatar'
import {Archive, FileText, MoreVertical, Trash2} from 'react-feather'
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import CourseFallback from '../../../assets/images/courses-fallback.jpg'
import {Link} from 'react-router-dom'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteCourseGroup} from '@core/services/api/courses'
import {useSweetDelAlert} from '@Components/common/useSweetDelAlert'

export function useGroupsColumn({setCurrentCourse, params, course, handleSetSingleGroupModal}) {
    const queryClient = useQueryClient()
    const {mutate: deleteMutate, isPending} = useMutation({
        mutationFn: deleteCourseGroup,
    })

    const {handleDeleteAlert} = useSweetDelAlert({
        actionFn: groupId => handleDeleteCourseGroup(groupId),
    })

    function handleDeleteCourseGroup(groupId) {
        return new Promise((resolve, reject) => {
            deleteMutate(
                {Id: groupId},
                {
                    onSuccess: data => {
                        if (data.success) {
                            if (course) {
                                queryClient.setQueryData(
                                    ['single-course-groupe', course.courseId],
                                    oldGroups =>
                                        oldGroups.filter(group => group.groupId !== groupId)
                                )
                            } else {
                                queryClient.setQueryData(['all-groups', params], oldGroups => {
                                    const newGroups = oldGroups.courseGroupDtos.filter(
                                        group => group.groupId !== groupId
                                    )
                                    return {
                                        courseGroupDtos: newGroups,
                                        totalCount: oldGroups.totalCount - 1,
                                    }
                                })
                            }

                            return resolve(data)
                        }
                        return reject()
                    },
                    onError: err => {
                        return reject(err)
                    },
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

    return [
        {
            omit: Boolean(course),
            name: 'دوره',
            sortable: true,
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
            name: 'نام گروه',
            sortable: false,
            minWidth: '172px',
            sortField: 'groupName',
            selector: row => row.groupName,
            // cell: row => <span className="fs-5">{row.groupName}</span>,
            cell: row => (
                <span
                    className="user_name text-truncate text-body cursor-pointer"
                    onClick={() => handleSetSingleGroupModal(row)}
                >
                    <span className="fw-bolder fs-5 groupName-hover" style={{}}>
                        {row.groupName}
                    </span>
                </span>
            ),
        },
        {
            omit: Boolean(course),
            name: 'مدرس',
            sortable: false,
            minWidth: '172px',
            sortField: 'teacherName',
            selector: row => row.teacherName,
            cell: row => <span className="fs-5">{row.teacherName}</span>,
        },
        {
            name: 'ظرفیت گروه',
            minWidth: '138px',
            sortable: false,
            sortField: 'groupCapacity',
            selector: row => row.groupCapacity,
            cell: row => <span className=" text-center w-25">{row.groupCapacity}</span>,
        },
        {
            omit: Boolean(course),
            name: 'ظرفیت دوره',
            minWidth: '150px',
            sortable: false,
            sortField: 'courseCapacity',
            selector: row => row.courseCapacity,
            cell: row => <div className="text-center w-50">{row.courseCapacity}</div>,
        },
        {
            name: 'سایر',
            minWidth: '200px',
            cell: row => (
                <div className="column-action ">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu>
                            {!course && (
                                <DropdownItem
                                    tag={Link}
                                    className="w-100"
                                    to={`/courses/${row.courseId}`}
                                >
                                    <FileText size={14} className="me-50" />
                                    <span className="align-middle">جزئیات</span>
                                </DropdownItem>
                            )}

                            <DropdownItem className="w-100" onClick={() => setCurrentCourse(row)}>
                                <Archive size={14} className="me-50" />
                                <span className="align-middle">ویرایش</span>
                            </DropdownItem>

                            <DropdownItem
                                className="w-100"
                                onClick={() => handleDeleteAlert(row.groupId)}
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
