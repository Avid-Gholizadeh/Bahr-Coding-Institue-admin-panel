import {Col, Input, Row} from 'reactstrap'

export function CustomHeader({handlePerPage, RowsOfPage, singleCourseId}) {
    return (
        <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
            <Row>
                <Col xl="6" className="">
                    {singleCourseId && <span className="fs-4">رزرو های دوره</span>}
                    {!singleCourseId && (
                        <div className="d-flex align-items-center  ">
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
                            <label htmlFor="rows-per-page">رزرو در صفحه</label>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}
