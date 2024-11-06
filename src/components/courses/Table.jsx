import '@styles/react/libs/react-select/_react-select.scss'
import ReactPaginate from 'react-paginate'
import {useQuery} from '@tanstack/react-query'
import {getAllCourses} from '../../@core/services/api/courses'
import {useState} from 'react'
import DataTable from 'react-data-table-component'
import {Card} from 'reactstrap'

export function Table() {
    const [params, setParams] = useState({PageNumber: 1, RowsOfPage: 10, Query: null})

    const {data: courses} = useQuery({
        queryKey: ['allCourses', params],
        queryFn: () => getAllCourses(params),
    })

    const handlePagination = page => {
        setParams(prevState => ({...prevState, pageNumber: page}))
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
                containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
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
                    columns={columns}
                    // onSort={handleSort}
                    // sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            store={store}
                            searchTerm={searchTerm}
                            rowsPerPage={rowsPerPage}
                            handleFilter={handleFilter}
                            handlePerPage={handlePerPage}
                            toggleSidebar={toggleSidebar}
                        />
                    }
                />
            </div>
        </Card>
    )
}
