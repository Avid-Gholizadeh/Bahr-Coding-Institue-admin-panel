import {ImagePicker} from '@Components/common/ImagePicker'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {Button, Col, Form, Input, Label, Row, Spinner} from 'reactstrap'
import toast from 'react-hot-toast'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addCourseTechStep3, CreateCourseStep2, updateCourse} from '@core/services/api/courses'

export function CourseImgStep4({stepper, handleFromData, formData, isEdit, courseData, setShow}) {
    const queryClient = useQueryClient()

    const {mutate: step3Mutate, isPending: step3Pending} = useMutation({
        mutationFn: addCourseTechStep3,
        onSuccess: data => {
            if (data.success) {
                if (isEdit) {
                    toast.success('دوره با موفقیت به روز رسانی شد')
                    queryClient.invalidateQueries(['single-course', courseData.courseId])
                } else toast.success('دوره با موفقیت اضافه شد')
                console.log(data)
                if (setShow) setShow()
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    const {mutate: step2Mutate, isPending: step2Pending} = useMutation({
        mutationFn: CreateCourseStep2,
        onSuccess: data => {
            if (data.success) {
                step3Mutate({courseTech: formData.courseTech, courseId: data.id})
                console.log(data)
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })
    const {mutate: updateMutate, isPending: updatePending} = useMutation({
        mutationFn: updateCourse,
        onSuccess: data => {
            if (data.success) {
                step3Mutate({courseTech: formData.courseTech, courseId: data.id})
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
            const {courseTech, ...newObj} = formData
            if (isEdit) {
                newObj.Id = courseData.courseId
                updateMutate(newObj)
                console.log(newObj)
            } else step2Mutate(newObj)
        }
    }

    return (
        <>
            <div className="content-header">
                <h5 className="mb-0"> انتخاب تصویر </h5>
            </div>

            {isEdit && (
                <div className="text-center overflow-hidden rounded-3">
                    {courseData.imageAddress && (
                        <img
                            src={courseData.imageAddress}
                            className="rounded-3 w-xl-50 w-sm-75"
                            alt="course-image"
                            // width={'50%'}
                            height={200}
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
                    disabled={step2Pending || step3Pending || updatePending}
                >
                    <span className="align-middle d-sm-inline-block d-none">Submit</span>
                    {(step2Pending || step3Pending || updatePending) && (
                        <Spinner className="ms-1" size="sm" color="light" />
                    )}
                </Button>
            </div>
        </>
    )
}
