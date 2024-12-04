import { createTech, updateTech } from '@core/services/api/courseGeneral'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import TechForm from './TechForm'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function TechModal({show, setShow, selectedTech}) {
  const queryClient = useQueryClient();

  const {mutate:saveTech, isPending:createPending, isError:createError } = useMutation({
    mutationFn: selectedTech? updateTech:createTech,
    onSuccess: (response) => {
      console.log(response);
      if (response.success) {
        toast.success(selectedTech? 'فناوری ویرایش شد':'فناوری با موفقیت ایجاد شد');
        queryClient.invalidateQueries(['techList']);
        setShow(false);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      const data = JSON.parse(err.message).data;
      toast.error(data.ErrorMessage.join(' - '));
    },
  })

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      parentId: '',
      techName: '',
      describe: '',
      iconAddress: '',
    },
  });
  useEffect(() => {
    if (selectedTech) {
      reset(selectedTech);
    }
  }, [selectedTech, reset]);
  function onSubmit(data) {
    const payload = {
      techName: data.techName,
      parentId: parseInt(data.parentId, 10),
      describe: data.describe,
      iconAddress: data.iconAddress,
    };
    if(selectedTech){
      saveTech({ ...payload, id: parseInt(selectedTech.id, 10) })
    }else{
      saveTech(payload);
    }
  }
  console.log(selectedTech?.id);
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
        <h1 className="text-center mb-3">{}</h1>
        <TechForm
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </ModalBody>
    </Modal>
  )
}
