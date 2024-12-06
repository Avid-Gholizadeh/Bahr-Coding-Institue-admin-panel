import {useQuery} from '@tanstack/react-query'
import {Col, Container, Row} from 'reactstrap'
import {CreateDepartmentModal} from './CreateDepartmentModal'
import {useState} from 'react'
import {CustomPagination} from '@Components/common/CustomPagination'
import {CardViewHeader} from '@Components/common/CardViewHeader'
import {getAllClassRooms} from '@core/services/api/buildings'
import {ClassRoomCard} from './ClassRoomCard'
import {CreateClassRoomModal} from './CreateClassRoomModal'

export function ClassRoom() {
    const [showEdit, setShowEdit] = useState({currentClassRoom: null, show: false, isEdit: false})
    const [searchTerm, setSearchTerm] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(6)

    const {data: classRooms, isLoading} = useQuery({
        queryKey: ['all-classRoom-list'],
        queryFn: getAllClassRooms,
    })

    let filteredClassRooms = classRooms ? [...classRooms] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredClassRooms = classRooms.filter(
            item => item.depName?.includes(searchTerm) || item.buildingName?.includes(searchTerm)
        )
    }

    function handleModalOpen(classRoom) {
        setShowEdit({
            currentClassRoom: classRoom,
            show: true,
            isEdit: classRoom.classRoomName ? true : false,
        })
    }

    function dataToRender() {
        if (classRooms) {
            const allData = [...filteredClassRooms]

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
        setCurrentPage(1)
    }

    return (
        <>
            <CardViewHeader
                handleSearch={handleSearch}
                rowsPerPage={rowsPerPage}
                handlePerPage={handlePerPage}
                handleModalOpen={handleModalOpen}
                title={'کلاس'}
            />

            <Container fluid>
                <Row>
                    {dataToRender()?.map(item => (
                        <Col key={item.id} xs="12" sm="12" md="6" xl="4">
                            <ClassRoomCard classRoom={item} handleModalOpen={handleModalOpen} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <CustomPagination
                totalItem={filteredClassRooms.length}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                handlePagination={handlePagination}
            />

            <CreateClassRoomModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            />
        </>
    )
}
