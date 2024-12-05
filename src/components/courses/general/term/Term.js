import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { CardViewHeader } from '../CardViewHeader';
import {CustomPagination} from '@Components/common/CustomPagination'
import { getTerms } from '@core/services/api/courseGeneral';
import { TermCard } from './TermCard';
import TermModal from './TermModal';

export default function Term() {
  // Separate states for modals
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(6)
     
  const{data:allTerms, isLoading} = useQuery({
    queryKey:['allTerms'],
    queryFn: getTerms
  })
  console.log(allTerms|| []);


  // Handlers for opening modals
  function openCreateModal() {
    setSelectedTerm(null); // No selected level for create
    setCreateModalOpen(true);
  }

  function openEditModal(term) {
    setSelectedTerm(term); // Set the selected level for edit
    setEditModalOpen(true);
  }
  let filteredTerms = allTerms ? [...allTerms] : []
  if (searchTerm && searchTerm?.trim().length !== 0) {
    filteredTerms = allTerms.filter(
          item => item.termName?.includes(searchTerm) || item.buildingName?.includes(searchTerm)
      )
  }
  function dataToRender() {
    if (allTerms) {
        const allData = [...filteredTerms]

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
       <CardViewHeader
        handleSearch={handleSearch}
        rowsPerPage={rowsPerPage}
        handlePerPage={handlePerPage}
        handleModalOpen={openCreateModal}
        title={'ترم'}
        />
      <Container fluid>
        <Row>
            {dataToRender()?.map(item => (
            <Col xs="12" sm="12" md="6" xl="4" key={item.id}>
                <TermCard term={item} handleOpenModal={openEditModal} />
            </Col>
            ))}
        </Row>
      </Container>
      <CustomPagination
        totalItem={filteredTerms.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        handlePagination={handlePagination}
        />

        <TermModal
          show={isCreateModalOpen}
          setShow={setCreateModalOpen}
          selectedTerm={null}

        />
        <TermModal
          show={isEditModalOpen}
          setShow={setEditModalOpen}
          selectedTerm={selectedTerm}
        />
    </>
  );
}
