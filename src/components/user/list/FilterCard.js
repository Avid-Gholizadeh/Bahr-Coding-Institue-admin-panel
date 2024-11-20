import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Label } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const FilterCard = ({
  roleOptions,
  sortOptions,
  statusOptions,
  currentRole,
  currentSort,
  currentStatus,
  setPageNumber,
  setCurrentRole,
  setSortOrder,
  setSortColumn,
  setCurrentSort,
  setCurrentStatus,
  handleSort
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>فیلتر ها</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md='3'>
            <Label for='role-select'>نقش</Label>
            <Select
              isClearable={false}
              value={currentRole}
              options={roleOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              onChange={(data) => { setPageNumber(1); setCurrentRole(data) }}
            />
          </Col>
          <Col md='3'>
            <Label for='role-select'>تاریخ ثبت نام</Label>
            <Select
              isClearable={false}
              value={currentSort}
              options={sortOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              onChange={(data) => {
                setPageNumber(1)
                setSortOrder(data.value)
                setSortColumn(data.type)
                setCurrentSort(data)
              }}
            />
          </Col>
          <Col md='2'>
            <Label for='status-select'>وضعیت</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className='react-select'
              classNamePrefix='select'
              options={statusOptions}
              value={currentStatus}
              onChange={(data) => {
                setPageNumber(1)
                setCurrentStatus(data)
                handleSort(data)
              }}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default FilterCard
