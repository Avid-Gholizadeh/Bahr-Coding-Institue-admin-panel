import {ArrowLeft, ArrowRight} from 'react-feather'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Input, Label, Row} from 'reactstrap'
import Cleave from 'cleave.js/react'
import {
    convertGrigorianDateToJalaali3,
    convertPersianDateToGerigorian2,
} from '@core/utils/formatter.utils'
import {forwardRef, useEffect, useImperativeHandle, useMemo} from 'react'

export const CourseLinksStep3 = forwardRef(function CourseLinksStep3(
    {stepper, handleFromData, isEdit, courseData},
    ref
) {
    useImperativeHandle(ref, () => ({
        handleProgrammaticSubmit,
    }))

    const options = {date: true, delimiter: '-', datePattern: ['Y', 'm', 'd']}

    const defaultValues = isEdit
        ? {
              GoogleTitle: 'fdsgewhgs',
              GoogleSchema: 'fsdghrehse',
              UniqeUrlString: 'sg' + (Math.random() * 100000).toFixed(0) + 'jf',
              ShortLink: 'fsdfsdlkjlk',
              StartTime: convertGrigorianDateToJalaali3(courseData.startTime),
              EndTime: convertGrigorianDateToJalaali3(courseData.endTime),
              SessionNumber: 12,
          }
        : null

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({defaultValues})

    useEffect(() => {
        if (isEdit) {
            const data = {...defaultValues}
            data.StartTime = convertPersianDateToGerigorian2(data.StartTime)
            data.EndTime = convertPersianDateToGerigorian2(data.EndTime)
            handleFromData(data)
        }
    }, [])

    function stepperSubmit() {
        stepper.next()
    }

    const onSubmit = data => {
        data.StartTime = convertPersianDateToGerigorian2(data.StartTime)
        data.EndTime = convertPersianDateToGerigorian2(data.EndTime)
        handleFromData(data)
        // console.log(data)
    }

    async function handleProgrammaticSubmit() {
        let isValid = true
        await handleSubmit(onSubmit, error => {
            isValid = false
        })()

        return isValid
    }

    return (
        <>
            <div className="content-header">
                <h5 className="mb-0">لینک ها و تاریخ</h5>
                <small className="text-muted">لینک ها و تاریخ را وارد کنید</small>
            </div>
            <Form onSubmit={handleSubmit(stepperSubmit)}>
                <Row>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="GoogleTitle">
                            عنوان گوگل
                        </Label>
                        <Controller
                            id="GoogleTitle"
                            name="GoogleTitle"
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.GoogleTitle && true}
                                />
                            )}
                        />
                        {errors.GoogleTitle && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.GoogleTitle.message}
                            </p>
                        )}
                    </Col>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="GoogleSchema">
                            شمای گوگل
                        </Label>
                        <Controller
                            id="GoogleSchema"
                            name="GoogleSchema"
                            defaultValue=""
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.GoogleSchema && true}
                                />
                            )}
                        />
                        {errors.GoogleSchema && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.GoogleSchema.message}
                            </p>
                        )}
                    </Col>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="ShortLink">
                            لینک کوتاه
                        </Label>
                        <Controller
                            id="ShortLink"
                            name="ShortLink"
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.ShortLink && true}
                                />
                            )}
                        />
                        {errors.ShortLink && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.ShortLink.message}
                            </p>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="StartTime">
                            تاریخ شروع
                        </Label>
                        <Controller
                            id="StartTime"
                            name="StartTime"
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Cleave
                                    {...field}
                                    className="form-control"
                                    placeholder="1401-1-1"
                                    options={options}
                                />
                            )}
                        />
                        {errors.StartTime && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.StartTime.message}
                            </p>
                        )}
                    </Col>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="EndTime">
                            تاریخ اتمام
                        </Label>
                        <Controller
                            id="EndTime"
                            name="EndTime"
                            defaultValue=""
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Cleave
                                    {...field}
                                    className="form-control"
                                    placeholder="1401-1-2"
                                    options={options}
                                />
                            )}
                        />
                        {errors.EndTime && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.EndTime.message}
                            </p>
                        )}
                    </Col>

                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="UniqeUrlString">
                            آدرس یکتا
                        </Label>
                        <Controller
                            id="UniqeUrlString"
                            name="UniqeUrlString"
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.UniqeUrlString && true}
                                />
                            )}
                        />
                        {errors.UniqeUrlString && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.UniqeUrlString.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="mb-1">
                        <Label className="form-label" for="SessionNumber">
                            تعداد جلسات
                        </Label>
                        <Controller
                            id="SessionNumber"
                            name="SessionNumber"
                            control={control}
                            rules={{
                                required: 'نمی‌تواند خالی باشد',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'فقط عدد لاتین قابل قبول است',
                                },
                            }}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.SessionNumber && true}
                                />
                            )}
                        />
                        {errors.SessionNumber && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.SessionNumber.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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
