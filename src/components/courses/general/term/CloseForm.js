import { convertPersianDateToGerigorian } from '@core/utils/formatter.utils'
import Cleave from 'cleave.js/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'

export default function CloseForm({control, errors, handleSubmit, onSubmit,}) {
    function dateValidation(value) {
        const selectedDate = new Date(convertPersianDateToGerigorian(value))
        return selectedDate >= new Date() || `تاریخ باید بعد از امروز باشد`
    }
    const options = {date: true, delimiter: '-', datePattern: ['Y', 'm', 'd']}
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
      <Col>
            <Label className="form-label fs-5" for="startCloseDate">
                تاریخ شروع
            </Label>
            <Controller
                id="startCloseDate"
                name="startCloseDate"
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
            {errors.startCloseDate && (
                <p
                    className="text-danger"
                    style={{fontSize: '12px', marginTop: '4px'}}
                >
                    {errors.startCloseDate.message}
                </p>
            )}
        </Col>
        <Col>
            <Label className="form-label fs-5" for="endCloseDate">
                تاریخ پایان
            </Label>
            <Controller
                id="endCloseDate"
                name="endCloseDate"
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
            {errors.endCloseDate && (
                <p
                    className="text-danger"
                    style={{fontSize: '12px', marginTop: '4px'}}
                >
                    {errors.endCloseDate.message}
                </p>
            )}
        </Col>
      </Row>
        <Label className="form-label fs-5" for="closeReason">
            دلیل تعطیلی
        </Label>
        <Controller
            name="closeReason"
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    type="textarea"
                    id="closeReason"
                >

                </Input>
            )}
            />

            <div className="d-flex justify-content-center mt-2">
                <Button type="submit" color="primary" className="fs-3 w-50">
                تایید
                </Button>
            </div>
    </Form>
  )
}
