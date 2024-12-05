import {getAllDepartments} from '@core/services/api/buildings'
import {useQuery} from '@tanstack/react-query'
import {Col, Container, Row} from 'reactstrap'
import {DepartmentCard} from './DepartmentCard'
import {CreateDepartmentModal} from './CreateDepartmentModal'
import {useState} from 'react'
import {CustomPagination} from '@Components/common/CustomPagination'
import {CardViewHeader} from '@Components/common/CardViewHeader'

export function Department() {
    //
    const [showEdit, setShowEdit] = useState({currentDepartment: null, show: false, isEdit: false})
    const [searchTerm, setSearchTerm] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(6)

    const {data: departments, isLoading} = useQuery({
        queryKey: ['all-departments-list'],
        queryFn: getAllDepartments,
    })

    let filteredDepartments = departments ? [...departments] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredDepartments = departments.filter(
            item => item.depName?.includes(searchTerm) || item.buildingName?.includes(searchTerm)
        )
    }

    function handleModalOpen(department) {
        setShowEdit({
            currentDepartment: department,
            show: true,
            isEdit: department.depName ? true : false,
        })
    }

    function dataToRender() {
        if (departments) {
            const allData = [...filteredDepartments]

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
                title={'دپارتمان'}
            />

            <Container fluid>
                <Row>
                    {dataToRender()?.map(item => (
                        <Col xs="12" sm="12" md="6" xl="4">
                            <DepartmentCard department={item} handleModalOpen={handleModalOpen} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <CustomPagination
                totalItem={filteredDepartments.length}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                handlePagination={handlePagination}
            />

            <CreateDepartmentModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            />
        </>
    )
}
