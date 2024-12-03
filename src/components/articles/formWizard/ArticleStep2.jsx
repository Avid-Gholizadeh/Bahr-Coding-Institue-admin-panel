import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Label, Row, Input, Spinner} from 'reactstrap'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {ArrowLeft, ArrowRight} from 'react-feather'

export function ArticleStep2({stepper, handleFromData, isEdit, articleData}) {
    //
    const defaultValues = isEdit
        ? {
              CurrentImageAddressTumb: articleData.currentImageAddressTumb || 'آدرسی موجود نیست',
              Active: {
                  value: articleData.active,
                  label: articleData.active ? 'فعال' : 'غیر فعال',
              },
              MiniDescribe: articleData.miniDescribe,
              Describe: articleData.describe,
          }
        : null

    const isActive = [
        {value: true, label: 'فعال'},
        {value: false, label: 'غیر فعال'},
    ]

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues,
    })

    function onSubmit(data) {
        const newObj = isEdit
            ? {
                  ...data,
                  Active: data.Active.value,
              }
            : data
        handleFromData(newObj)
        stepper.next()
        // console.log(data)
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={isEdit ? 6 : 12} className="mb-1">
                        <Label className="form-label">توضیحات کوتاه</Label>
                        <Controller
                            control={control}
                            id="MiniDescribe"
                            name="MiniDescribe"
                            rules={{
                                required: 'نمی‌تواند خالی باشد',
                                maxLength: {
                                    value: 300,
                                    message: 'حداقل کارکتر های مجاز ۱۰ و حداکثر ۳۰۰ می‌باشد',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'حداقل کارکتر های مجاز ۱۰ و حداکثر ۳۰۰ می‌باشد',
                                },
                            }}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    type="textarea"
                                    invalid={errors.MiniDescribe && true}
                                    name="text"
                                    id="exampleText"
                                    rows={isEdit ? 6 : 3}
                                />
                            )}
                        />
                        {errors.MiniDescribe && (
                            <p className="text-danger" style={{fontSize: '12px', marginTop: '4px'}}>
                                {errors.MiniDescribe.message}
                            </p>
                        )}
                    </Col>

                    <Col md={isEdit ? 6 : 12} className="mb-1">
                        <Label className="form-label">توضیحات خبر</Label>
                        <Controller
                            control={control}
                            id="Describe"
                            name="Describe"
                            rules={{
                                required: 'نمی‌تواند خالی باشد',

                                minLength: {
                                    value: 70,
                                    message: 'حداقل کارکتر های مجاز ۷۰ می‌باشد',
                                },
                            }}
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
                </Row>

                {isEdit && (
                    <Row>
                        <Col md="6" className="mb-1">
                            <Label className="form-label">وضعیت</Label>
                            <Controller
                                control={control}
                                id="Active"
                                name="Active"
                                rules={{required: 'نمی‌تواند خالی باشد'}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        theme={selectThemeColors}
                                        className="react-select"
                                        classNamePrefix="select"
                                        placeholder="انتخاب کنید"
                                        options={isActive}
                                        isClearable={false}
                                    />
                                )}
                            />
                            {errors.Active && (
                                <p
                                    className="text-danger"
                                    style={{fontSize: '12px', marginTop: '4px'}}
                                >
                                    {errors.Active.message}
                                </p>
                            )}
                        </Col>

                        <Col md="6" className="mb-1">
                            <Label className="form-label">آدرس عکس</Label>
                            <Controller
                                id="CurrentImageAddressTumb"
                                name="CurrentImageAddressTumb"
                                control={control}
                                rules={{required: 'نمی‌تواند خالی باشد'}}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        className="text-right"
                                        invalid={errors.CurrentImageAddressTumb && true}
                                    />
                                )}
                            />
                            {errors.CurrentImageAddressTumb && (
                                <p
                                    className="text-danger"
                                    style={{fontSize: '12px', marginTop: '4px'}}
                                >
                                    {errors.CurrentImageAddressTumb.message}
                                </p>
                            )}
                        </Col>
                    </Row>
                )}

                <Row></Row>
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
