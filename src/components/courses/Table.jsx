import {useQuery} from '@tanstack/react-query'
import {
    getAllCourses,
    getCourseByIdAdmin,
    getCreateCourseStep1,
} from '../../@core/services/api/courses'
import {useCallback, useRef, useState} from 'react'
import DataTable from 'react-data-table-component'
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row, Spinner} from 'reactstrap'
import {ChevronDown} from 'react-feather'
import {FormWizard} from './formWizard/formWizard'
import {useTableColumns} from './TableColumns'
import {CustomPagination} from '@Components/common/CustomPagination'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'

export function Table() {
    const timeout = useRef(null)
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: ''})
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState({currentCourseId: null, show: false})
    const columns = useTableColumns({setShowEdit})

    const {data: courses, isLoading} = useQuery({
        queryKey: ['allCourses', params],
        queryFn: () => getAllCourses(params),
    })

    const {data: singleCourse} = useQuery({
        queryKey: ['single-course', showEdit.currentCourseId],
        queryFn: () => getCourseByIdAdmin(showEdit.currentCourseId),
        enabled: Boolean(showEdit.currentCourseId),
    })

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

    const handleSearch = val => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            setParams(prevState => ({...prevState, Query: val, PageNumber: 1}))
            // params.current = {...params.current, Query: val}
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

    const CustomHeader = useCallback(
        ({handlePerPage, RowsOfPage, handleSearch, currentSearchTerm}) => {
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
                                    onChange={e => handleSearch(e.target.value)}
                                />
                            </div>
                        </Col>
                        <Col
                            xl="6"
                            className="d-flex gap-5 align-items-center justify-content-start justify-content-xl-end p-0 mt-2 mt-xl-0"
                        >
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
                                <label htmlFor="rows-per-page">دوره در صفحه</label>
                            </div>

                            <Button
                                className="add-new-user"
                                color="primary"
                                onClick={() => setShow(prevS => !prevS)}
                            >
                                ایجاد دوره جدید
                            </Button>
                        </Col>
                    </Row>
                </div>
            )
        },
        []
    )

    function Pagination() {
        return (
            <CustomPagination
                totalItem={courses?.totalCount}
                rowsPerPage={params.RowsOfPage}
                currentPage={params.PageNumber}
                handlePagination={handlePagination}
            />
        )
    }

    return (
        <>
            <Card className="overflow-hidden">
                <div className="react-dataTable">
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        progressPending={isLoading}
                        noDataComponent={
                            <span className="my-4 fs-2 text-primary">دیتایی وجود ندارد</span>
                        }
                        progressComponent={<Spinner className="mb-5 mt-4" color="primary" />}
                        columns={columns}
                        // onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={/* dataToRender() */ courses?.courseDtos}
                        subHeaderComponent={
                            <CustomHeader
                                currentSearchTerm={params.Query}
                                RowsOfPage={params.RowsOfPage}
                                handleSearch={handleSearch}
                                handlePerPage={handlePerPage}
                            />
                        }
                    />
                </div>
            </Card>

            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard setShow={setShow} />
                </ModalBody>
            </Modal>

            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit(prevS => ({...prevS, show: !prevS.show}))}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit(prevS => ({...prevS, show: !prevS.show}))}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard
                        key={Boolean(singleCourse)}
                        isEdit={Boolean(singleCourse)}
                        courseData={singleCourse}
                        setShow={() => setShowEdit(prevS => ({...prevS, show: !prevS.show}))}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
