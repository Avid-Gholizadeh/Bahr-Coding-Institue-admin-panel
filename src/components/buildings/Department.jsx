import {getAllDepartments} from '@core/services/api/buildings'
import {useQuery} from '@tanstack/react-query'
import {Button, Card, CardBody, Col, Container, Row} from 'reactstrap'
import {DepartmentCard} from './DepartmentCard'
import {CreateDepartmentModal} from './CreateDepartmentModal'
import {useState} from 'react'
import {SearchInput} from '@Components/common/SearchInput'

export function Department() {
    //
    const [showEdit, setShowEdit] = useState({currentDepartment: null, show: false, isEdit: false})
    const [searchTerm, setSearchTerm] = useState(null)

    const {data: departments, isLoading} = useQuery({
        queryKey: ['all-departments-list'],
        queryFn: getAllDepartments,
    })

    let filteredReserves = departments ? [...departments] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredReserves = departments.filter(
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

    function handleSearch(val) {
        setSearchTerm(val)
    }

    return (
        <>
            <Card>
                <CardBody className="d-flex justify-content-between">
                    <h1 className="text-primary"> دپارتمان ها</h1>

                    <div className="d-flex">
                        <SearchInput onSearch={handleSearch} />
                        <Button
                            className="add-new-user ms-1"
                            color="primary"
                            onClick={handleModalOpen}
                        >
                            ایجاد دپارتمان جدید
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Container fluid>
                <Row>
                    {filteredReserves.map(item => (
                        <Col xs="12" sm="12" md="6" xl="4" className="">
                            <DepartmentCard department={item} handleModalOpen={handleModalOpen} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <CreateDepartmentModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            />
        </>
    )
}
