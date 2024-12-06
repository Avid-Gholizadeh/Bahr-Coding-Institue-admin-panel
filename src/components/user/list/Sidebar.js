import { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Form, Input } from 'reactstrap';
import { addUser } from '../../../@core/services/api/User';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const defaultValues = {
  phoneNumber: '',
  gmail: '',
  password: '',
  firstName: '',
  lastName: '',
};

const checkIsValid = (data) => {
  return Object.values(data).every(
    (field) => (typeof field === 'object' ? field !== null : field.trim().length > 0)
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const [data, setData] = useState(null);
  const [role, setRole] = useState('isStudent');
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    if (role === 'isStudent') {
      setIsStudent(true);
      setIsTeacher(false);
    } else if (role === 'isTeacher') {
      setIsTeacher(true);
      setIsStudent(false);
    }
  }, [role]);

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Mutate function using Tanstack Query v5
  const { mutateAsync: addUserMutation, isLoading, isError } = useMutation({
    mutationKey: ['userAdditions'],
    mutationFn: (dataObj) => addUser(dataObj),
    onSuccess: (response) => {
      if (!response) {
        toast.error(' کاربر اضافه نشد! ');
      } else if (response.success === true) {
        toast.success('کاربر اضافه شد');
      }
    },
    onError: () => {
      toast.error('کاربر اضافه نشد!');
    },
  });

  const onSubmit = (data) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar(false);
      addUserMutation({
        gmail: data.gmail,
        password: data.password,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        isTeacher: isTeacher,
        isStudent: isStudent,
      });
    } else {
      for (const key in data) {
        if (!data[key]) {
          setError(key, { type: 'manual', message: 'این فیلد ضروری است' });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
    setRole('isStudent');
  };

  return (
    <Sidebar
      size='lg'
      open={open}
      title='ساخت کاربر'
      headerClassName='mb-1'
      contentClassName='pt-0 '
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        {/* First Name Field */}
        <div className='mb-1'>
          <Label className='form-label' for='firstName'>
            نام <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='firstName'
            control={control}
            rules={{ required: 'وارد کردن نام ضروری است' }}
            render={({ field }) => (
              <Input id='firstName' placeholder='نام' invalid={!!errors.firstName} {...field} />
            )}
          />
          {errors.firstName && <p className='text-danger'>{errors.firstName.message}</p>}
        </div>
        
        {/* Last Name Field */}
        <div className='mb-1'>
          <Label className='form-label' for='lastName'>
            نام خانوادگی <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastName'
            control={control}
            rules={{ required: 'وارد کردن نام خانوادگی ضروری است' }}
            render={({ field }) => (
              <Input id='lastName' placeholder='نام خانوادگی' invalid={!!errors.lastName} {...field} />
            )}
          />
          {errors.lastName && <p className='text-danger'>{errors.lastName.message}</p>}
        </div>

        {/* Email Field */}
        <div className='mb-1'>
          <Label className='form-label' for='gmail'>
            ایمیل <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gmail'
            control={control}
            rules={{
              required: 'وارد کردن ایمیل ضروری است',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'آدرس ایمیل معتبر نیست'
              }
            }}
            render={({ field }) => (
              <Input type='email' id='gmail' placeholder='email@example.com' invalid={!!errors.gmail} {...field} />
            )}
          />
          {errors.gmail && <p className='text-danger'>{errors.gmail.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div className='mb-1'>
          <Label className='form-label' for='phoneNumber'>
            شماره <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            rules={{
              required: 'وارد کردن شماره ضروری است',
              pattern: {
                value: /^09\d{9}$/,
                message: 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد'
              }
            }}
            render={({ field }) => (
              <Input type='text' id='phoneNumber' placeholder='09123456789' invalid={!!errors.phoneNumber} {...field} />
            )}
          />
          {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber.message}</p>}
        </div>

        {/* Password Field */}
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            رمز عبور <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            rules={{
              required: 'وارد کردن رمز عبور ضروری است',
              minLength: {
                value: 8,
                message: 'رمز عبور باید حداقل ۸ کاراکتر باشد'
              }
            }}
            render={({ field }) => (
              <Input type='password' id='password' placeholder='12345678' invalid={!!errors.password} {...field} />
            )}
          />
          {errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>

        {/* Role Selection (not using Controller as no validation is needed) */}
        <div className='mb-1'>
          <Label className='form-label' for='user-role'>دسترسی</Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='isStudent'> دانشجو </option>
            <option value='isTeacher'> استاد </option>
          </Input>
        </div>

        {/* Submit and Reset Buttons */}
        <Button type='submit' className='me-1' color='primary'>تایید</Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>برگشت</Button>
      </Form>
    </Sidebar>
  )
};

export default SidebarNewUsers;
