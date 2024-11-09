import {Check, PlusCircle, ShoppingCart, Users} from 'react-feather'
import {Badge, Button, Card, CardBody, Modal} from 'reactstrap'
import {convertGrigorianDateToJalaali, pirceFormatter} from '../../../@core/utils/formatter.utils'
import CourseFallback from '../../../assets/images/courses-fallback.jpg'
import {useState} from 'react'

export function CourseInfoCard({course}) {
    const [show, setShow] = useState(false)

    function colorSelector(status) {
        if (status === 'شروع ثبت نام') return 'light-success'
        else if (status === 'منقضی شده') return 'light-danger'
        else if (status === 'درحال برگزاری') return 'light-warning'
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

                                    <Badge
                                        color={colorSelector(course.courseStatusName)}
                                        className="text-capitalize"
                                    >
                                        {course.courseStatusName}
                                    </Badge>
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
                                {/* <span>{pirceFormatter(course.cost)}</span> */}
                                <span className="fs-4 ">
                                    {pirceFormatter(course.cost)}
                                    <span
                                        className=" position-relative text-info "
                                        style={{bottom: '-3px', fontSize: '13px'}}
                                    >
                                        تومان
                                    </span>
                                </span>
                            </li>
                            <li className="mb-75">
                                <span className="fw-bolder me-25">وضعیت:</span>
                                <Badge
                                    className="text-capitalize"
                                    color={course.isActive ? 'info' : 'danger'}
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
                        <Button color="primary" /* onClick={() => setShow(true)} */>ویرایش</Button>
                        <Button
                            className="ms-1"
                            color="danger"
                            outline
                            // onClick={handleSuspendedClick}
                        >
                            فعال کردن
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
