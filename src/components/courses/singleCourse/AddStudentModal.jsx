import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import UsersListTable from '@Components/user/list/Table'
import {useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Button, Card, Col, Label, Modal, ModalBody, ModalHeader, Row, Spinner} from 'reactstrap'
import {acceptReserve, getSingleCourseGroup} from '@core/services/api/courses'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import toast from 'react-hot-toast'

export function AddStudentModal({handleToggleModal, show, course, singleGroup}) {
    const queryClient = useQueryClient()
    const selectedGroup = useRef(null)
    const {skin} = useSelector(state => state.layout)
    const [selectedUser, setSelectedUser] = useState(null)

    const {mutate, isPending} = useMutation({
        mutationFn: acceptReserve,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['course-users'])
                toast.success('کاربر با موفقیت به دوره اضافه شد')
                handleCloseModal()
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    const {
        data: currentCourseGroups,
        isLoading: groupsLoading,
        error: singleCourseGroupError,
    } = useQuery({
        enabled: Boolean(course),
        queryKey: ['single-course-groupe', course?.courseId],
        queryFn: () =>
            getSingleCourseGroup({
                TeacherId: course.teacherId,
                CourseId: course.courseId,
            }),
    })

    if (singleCourseGroupError) {
        const data = JSON.parse(singleCourseGroupError.message).data
        toast.error(data.ErrorMessage.join(' - '))
    }

    const singleCourseGroups = currentCourseGroups?.map(group => ({
        value: group.groupId,
        label: (
            <div className="d-flex justify-content-between">
                <span>{group.groupName}</span>
                <span>ظرفیت : {group.groupCapacity}</span>
            </div>
        ),
    }))

    function handleCloseModal() {
        setSelectedUser(null)
        selectedGroup.current = null
        handleToggleModal()
    }

    function handleAddStudent() {
        if (!selectedGroup.current && !singleGroup) {
            toast.error('لطفا یک گروه را انتخاب کنید')
            return
        }
        if (!selectedUser) {
            toast.error('لطفا ابتدا یک کاربر را از لیست زیر انتخاب کنید')
            return
        }

        mutate({
            courseId: singleGroup ? singleGroup.courseId : course.courseId,
            courseGroupId: singleGroup ? singleGroup.groupId : selectedGroup.current,
            studentId: selectedUser.id,
        })
    }

    return (
        <>
            <Modal
                isOpen={show}
                toggle={handleCloseModal}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={handleCloseModal}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50">
                    <Card
                        className="p-2"
                        style={{backgroundColor: skin === 'dark' ? 'auto' : '#ddd'}}
                    >
                        <Row className="align-items-center flex-column gap-4 gap-lg-0 justify-content-center flex-lg-row ">
                            {!singleGroup && (
                                <Col className="d-flex gap-3 align-items-baseline">
                                    {currentCourseGroups && (
                                        <Select
                                            theme={selectThemeColors}
                                            className="react-select w-100"
                                            classNamePrefix="select"
                                            placeholder="گروه را‌ انتخاب کنید"
                                            options={singleCourseGroups}
                                            noOptionsMessage={() => 'گروهی یافت نشد'}
                                            onChange={option =>
                                                (selectedGroup.current = option.value)
                                            }
                                            isClearable={false}
                                        />
                                    )}
                                    {groupsLoading && (
                                        <div className="text-center mt-5">
                                            <Spinner color="primary" className="mx-auto" />
                                        </div>
                                    )}
                                </Col>
                            )}
                            <Col
                                className={`d-flex align-items-center gap-2 ${
                                    singleGroup
                                        ? 'justify-content-lg-center'
                                        : 'justify-content-lg-end'
                                }`}
                            >
                                <Button
                                    onClick={handleAddStudent}
                                    color="primary"
                                    className="btn-prev px-3"
                                    disabled={isPending}
                                >
                                    تایید
                                    {isPending && (
                                        <Spinner className="ms-1" size="sm" color="light" />
                                    )}
                                </Button>
                                <Button
                                    color="danger"
                                    className="btn-next px-3"
                                    onClick={handleCloseModal}
                                >
                                    لغو
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                    <Label className="mb-1 fs-5">یک کاربر را انتخاب کنید :</Label>
                    <UsersListTable selectable onSelect={user => setSelectedUser(user)} />
                </ModalBody>
            </Modal>
        </>
    )
}
