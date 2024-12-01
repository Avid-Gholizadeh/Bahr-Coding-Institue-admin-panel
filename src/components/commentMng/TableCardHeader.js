import React, {useMemo} from 'react'
import {Col, Input, Row} from 'reactstrap'
import Select from 'react-select'
import {selectThemeColors} from '@utils'

export function TableCardHeader({
    rowsOfPage,
    setRowsOfPage,
    query,
    setQuery,
    isAccept,
    setIsAccept,
    sortingCol,
    setSortingCol,
    singleCourse,
    singleArticle,
}) {
    const acceptOptions = [
        {value: null, label: 'همه'},
        {value: true, label: 'تایید شده'},
        {value: false, label: 'در انتظار تایید'},
    ]

    // console.log(isAccept);
    const sortOptions = [
        {value: '', label: 'پیشفرض'},
        {value: 'DESC', label: 'نزولی'},
        {value: 'ASC', label: 'صعودی'},
    ]
    // console.log(sortingCol);

    return (
        <Row className="w-100  justify-content-between align-items-center">
            <Col md="2" className="d-flex align-items-center p-0">
                <div className="d-flex align-items-center">
                    <label htmlFor="rows-of-page">نمایش</label>
                    <Input
                        className="mx-50"
                        type="select"
                        id="rows-of-page"
                        value={rowsOfPage}
                        onChange={e => setRowsOfPage(Number(e.target.value))}
                        style={{width: '5rem'}}
                    >
                        {[10, 25, 50].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </Input>
                    <label htmlFor="rows-of-page">عدد</label>
                </div>
            </Col>
            {!singleCourse && !singleArticle && (
                <Col
                    md="4"
                    className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                >
                    <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                        <label className="mb-0" htmlFor="search-invoice">
                            جستجو:
                        </label>
                        <Input
                            id="search-invoice"
                            className="ms-50 w-100"
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                </Col>
            )}
            {!singleArticle && (
                <Col
                    md="3"
                    className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1 gap-1 "
                >
                    <label>وضعیت</label>
                    <Select
                        isClearable={false}
                        value={acceptOptions.find(option => option.value === isAccept)}
                        options={acceptOptions}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={option => setIsAccept(option.value)} // Updated to pass the value
                    />
                </Col>
            )}
            {!singleCourse && !singleArticle && (
                <Col
                    md="3"
                    className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1 gap-1"
                >
                    <label>ترتیب</label>
                    <Select
                        isClearable={false}
                        value={sortOptions.find(option => option.value === sortingCol)}
                        options={sortOptions}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={option => setSortingCol(option.value)} // Updated to pass the value
                    />
                </Col>
            )}
        </Row>
    )
}
