import {getNewsCategoryList} from '@core/services/api/article'
import {useQuery} from '@tanstack/react-query'
import {Controller, useForm} from 'react-hook-form'
import {Button, Col, Form, Label, Row, Input, Spinner} from 'reactstrap'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {useEffect, useMemo} from 'react'

export function ArticleStep1({stepper, handleFromData, isEdit, articleData}) {
    //
    const {data: categories, isLoading} = useQuery({
        queryKey: ['news-category-list'],
        queryFn: () => getNewsCategoryList(),
    })

    // console.log(articleData)

    const defaultValues = useMemo(() => {
        return isEdit && categories && articleData
            ? {
                  Title: articleData.title,
                  GoogleTitle: articleData.googleTitle,
                  GoogleDescribe: articleData.googleDescribe,
                  Keyword: articleData.keyword,
                  IsSlider: {
                      value: articleData.isSlider,
                      label: articleData.isSlider ? 'بلی' : 'خیر',
                  },
                  NewsCatregoryId: {
                      value: articleData.newsCatregoryId,
                      label: articleData.newsCatregoryName,
                  },
              }
            : null
    }, [categories])

    const newsCategories = categories?.map(category => ({
        value: category.id,
        label: category.categoryName,
    }))
    const isSlider = [
        {value: true, label: 'بلی'},
        {value: false, label: 'خیر'},
    ]

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues,
    })

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [categories, defaultValues, reset])

    function onSubmit(data) {
        const newObj = {
            ...data,
            NewsCatregoryId: data.NewsCatregoryId.value,
            IsSlider: data.IsSlider.value,
        }
        // console.log(newObj)
        handleFromData(newObj)
        stepper.next()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {categories && isEdit !== false && (
                    <>
                        <Row>
                            <Col md="6" className="mb-1">
                                <Label className="form-label">عنوان خبر</Label>
                                <Controller
                                    id="Title"
                                    name="Title"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 120,
                                            message:
                                                'تعداد کارکتر های عنوان بین 10 الی 120 می‌باشد.',
                                        },
                                        minLength: {
                                            value: 10,
                                            message:
                                                'تعداد کارکتر های عنوان بین 10 الی 120 می‌باشد.',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.Title && true}
                                        />
                                    )}
                                />
                                {errors.Title && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.Title.message}
                                    </p>
                                )}
                            </Col>

                            <Col md="6" className="mb-1">
                                <Label className="form-label">عنوان گوگل</Label>
                                <Controller
                                    id="GoogleTitle"
                                    name="GoogleTitle"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 70,
                                            message: 'حداقل کارکتر های مجاز ۵۰ و حداکثر ۷۰ می‌باشد',
                                        },
                                        minLength: {
                                            value: 50,
                                            message: 'حداقل کارکتر های مجاز ۵۰ و حداکثر ۷۰ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.GoogleTitle && true}
                                        />
                                    )}
                                />
                                {errors.GoogleTitle && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.GoogleTitle.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" className="mb-1">
                                <Label className="form-label">دسته بندی</Label>
                                <Controller
                                    control={control}
                                    id="NewsCatregoryId"
                                    name="NewsCatregoryId"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            theme={selectThemeColors}
                                            className="react-select"
                                            classNamePrefix="select"
                                            placeholder="انتخاب کنید"
                                            options={newsCategories}
                                            isClearable={false}
                                        />
                                    )}
                                />
                                {errors.NewsCatregoryId && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.NewsCatregoryId.message}
                                    </p>
                                )}
                            </Col>

                            <Col md="4" className="mb-1">
                                <Label className="form-label">کلید واژه</Label>
                                <Controller
                                    id="Keyword"
                                    name="Keyword"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 300,
                                            message:
                                                'حداقل کارکتر های مجاز ۱۰ و حداکثر ۳۰۰ می‌باشد',
                                        },
                                        minLength: {
                                            value: 10,
                                            message:
                                                'حداقل کارکتر های مجاز ۱۰ و حداکثر ۳۰۰ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.Keyword && true}
                                        />
                                    )}
                                />
                                {errors.Keyword && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.Keyword.message}
                                    </p>
                                )}
                            </Col>

                            <Col md="4" className="mb-1">
                                <Label className="form-label"> اسلایدر</Label>
                                <Controller
                                    control={control}
                                    id="IsSlider"
                                    name="IsSlider"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            theme={selectThemeColors}
                                            className="react-select"
                                            classNamePrefix="select"
                                            placeholder="انتخاب کنید"
                                            options={isSlider}
                                            isClearable={false}
                                        />
                                    )}
                                />
                                {errors.IsSlider && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.IsSlider.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-1">
                                <Label className="form-label">توضیحات گوگل</Label>
                                <Controller
                                    control={control}
                                    id="GoogleDescribe"
                                    name="GoogleDescribe"
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 150,
                                            message:
                                                'حداقل کارکتر های مجاز ۷۰ و حداکثر ۱۵۰ می‌باشد',
                                        },
                                        minLength: {
                                            value: 70,
                                            message:
                                                'حداقل کارکتر های مجاز ۷۰ و حداکثر ۱۵۰ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            type="textarea"
                                            invalid={errors.GoogleDescribe && true}
                                            name="text"
                                            id="exampleText"
                                            style={{minHeight: '100px'}}
                                            rows="4"
                                        />
                                    )}
                                />
                                {errors.GoogleDescribe && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.GoogleDescribe.message}
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
}
