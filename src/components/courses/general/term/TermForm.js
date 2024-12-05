import { convertPersianDateToGerigorian } from '@core/utils/formatter.utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Cleave from 'cleave.js/react'
import { useQuery } from '@tanstack/react-query';
import { getAllDepartments } from '@core/services/api/buildings';


export default function TermForm({ control, errors, handleSubmit, onSubmit, selectedTerm }) {
    function dateValidation(value) {
        const selectedDate = new Date(convertPersianDateToGerigorian(value))
        return selectedDate >= new Date() || `تاریخ باید بعد از امروز باشد`
    }
    const options = {date: true, delimiter: '-', datePattern: ['Y', 'm', 'd']}

    const{data:allDepartments, isLoading} = useQuery({
        queryKey:['departmentTerm'],
        queryFn: getAllDepartments
    })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="id">
            آیدی ترم جدید
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
            render={({ field }) => (
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
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.id.message}
            </p>
          )}
        </Col>
        <Col md="6" className="mb-1">
            <Label className="form-label fs-5" for="departmentId">
            دپارتمان
            </Label>
            <Controller
                id="departmentId"
                name="departmentId"
                control={control}
                rules={{
                required: 'لطفاً یک دپارتمان انتخاب کنید',
                }}
                render={({ field }) => (
                <Input
                    {...field}
                    type="select"
                    invalid={errors.departmentId && true}
                >
                    <option value="" disabled selected>
                        لطفاً یک دپارتمان انتخاب کنید
                    </option>
                    {isLoading ? (
                    <option value="">در حال بارگذاری...</option>
                    ) : (
                    allDepartments?.map(department => (
                        <option key={department.id} value={department.id}>
                        {department.depName}
                        </option>
                    ))
                    )}
                </Input>
                )}
            />
            {errors.departmentId && (
                <p
                className="text-danger"
                style={{ fontSize: '12px', marginTop: '4px' }}
                >
                {errors.departmentId.message}
                </p>
            )}
        </Col>
      </Row>
      <Label className="form-label fs-5" for="termName">
            نام ترم جدید
          </Label>
          <Controller
            id="termName"
            name="termName"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.termName && true}
              />
            )}
          />
          {errors.termName && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.termName.message}
            </p>
          )}
      <Row>
        <Col>
            <Label className="form-label fs-5" for="startDate">
                تاریخ شروع
            </Label>
            <Controller
                id="startDate"
                name="startDate"
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
            {errors.startDate && (
                <p
                    className="text-danger"
                    style={{fontSize: '12px', marginTop: '4px'}}
                >
                    {errors.startDate.message}
                </p>
            )}
        </Col>
        <Col>
            <Label className="form-label fs-5" for="endDate">
                تاریخ پایان
            </Label>
            <Controller
                id="endDate"
                name="endDate"
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
            {errors.endDate && (
                <p
                    className="text-danger"
                    style={{fontSize: '12px', marginTop: '4px'}}
                >
                    {errors.endDate.message}
                </p>
            )}
        </Col>
      </Row>
      {selectedTerm ? (
            <>
                <Label className="form-label fs-5" for="expire">
                    وضعیت
                </Label>
                <Controller
                    name="expire"
                    control={control}
                    defaultValue={true} // or false, depending on the default behavior
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="select"
                            id="expire"
                            onChange={(e) => field.onChange(e.target.value === "true")}
                        >
                            <option value={true}>در جریان</option>
                            <option value={false}>منقضی</option>
                        </Input>
                    )}
                />
            </>
        ) : null}

            <div className="d-flex justify-content-center mt-2">
                <Button type="submit" color="primary" className="fs-3 w-50">
                تایید
                </Button>
            </div>
    </Form>
  );
}
