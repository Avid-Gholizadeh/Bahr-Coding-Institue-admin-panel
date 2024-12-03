import {ImagePicker} from '@Components/common/ImagePicker'
import {createArticleCategory, updateArticleCategory} from '@core/services/api/article'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRef} from 'react'
import {Controller, useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import {
    Button,
    Col,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner,
} from 'reactstrap'

export function CreateCategoryModal({showEdit, setShowEdit}) {
    const ImageRef = useRef()
    const queryClient = useQueryClient()

    const defaultValues = showEdit.isEdit
        ? {
              CategoryName: showEdit.currentCategory.categoryName,
              IconAddress: showEdit.currentCategory.iconAddress,
              IconName: showEdit.currentCategory.iconName,
              GoogleTitle: showEdit.currentCategory.googleTitle,
              GoogleDescribe: showEdit.currentCategory.googleDescribe,
          }
        : null

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues,
    })

    function handleAddImgToForm(imgFile) {
        ImageRef.current = {Image: imgFile}
    }

    const {mutate: createMutate, isPending: createPending} = useMutation({
        mutationFn: createArticleCategory,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['news-category-list'])
                toast.success('دسته بندی با موفقیت ساخته شد')
                setShowEdit({currentCategory: null, show: false, isEdit: false})
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    const {mutate: updateMutate, isPending: updatePending} = useMutation({
        mutationFn: updateArticleCategory,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['news-category-list'])
                toast.success('دسته بندی با موفقیت ویرایش شد')
                setShowEdit({currentCategory: null, show: false, isEdit: false})
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    function onSubmit(data) {
        if (!ImageRef.current?.Image && !showEdit.isEdit) {
            return toast.error('لطفا یک عکس انتخاب کنید!')
        } else {
            data = {...data, Image: ImageRef.current?.Image}

            if (showEdit.isEdit) {
                data.Id = showEdit.currentCategory.id

                updateMutate(data)
            } else {
                createMutate(data)
            }
            // console.log(data)
        }
    }

    return (
        <>
            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentCategory: null, show: false, isEdit: false})}
                backdrop="static"
                className="modal-dialog-centered modal-xl"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentCategory: null, show: false, isEdit: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <h1 className="text-center mb-3">
                        {showEdit.isEdit ? 'ویرایش دسته بندی' : 'ایجاد دسته بندی جدید'}
                    </h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="CategoryName">
                                    نام دسته‌ بندی
                                </Label>
                                <Controller
                                    id="CategoryName"
                                    name="CategoryName"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 80,
                                            message: 'حداقل کارکتر های مجاز ۳ و حداکثر ۸۰ می‌باشد',
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'حداقل کارکتر های مجاز ۳ و حداکثر ۸۰ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.CategoryName && true}
                                        />
                                    )}
                                />
                                {errors.CategoryName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.CategoryName.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="GoogleTitle">
                                    عنوان گوگل
                                </Label>
                                <Controller
                                    id="GoogleTitle"
                                    name="GoogleTitle"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        maxLength: {
                                            value: 70,
                                            message: 'حداقل کارکتر های مجاز ۴۰ و حداکثر ۷۰ می‌باشد',
                                        },
                                        minLength: {
                                            value: 40,
                                            message: 'حداقل کارکتر های مجاز ۴۰ و حداکثر ۷۰ می‌باشد',
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
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="IconName">
                                    نام آیکون
                                </Label>
                                <Controller
                                    id="IconName"
                                    name="IconName"
                                    control={control}
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.IconName && true}
                                        />
                                    )}
                                />
                                {errors.IconName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.IconName.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="IconAddress">
                                    آدرس آیکون
                                </Label>
                                <Controller
                                    id="IconAddress"
                                    name="IconAddress"
                                    control={control}
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.IconAddress && true}
                                        />
                                    )}
                                />
                                {errors.IconAddress && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.IconAddress.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-1">
                                <Label className="form-label fs-5" for="GoogleDescribe">
                                    توضیحات گوگل
                                </Label>
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
                                            rows="2"
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
                        <Row>
                            <Label className="form-label fs-5" for="Describe">
                                انتخاب عکس
                            </Label>
                            {showEdit.isEdit && (
                                <div className="text-center overflow-hidden rounded-3">
                                    {showEdit.currentCategory.image && (
                                        <img
                                            src={showEdit.currentCategory.image}
                                            className="rounded-3 w-xl-50 w-sm-75"
                                            alt="course-image"
                                            width={'50%'}
                                            height={200}
                                        />
                                    )}
                                </div>
                            )}
                            <ImagePicker handleSelectImage={handleAddImgToForm} />
                        </Row>

                        <Row>
                            <Col className="text-center mt-4" xs={12}>
                                <Button
                                    type="submit"
                                    className="me-1"
                                    color="primary"
                                    disabled={createPending || updatePending}
                                >
                                    تایید عملیات
                                    {(createPending || updatePending) && (
                                        <Spinner className="ms-1" size="sm" />
                                    )}
                                </Button>
                                <Button
                                    color="danger"
                                    outline
                                    onClick={() =>
                                        setShowEdit({
                                            currentCategory: null,
                                            show: false,
                                            isEdit: false,
                                        })
                                    }
                                >
                                    صرف نظر
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}
