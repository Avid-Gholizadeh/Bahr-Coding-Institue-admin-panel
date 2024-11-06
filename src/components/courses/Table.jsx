import '@styles/react/libs/react-select/_react-select.scss'
import ReactPaginate from 'react-paginate'
import {useQuery} from '@tanstack/react-query'
import {getAllCourses} from '../../@core/services/api/courses'
import {useRef, useState} from 'react'
import DataTable from 'react-data-table-component'
import {Button, Card, Col, Input, Row} from 'reactstrap'
import {Columns} from './TableColumns'
import {ChevronDown} from 'react-feather'

export function Table() {
    const timeout = useRef(null)
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: null})

    const {data: courses} = useQuery({
        queryKey: ['allCourses', params],
        queryFn: () => getAllCourses(params),
    })

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

    const handleSearch = val => {
        console.log(val)
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            setParams(prevState => ({...prevState, Query: val}))
            timeout.current = null
        }, 1000)
    }

    /* const dataToRender = () => {
        const filters = {
            role: currentRole.value,
            currentPlan: currentPlan.value,
            status: currentStatus.value,
            q: searchTerm,
        }
         const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })
        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    } */

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setParams(prevState => ({...prevState, RowsOfPage: value}))
    }

    const CustomHeader = ({handlePerPage, RowsOfPage, handleSearch, searchTerm}) => {
        return (
            <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
                <Row>
                    <Col
                        xl="6"
                        className="d-flex align-items-sm-center justify-content-xl-start justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                    >
                        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                            <label className="mb-0" htmlFor="search-invoice">
                                جستوجو:
                            </label>
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                value={searchTerm}
                                onChange={e => handleSearch(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col xl="6" className="d-flex gap-5 align-items-center justify-content-end p-0">
                        <div className="d-flex align-items-center ww-100 ">
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
                            <label htmlFor="rows-per-page">دوره در صفحه</label>
                        </div>

                        <Button
                            className="add-new-user"
                            color="primary" /* onClick={toggleSidebar} */
                        >
                            ایجاد دوره جدید
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }

    const CustomPagination = () => {
        const count = Number(Math.ceil(courses?.totalCount / params.RowsOfPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName="active"
                forcePage={params.PageNumber !== 0 ? params.PageNumber - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-center my-2 pe-1'}
            />
        )
    }

    return (
        <Card className="overflow-hidden">
            <div className="react-dataTable">
                <DataTable
                    noHeader
                    subHeader
                    sortServer
                    pagination
                    responsive
                    paginationServer
                    columns={Columns}
                    // onSort={handleSort}
                    sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    paginationComponent={CustomPagination}
                    data={/* dataToRender() */ courses?.courseDtos}
                    subHeaderComponent={
                        <CustomHeader
                            // store={store}
                            searchTerm={params.Query}
                            RowsOfPage={params.RowsOfPage}
                            handleSearch={handleSearch}
                            handlePerPage={handlePerPage}
                            // toggleSidebar={toggleSidebar}
                        />
                    }
                />
            </div>
        </Card>
    )
}
