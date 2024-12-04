import DataTable from 'react-data-table-component'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {ChevronDown} from 'react-feather'
import {Button, Card, CardBody, Col, Row, Spinner} from 'reactstrap'
import {useState} from 'react'
import {CustomPagination} from '@Components/common/CustomPagination'
import {useQuery} from '@tanstack/react-query'
import {useSocialGroupColumns} from './useSocialGroupColumns'
import {getAllSocialGroups} from '@core/services/api/social-groups.api'
import {SearchInput} from '@Components/common/SearchInput'

export function SocialGroups() {
    //
    const [currentPage, setCurrentPage] = useState(1)
    const [showEdit, setShowEdit] = useState({currentBuilding: null, show: false, isEdit: false})
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const [sort, setSort] = useState({workDate: false, active: false, direction: 'desc'})
    const columns = useSocialGroupColumns({handleModalOpen})

    const {data: socialGroups, isLoading} = useQuery({
        queryKey: ['all-socialGroups-list'],
        queryFn: getAllSocialGroups,
    })

    let filteredSocialGroups = socialGroups ? [...socialGroups] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredSocialGroups = socialGroups.filter(item => item.buildingName?.includes(searchTerm))
    }

    function dataToRender() {
        if (socialGroups) {
            const allData = [...filteredSocialGroups]

            if (sort.workDate || sort.active) {
                if (sort.workDate) {
                    if (sort.direction === 'desc') {
                        allData.sort((a, b) => new Date(a.workDate) - new Date(b.workDate))
                    } else {
                        allData.sort((a, b) => new Date(b.workDate) - new Date(a.workDate))
                    }
                } else {
                    if (sort.direction === 'desc') {
                        allData.sort((a, b) => Number(a.active) - Number(b.active))
                    } else {
                        allData.sort((a, b) => Number(b.active) - Number(a.active))
                    }
                }
            }

            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }

    function handleModalOpen(building) {
        setShowEdit({
            currentBuilding: building,
            show: true,
            isEdit: building.buildingName ? true : false,
        })
    }

    function handleSort(column, sortDirection) {
        if (column.sortField === 'workDate') {
            setSort({workDate: true, active: false, direction: sortDirection})
        } else {
            setSort({workDate: false, active: true, direction: sortDirection})
        }
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }
    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }
    function handleSearch(val) {
        setSearchTerm(val)
        setCurrentPage(1)
    }
    function Pagination() {
        return (
            <>
                <CustomPagination
                    totalItem={filteredSocialGroups.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                />
            </>
        )
    }

    function CustomHeader({
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
                        onSort={handleSort}
                        sortIcon={<ChevronDown className="text-danger" />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={rowsPerPage}
                                handlePerPage={handlePerPage}
                                onSearch={handleSearch}
                                title="ساختمان"
                                handleToggleModal={handleModalOpen}
                                buttonText="ایجاد ساختمان جدید"
                            />
                        }
                    />
                </div>
            </Card>

            {/*  <CreateBuildingModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            /> */}
        </>
    )
}
