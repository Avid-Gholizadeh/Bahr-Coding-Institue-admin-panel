import {ImagePicker} from '@Components/common/ImagePicker'
import {ArrowLeft} from 'react-feather'
import {Button, Spinner} from 'reactstrap'
import toast from 'react-hot-toast'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addCourseTechStep3, CreateCourseStep2, updateCourse} from '@core/services/api/courses'
import {createArticle, updateArticle} from '@core/services/api/article'
import {useNavigate} from 'react-router-dom'

export function ArticleStep3({
    stepper,
    handleFromData,
    formData,
    isEdit,
    articleData,
    setShow,
    singleCategoryId,
}) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate: createArticleMutate, isPending: createPending} = useMutation({
        mutationFn: createArticle,
        onSuccess: data => {
            if (data.success) {
                toast.success('خبر با موفقیت اضافه شد')
                navigate('/all-articles')
                // console.log(data)
            } else {
                toast.error(data.message.ErrorMessage.join(' - '))
            }
        },
        onError: err => {
            toast.error(JSON.parse(err.message).data.ErrorMessage.join(' - '))
        },
    })

    const {mutate: updateArticleMutate, isPending: updatePending} = useMutation({
        mutationFn: updateArticle,
        onSuccess: data => {
            if (data.success) {
                toast.success('خبر با موفقیت به روز رسانی شد')
                if (!singleCategoryId) {
                    queryClient.invalidateQueries(['all-articles'])
                    queryClient.invalidateQueries(['single-article', articleData.id])
                } else {
                    queryClient.invalidateQueries(['single-category-article', singleCategoryId])
                }

                if (setShow) setShow()
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    function handleAddImgToForm(imgFile) {
        handleFromData({Image: imgFile})
    }

    function onSubmitAll() {
        if (!formData.Image && !isEdit) {
            return toast.error('لطفا یک عکس انتخاب کنید!')
        } else {
            if (isEdit) {
                formData.Id = articleData.id
                updateArticleMutate(formData)
                console.log(formData)
            } else createArticleMutate(formData)
            // console.log(formData)
        }
    }

    return (
        <>
            {isEdit && (
                <div className="text-center overflow-hidden rounded-3">
                    {articleData?.currentImageAddressTumb && (
                        <img
                            src={articleData?.currentImageAddressTumb}
                            className="rounded-3 w-xl-50 w-sm-75"
                            alt="course-image"
                            height={200}
                            width="50%"
                        />
                    )}
                </div>
            )}

            <ImagePicker handleSelectImage={handleAddImgToForm} />

            <div className="d-flex justify-content-between">
                <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
                    <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
                    <span className="align-middle d-sm-inline-block d-none">Previous</span>
                </Button>
                <Button
                    type="submit"
                    color="success"
                    className="btn-next"
                    onClick={onSubmitAll}
                    disabled={createPending || updatePending}
                >
                    <span className="align-middle d-sm-inline-block d-none">Submit</span>
                    {(createPending || updatePending) && (
                        <Spinner className="ms-1" size="sm" color="light" />
                    )}
                </Button>
            </div>
        </>
    )
}
