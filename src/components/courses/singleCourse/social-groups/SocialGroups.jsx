import DataTable from 'react-data-table-component'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {ChevronDown} from 'react-feather'
import {Button, Card, CardBody, Col, Row, Spinner} from 'reactstrap'
import {useState} from 'react'
import {CustomPagination} from '@Components/common/CustomPagination'
import {useQuery} from '@tanstack/react-query'

import {getAllSocialGroups} from '@core/services/api/social-groups.api'
import {SearchInput} from '@Components/common/SearchInput'
import {useParams} from 'react-router-dom'
import {useSocialGroupColumns} from '../useSocialGroupColumns'
import {CreateGroupModal} from './CreateGroupModal'

export function SocialGroups() {
    const {id} = useParams()
    //
    const [currentPage, setCurrentPage] = useState(1)
    const [showEdit, setShowEdit] = useState({currentSocialGroup: null, show: false, isEdit: false})
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const columns = useSocialGroupColumns({handleModalOpen})

    let {data: socialGroups, isLoading} = useQuery({
        queryKey: ['all-socialGroups-list'],
        queryFn: getAllSocialGroups,
    })

    socialGroups = socialGroups ? socialGroups.filter(item => item.courseId === id) : []

    let filteredSocialGroups = socialGroups ? [...socialGroups] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredSocialGroups = socialGroups.filter(item => item.buildingName?.includes(searchTerm))
    }

    function dataToRender() {
        if (socialGroups) {
            const allData = [...filteredSocialGroups]

            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }

    function handleModalOpen(socialGroup) {
        setShowEdit({
            currentSocialGroup: socialGroup,
            show: true,
            isEdit: socialGroup.groupLink ? true : false,
        })
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }
    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
        setCurrentPage(1)
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

    function CustomHeader() {
        return (
            <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
                <Row>
                    <Col>
                        <SearchInput onSearch={handleSearch} />
                    </Col>

                    <Col className="d-flex gap-4 align-items-center justify-content-end">
                        <Button
                            className="add-new-user ms-1"
                            color="primary"
                            onClick={handleModalOpen}
                        >
                            ایجاد گروه مجازی
                        </Button>
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

            <CreateGroupModal key={showEdit.isEdit} showEdit={showEdit} setShowEdit={setShowEdit} />
        </>
    )
}
