import { getStatus } from '@core/services/api/courseGeneral'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import StatuseCard from './StatuseCard';
import ModalStatus from './ModalStatus';

export default function Status() {
    const[show, setShow] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null);

    const { data:allStatus, isLoading:loadingStatus}= useQuery({
        queryKey:['statuseCards'],
        queryFn:getStatus
    })
    function handleOpenModal(status = null) {
        setSelectedStatus(status); // Set the selected level (null for create)
        setShow(true);
      }

  return (
    <>
    <Card>
        <CardBody className="d-flex justify-content-between">
            <h1 className="text-primary"> استاتوس ها</h1>
            <Button className="add-new-user ms-1" color="primary" onClick={()=>setShow(true)} >
                ایجاد استاتوس جدید
            </Button>
        </CardBody>
    </Card>
    <Container fluid>
        <Row>
            {allStatus?.map(item => (
                <Col xs="12" sm="12" md="6" xl="4" className="">
                    <StatuseCard status={item} handleOpenModal={handleOpenModal} />
                </Col>
            ))}
        </Row>
    </Container>
    <ModalStatus
    show={show}
    setShow={setShow}
    selectedStatus={selectedStatus}
    />
    </>
  )
}
