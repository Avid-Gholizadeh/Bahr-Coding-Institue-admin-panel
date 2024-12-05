import { getStatus } from '@core/services/api/courseGeneral';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import StatuseCard from './StatuseCard';
import ModalStatus from './ModalStatus';
import { CardViewHeader } from '../CardViewHeader';
import { CustomPagination } from '@Components/common/CustomPagination';

export default function Status() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(6)

  const { data: allStatus, isLoading: loadingStatus } = useQuery({
    queryKey: ['statuseCards'],
    queryFn: getStatus,
  });

  function openCreateModal() {
    setSelectedStatus(null); // Clear any previously selected status
    setCreateModalOpen(true);
  }

  function openEditModal(status) {
    setSelectedStatus(status); // Set the selected status for editing
    setEditModalOpen(true);
  }
  let filteredStatus = allStatus ? [...allStatus] : []
  if (searchTerm && searchTerm?.trim().length !== 0) {
    filteredStatus = allStatus.filter(
          item => item.statusName?.includes(searchTerm) || item.buildingName?.includes(searchTerm)
      )
  }
  function dataToRender() {
    if (allStatus) {
        const allData = [...filteredStatus]

        return allData?.filter(
            (_, index) =>
                index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
        )
    }
    }

    function handleSearch(val) {
        setSearchTerm(val)
    }
    function handlePagination(page) {
        setCurrentPage(page.selected + 1)
    }
    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }

  return (
    <>
      {/* <Card>
        <CardBody className="d-flex justify-content-between">
          <h1 className="text-primary">استاتوس ها</h1>
          <Button className="add-new-user ms-1" color="primary" onClick={openCreateModal}>
            ایجاد استاتوس جدید
          </Button>
        </CardBody>
      </Card> */}
      <CardViewHeader
        handleSearch={handleSearch}
        rowsPerPage={rowsPerPage}
        handlePerPage={handlePerPage}
        handleModalOpen={openCreateModal}
        title={'استاتوس'}
      />
      {/* <Container fluid>
        <Row>
          {allStatus?.map((item) => (
            <Col xs="12" sm="12" md="6" xl="4" key={item.id}>
              <StatuseCard status={item} handleOpenModal={openEditModal} />
            </Col>
          ))}
        </Row>
      </Container> */}
            <Container fluid>
        <Row>
            {dataToRender()?.map(item => (
            <Col xs="12" sm="12" md="6" xl="4" key={item.id}>
              <StatuseCard status={item} handleOpenModal={openEditModal} />
            </Col>
            ))}
        </Row>
      </Container>
      <CustomPagination
        totalItem={filteredStatus.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        handlePagination={handlePagination}
        />
      {/* Create Modal */}
      <ModalStatus
        show={isCreateModalOpen}
        setShow={setCreateModalOpen}
        selectedStatus={null} // Pass null for creating a new status
      />
      {/* Edit Modal */}
      <ModalStatus
        show={isEditModalOpen}
        setShow={setEditModalOpen}
        selectedStatus={selectedStatus} // Pass the selected status for editing
      />
    </>
  );
}
