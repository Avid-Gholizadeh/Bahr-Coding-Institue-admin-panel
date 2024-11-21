// ** React Imports
import {Link, useNavigate} from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import {
    Slack,
    User,
    MoreVertical,
    FileText,
    Trash2,
    Edit,
    Feather,
    Edit3,
    Briefcase,
} from 'react-feather'

// ** Reactstrap Imports
import {Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap'

// Jalalli
import jMoment from 'jalali-moment'

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import {DeleteUser} from '../../../@core/services/api/User'
import toast from 'react-hot-toast'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'

export function useUserColumns({selectable}) {
    const useDeleteUser = () => {
        return useMutation({
            mutationFn: userId => DeleteUser(userId),
            onSuccess: response => {
                if (response.ok) {
                    toast.success('حذف انجام شد')
                } else {
                    toast.error('خطا در حذف کاربر')
                }
            },
        })
    }

    const renderClient = row => {
        if (row.pictureAddress) {
            return (
                <Avatar
                    className="me-1"
                    img={row.pictureAddress !== 'Not-set' && row.pictureAddress}
                    width="32"
                    height="32"
                />
            )
        } else {
            return (
                <Avatar
                    initials
                    className="me-1"
                    color={row.pictureAddress || 'light-primary'}
                    content={row.fname || 'John Doe'}
                />
            )
        }
    }
    const roleTranslations = {
        Student: 'دانشجو',
        Administrator: 'ادمین',
        Teacher: 'استاد',
        Writer: 'نویسنده',
        Referee: 'داور',
        'Employee.Admin': 'ادمین کارمند',
        TournamentAdmin: 'ادمین مسابقه',
        CourseAssistance: 'کمک دوره',
        'Employee.Writer': 'نویسنده کارمند',
        TournamentMentor: 'منتور مسابقه',
    }

    // ** Renders Role Columns
    const renderRole = row => {
        const roleObj = {
            Student: {
                class: 'text-primary',
                icon: User,
            },
            Administrator: {
                class: 'text-danger',
                icon: Slack,
            },
            Teacher: {
                class: 'text-success',
                icon: Edit3,
            },
            Referee: {
                class: 'text-info',
                icon: Briefcase,
            },
        }
        // Split roles into an array based on the delimiter (e.g., ",")
        // Check if userRoles is null, undefined, or an empty string
        if (!row.userRoles) {
            return <span className="text-muted">نقش نامشخص</span>
        }

        const roles = row.userRoles.split(',')

        // Map over each role to translate and render with icons
        const renderedRoles = roles.slice(0, 2).map(role => {
            const trimmedRole = role.trim() // Remove any extra spaces
            const Icon = roleObj[trimmedRole]?.icon || Edit
            const roleClass = roleObj[trimmedRole]?.class || ''
            const roleName = roleTranslations[trimmedRole] || trimmedRole // Translate role to Farsi if available

            return (
                <span key={trimmedRole}>
                    <Icon size={18} className={`${roleClass} me-50`} />
                    {roleName}
                </span>
            )
        })

        // Return the mapped roles wrapped in a container
        return <div className="d-flex flex-wrap">{renderedRoles}</div>
    }

    const statusObj = {
        pending: 'light-warning',
        active: 'light-success',
        inactive: 'light-secondary',
    }

    return [
        {
            name: 'نام کاربری',
            sortable: true,
            width: '300px',
            sortField: 'fullName',
            // selector: row => row.fname,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center">
                    {renderClient(row)}
                    <div className="d-flex flex-column">
                        <Link
                            to={`/user/view/${row.id}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder">
                                {' '}
                                {row.fname ? row.fname : 'نامشخص'} {row.lname}{' '}
                            </span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">{row.gmail}</small>
                    </div>
                </div>
            ),
        },
        {
            name: 'نقش',
            width: '250px',

            sortable: true,
            sortField: 'role',
            // selector: row => row.userRoles,
            cell: row => renderRole(row),
        },
        {
            omit: selectable,
            name: 'تاریخ عضویت',
            width: '180px',
            sortable: true,
            sortField: 'insertDate',
            // selector: row => row.insertDate,
            cell: row => (
                <span className="text-capitalize">
                    {' '}
                    {jMoment(row.insertDate).locale('fa').format('jD jMMMM jYYYY')}{' '}
                </span>
            ),
        },
        {
            name: 'وضعیت',
            width: selectable ? '230px' : '120px',
            sortable: true,
            sortField: 'status',
            // selector: row => row.active,
            cell: row => (
                <Badge
                    className="text-capitalize"
                    color={statusObj[row.active ? 'active' : 'pending']}
                    pill
                >
                    {row.active ? 'فعال' : 'حذف شده'}
                </Badge>
            ),
        },
        {
            omit: selectable,
            name: ' عملیات',
            width: '120px',
            cell: row => {
                const {mutate: deleteUser} = useDeleteUser()
                const [centeredModal, setCenteredModal] = useState(false)

                return (
                    <div style={{zIndex: 'auto'}}>
                        <UncontrolledDropdown>
                            <DropdownToggle tag="div" className="btn btn-sm">
                                <MoreVertical size={14} className="cursor-pointer" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    tag={Link}
                                    className="w-100"
                                    to={`/user/view/${row.id}`}
                                >
                                    <FileText size={14} className="me-50" />
                                    <span className="align-middle"> مشخصات کاربر </span>
                                </DropdownItem>
                                <DropdownItem
                                    tag="a"
                                    className="w-100"
                                    onClick={() => setCenteredModal(!centeredModal)}
                                >
                                    <Modal
                                        isOpen={centeredModal}
                                        toggle={() => setCenteredModal(!centeredModal)}
                                        className="modal-dialog-centered"
                                    >
                                        <ModalBody>
                                            از حذف کاربر به شناسه {row.id} مطمئنید؟
                                        </ModalBody>
                                        <ModalFooter className="m-auto">
                                            <Button
                                                color="primary"
                                                onClick={() => deleteUser(row.id)}
                                            >
                                                بله
                                            </Button>
                                            <Button
                                                color="secondary"
                                                onClick={() => setCenteredModal(false)}
                                            >
                                                خیر
                                            </Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Trash2 size={14} className="me-50 text-danger" />
                                    <span className="align-middle text-danger"> حذف </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                )
            },
        },
        {
            name: 'جنیست',
            width: '120px',
            sortable: true,
            sortField: 'billing',
            // selector: row => row.gender,
            cell: row => <span className="text-capitalize">{row.gender ? 'مرد' : 'زن'}</span>,
        },
    ]
}
