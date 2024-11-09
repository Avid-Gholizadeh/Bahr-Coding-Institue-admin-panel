import {ArrowLeft, ArrowRight} from 'react-feather'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Input, Label, Row} from 'reactstrap'
import classnames from 'classnames'

const defaultValues = {
    Title: 'ری‌‌اکت',
    Cost: '۱۰۰۰۰۰۰',
    Describe: 'ری‌‌اکت',
    MiniDescribe: 'ری‌‌اکت',
}

export function CourseInfoStep2({stepper}) {
    const {
        control,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({defaultValues})

    const MiniDescribe = watch('MiniDescribe') ?? 0

    const onSubmit = data => {
        stepper.next()
        console.log(data)
    }

    return (
        <>
            <div className="content-header">
                <h5 className="mb-0">لینک ها</h5>
                <small className="text-muted">لینک ها را وارد کنید</small>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="Title">
                            عنوان دوره
                        </Label>
                        <Controller
                            id="Title"
                            name="Title"
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.Title && true}
                                />
                            )}
                        />
                        {errors.Title && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.Title.message}
                            </p>
                        )}
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="Cost">
                            قیمت
                        </Label>
                        <Controller
                            id="Cost"
                            name="Cost"
                            defaultValue=""
                            control={control}
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    className="text-right"
                                    invalid={errors.Cost && true}
                                />
                            )}
                        />
                        {errors.Cost && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.Cost.message}
                            </p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="Describe">
                            توضیحات
                        </Label>
                        <Controller
                            control={control}
                            id="Describe"
                            name="Describe"
                            rules={{required: 'نمی‌تواند خالی باشد'}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    type="textarea"
                                    invalid={errors.Describe && true}
                                    name="text"
                                    id="exampleText"
                                    style={{minHeight: '100px'}}
                                    rows="6"
                                />
                            )}
                        />
                        {errors.Describe && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.Describe.message}
                            </p>
                        )}
                    </Col>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="MiniDescribe">
                            توضیحات کوتاه
                        </Label>
                        <div className="form-floating mb-0">
                            <Controller
                                control={control}
                                id="MiniDescribe"
                                name="MiniDescribe"
                                rules={{
                                    required: 'نمی‌تواند خالی باشد',
                                    maxLength: {
                                        value: 50,
                                        message: 'به حداکثر تعداد حرف مجاز رسیده‌اید',
                                    },
                                }}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        invalid={errors.MiniDescribe && true}
                                        type="textarea"
                                        style={{minHeight: '158px'}}
                                        className={classnames({
                                            'text-danger': MiniDescribe?.length > 50,
                                        })}
                                    />
                                )}
                            />
                        </div>
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': MiniDescribe?.length > 50,
                            })}
                        >
                            {`${MiniDescribe?.length}/50`}
                        </span>
                        {errors.MiniDescribe && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.MiniDescribe.message}
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
}
