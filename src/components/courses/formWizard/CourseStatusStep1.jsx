import {ArrowLeft, ArrowRight} from 'react-feather'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Label, Row, Spinner} from 'reactstrap'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {useQuery} from '@tanstack/react-query'
import {getCreateCourseStep1} from '@core/services/api/courses'
import {forwardRef, useEffect, useImperativeHandle, useMemo} from 'react'

export const CourseStatusStep1 = forwardRef(function CourseStatusStep1(
    {stepper, handleFromData, isEdit, courseData},
    ref
) {
    const {data: status, isLoading} = useQuery({
        queryKey: ['courseStatus'],
        queryFn: () => getCreateCourseStep1(),
    })

    useImperativeHandle(ref, () => ({
        handleProgrammaticSubmit,
    }))

    let courseType = renderArray(status?.courseTypeDtos, 'typeName')
    let courseLevel = renderArray(status?.courseLevelDtos, 'levelName')
    let courseClassRoom = renderArray(status?.classRoomDtos, 'classRoomName')
    let courseTeacher = renderArray(status?.teachers, 'fullName')
    let courseTerm = renderArray(status?.termDtos, 'termName')
    let courseTech = renderArray(status?.technologyDtos, 'techName')

    const defaultValues = useMemo(() => {
        return isEdit && status
            ? {
                  courseLevel: getDefaultValue(courseLevel, courseData.courseLevelName),
                  courseType: getDefaultValue(courseType, courseData.courseTypeName),
                  courseClassRoom: getDefaultValue(courseClassRoom, courseData.courseClassRoomName),
                  courseTeacher: getDefaultValue(courseTeacher, courseData.teacherName) || {
                      value: courseData.teacherId,
                      label: courseData.teacherName,
                  },
                  courseTerm: courseTerm[0],
                  courseTech: getDefaultValue(courseTech, courseData.courseTeches),
              }
            : null
    }, [status])

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({defaultValues})

    function renderArray(dataArray, identifier) {
        return dataArray?.map(item => ({value: item.id || item.teacherId, label: item[identifier]}))
    }

    function getDefaultValue(array, label) {
        if (typeof label === 'string') {
            return array.find(item => item.label === label)
        } else {
            return array.filter(tech => label.some(item => item === tech.label))
        }
    }

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
            handleFromData({
                CourseTypeId: defaultValues.courseType?.value,
                TremId: defaultValues.courseType?.value,
                ClassId: defaultValues.courseType?.value,
                CourseLvlId: defaultValues.courseLevel?.value,
                TeacherId: defaultValues.courseTeacher?.value,
                courseTech: defaultValues.courseTech?.map(tech => ({techId: tech.value})),
                TumbImageAddress: courseData?.imageAddress,
            })
        }
    }, [status])

    function stepperSubmit() {
        stepper.next()
    }

    const onSubmit = data => {
        const newData = {
            CourseTypeId: data.courseType.value,
            TremId: data.courseTerm.value,
            ClassId: data.courseClassRoom.value,
            CourseLvlId: data.courseLevel.value,
            TeacherId: data.courseTeacher.value,
            courseTech: data.courseTech.map(tech => ({techId: tech.value})),
            TumbImageAddress: courseData?.imageAddress,
        }
        handleFromData(newData)
        // console.log(newData)
    }

    async function handleProgrammaticSubmit() {
        let isValid = true
        await handleSubmit(onSubmit, () => {
            isValid = false
        })()

        return isValid
    }

    return (
        <>
            <div className="content-header">
                <h5 className="mb-0">جزعیات دوره</h5>
                <small className="text-muted">جزعیات دوره را انتخاب کنید</small>
            </div>
            <Form onSubmit={handleSubmit(stepperSubmit)}>
                {status && isEdit !== false && (
                    <>
                        <Row>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">سطح دوره</Label>
                                <Controller
                                    control={control}
                                    id="courseLevel"
                                    name="courseLevel"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseLevel.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">نوع دوره</Label>
                                <Controller
                                    control={control}
                                    id="courseType"
                                    name="courseType"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseType.message}
                                    </p>
                                )}
                            </Col>

                            <Col md="4" className="mb-1">
                                <Label className="form-label">نام کلاس</Label>
                                <Controller
                                    control={control}
                                    id="courseClassRoom"
                                    name="courseClassRoom"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseClassRoom.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">مدرس</Label>
                                <Controller
                                    control={control}
                                    id="courseTeacher"
                                    name="courseTeacher"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseTeacher.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">ترم</Label>
                                <Controller
                                    control={control}
                                    id="courseTerm"
                                    name="courseTerm"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseTerm.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">تکنولوژی</Label>
                                <Controller
                                    control={control}
                                    id="courseTech"
                                    name="courseTech"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
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
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.courseTech.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
                {(isLoading || isEdit === false) && (
                    <div className="text-center mt-5">
                        <Spinner color="primary" className="mx-auto" />
                    </div>
                )}
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
})
