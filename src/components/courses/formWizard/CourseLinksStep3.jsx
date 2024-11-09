import {ArrowLeft, ArrowRight} from 'react-feather'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Input, Label, Row} from 'reactstrap'

const defaultValues = {
    GoogleTitle: 'ری‌‌اکت',
    GoogleSchema: 'ری‌‌اکت',
    UniqeUrlString: 'ری‌‌اکت',
    ShortLink: 'ری‌‌اکت',
}

export function CourseLinksStep3({stepper}) {
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
                        <Label className="form-label" for="GoogleTitle">
                            عنوان دوره
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
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="GoogleSchema">
                            قیمت
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
                </Row>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="UniqeUrlString">
                            عنوان دوره
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
                    <Col md="6" className="mb-1">
                        <Label className="form-label" for="ShortLink">
                            عنوان دوره
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
