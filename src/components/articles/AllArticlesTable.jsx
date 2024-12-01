import DataTable from 'react-data-table-component'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {Card, Spinner} from 'reactstrap'
import {ChevronDown} from 'react-feather'
import {CustomPagination} from '@Components/common/CustomPagination'
import {getAllArticlesForSingleCategory, getNewsListAdmin} from '@core/services/api/article'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {useArticleColumn} from './useArticleColumn'
import {CustomHeader} from '@Components/courses/CustomHeader'
import {useNavigate} from 'react-router-dom'
import {EditArticleModal} from './EditArticleModal'

export function AllArticlesTable({singleCategoryId}) {
    //
    const navigate = useNavigate()
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: '', IsActive: true})
    const [showEdit, setShowEdit] = useState({currentArticleId: null, show: false})
    const columns = useArticleColumn({setShowEdit})

    const {data: articles, isLoading} = useQuery({
        enabled: !Boolean(singleCategoryId),
        queryKey: ['all-articles', params],
        queryFn: () => getNewsListAdmin(params),
    })

    const {data: singleCategoryArticle, isLoading: categoryArticleLoading} = useQuery({
        enabled: Boolean(singleCategoryId),
        queryKey: ['single-category-article', singleCategoryId],
        queryFn: () => getAllArticlesForSingleCategory(singleCategoryId),
    })

    // console.log(articles)

    function handleSearch(val) {
        setParams(prevState => ({...prevState, Query: val, PageNumber: 1}))
    }
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setParams(prevState => ({...prevState, RowsOfPage: value}))
    }

    const handlePagination = page => {
        setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
    }

    function handleStatusChange(e) {
        const value = e.currentTarget.value === 'false' ? false : true
        setParams(prevState => ({...prevState, IsActive: value}))
    }

    function Pagination() {
        return (
            <CustomPagination
                totalItem={singleCategoryId ? singleCategoryArticle?.length : articles?.totalCount}
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
                        progressPending={isLoading || categoryArticleLoading}
                        noDataComponent={
                            <span className="my-4 fs-4 text-primary">دیتایی وجود ندارد</span>
                        }
                        progressComponent={<Spinner className="mb-5 mt-4" color="primary" />}
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={singleCategoryId ? singleCategoryArticle : articles?.news}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={params.RowsOfPage}
                                handleToggleModal={() => navigate('/create-article')}
                                handlePerPage={handlePerPage}
                                buttonText="ایجاد خبر"
                                pageTitle="خبر"
                                onSearch={handleSearch}
                                onStatusChange={handleStatusChange}
                                isArticle
                                isActive={params.IsActive}
                                singleCategoryId={singleCategoryId}
                            />
                        }
                    />
                </div>
            </Card>
            <EditArticleModal showEdit={showEdit} setShowEdit={setShowEdit} />
        </>
    )
}
