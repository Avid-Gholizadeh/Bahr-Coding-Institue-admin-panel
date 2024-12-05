import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import Cleave from 'cleave.js/react'
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
import {GoogleMapComponent} from '@Components/common/GoogleMapComponent'
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import {
    convertGrigorianDateToJalaali3,
    convertPersianDateToGerigorian,
    convertPersianDateToGerigorian2,
} from '@core/utils/formatter.utils'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createBuilding, updateBuilding} from '@core/services/api/buildings'
import {createPortal} from 'react-dom'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function CreateBuildingModal({showEdit, setShowEdit}) {
    //
    const queryClient = useQueryClient()
    const [latlng, setLatlng] = useState()
    const options = {date: true, delimiter: '-', datePattern: ['Y', 'm', 'd']}
    // console.log(showEdit)

    const defaultValues = showEdit.isEdit
        ? {
              id: showEdit.currentBuilding.id,
              buildingName: showEdit.currentBuilding.buildingName,
              workDate: convertGrigorianDateToJalaali3(showEdit.currentBuilding.workDate),
              floor: showEdit.currentBuilding.floor,
              active: {
                  value: showEdit.currentBuilding.active,
                  label: showEdit.currentBuilding.active ? 'فعال' : 'غیر فعال',
              },
          }
        : null

    useEffect(() => {
        if (showEdit.isEdit) {
            setLatlng({
                lat: +showEdit.currentBuilding.latitude,
                lng: +showEdit.currentBuilding.longitude,
            })
        }
    }, [showEdit.isEdit, showEdit.currentBuilding])

    const {mutate: createMutate, isPending: createPending} = useMutation({
        mutationFn: createBuilding,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-buildings-list'])
                toast.success('ساختمان با موفقیت ساخته شد')
                setShowEdit({currentBuilding: null, show: false, isEdit: false})
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
        mutationFn: updateBuilding,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-buildings-list'])
                toast.success('ساختمان با موفقیت ویرایش شد')
                setShowEdit({currentBuilding: null, show: false, isEdit: false})
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

    const isActive = [
        {value: true, label: 'فعال'},
        {value: false, label: 'غیر فعال'},
    ]

    function onSubmit(data) {
        if (!latlng && !showEdit.isEdit) {
            return toast.error('لطفا موقعیت مکانی را انتخاب کنید!')
        } else {
            data = {
                ...data,
                workDate: convertPersianDateToGerigorian2(data.workDate),
                latitude: String(latlng.lat),
                longitude: String(latlng.lng),
            }

            if (showEdit.isEdit) {
                data = {
                    ...data,
                    active: data.active.value,
                }
                // console.log(data)

                updateMutate(data)
            } else {
                // console.log(data)
                createMutate(data)
            }
        }
    }
    function handleSetLatlng(latlng) {
        setLatlng(latlng)
        toast.success('موقعیت با موفقیت انتخاب شد')
    }

    function dateValidation(value) {
        const selectedDate = new Date(convertPersianDateToGerigorian(value))
        return selectedDate >= new Date() || `تاریخ باید بعد از امروز باشد`
    }

    return (
        <>
            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentBuilding: null, show: false, isEdit: false})}
                backdrop="static"
                className="modal-dialog-centered modal-xl"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentBuilding: null, show: false, isEdit: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 30}}>
                    <h1 className="text-center mb-3">
                        {showEdit.isEdit ? 'ویرایش ساختمان' : 'ایجاد ساختمان جدید'}
                    </h1>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="buildingName">
                                    نام ساختمان
                                </Label>
                                <Controller
                                    id="buildingName"
                                    name="buildingName"
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
                                            invalid={errors.buildingName && true}
                                        />
                                    )}
                                />
                                {errors.buildingName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.buildingName.message}
                                    </p>
                                )}
                            </Col>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="floor">
                                    طبقه
                                </Label>
                                <Controller
                                    id="floor"
                                    name="floor"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'فقط عدد لاتین قابل قبول است',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'حداکثر طبقات مجاز ۵۰ می‌باشد',
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            className="text-right"
                                            invalid={errors.floor && true}
                                        />
                                    )}
                                />
                                {errors.floor && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.floor.message}
                                    </p>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" className="mb-1">
                                <Label className="form-label fs-5" for="workDate">
                                    تاریخ کار
                                </Label>
                                <Controller
                                    id="workDate"
                                    name="workDate"
                                    defaultValue=""
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        validate: dateValidation,
                                    }}
                                    render={({field}) => (
                                        <Cleave
                                            {...field}
                                            className="form-control"
                                            placeholder="1403-9-15"
                                            options={options}
                                            onChange={e => field.onChange(e.target.value)}
                                            htmlRef={field.ref}
                                        />
                                    )}
                                />
                                {errors.workDate && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.workDate.message}
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

                        {showEdit.isEdit && (
                            <Row>
                                <Col className="z-2">
                                    <Label className="form-label">وضعیت</Label>
                                    <Controller
                                        control={control}
                                        id="active"
                                        name="active"
                                        rules={{required: 'نمی‌تواند خالی باشد'}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                theme={selectThemeColors}
                                                className="react-select "
                                                classNamePrefix="select"
                                                placeholder="انتخاب کنید"
                                                options={isActive}
                                                isClearable={false}
                                            />
                                        )}
                                    />
                                    {errors.active && (
                                        <p
                                            className="text-danger"
                                            style={{fontSize: '12px', marginTop: '4px'}}
                                        >
                                            {errors.active.message}
                                        </p>
                                    )}
                                </Col>
                            </Row>
                        )}

                        <Row
                            className="mt-2 rounded-2 overflow-hidden"
                            style={{height: 300}}
                            dir="ltr"
                        >
                            <Col>
                                <GoogleMapComponent
                                    onSelectLocation={handleSetLatlng}
                                    latlng={latlng}
                                />
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
                                            currentBuilding: null,
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
