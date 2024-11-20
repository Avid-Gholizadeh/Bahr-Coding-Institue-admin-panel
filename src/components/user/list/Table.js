// ** React Imports
import { Fragment, useState, useEffect, useCallback, useMemo } from 'react'

// ** Components and Utils Imports
import Sidebar from './Sidebar'
import { columns } from './columns'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { useQuery } from '@tanstack/react-query'
import { getUserList } from '../../../@core/services/api/User'
import {CustomPagination} from './CustomPagination'
import { roleOptions, statusOptions, sortOptions } from './filterOptions';

// ** Reactstrap Imports
import {
  Card,
  Spinner
} from 'reactstrap'

// ** Custom Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import FilterCard from './FilterCard'
import { CustomHeader } from './CustomHeader'

const UsersListTable = () => {
  const [sortColumn, setSortColumn] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isActiveUser, setIsActiveUser] = useState(null)
  const [isDeletedUser, setIsDeletedUser] = useState(null)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'انتخاب کنید' })
  const [currentStatus, setCurrentStatus] = useState({ value: null, label: 'انتخاب کنید' })
  const [currentSort, setCurrentSort] = useState({ value: '', type: '', label: 'انتخاب کنید' })

  // Fetch user data with React Query
  const { data: userList, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['getUserList'],
    queryFn: () => getUserList(
      sortOrder, sortColumn, query, pageNumber, rowsPerPage, isActiveUser, isDeletedUser, currentRole),
})

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Filter and sort options

  // Update query and refetch data
  useEffect(() => {
    refetch()
  }, [sortOrder, sortColumn, query, pageNumber, rowsPerPage, isActiveUser, isDeletedUser, currentRole, refetch])

  // Handlers
  const handlePerPage = useCallback((val) => setRowsPerPage(val), [])
  const handleQuery = useCallback((val) => { setQuery(val); setPageNumber(1) }, [])

  const handleSort = useCallback((selectedOption) => {
    switch (selectedOption.value) {
      case 1:
        setIsActiveUser(false);
        setIsDeletedUser(null);
        break;
      case 2: // Active users
        setIsActiveUser(true);
        setIsDeletedUser(false);
        break;
      case 3:
        setIsActiveUser(false);
        setIsDeletedUser(true);
        break;
      default:
        setIsActiveUser(null);
        setIsDeletedUser(null);
        break;
    }
  }, []);

  const dataToRender = () => {
    if (userList?.listUser?.length > 0) return userList.listUser
    return isLoading || isFetching ? [] : []
  }
  return (
    <Fragment>
      <FilterCard
        roleOptions={roleOptions}
        sortOptions={sortOptions}
        statusOptions={statusOptions}
        currentRole={currentRole}
        currentSort={currentSort}
        currentStatus={currentStatus}
        setPageNumber={setPageNumber}
        setCurrentRole={setCurrentRole}
        setSortOrder={setSortOrder}
        setSortColumn={setSortColumn}
        setCurrentSort={setCurrentSort}
        setCurrentStatus={setCurrentStatus}
        handleSort={handleSort}
      />

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            paginationComponent={() => (
              <CustomPagination
                pageCount={Math.ceil(userList?.totalCount / rowsPerPage) || 1}
                forcePage={pageNumber - 1}
                onPageChange={(page) => setPageNumber(page.selected + 1)}
              />
            )}
            data={dataToRender()}
            noDataComponent={
              isLoading || isFetching ? (
                <Spinner color='primary' />
              ) : (
                <div>اطلاعاتی موجود نیست</div>
              )
            }
            subHeaderComponent={
              <CustomHeader
                toggleSidebar={toggleSidebar}
                handleQuery={handleQuery}
                handlePerPage={handlePerPage}
                rowsPerPage={rowsPerPage}
                searchTerm={query}
              />
            }
          />
        </div>
      </Card>

      <Sidebar toggleSidebar={toggleSidebar} open={sidebarOpen} />
    </Fragment>
  )
}

export default UsersListTable
