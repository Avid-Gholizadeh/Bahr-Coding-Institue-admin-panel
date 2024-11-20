import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Row,
  Col,
  Input,
  Label,
  Button,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const EditUserModal = ({ isOpen, toggle, onSubmit, user }) => {
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: user?.id,
      fName: user?.fName,
      lName: user?.lName,
      userName: user?.userName,
      gmail: user?.gmail,
      phoneNumber: user?.phoneNumber,
      active: user?.active,
      isDelete: user?.isDelete,
      isTecher: user?.isTeacher,
      isStudent: user?.isStudent,
      recoveryEmail: user?.recoveryEmail,
      twoStepAuth: user?.twoStepAuth,
      userAbout: user?.userAbout,
      currentPictureAddress: user?.currentPictureAddress,
      profileCompletionPercentage: user?.profileCompletionPercentage,
      linkdinProfile: user?.linkdinProfile,
      telegramLink: user?.telegramLink,
      receiveMessageEvent: user?.receiveMessageEvent,
      homeAdderess: user?.homeAdderess,
      nationalCode: user?.nationalCode,
      gender: user?.gender,
      latitude: user?.latitude,
      longitude: user?.longitude,
      insertDate: user?.insertDate,
      birthDay: user?.birthDay,
      roles: [],
      courses: [],
      coursesReseves: []
    }
  })

  return (
      <Modal isOpen={isOpen} toggle={() => toggle(!isOpen)} className='modal-dialog-centered modal-lg '>
        <ModalHeader className='bg-transparent' toggle={() => toggle(!isOpen)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'> ویرایش مشخصات کاربر </h1>
            <p>بروزرسانی مشخصات کاربر :</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='fName'>
                  نام
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='fName'
                  name='fName'
                  render={({ field }) => (
                    <Input {...field} id='fName' placeholder='نام...' invalid={errors.fName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lName'>
                  نام خانوادگی
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lName'
                  name='lName'
                  render={({ field }) => (
                    <Input {...field} id='lName' placeholder='نام خانوادگی...' invalid={errors.lName && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='userName'>
                  نام کاربری
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='userName'
                  name='userName'
                  render={({ field }) => (
                    <Input {...field} id='userName' placeholder='' invalid={errors.userName && true} />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='gmail'>
                  ایمیل
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='gmail'
                  name='gmail'
                  render={({ field }) => (
                    <Input {...field} id='gmail' placeholder='example@gmail.com' invalid={errors.gmail && true} />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='phoneNumber'>
                  شماره
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='phoneNumber'
                  name='phoneNumber'
                  render={({ field }) => (
                    <Input {...field} id='phoneNumber' placeholder='09126778787' invalid={errors.phoneNumber && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='recoveryEmail'>
                  ایمیل پشتیبان
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='recoveryEmail'
                  name='recoveryEmail'
                  render={({ field }) => (
                    <Input {...field} id='recoveryEmail' placeholder='Example@gmail.com' invalid={errors.recoveryEmail && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='linkdinProfile'>
                   لینکدین
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='linkdinProfile'
                  name='linkdinProfile'
                  render={({ field }) => (
                    <Input {...field} id='linkdinProfile' placeholder='https://linkdin.com' invalid={errors.linkdinProfile && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='telegramLink'>
                   تلگرام
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='telegramLink'
                  name='telegramLink'
                  render={({ field }) => (
                    <Input {...field} id='telegramLink' placeholder='https://t.me/example' invalid={errors.nationalCode && true} />
                  )}
                />
              </Col>

              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  تایید
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    toggle(false)
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
  );
};

export default EditUserModal;
