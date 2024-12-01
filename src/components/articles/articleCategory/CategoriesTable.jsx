import DataTable from 'react-data-table-component'
import {Card, Spinner} from 'reactstrap'
import {ChevronDown} from 'react-feather'
import {useQuery} from '@tanstack/react-query'

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {CustomPagination} from '@Components/common/CustomPagination'
import {useRef, useState} from 'react'

import {getNewsCategoryList} from '@core/services/api/article'
import {useCategoriesColumn} from './useCategoriesColumn'
import {CustomHeader} from '@Components/courses/reserve/CustomHeader'
import {CreateCategoryModal} from './CreateCategoryModal'

export function CategoriesTable({singleCourseId}) {
    //
    const selectedGroup = useRef(null)
    const [showEdit, setShowEdit] = useState({currentCategory: null, show: false, isEdit: false})
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const [sort, setSort] = useState({insertDate: false, direction: 'desc'})
    const columns = useCategoriesColumn({handleModalOpen, singleCourseId})

    function handleModalOpen(category) {
        setShowEdit({
            currentCategory: category,
            show: true,
            isEdit: category.iconAddress ? true : false,
        })
    }

    let {data: articleCategories, isLoading} = useQuery({
        queryKey: ['news-category-list'],
        queryFn: getNewsCategoryList,
    })

    let filteredReserves = articleCategories ? [...articleCategories] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredReserves = articleCategories.filter(
            item =>
                item.categoryName?.includes(searchTerm) ||
                item.googleTitle?.includes(searchTerm) ||
                item.googleDescribe?.includes(searchTerm)
        )
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }

    function dataToRender() {
        if (articleCategories) {
            const allData = [...filteredReserves]

            if (sort.insertDate) {
                if (sort.direction === 'desc') {
                    allData.sort((a, b) => new Date(a.insertDate) - new Date(b.insertDate))
                } else {
                    allData.sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
                }
            }

            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }

    function handleSearch(val) {
        setSearchTerm(val)
        setCurrentPage(1)
    }

    function handleSort(_, sortDirection) {
        setSort({insertDate: true, direction: sortDirection})
    }

    function Pagination() {
        return (
            <>
                <CustomPagination
                    totalItem={filteredReserves.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                />
            </>
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
                                singleCourseId={singleCourseId}
                                onSearch={handleSearch}
                                title="دسته‌بندی"
                                handleToggleModal={handleModalOpen}
                                buttonText="ایجاد دسته‌ بندی"
                                isArticleCategory
                            />
                        }
                    />
                </div>
            </Card>

            <CreateCategoryModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            />
        </>
    )
}
