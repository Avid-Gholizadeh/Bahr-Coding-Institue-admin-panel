// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
// import Swal from 'sweetalert2'
// import Select from 'react-select'
import { User, TrendingUp } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

import faDate from 'moment-jalaali'

// ** Custom Components
import Avatar from '@components/avatar'

import "flatpickr/dist/themes/material_green.css";

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetDetailUser } from '../../../@core/services/api/User'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UpdateUser } from '../../../@core/services/api/User'
import toast from 'react-hot-toast'

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  const roleTranslations = {
    Student: 'دانشجو',
    Administrator: 'ادمین',
    Teacher: 'استاد',
    Writer: 'نویسنده',
    Referee: 'داور',
    'Employee.Admin': 'ادمین کارمند',
    TournamentAdmin: 'ادمین مسابقه',
    CourseAssistance: 'کمک دوره',
    'Employee.Writer': 'نویسنده کارمند',
    TournamentMentor: 'منتور مسابقه'
  };
  // ** State
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: selectedUser?.id,
      fName: selectedUser?.fName,
      lName: selectedUser?.lName,
      userName: selectedUser?.userName,
      gmail: selectedUser?.gmail,
      phoneNumber: selectedUser?.phoneNumber,
      active: selectedUser?.active,
      isDelete: selectedUser?.isDelete,
      isTecher: selectedUser?.isTeacher,
      isStudent: selectedUser?.isStudent,
      recoveryEmail: selectedUser?.recoveryEmail,
      twoStepAuth: selectedUser?.twoStepAuth,
      userAbout: selectedUser?.userAbout,
      currentPictureAddress: selectedUser?.currentPictureAddress,
      profileCompletionPercentage: selectedUser?.profileCompletionPercentage,
      linkdinProfile: selectedUser?.linkdinProfile,
      telegramLink: selectedUser?.telegramLink,
      receiveMessageEvent: selectedUser?.receiveMessageEvent,
      homeAdderess: selectedUser?.homeAdderess,
      nationalCode: selectedUser?.nationalCode,
      gender: selectedUser?.gender,
      latitude: selectedUser?.latitude,
      longitude: selectedUser?.longitude,
      insertDate: selectedUser?.insertDate,
      birthDay: selectedUser?.birthDay,
      roles: [],
      courses: [],
      coursesReseves: []
    }
  })
  console.log(selectedUser);
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser.currentPictureAddress !== 'Not-set') {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.currentPictureAddress}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <p>کاربر عکسی ندارد</p>
      )
    }
  }
  
  const { mutate: submitMutate } = useMutation({
    mutationFn: (data) => UpdateUser(data), // Ensure UpdateUser returns the response object
    onSuccess: (response) => {
      if (response.success) {
        toast.success(' عملیات انجام شد ');
        setShow(false)
      } else {
        toast.error(' عملیات موفقیت آمیز نبود ');
      }
    },
  });

  return (
    <div className='iranSans'>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser.fName !== null && selectedUser.lName !== null ? (selectedUser.fName + ' ' + selectedUser.lName) : ''}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <User className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.gender === true ? 'مرد' : 'زن'} </h4>
                <small> جنسیت </small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <TrendingUp className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'> {selectedUser.profileCompletionPercentage ? selectedUser.profileCompletionPercentage : '0'}% </h4>
                <small> درصد تکمیل حساب </small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>مشخصات کاربر</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fs-5 text fw-semibold'>ایمیل :</span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fs-5 text fw-semibold'>شماره :</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> وضعیت : </span>
                  <Badge className='text-capitalize' color={selectedUser.active ? 'light-success' : 'light-danger'}>
                    {selectedUser.active ? 'فعال' : 'غیر فعال'}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fs-5 text fw-semibold">نقش:</span>
                  <span className="text-capitalize">
                    {
                     (
                      selectedUser.roles.length > 0 ? (
                        selectedUser.roles.map((role, index) => {
                          const translatedRoleName = roleTranslations[role.roleName] || role.roleName;
                          return (
                            <span key={index} style={{ margin: '2px' }}>
                              {translatedRoleName}
                            </span>
                          );
                        })
                      ) : (
                        'هیچ نقشی ندارد'
                      ))
                    }
                  </span>
                </li>

              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => {setShow(true);}}>
              ویرایش مشخصات
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg iranSans'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'> ویرایش مشخصات کاربر </h1>
            <p>بروزرسانی مشخصات کاربر :</p>
          </div>
          <Form onSubmit={handleSubmit(submitMutate)}>
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

              <Col xs={12}>
                <Label className='form-label' for='userAbout'>
                  درباره من
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='userAbout'
                  name='userAbout'
                  render={({ field }) => (
                    <Input {...field} id='userAbout' placeholder='سلام دوستان من .....' invalid={errors.userAbout && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='nationalCode'>
                  کد ملی
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nationalCode'
                  name='nationalCode'
                  render={({ field }) => (
                    <Input {...field} id='nationalCode' placeholder='**********' invalid={errors.nationalCode && true} />
                  )}
                />
              </Col>

              <Col xs={6}>
                <Label className='form-label' for='birthDay'>
                  تاریخ تولد
                </Label>
                <Controller
                  control={control}
                  id='birthDay'
                  name='birthDay'
                  render={({ field }) => (
                    <Input {...field} id='birthDay' placeholder='xxxx-xx-xx' invalid={errors.birthDay && true} />
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
                    setShow(false)
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default UserInfoCard
