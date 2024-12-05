import DataTable from 'react-data-table-component'
import {useQuery} from '@tanstack/react-query'
import {getAllCourses, getCourseByIdAdmin} from '../../@core/services/api/courses'
import {useState} from 'react'
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner, UncontrolledTooltip} from 'reactstrap'
import {ChevronDown, Maximize} from 'react-feather'
import {FormWizard} from './formWizard/formWizard'
import {useTableColumns} from './TableColumns'
import {CustomPagination} from '@Components/common/CustomPagination'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {CustomHeader} from './CustomHeader'
import {Link} from 'react-router-dom'

export function Table({selectable, onSelect}) {
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: ''})
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState({currentCourseId: null, show: false})

    const columns = useTableColumns({setShowEdit, selectable})

    function handleSelectedRowsChange({selectedRows}) {
        onSelect(selectedRows[0])
    }

    function handleToggleModal() {
        setShow(prevS => !prevS)
    }

    const {data: courses, isLoading} = useQuery({
        queryKey: ['allCourses', params],
        queryFn: () => getAllCourses(params),
    })

    const {data: singleCourse} = useQuery({
        queryKey: ['single-course', showEdit.currentCourseId],
        queryFn: () => getCourseByIdAdmin(showEdit.currentCourseId),
        enabled: Boolean(showEdit.currentCourseId),
    })

    function handleSearch(val) {
        setParams(prevState => ({...prevState, Query: val, PageNumber: 1}))
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
        setParams(prevState => ({...prevState, RowsOfPage: value, PageNumber: 1}))
    }

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

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
                <div className="react-dataTable app-user-list">
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        progressPending={isLoading}
                        noDataComponent={
                            <span className="my-4 fs-4 text-primary">دیتایی وجود ندارد</span>
                        }
                        progressComponent={<Spinner className="mb-5 mt-4" color="primary" />}
                        columns={columns}
                        // onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={courses?.courseDtos}
                        selectableRows={selectable}
                        selectableRowsSingle
                        onSelectedRowsChange={handleSelectedRowsChange}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={params.RowsOfPage}
                                handleToggleModal={handleToggleModal}
                                handlePerPage={handlePerPage}
                                buttonText="ایجاد دوره جدید"
                                pageTitle="دوره"
                                onSearch={handleSearch}
                                selectable={selectable}
                            />
                        }
                    />
                </div>
            </Card>

            <Modal
                isOpen={show}
                toggle={handleToggleModal}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={handleToggleModal}>
                    <Button.Ripple
                        tag={Link}
                        to="/create-course"
                        className="btn-icon"
                        outline
                        color="primary"
                        id="fullScreen"
                    >
                        <Maximize size={14} />
                    </Button.Ripple>
                    <UncontrolledTooltip placement="top" target="fullScreen">
                        تمام صفحه
                    </UncontrolledTooltip>
                </ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 20}}>
                    <FormWizard setShow={handleToggleModal} />
                </ModalBody>
            </Modal>

            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentCourseId: null, show: false})}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentCourseId: null, show: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard
                        key={Boolean(singleCourse)}
                        isEdit={Boolean(singleCourse)}
                        courseData={singleCourse}
                        setShow={() => setShowEdit({currentCourseId: null, show: false})}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
