import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getCourseslevels } from '../../../@core/services/api/courseGeneral';
import { Col, Container, Row } from 'reactstrap';
import { LevelsCard } from './LevelsCard';
import LevelModal from './LevelModal';
import { CardViewHeader } from './CardViewHeader';
import {CustomPagination} from '@Components/common/CustomPagination'

export default function Levels() {
  // Separate states for modals
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(6)

  const { data: allLevels, isLoading, isError } = useQuery({
    queryKey: ['levels'],
    queryFn: getCourseslevels,
  });

  // Handlers for opening modals
  function openCreateModal() {
    setSelectedLevel(null); // No selected level for create
    setCreateModalOpen(true);
  }

  function openEditModal(level) {
    setSelectedLevel(level); // Set the selected level for edit
    setEditModalOpen(true);
  }
  let filteredLevels = allLevels ? [...allLevels] : []
  if (searchTerm && searchTerm?.trim().length !== 0) {
    filteredLevels = allLevels.filter(
          item => item.levelName?.includes(searchTerm) || item.buildingName?.includes(searchTerm)
      )
  }
  function dataToRender() {
    if (allLevels) {
        const allData = [...filteredLevels]

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
        title={'سطح'}
        />
      <Container fluid>
        <Row>
            {dataToRender()?.map(item => (
            <Col xs="12" sm="12" md="6" xl="4" key={item.id}>
                <LevelsCard Level={item} handleOpenModal={openEditModal} />
            </Col>
            ))}
        </Row>
      </Container>
      <CustomPagination
        totalItem={filteredLevels.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        handlePagination={handlePagination}
        />
      {/* Create Modal */}
      <LevelModal
        show={isCreateModalOpen}
        setShow={setCreateModalOpen}
        selectedLevel={null} // No level is passed for creating
      />
      {/* Edit Modal */}
      <LevelModal
        show={isEditModalOpen}
        setShow={setEditModalOpen}
        selectedLevel={selectedLevel} // Selected level is passed for editing
      />
    </>
  );
}
