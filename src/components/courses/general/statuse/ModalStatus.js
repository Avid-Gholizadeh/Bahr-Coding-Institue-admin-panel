import { createStatus, updateStatus } from '@core/services/api/courseGeneral';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import StatusForm from './StatusForm';
import toast from 'react-hot-toast';

export default function ModalStatus({show, setShow, selectedStatus}) {
  const queryClient = useQueryClient();
  
  const {mutate:saveStatus, }= useMutation({
        mutationFn:selectedStatus? updateStatus : createStatus,
        onSuccess: data =>{
            console.log(data);
            if(data.success){
              queryClient.invalidateQueries(['levels']);
              toast.success(selectedStatus? 'استاتوس ویرایش شد': 'استاتوس ایجاد شد')
            }else{
                toast.success(data.message)
            }
        },
        onError: data =>{
            toast.success(data.message)
        }
    })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          statusName: '',
          describe: '',
          statusNumber: '',
        },
      });
      useEffect(() => {
        if (selectedStatus) {
          reset(selectedStatus);
        }
      }, [selectedStatus, reset]);
      function onSubmit(data) {
        const payload = {
            statusName: data.statusName,
            describe: data.describe,
            statusNumber: parseInt(data.statusNumber, 10),
        };
        if(selectedStatus){
            saveStatus({ ...payload, id: parseInt(selectedStatus.id, 10) })
        }else{
            saveStatus(payload);
        }
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
        toggle={() => setShow(!show)}
      ></ModalHeader>
      <ModalBody>
        <h1 className="text-center mb-3">{}</h1>
        <StatusForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        />
      </ModalBody>
    </Modal>
    </>
  )
}
