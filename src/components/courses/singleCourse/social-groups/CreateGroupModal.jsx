import {Controller, useForm} from 'react-hook-form'
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
import toast from 'react-hot-toast'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createSocialGroup, updateSocialGroup} from '@core/services/api/social-groups.api'
import {useParams} from 'react-router-dom'

export function CreateGroupModal({showEdit, setShowEdit}) {
    //
    const {id} = useParams()
    const queryClient = useQueryClient()

    // console.log(showEdit)

    const defaultValues = showEdit.isEdit
        ? {
              groupName: showEdit.currentSocialGroup.groupName,
              groupLink: showEdit.currentSocialGroup.groupLink,
          }
        : null

    const {mutate: createMutate, isPending: createPending} = useMutation({
        mutationFn: createSocialGroup,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-socialGroups-list'])
                toast.success('گروه با موفقیت ساخته شد')
                setShowEdit({currentSocialGroup: null, show: false, isEdit: false})
                reset()
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
        mutationFn: updateSocialGroup,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-socialGroups-list'])
                toast.success('گروه با موفقیت ویرایش شد')
                setShowEdit({currentSocialGroup: null, show: false, isEdit: false})
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues,
    })

    function onSubmit(data) {
        data = {
            ...data,
            courseId: id,
        }

        if (showEdit.isEdit) {
            data = {
                ...data,
                id: showEdit.currentSocialGroup.id,
            }
            // console.log(data)

            updateMutate(data)
        } else {
            console.log(data)
            createMutate(data)
        }
    }

    return (
        <>
            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentSocialGroup: null, show: false, isEdit: false})}
                backdrop="static"
                className="modal-dialog-centered modal-md"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() =>
                        setShowEdit({currentSocialGroup: null, show: false, isEdit: false})
                    }
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 30}}>
                    <h1 className="text-center mb-3">
                        {showEdit.isEdit ? 'ویرایش گروه' : 'ایجاد گروه جدید'}
                    </h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col className="mb-1">
                                <Label className="form-label fs-5" for="groupName">
                                    نام گروه
                                </Label>
                                <Controller
                                    id="groupName"
                                    name="groupName"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        minLength: {
                                            value: 5,
                                            message: 'حداقل کارکتر های مجاز ۵ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.groupName && true}
                                        />
                                    )}
                                />
                                {errors.groupName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.groupName.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-1">
                                <Label className="form-label fs-5" for="groupLink">
                                    لینک گروه
                                </Label>
                                <Controller
                                    id="groupLink"
                                    name="groupLink"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        pattern: {
                                            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
                                            message: 'لینک معتبر نمی‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.groupLink && true}
                                        />
                                    )}
                                />
                                {errors.groupLink && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.groupLink.message}
                                    </p>
                                )}
                            </Col>
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
                                            currentSocialGroup: null,
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
