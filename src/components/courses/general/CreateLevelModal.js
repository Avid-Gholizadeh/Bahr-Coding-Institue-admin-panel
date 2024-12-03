import { createCourseLevel } from '@core/services/api/courseGeneral'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

export default function CreateLevelModal({show,setShow}) {
    const queryClient = useQueryClient()

    const { mutate:createLevel } = useMutation({
        mutationFn: createCourseLevel,
        onSuccess: response =>{
            console.log(response);
            if(response.success){
                toast.success(' سطح با موفقیت ایجاد شد ');
                queryClient.invalidateQueries(['levels'])
            }else {
                toast.error(response.message)
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
        /*  defaultValues, */
    })

    function onSubmit(data){
        createLevel(data)
    }
  return (
    <>
      <Modal
      isOpen={show}
      className="modal-dialog-centered modal-lg"
      toggle={() => setShow(!show)}
      >
        <ModalHeader
        className="bg-transparent"
        toggle={()=> setShow(!show)}
        ></ModalHeader>
        <ModalBody>
            <h1 className="text-center mb-3">
                {}
            </h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="6" className="mb-1">
                        <Label className="form-label fs-5" for="levelId">
                                آیدی سطح جدید
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
                    <Col md="6" className="mb-1">
                        <Label className="form-label fs-5" for="levelName">
                                نام سطح جدید
                        </Label>
                        <Controller
                                    id="levelName"
                                    name="levelName"
                                    control={control}
                                    rules={{
                                        required: 'نمی‌تواند خالی باشد',
                                        pattern: {
                                            value: /^[a-zA-Z\s]+$/, // Accepts alphabets and spaces
                                            message: 'فقط حروف لاتین و فاصله قابل قبول است',
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
                                {errors.levelName && (
                                    <p
                                        className="text-danger"
                                        style={{fontSize: '12px', marginTop: '4px'}}
                                    >
                                        {errors.levelName.message}
                                    </p>
                                )}
                    </Col>
                </Row>
                <Button type='submit' className="me-1" color="primary">
                    ایجاد
                </Button>
            </Form>
        </ModalBody>
      </Modal>
    </>
  )
}
