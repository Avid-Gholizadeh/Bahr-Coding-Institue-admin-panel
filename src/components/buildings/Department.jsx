import {getAllDepartments} from '@core/services/api/buildings'
import {useQuery} from '@tanstack/react-query'
import {Button, Card, CardBody, Col, Container, Row} from 'reactstrap'
import {DepartmentCard} from './DepartmentCard'
import {CreateDepartmentModal} from './CreateDepartmentModal'
import {useState} from 'react'

export function Department() {
    //
    const [showEdit, setShowEdit] = useState({currentDepartment: null, show: false, isEdit: false})

    const {data: departments, isLoading} = useQuery({
        queryKey: ['all-departments-list'],
        queryFn: getAllDepartments,
    })

    function handleModalOpen(department) {
        setShowEdit({
            currentdepartment: department,
            show: true,
            isEdit: department.depName ? true : false,
        })
    }

    return (
        <>
            <Card>
                <CardBody className="d-flex justify-content-between">
                    <h1 className="text-primary"> دپارتمان ها</h1>
                    <Button className="add-new-user ms-1" color="primary" onClick={handleModalOpen}>
                        ایجاد دپارتمان جدید
                    </Button>
                </CardBody>
            </Card>
            <Container fluid>
                <Row>
                    {departments?.map(item => (
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
