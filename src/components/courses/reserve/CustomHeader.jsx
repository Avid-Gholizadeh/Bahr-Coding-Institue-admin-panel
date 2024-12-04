import {DataCountDropDown} from '@Components/common/DataCountDropDown'
import {SearchInput} from '@Components/common/SearchInput'
import {Button, Col, Row} from 'reactstrap'

export function CustomHeader({
    handlePerPage,
    RowsOfPage,
    singleCourseId,
    onSearch,
    title,
    handleToggleModal,
    buttonText,
}) {
    return (
        <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
            <Row>
                {singleCourseId && <span className="fs-4">رزرو های دوره</span>}
                {!singleCourseId && (
                    <Col>
                        <SearchInput onSearch={onSearch} />
                    </Col>
                )}

                <Col className="d-flex gap-4 align-items-center justify-content-end">
                    {!singleCourseId && (
                        <DataCountDropDown
                            RowsOfPage={RowsOfPage}
                            handlePerPage={handlePerPage}
                            title={title}
                            counts={[10, 25, 50]}
                        />
                    )}

                    {buttonText && (
                        <Button
                            className="add-new-user ms-1"
                            color="primary"
                            onClick={handleToggleModal}
                        >
                            {buttonText}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    )
}
