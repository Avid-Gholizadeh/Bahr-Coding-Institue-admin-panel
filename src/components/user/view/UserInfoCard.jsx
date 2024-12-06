// ** React Imports
import {useState} from 'react'

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    Button,
    Badge,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {User, TrendingUp} from 'react-feather'
import failedImage from '@src/assets/images/portrait/small/avatar-s-11.jpg'

import 'flatpickr/dist/themes/material_green.css'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {deleteUser, updateUser} from '../../../@core/services/api/User'
import toast from 'react-hot-toast'
import EditUserModal from './EditUserModal'
import {roleColors, roleTranslations} from './config/roleConfig'
import {CreateAssistanceModal} from '@Components/courses/assistence/CreateAssistanceModal'

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({selectedUser, isCurrentUserAssistance}) => {
    const [showEdit, setShowEdit] = useState({currentAssistance: null, show: false})

    // console.log(selectedUser)

    const MySwal = withReactContent(Swal)
    const queryClient = useQueryClient()
    const renderRoles = () => {
        if (selectedUser.roles.length > 0) {
            return selectedUser.roles.map((role, index) => {
                const translatedRoleName = roleTranslations[role.roleName] || role.roleName
                const badgeColor = roleColors[role.roleName] || 'light-secondary'

                return (
                    <Badge key={index} color={badgeColor} className="m-1">
                        {translatedRoleName}
                    </Badge>
                )
            })
        }
        return 'هیچ نقشی ندارد'
    }

    // ** State
    const [show, setShow] = useState(false)
    // ** render user img
    const renderUserImg = () => {
        if (selectedUser.currentPictureAddress !== 'Not-set') {
            return (
                <img
                    height="200"
                    width="200"
                    alt="avatar"
                    src={selectedUser.currentPictureAddress}
                    className="img-fluid rounded mt-3 mb-2"
                />
            )
        } else {
            return (
                <img
                    alt=""
                    src={failedImage}
                    height="200"
                    width="200"
                    className="img-fluid rounded mt-3 mb-2"
                />
            )
        }
    }

    const {mutate: submitMutate} = useMutation({
        mutationFn: data => updateUser(data), // Ensure updateUser returns the response object
        onSuccess: response => {
            if (response.success) {
                toast.success(' عملیات انجام شد ')
                setShow(false)
                queryClient.invalidateQueries(['getDetailUser'])
            } else {
                toast.error(' عملیات موفقیت آمیز نبود ')
            }
        },
    })

    const handleDeleteUser = () => {
        MySwal.fire({
            title: 'آیا از حذف این کاربر مطمئن هستید؟',
            text: 'این عمل قابل بازگشت نیست!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف کن',
            cancelButtonText: 'لغو',
            customClass: {
                confirmButton: 'btn btn-danger custom-swal-button',
                cancelButton: 'btn btn-secondary custom-swal-button',
            },
        }).then(result => {
            if (result.isConfirmed) {
                // Trigger the delete mutation
                deleteUserMutate()
            }
        })
    }

    const {mutate: deleteUserMutate} = useMutation({
        mutationFn: () => deleteUser(selectedUser.id),
        onSuccess: response => {
            if (response.ok) {
                toast.success('حذف انجام شد')
            } else {
                toast.error(response.message)
            }
        },
    })

    function handleModalOpen(assistance) {
        setShowEdit({
            currentAssistance: assistance,
            show: true,
            isEdit: assistance?.courseId ? true : false,
        })
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="user-avatar-section">
                        <div className="d-flex align-items-center flex-column">
                            {renderUserImg()}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info gap">
                                    <h4>
                                        {selectedUser.fName !== null && selectedUser.lName !== null
                                            ? selectedUser.fName + ' ' + selectedUser.lName
                                            : ' نام و نام خوانوادگی ثبت نشده '}
                                    </h4>
                                    {renderRoles()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around my-2 pt-75">
                        <div className="d-flex align-items-start me-2">
                            <Badge color="light-primary" className="rounded p-75">
                                <User className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">
                                    {' '}
                                    {selectedUser.gender === true ? 'مرد' : 'زن'}{' '}
                                </h4>
                                <small> جنسیت </small>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <Badge color="light-primary" className="rounded p-75">
                                <TrendingUp className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">
                                    {' '}
                                    {selectedUser.profileCompletionPercentage
                                        ? selectedUser.profileCompletionPercentage
                                        : '0'}
                                    %{' '}
                                </h4>
                                <small> درصد تکمیل حساب </small>
                            </div>
                        </div>
                    </div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">مشخصات کاربر</h4>
                    <div className="info-container">
                        {selectedUser !== null ? (
                            <ul className="list-unstyled">
                                <li className="mb-75">
                                    <span className="fs-5 text fw-semibold">ایمیل :</span>
                                    <span>{selectedUser.gmail}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fs-5 text fw-semibold">شماره :</span>
                                    <span>{selectedUser.phoneNumber}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25"> وضعیت : </span>
                                    <Badge
                                        className="text-capitalize"
                                        color={
                                            selectedUser.active ? 'light-success' : 'light-danger'
                                        }
                                    >
                                        {selectedUser.active ? 'فعال' : 'غیر فعال'}
                                    </Badge>
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-around gap-1  pt-2">
                        <Button
                            color="primary"
                            onClick={() => {
                                setShow(true)
                            }}
                        >
                            ویرایش مشخصات
                        </Button>

                        <Button color="danger" onClick={() => handleDeleteUser(selectedUser)}>
                            حذف کاربر
                        </Button>

                        {isCurrentUserAssistance.length === 0 && (
                            <Button color="warning" onClick={handleModalOpen}>
                                تعیین دستیار
                            </Button>
                        )}

                        {isCurrentUserAssistance.length > 0 && (
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color={''} className="no-hover p-0">
                                    <Button color="warning">ویرایش دستیار</Button>
                                </DropdownToggle>
                                <DropdownMenu
                                    style={{
                                        maxHeight: 250,
                                        overflowY: 'auto',
                                        scrollbarWidth: 'thin',
                                    }}
                                >
                                    {isCurrentUserAssistance?.map(assistance => (
                                        <DropdownItem
                                            key={assistance.id}
                                            onClick={() => handleModalOpen(assistance)}
                                            className="w-100"
                                        >
                                            {assistance.courseName}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        )}
                    </div>
                </CardBody>
            </Card>
            {show && (
                <EditUserModal
                    isOpen={show}
                    toggle={() => setShow(false)}
                    onSubmit={submitMutate}
                    user={selectedUser}
                />
            )}

            <CreateAssistanceModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                singleUser={selectedUser}
            />
        </div>
    )
}

export default UserInfoCard
