import React from 'react'
import {Row, Col, Input, Button} from 'reactstrap'

export const CustomHeader = ({
    toggleSidebar,
    handlePerPage,
    handleQuery,
    rowsPerPage,
    searchTerm,
    selectable,
}) => (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row className="gap-3 gap-xl-0">
            <Col
                xl="6"
                className="d-flex align-items-sm-center flex-xl-nowrap flex-wrap flex-sm-row flex-column mt-xl-0 mt-1 "
            >
                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                    <label className="mb-0" htmlFor="search-invoice">
                        جستجو:
                    </label>
                    <Input
                        id="search-invoice"
                        className="ms-50 w-100"
                        type="text"
                        value={searchTerm}
                        onChange={e => handleQuery(e.target.value)}
                    />
                </div>
            </Col>

            <Col xl="6" className="d-flex align-items-center gap-3 p-0 justify-content-xl-end">
                <div className="d-flex align-items-center ">
                    <label htmlFor="rows-per-page">نمایش</label>
                    <Input
                        className="mx-50"
                        type="select"
                        id="rows-per-page"
                        value={rowsPerPage}
                        onChange={e => handlePerPage(e.target.value)}
                        style={{width: '5rem'}}
                    >
                        {[10, 25, 50].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </Input>
                    <label htmlFor="rows-per-page">عدد</label>
                </div>

                {!selectable && (
                    <Button color="primary" onClick={toggleSidebar} className="add-new-user">
                        اضافه کردن کاربر جدید
                    </Button>
                )}
            </Col>
        </Row>
    </div>
)
