import {yupResolver} from '@hookform/resolvers/yup'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Label, Row} from 'reactstrap'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {useQuery} from '@tanstack/react-query'
import {getCreateCourseStep1} from '@core/services/api/courses'

export function CourseStatusStep1({stepper}) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({})

    const {data: status, isLoading} = useQuery({
        queryKey: ['courseStatus'],
        queryFn: () => getCreateCourseStep1(),
    })

    function renderArray(dataArray, identifier) {
        return dataArray?.map(item => ({value: item.id || item.teacherId, label: item[identifier]}))
    }

    let courseType = renderArray(status?.courseTypeDtos, 'typeName')
    let courseLevel = renderArray(status?.courseLevelDtos, 'levelName')
    let courseStatus = renderArray(status?.statusDtos, 'statusName')
    let courseClassRoom = renderArray(status?.classRoomDtos, 'classRoomName')
    let courseTeacher = renderArray(status?.teachers, 'fullName')
    let courseTerm = renderArray(status?.termDtos, 'termName')
    let courseTech = renderArray(status?.technologyDtos, 'techName')

    const colourOptions = [
        {value: 'ocean', label: 'Ocean'},
        {value: 'blue', label: 'Blue'},
        {value: 'purple', label: 'Purple'},
        {value: 'red', label: 'Red'},
        {value: 'orange', label: 'Orange'},
    ]

    const onSubmit = data => {
        /* if (isObjEmpty(errors)) {
          stepper.next()
        } */
        stepper.next()
        // sconsole.log(data)
    }

    return (
        <>
            <div className="content-header">
                <h5 className="mb-0">جزعیات دوره</h5>
                <small className="text-muted">جزعیات دوره را انتخاب کنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">سطح دوره</Label>
                        <Controller
                            control={control}
                            id="courseLevel"
                            name="courseLevel"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseLevel}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseLevel && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseLevel.message}
                            </p>
                        )}
                    </Col>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">نوع دوره</Label>
                        <Controller
                            control={control}
                            id="courseType"
                            name="courseType"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseType}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseType && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseType.message}
                            </p>
                        )}
                    </Col>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">وضعیت</Label>
                        <Controller
                            control={control}
                            id="courseStatus"
                            name="courseStatus"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseStatus}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseStatus && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseStatus.message}
                            </p>
                        )}
                    </Col>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">نام کلاس</Label>
                        <Controller
                            control={control}
                            id="courseClassRoom"
                            name="courseClassRoom"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseClassRoom}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseClassRoom && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseClassRoom.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">مدرس</Label>
                        <Controller
                            control={control}
                            id="courseTeacher"
                            name="courseTeacher"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseTeacher}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseTeacher && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseTeacher.message}
                            </p>
                        )}
                    </Col>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">ترم</Label>
                        <Controller
                            control={control}
                            id="courseTerm"
                            name="courseTerm"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    options={courseTerm}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseTerm && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseTerm.message}
                            </p>
                        )}
                    </Col>
                    <Col md="3" className="mb-1">
                        <Label className="form-label">تکنولوژی</Label>
                        <Controller
                            control={control}
                            id="courseTech"
                            name="courseTech"
                            // rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="انتخاب کنید"
                                    isMulti
                                    options={courseTech}
                                    isClearable={false}
                                />
                            )}
                        />
                        {errors.courseTech && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.courseTech.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <Button color="secondary" className="btn-prev" outline disabled>
                        <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
                        <span className="align-middle d-sm-inline-block d-none">Previous</span>
                    </Button>
                    <Button type="submit" color="primary" className="btn-next">
                        <span className="align-middle d-sm-inline-block d-none">Next</span>
                        <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
                    </Button>
                </div>
            </Form>
        </>
    )
}
