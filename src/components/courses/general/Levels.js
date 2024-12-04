import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getCourseslevels } from '../../../@core/services/api/courseGeneral'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import { LevelsCard } from './LevelsCard';
import LevelModal from './LevelModal';

export default function Levels() {
    const [show, setShow] = useState(false)
    const [selectedLevel, setSelectedLevel] = useState(null);
    const { data:allLevels, isLoading, isError} = useQuery({
        queryKey:['levels'],
        queryFn: getCourseslevels
    })
    function handleOpenModal(level = null) {
        setSelectedLevel(level); // Set the selected level (null for create)
        setShow(true);
      }
  return (
    <>
    <Card>
        <CardBody className="d-flex justify-content-between">
            <h1 className="text-primary"> سطوح </h1>
            <Button className="add-new-user ms-1" color="primary" onClick={() => handleOpenModal()}>
                سطح جدید
            </Button>
        </CardBody>
    </Card>
    <Container fluid>
        <Row>
            {allLevels?.map(item => (
                <Col xs="12" sm="12" md="6" xl="4" className="">
                    <LevelsCard Level={item} handleOpenModal={handleOpenModal} />
                </Col>
            ))}
        </Row>
    </Container>
      <LevelModal
        show={show}
        setShow={setShow}
        selectedLevel={selectedLevel}
      />
    </>
  )
}
