import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getCourseslevels } from '../../../@core/services/api/courseGeneral'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import { LevelsCard } from './LevelsCard';
import CreateLevelModal from './CreateLevelModal';

export default function Levels() {
    const [show, setShow] = useState(false)
    const { data:allLevels, isLoading, isError} = useQuery({
        queryKey:['levels'],
        queryFn: getCourseslevels
    })
    // console.log(allLevels);
    function handleOpenModal(){
        setShow(true);
    }
  return (
    <>
    <Card>
        <CardBody className="d-flex justify-content-between">
            <h1 className="text-primary"> سطوح </h1>
            <Button className="add-new-user ms-1" color="primary" onClick={handleOpenModal}>
                سطح جدید
            </Button>
        </CardBody>
    </Card>
    <Container fluid>
        <Row>
            {allLevels?.map(item => (
                <Col xs="12" sm="12" md="6" xl="3" className="">
                    <LevelsCard Levels={item} handleModalOpen />
                </Col>
            ))}
        </Row>
    </Container>
      <CreateLevelModal
        show={show}
        setShow={setShow}
      />
    </>
  )
}
