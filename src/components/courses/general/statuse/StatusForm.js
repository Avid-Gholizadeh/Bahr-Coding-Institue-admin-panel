import React from 'react'
import { Controller } from 'react-hook-form'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'

export default function StatusForm({control, handleSubmit, onSubmit, errors}) {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="statusNumber">
            شماره استاتوس
          </Label>
          <Controller
            id="statusNumber"
            name="statusNumber"
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
                invalid={errors.statusNumber && true}
              />
            )}
          />
          {errors.statusNumber && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.statusNumber.message}
            </p>
          )}
        </Col>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="statusName">
            نام استاتوس 
          </Label>
          <Controller
            id="statusName"
            name="statusName"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.statusName && true}
              />
            )}
          />
          {errors.statusName && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.statusName.message}
            </p>
          )}
        </Col>
      </Row>
      <div className="d-flex flex-column gap-1">
        <Label className="form-label fs-5" for="describe">
            توضیحات
          </Label>
          <Controller
            id="describe"
            name="describe"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                type="textarea"
                {...field}
                className="text-right"
                invalid={errors.describe && true}
              />
            )}
          />            
          {errors.describe && <span className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}>{errors.describe.message}</span>}
          
      </div>
          
      <div className="d-flex justify-content-center mt-2">
          <Button type="submit" color="primary" className="fs-3 w-50">
          تایید
          </Button>
      </div>
    </Form>
  )
}
