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
    Edit3,
    Briefcase,
} from 'react-feather'

// ** Reactstrap Imports
import {Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap'

// Jalalli
import jMoment from 'jalali-moment'

import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import {deleteUser} from '../../../@core/services/api/User'
import toast from 'react-hot-toast'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {createPortal} from 'react-dom'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function useUserColumns({selectable}) {
    const useDeleteUser = () => {
        return useMutation({
            mutationFn: userId => deleteUser(userId),
            onSuccess: response => {
                if (response.ok) {
                    toast.success('حذف انجام شد')
                } else {
                    toast.error(response.message)
                }
            },
        })
    }

    const renderClient = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={
                    row.pictureAddress &&
                    row.pictureAddress !== 'Not-set' &&
                    row.pictureAddress !== 'C:\\fakepath\\Wall.jpg'
                        ? row.pictureAddress
                        : defaultAvatar
                }
                initials={!row.pictureAddress || row.pictureAddress === 'Not-set'}
                color="light-primary"
                content={row.fname || 'John Doe'}
                width="32"
                height="32"
            />
        )
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
        TournamentMentor: 'منتور',
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
            return <span className="text-muted">بدون نقش</span>
        }

        const roles = row.userRoles.split(',')

        // Map over each role to translate and render with icons
        const renderedRoles = roles.slice(0, 2).map(role => {
            const trimmedRole = role.trim() // Remove any extra spaces
            const Icon = roleObj[trimmedRole]?.icon || Edit
            const roleClass = roleObj[trimmedRole]?.class || ''
            const roleName = roleTranslations[trimmedRole] || trimmedRole // Translate role to Farsi if available

            return (
                <span key={trimmedRole} className="text-tuncate">
                    <Icon size={18} className={`${roleClass} me-50`} />
                    {roleName}
                </span>
            )
        })

        return <div className="d-flex flex-wrap">{renderedRoles}</div>
    }

    const statusObj = {
        active: 'light-success',
        inactive: 'light-warning',
    }


    return [
        {
            name: 'نام کاربری',
            width: '300px',
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
            cell: row => renderRole(row),
        },
        {
            omit: selectable,
            name: 'تاریخ عضویت',
            width: '180px',
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
            cell: row => {
                const isActive = row.active === 'True' // Convert string to boolean
                return (
                    <Badge
                        className="text-capitalize"
                        color={statusObj[isActive ? 'active' : 'inactive']}
                        pill
                    >
                        {isActive ? 'فعال' : 'غیرفعال'}
                    </Badge>
                )
            },
        },
        {
            omit: selectable,
            name: 'عملیات',
            width: '120px',
            cell: row => {
                const {mutate: deleteUser} = useDeleteUser()
                const [centeredModal, setCenteredModal] = useState(false)

                return (
                    <div className="" style={{zIndex: 'auto'}}>
                        <UncontrolledDropdown>
                            <DropdownToggle tag="div" className="btn btn-sm">
                                <MoreVertical size={14} className="cursor-pointer" />
                            </DropdownToggle>
                            <PortalDropdownMenu>
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
                                            toggle={() => setCenteredModal(false)}
                                            className="modal-dialog-centered"
                                        >
                                            <ModalHeader toggle={() => setCenteredModal(false)}>
                                            تایید حذف کاربر
                                            </ModalHeader>
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
                            </PortalDropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                )
            },
        },
        {
            name: 'جنیست',
            width: '120px',
            cell: row => <span className="text-capitalize">{row.gender ? 'مرد' : 'زن'}</span>,
        },
    ]
}
