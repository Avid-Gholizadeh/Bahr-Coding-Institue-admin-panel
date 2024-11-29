import {useRef} from 'react'
import {Button, Col, Input, Row} from 'reactstrap'

export function CustomHeader({
    handlePerPage,
    RowsOfPage,
    handleToggleModal,
    onSearch,
    buttonText,
    pageTitle,
    selectable,
    course,
    singleGroup,
    isArticle,
    isActive,
    onStatusChange,
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
        <>
            <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
                <Row>
                    <Col
                        xl="6"
                        className="d-flex align-items-sm-center justify-content-xl-start justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1 "
                    >
                        {!course && (
                            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
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
                        )}
                        {course && <div className="fs-4 ps-1">گروه های درسی</div>}

                        {isArticle && (
                            <div className="d-flex align-items-center ms-2">
                                <label htmlFor="rows-per-page">وضعیت</label>
                                <Input
                                    className="mx-50"
                                    type="select"
                                    id="rows-per-page"
                                    value={isActive}
                                    onChange={onStatusChange}
                                    style={{width: '7rem'}}
                                >
                                    <option value={true}>فعال</option>
                                    <option value={false}>غیر‌فعال</option>
                                </Input>
                            </div>
                        )}
                    </Col>

                    <Col
                        xl="6"
                        className="d-flex gap-5 align-items-center justify-content-start justify-content-xl-end p-0 mt-2 mt-xl-0 "
                    >
                        {!course && !singleGroup && (
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
                                <label htmlFor="rows-per-page">{pageTitle} در صفحه</label>
                            </div>
                        )}

                        {!selectable && (
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
        </>
    )
}
