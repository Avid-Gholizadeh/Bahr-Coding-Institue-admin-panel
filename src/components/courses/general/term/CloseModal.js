import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import CloseForm from './CloseForm'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { addClose, updateClose } from '@core/services/api/courseGeneral';
import toast from 'react-hot-toast';
import { convertPersianDateToGerigorian2 } from '@core/utils/formatter.utils';

export default function CloseModal({show,setShow, item, editCloseModal}) {

    const {mutate:closeMutate , isPending, isError} = useMutation({
        mutationFn: editCloseModal? updateClose : addClose,
        onSuccess: data =>{
            console.log(data);
            if(data.success){
                toast.success(editCloseModal?' تعطیلی ویرایش شد ':' تعظیلی افزوده شد ')
            }else{
                toast.error('مشکلی پیش آمد')
            }
        },
        onError: data =>{
            console.log(data);
            toast.error('مشکلی پیش آمد')
        }
    })

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {

        },
      });
    
    function onSubmit(data){
        const submmissionData =
        editCloseModal? {
            ...data,
            startCloseDate:convertPersianDateToGerigorian2(data.startCloseDate),
            endCloseDate:convertPersianDateToGerigorian2(data.endCloseDate),
            termId: item.id,
            id:50
        }:{
            ...data,
            startCloseDate:convertPersianDateToGerigorian2(data.startCloseDate),
            endCloseDate:convertPersianDateToGerigorian2(data.endCloseDate),
            termId: item.id
        }
        console.log(submmissionData);
        closeMutate(submmissionData);
    }
  return (
    <Modal
      isOpen={show}
      className="modal-dialog-centered modal-lg"
      toggle={() => setShow(!show)}
    >
      <ModalHeader
        className="bg-transparent"
        toggle={() => setShow(!show)}
      ></ModalHeader>
      <ModalBody>
        <h1 className="text-center mb-3">{editCloseModal?'ویرایش تعطیلی':'افزودن تعطیلی'}</h1>
        <CloseForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        />
      </ModalBody>
    </Modal>
  )
}
