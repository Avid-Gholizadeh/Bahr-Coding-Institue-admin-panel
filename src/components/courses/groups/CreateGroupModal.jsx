import {
    Button,
    Card,
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
import {Table} from '../Table'
import {Controller, useForm} from 'react-hook-form'
import {Minus, Plus} from 'react-feather'
import InputNumber from 'rc-input-number'
import '@styles/react/libs/input-number/input-number.scss'
import {useEffect, useMemo, useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createCourseGroupe, updateCourseGroupe} from '@core/services/api/courses'
import toast from 'react-hot-toast'
import {useSelector} from 'react-redux'

export function CreateGroupModal({handleToggleModal, show, course, params}) {
    const queryClient = useQueryClient()
    const [selectedCourse, setSelectedCourse] = useState(null)
    const {skin} = useSelector(state => state.layout)

    const {mutate, isPending} = useMutation({
        mutationFn: createCourseGroupe,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-groups'])
                toast.success('گروه با موفقیت ساخته شد')
                handleToggleModal()
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            console.log(data)
            toast.error(data.ErrorMessage?.join(' - ') || data.title)
        },
    })

    const {mutate: updateMutate, isPending: updatePending} = useMutation({
        mutationFn: updateCourseGroupe,
        onSuccess: (data, variables) => {
            if (data.success) {
                updateCashedGroupes(variables)
                toast.success('گروه با موفقیت ویرایش شد.')
                handleToggleModal()
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage?.join(' - ') || data.title)
        },
    })

    function updateCashedGroupes(variables) {
        queryClient.setQueryData(['all-groups', params], oldGroups => {
            const newArray = oldGroups.courseGroupDtos.map(group => {
                if (group.groupId === variables.Id && group.courseId === variables.CourseId) {
                    return {
                        ...group,
                        groupCapacity: variables.GroupCapacity,
                        groupName: variables.GroupName,
                    }
                } else return group
            })

            return {...oldGroups, courseGroupDtos: newArray}
        })
    }

    const defaultValues = useMemo(
        () => ({
            GroupName: course?.groupName || '',
            GroupCapacity: course?.groupCapacity || 0,
        }),
        [course]
    )

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm({defaultValues})

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }
    }, [reset, defaultValues])

    const formValues = watch() // Get current form values

    const isChanged = Object.keys(defaultValues).some(key => formValues[key] !== defaultValues[key])

    function onSubmit(data) {
        if (!course) {
            if (selectedCourse) {
                mutate({...data, CourseId: selectedCourse.courseId})
            } else {
                toast.error('لطفا ابتدا یک دوره را از لیست زیر انتخاب کنید')
            }
        } else {
            if (isChanged) {
                updateMutate({...data, Id: course.groupId, CourseId: course.courseId})
            } else {
                toast.error('لطفا مقادیر جدید را وارد کنید')
            }
        }
    }

    return (
        <>
            <Modal
                isOpen={show}
                toggle={handleToggleModal}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={handleToggleModal}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50">
                    <Card
                        tag={Form}
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-2"
                        style={{backgroundColor: skin === 'dark' ? 'auto' : '#ddd'}}
                    >
                        <Row className="align-items-center flex-column gap-4 gap-lg-0 justify-content-center flex-lg-row">
                            <Col className="d-flex gap-3 align-items-baseline ">
                                <div className="" style={{width: 175}}>
                                    <Label className="form-label" for="GroupName">
                                        نام گروه
                                    </Label>
                                    <Controller
                                        id="GroupName"
                                        name="GroupName"
                                        rules={{required: 'نمی‌تواند خالی باشد'}}
                                        control={control}
                                        render={({field}) => (
                                            <Input
                                                {...field}
                                                type="text"
                                                className="text-right"
                                                id="GroupName"
                                                placeholder="نام گروه را وارد کنید"
                                                invalid={errors.GroupName && true}
                                            />
                                        )}
                                    />
                                    {errors.GroupName && (
                                        <p
                                            className="text-danger"
                                            style={{fontSize: '11px', marginTop: '4px'}}
                                        >
                                            {errors.GroupName.message}
                                        </p>
                                    )}
                                </div>
                                <div style={{width: 120}} className="">
                                    <Label className="form-label" for="GroupCapacity">
                                        ظرفیت گروه
                                    </Label>
                                    <Controller
                                        id="GroupCapacity"
                                        name="GroupCapacity"
                                        control={control}
                                        rules={{
                                            required: 'نمی‌تواند خالی باشد',
                                            min: {value: 5, message: 'حداقل تعداد ۵ می‌باشد'},
                                        }}
                                        render={({field}) => (
                                            <InputNumber
                                                {...field}
                                                upHandler={<Plus />}
                                                downHandler={<Minus />}
                                            />
                                        )}
                                    />
                                    {errors.GroupCapacity && (
                                        <p
                                            className="text-danger"
                                            style={{fontSize: '11px', marginTop: '4px'}}
                                        >
                                            {errors.GroupCapacity.message}
                                        </p>
                                    )}
                                </div>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-lg-end gap-2 ">
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="btn-prev"
                                    disabled={isPending || updatePending}
                                >
                                    {course ? 'ویرایش گروه' : 'ایجاد گروه'}
                                    {(isPending || updatePending) && (
                                        <Spinner className="ms-1" size="sm" color="light" />
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    color="danger"
                                    className="btn-next"
                                    onClick={handleToggleModal}
                                >
                                    لغو
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                    {!course && (
                        <>
                            <Label className="mb-1 fs-5">یک دوره را انتخاب کنید :</Label>
                            <Table selectable onSelect={course => setSelectedCourse(course)} />
                        </>
                    )}
                </ModalBody>
            </Modal>
        </>
    )
}
