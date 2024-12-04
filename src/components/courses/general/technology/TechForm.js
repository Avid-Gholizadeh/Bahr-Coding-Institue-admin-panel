import { Controller, useForm } from "react-hook-form"
import { Button, Col, Input, Label, Row, Form } from "reactstrap"


export default function TechForm({control, handleSubmit, onSubmit, errors}) {

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="parentId">
            parentId
          </Label>
          <Controller
            id="parentId"
            name="parentId"
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
                invalid={errors.parentId && true}
              />
            )}
          />
          {errors.parentId && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.parentId.message}
            </p>
          )}
        </Col>
        <Col md="6" className="mb-1">
          <Label className="form-label fs-5" for="techName">
            نام فناوری 
          </Label>
          <Controller
            id="techName"
            name="techName"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.techName && true}
              />
            )}
          />
          {errors.techName && (
            <p
              className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}
            >
              {errors.techName.message}
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
          
          <Label className="form-label fs-5" for="iconAddress">
            iconAddress
          </Label>
          <Controller
            id="iconAddress"
            name="iconAddress"
            control={control}
            rules={{
              required: 'نمی‌تواند خالی باشد',
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="text-right"
                invalid={errors.iconAddress && true}
              />
            )}
          /> 
            {errors.iconAddress && <span className="text-danger"
              style={{ fontSize: '12px', marginTop: '4px' }}>{errors.iconAddress.message}</span>}
      </div>
          
      <Button type="submit" className="me-1 mt-1 w-50" color="primary">
        ایجاد
      </Button>
    </Form>
  )
}