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
    isArticleCategory,
}) {
    const timeout = useRef(null)

    function handleSearch(val) {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            onSearch(val)
            timeout.current = null
        }, 1000)
    }

    return (
        <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
            <Row>
                {singleCourseId && <span className="fs-4">رزرو های دوره</span>}
                {!singleCourseId && (
                    <Col>
                        <div
                            className="d-flex align-items-center mb-sm-0 mb-1 me-1"
                            style={{maxWidth: 300}}
                        >
                            <label className="mb-0" htmlFor="search-invoice">
                                جستوجو:
                            </label>
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                onChange={e => handleSearch(e.target.value)}
                            />
                        </div>
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
                    {isArticleCategory && (
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
