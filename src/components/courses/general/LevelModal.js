import { createCourseLevel, updateCourselevel } from '@core/services/api/courseGeneral';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import LevelForm from './LevelForm';

export default function LevelModal({ show, setShow, selectedLevel }) {
  const queryClient = useQueryClient();

  const { mutate: saveLevel } = useMutation({
    mutationFn: selectedLevel ? updateCourselevel : createCourseLevel,
    onSuccess: (response) => {
      console.log(response);
      if (response.success) {
        toast.success(selectedLevel ? 'سطح با موفقیت ویرایش شد' : 'سطح با موفقیت ایجاد شد');
        queryClient.invalidateQueries(['levels']);
        setShow(false);
      } else {
        toast.error(response.message);
      }
    },
    onError: (err) => {
      const data = JSON.parse(err.message).data;
      toast.error(data.ErrorMessage.join(' - '));
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      id: '',
      levelName: '',
    },
  });

  // Pre-fill form fields if editing
  useEffect(() => {
    if (selectedLevel) {
      reset(selectedLevel);
    }
  }, [selectedLevel, reset]);

  function onSubmit(data) {
    saveLevel(data);
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
        <h1 className="text-center mb-3">{}</h1>
        <LevelForm
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </ModalBody>
    </Modal>
  );
}
