import React from 'react'
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import { Archive, DollarSign, Smile, Users } from 'react-feather'

function AllPayments({dashReportData}) {
    console.log(dashReportData);
  return (
    <>
    <Row>
    <Col>
        <Card className='text-center'>
        <CardBody style={{'height':'200px'}}>
            <div className={`avatar p-50 m-0 mb-1 bg-light-primary`}>
            <div className='avatar-content'> <DollarSign/> </div>
            </div>
            <h2 className='fw-bolder'>{dashReportData?.allPaymentCost || 0}</h2>
            <p className='card-text line-ellipsis'>مجموع پرداخت ها</p>
        </CardBody>
        </Card>
    </Col>
    <Col>
        <Card className='text-center'>
        <CardBody style={{'height':'200px'}}>
            <div className={`avatar p-50 m-0 mb-1 bg-light-success`}>
            <div className='avatar-content'> <Smile/> </div>
            </div>
            <h2 className='fw-bolder'>{Math.round(dashReportData?.activeUserPercent)}%</h2>
            <p className='card-text line-ellipsis'> کاربران فعال </p>
        </CardBody>
        </Card>
    </Col>
    </Row>
    <Row>
    <Col>
        <Card className='text-center'>
        <CardBody style={{'height':'200px'}}>
            <div className={`avatar p-50 m-0 mb-1 bg-light-danger`}>
            <div className='avatar-content'> <Archive/> </div>
            </div>
            <h2 className='fw-bolder'>{dashReportData?.allReserveNotAccept} </h2>
            <p className='card-text line-ellipsis'> پرداخت های پذیرفته نشده</p>
        </CardBody>
        </Card>
    </Col>
    <Col>
        <Card className='text-center'>
        <CardBody style={{'height':'200px'}}>
            <div className={`avatar p-50 m-0 mb-1 bg-light-info`} >
            <div className='avatar-content'> <Users/> </div>
            </div>
            <h2 className='fw-bolder'>{dashReportData?.allUser}</h2>
            <p className='card-text line-ellipsis'> تعداد تمام کاربران</p>
        </CardBody>
        </Card>
    </Col>
    </Row>
    </>
  )
}

export default AllPayments
