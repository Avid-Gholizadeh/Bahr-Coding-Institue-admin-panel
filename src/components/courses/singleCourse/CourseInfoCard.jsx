import {Check, PlusCircle, ShoppingCart, Users} from 'react-feather'
import {
    Badge,
    Button,
    Card,
    CardBody,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalHeader,
    Spinner,
    UncontrolledButtonDropdown,
} from 'reactstrap'
import {convertGrigorianDateToJalaali, pirceFormatter} from '../../../@core/utils/formatter.utils'
import CourseFallback from '../../../assets/images/courses-fallback.jpg'
import {useState} from 'react'
import {FormWizard} from '../formWizard/FormWizard'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {activeAndDeactive, changeCourseStatus, deleteCourse} from '@core/services/api/courses'
import toast from 'react-hot-toast'
import {useSweetDelAlert} from '@Components/common/useSweetDelAlert'

export function CourseInfoCard({course}) {
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [courseStatus, setCourseStatus] = useState(course.courseStatusName)

    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteCourse,
    })

    const {handleDeleteAlert} = useSweetDelAlert({
        actionFn: courseId => handleDeleteCourse(courseId),
        isSingleCourse: true,
    })

    function handleDeleteCourse(courseId) {
        return new Promise((resolve, reject) => {
            deleteMutate(
                {active: true, id: courseId},
                {
                    onSuccess: (data, variables) => {
                        console.log(variables)
                        return resolve(data)
                    },
                    onError: err => reject(err),
                }
            )
        })
    }

    const {mutate, isPending} = useMutation({
        mutationFn: activeAndDeactive,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['single-course', course.courseId])
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    const {mutate: statusMutate, isPending: statusPending} = useMutation({
        mutationFn: changeCourseStatus,
        onSuccess: (data, variables) => {
            if (data.success) {
                const status =
                    variables.StatusId === 1
                        ? 'شروع ثبت نام'
                        : variables.StatusId === 2
                        ? 'منقضی شده'
                        : 'درحال برگزاری'
                setCourseStatus(status)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    function colorSelector(status) {
        if (status === 'شروع ثبت نام') return 'success'
        else if (status === 'منقضی شده') return 'danger'
        else if (status === 'درحال برگزاری') return 'warning'
    }

    function handleActiveState() {
        mutate({active: !course.isActive, id: course.courseId})
    }

    const renderCourseImg = () => {
        return (
            <div className="rounded-3 overflow-hidden mb-2" style={{width: '90%', height: 200}}>
                <img
                    height="100%"
                    width="100%"
                    alt="course-image"
                    src={course.imageAddress || CourseFallback}
                    className="img-cover"
                />
                <PlusCircle />
            </div>
        )
    }

    function handleStatusSelect(id) {
        statusMutate({CourseId: course.courseId, StatusId: id})
    }

    return (
        <>
            <Card>
                <CardBody>
                    <div className="user-avatar-section">
                        <div className="d-flex align-items-center flex-column">
                            {renderCourseImg()}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h2 className="mb-1">{course.title}</h2>

                                    <UncontrolledButtonDropdown>
                                        <DropdownToggle
                                            color={'flat-' + colorSelector(courseStatus)}
                                            caret
                                            size="sm"
                                        >
                                            {statusPending && (
                                                <Spinner
                                                    className="me-1"
                                                    size="sm"
                                                    color={colorSelector(courseStatus)}
                                                />
                                            )}
                                            {courseStatus}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                onClick={() => handleStatusSelect(1)}
                                                className="w-100"
                                            >
                                                شروع ثبت نام
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => handleStatusSelect(3)}
                                                className="w-100"
                                            >
                                                در حال برگزاری
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => handleStatusSelect(2)}
                                                className="w-100"
                                            >
                                                منقضی شده
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-around my-2 pt-75">
                        <div className="d-flex align-items-start me-2">
                            <Badge color="light-primary" className="rounded p-75">
                                <Check className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{course.paymentDoneTotal}</h4>
                                <small>پرداخت</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-start me-2">
                            <Badge color="light-primary" className="rounded p-75">
                                <Users className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{course.courseUserTotal}</h4>
                                <small>دانشجو</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-start">
                            <Badge color="light-primary" className="rounded p-75">
                                <ShoppingCart className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{course.reserveUserTotal}</h4>
                                <small>رزرو</small>
                            </div>
                        </div>
                    </div>

                    <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>

                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75">
                                <span className="fw-bolder me-25">نام دوره:</span>
                                <span>{course.title}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">قیمت:</span>

                                <span className="fs-4 ">
                                    {pirceFormatter(course.cost)}
                                    <span
                                        className="position-relative text-info"
                                        style={{bottom: '-3px', right: '5px', fontSize: '13px'}}
                                    >
                                        تومان
                                    </span>
                                </span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">وضعیت:</span>
                                <Badge
                                    className="text-capitalize"
                                    color={course.isActive ? 'success' : 'danger'}
                                >
                                    {course.isActive ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">نام مدرس:</span>
                                <span className="text-capitalize">{course.teacherName}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">تاریخ شروع:</span>
                                <span>{convertGrigorianDateToJalaali(course.startTime)}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">تاریخ پایان:</span>
                                <span>{convertGrigorianDateToJalaali(course.endTime)}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> تکنولوژي:</span>
                                <span>{course.courseTeches.join(' - ')}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">نوع دوره:</span>
                                <span>{course.courseTypeName}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">سطح دوره:</span>
                                <span>{course.courseLevelName}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> توضیحات:</span>
                                <span>{course.describe}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> نام کلاس:</span>
                                <span>{course.courseClassRoomName}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> تعداد گروه:</span>
                                <span>{course.courseGroupTotal}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> تعداد نظرات:</span>
                                <span>{course.courseCommentTotal}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> تعداد لایک :</span>
                                <span>{course.courseLikeTotal}</span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25"> پراختی های تایید نشده:</span>
                                <span>{course.paymentNotDoneTotal}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                        <Button color="primary" onClick={() => setShow(true)}>
                            ویرایش
                        </Button>

                        <Button
                            className="ms-1"
                            color={course.isActive ? 'warning' : 'success'}
                            outline
                            onClick={handleActiveState}
                            disabled={isPending}
                        >
                            {course.isActive ? 'غیر فعال کردن' : 'فعال کردن'}
                            {isPending && (
                                <Spinner
                                    className="ms-1"
                                    size="sm"
                                    color={course.isActive ? 'warning' : 'success'}
                                />
                            )}
                        </Button>
                        <Button
                            className="ms-1"
                            color="danger"
                            onClick={() => handleDeleteAlert(course.courseId)}
                            disabled={isPending}
                        >
                            حذف
                            {isPending && <Spinner className="ms-1" size="sm" color="danger" />}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard
                        isEdit
                        courseData={course}
                        setShow={() => setShow(prevS => !prevS)}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
