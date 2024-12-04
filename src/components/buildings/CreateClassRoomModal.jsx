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
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {
    createClassRoom,
    createDepartment,
    getAllBuildings,
    updateClassRoom,
    updateDepartment,
} from '@core/services/api/buildings'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function CreateClassRoomModal({showEdit, setShowEdit}) {
    //
    const queryClient = useQueryClient()

    const {data: buildings} = useQuery({
        queryKey: ['all-buildings-list'],
        queryFn: getAllBuildings,
    })

    const defaultValues = showEdit.isEdit
        ? {
              id: showEdit.currentClassRoom.id,
              classRoomName: showEdit.currentClassRoom.classRoomName,
              buildingId: {
                  value: showEdit.currentClassRoom.buildingId,
                  label: buildings?.find(item => item.id === showEdit.currentClassRoom.buildingId)
                      .buildingName,
              },
              capacity: showEdit.currentClassRoom.capacity,
          }
        : null

    const {mutate: createMutate, isPending: createPending} = useMutation({
        mutationFn: createClassRoom,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-classRoom-list'])
                toast.success('کلاس با موفقیت ساخته شد')
                setShowEdit({currentClassRoom: null, show: false, isEdit: false})
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
        mutationFn: updateClassRoom,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-classRoom-list'])
                toast.success('کلاس با موفقیت ویرایش شد')
                setShowEdit({currentClassRoom: null, show: false, isEdit: false})
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
    } = useForm({
        defaultValues,
    })

    const options = buildings?.map(item => ({value: item.id, label: item.buildingName}))

    function onSubmit(data) {
        data = {...data, buildingId: data.buildingId.value}

        if (showEdit.isEdit) {
            updateMutate(data)
        } else {
            createMutate(data)
        }
    }
    return (
        <>
            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentClassRoom: null, show: false, isEdit: false})}
                backdrop="static"
                className="modal-dialog-centered modal-lg"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentClassRoom: null, show: false, isEdit: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 30}}>
                    <h1 className="text-center mb-3">
                        {showEdit.isEdit ? 'ویرایش کلاس' : 'ایجاد کلاس جدید'}
                    </h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="classRoomName">
                                    نام کلاس
                                </Label>
                                <Controller
                                    id="classRoomName"
                                    name="classRoomName"
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
                                            invalid={errors.classRoomName && true}
                                        />
                                    )}
                                />
                                {errors.classRoomName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.classRoomName.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="id">
                                    ID
                                </Label>
                                <Controller
                                    id="id"
                                    name="id"
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
                                            invalid={errors.id && true}
                                        />
                                    )}
                                />
                                {errors.id && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.id.message}
                                    </p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col className="z-2">
                                <Label className="form-label">ساختمان</Label>
                                <Controller
                                    control={control}
                                    id="buildingId"
                                    name="buildingId"
                                    rules={{required: 'نمی‌تواند خالی باشد'}}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            theme={selectThemeColors}
                                            className="react-select "
                                            classNamePrefix="select"
                                            placeholder="انتخاب کنید"
                                            options={options}
                                            isClearable={false}
                                        />
                                    )}
                                />
                                {errors.buildingId && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.buildingId.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="capacity">
                                    ظرفیت
                                </Label>
                                <Controller
                                    id="capacity"
                                    name="capacity"
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
                                            invalid={errors.capacity && true}
                                        />
                                    )}
                                />
                                {errors.capacity && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.capacity.message}
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
                                            currentClassRoom: null,
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
