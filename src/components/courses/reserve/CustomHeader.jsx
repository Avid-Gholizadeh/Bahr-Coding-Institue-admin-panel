import {SearchInput} from '@Components/common/SearchInput'
import {useRef} from 'react'
import {Button, Col, Input, Row} from 'reactstrap'

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
                        <div className="d-flex align-items-center justify-content-end ">
                            <label htmlFor="rows-per-page">تعداد</label>
                            <Input
                                className="mx-50"
                                type="select"
                                id="rows-per-page"
                                value={RowsOfPage}
                                onChange={handlePerPage}
                                style={{width: '5rem'}}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </Input>
                            <label htmlFor="rows-per-page">{title} در صفحه</label>
                        </div>
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
