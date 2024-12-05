import {Button, Card, CardBody, Col, Row} from 'reactstrap'
import {SearchInput} from '@Components/common/SearchInput'
import {DataCountDropDown} from '@Components/common/DataCountDropDown'

export function CardViewHeader({handleSearch, rowsPerPage, handlePerPage, handleModalOpen, title}) {
    return (
        <Card>
            <CardBody>
                <Row className="w-100">
                    <Col lg="6" className="d-flex gap-4">
                        <h1 className="text-primary" style={{transform: 'translateY(5px)'}}>
                            {title} ها
                        </h1>
                        <SearchInput onSearch={handleSearch} />
                    </Col>

                    <Col lg="6" className="d-flex mt-3 mt-lg-0 gap-2 justify-content-lg-end">
                        <DataCountDropDown
                            RowsOfPage={rowsPerPage}
                            handlePerPage={handlePerPage}
                            title={title}
                            counts={[6, 9, 12]}
                        />
                        <Button
                            className="add-new-user ms-1"
                            color="primary"
                            onClick={handleModalOpen}
                        >
                            ایجاد {title} جدید
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
