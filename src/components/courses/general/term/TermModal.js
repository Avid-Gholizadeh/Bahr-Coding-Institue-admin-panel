import { createCourseLevel, createTerm, updateCourselevel, updateTerm } from '@core/services/api/courseGeneral';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TermForm from './TermForm';
import { convertGrigorianDateToJalaali3, convertPersianDateToGerigorian2 } from '@core/utils/formatter.utils';


export default function TermModal({ show, setShow, selectedTerm }) {
  const queryClient = useQueryClient();

  const{mutate:saveTerm} = useMutation({
    mutationFn: selectedTerm? updateTerm :createTerm,
    onSuccess: (response) => {
        console.log(response);
        if (response.success) {
          toast.success(selectedTerm ? 'ترم ویرایش شد' : 'ترم ایجاد شد');
          queryClient.invalidateQueries(['allTerms']);
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
        id: " ",
        termName: " ",
        departmentId: null,
        startDate: null,
        endDate: null
    },
  });

  // Pre-fill form fields if editing
  useEffect(() => {
    if (selectedTerm) {
      const prefilledTerm = {
        ...selectedTerm,
        startDate: selectedTerm.startDate
          ? convertGrigorianDateToJalaali3(selectedTerm.startDate)
          : null,
        endDate: selectedTerm.endDate
          ? convertGrigorianDateToJalaali3(selectedTerm.endDate)
          : null,
      };
      reset(prefilledTerm);
    }
  }, [selectedTerm, reset]);

  function onSubmit(data) {

    const formattedData = selectedTerm
        ? {
              id: data.id,
              termName: data.termName,
              departmentId: data.departmentId,
              startDate: convertPersianDateToGerigorian2(data.startDate),
              endDate: convertPersianDateToGerigorian2(data.endDate),
              expire: data.expire,
          }
        : {
              ...data,
              startDate: convertPersianDateToGerigorian2(data.startDate),
              endDate: convertPersianDateToGerigorian2(data.endDate),
          };
    console.log(formattedData);
    saveTerm(formattedData);
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
        <TermForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            selectedTerm={selectedTerm||null}
        />
      </ModalBody>
    </Modal>
  );
}
