// ** React Imports
import { Fragment, useState, useEffect, useCallback, useMemo } from 'react'

// ** Components and Utils Imports
import Sidebar from './Sidebar'
import { columns } from './columns'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { selectThemeColors } from '@utils'
import { useQuery } from '@tanstack/react-query'
import { GetUserList } from '../../../@core/services/api/User'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Spinner
} from 'reactstrap'

// ** Custom Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// Custom Header Component
const CustomHeader = ({ toggleSidebar, handlePerPage, handleQuery, rowsPerPage, searchTerm }) => (
  <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
    <Row>
      <Col xl='6' className='d-flex align-items-center p-0'>
        <div className='d-flex align-items-center w-100'>
          <label htmlFor='rows-per-page'>نمایش</label>
          <Input
            className='mx-50'
            type='select'
            id='rows-per-page'
            value={rowsPerPage}
            onChange={(e) => handlePerPage(e.target.value)}
            style={{ width: '5rem' }}
          >
            {[5, 7, 10].map(size => <option key={size} value={size}>{size}</option>)}
          </Input>
          <label htmlFor='rows-per-page'>عدد</label>
        </div>
      </Col>
      <Col
        xl='6'
        className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
      >
        <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
          <label className='mb-0' htmlFor='search-invoice'>جستجو:</label>
          <Input
            id='search-invoice'
            className='ms-50 w-100'
            type='text'
            value={searchTerm}
            onChange={e => handleQuery(e.target.value)}
          />
        </div>

        <Button color='primary' onClick={toggleSidebar} className='add-new-user'>
          اضافه کردن کاربر جدید
        </Button>
      </Col>
    </Row>
  </div>
)

// UsersList Component
const UsersList = () => {
  const [sortColumn, setSortColumn] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
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
    queryKey: ['GetUserList'],
    queryFn: () => GetUserList(sortOrder, sortColumn, query, pageNumber, rowsPerPage, isActiveUser, isDeletedUser, currentRole),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
})


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Filter and sort options
  const roleOptions = useMemo(() => [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: 'ادمین' },
    { value: 2, label: 'استاد' },
    { value: 3, label: 'کارمند ادمین' },
    { value: 4, label: 'کارمند نویسنده' },
    { value: 5, label: 'دانشجو' }
  ], [])

  const statusOptions = useMemo(() => [
    { value: '', label: 'انتخاب کنید' },
    { value: 2, label: 'کاربران فعال' },
    { value: 3, label: 'کاربران حذف شده' },
  ], [])

  const sortOptions = useMemo(() => [
    { value: '', type: '' , label: 'انتخاب کنید' },
    { value: 'DESC', type: 'InsertDate' , label: ' جدید ترین ' },
    { value: 'ASC', type: 'InsertDate' , label: ' قدیمی ترین ' },
  ], [])

  // Update query and refetch data
  useEffect(() => {
    refetch()
  }, [sortOrder, sortColumn, query, pageNumber, rowsPerPage, isActiveUser, isDeletedUser, currentRole, refetch])

  // Handlers
  const handlePerPage = useCallback((val) => setRowsPerPage(val), [])
  const handleQuery = useCallback((val) => { setQuery(val); setPageNumber(1) }, [])
  const handleSort = useCallback((val) => {
    if (val.value === 2) {
      setIsActiveUser(true)
      setIsDeletedUser(false)
    } else if (val.value === 3) {
      setIsActiveUser(false)
      setIsDeletedUser(true)
    }
  }, [])

  // Custom Pagination
  const CustomPagination = useCallback(() => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={Math.ceil(userList?.totalCount / rowsPerPage) || 1}
      activeClassName='active'
      forcePage={pageNumber - 1}
      onPageChange={(page) => setPageNumber(page.selected + 1)}
      containerClassName='pagination react-paginate justify-content-end my-2 pe-1'
      pageClassName='page-item rtl'
      pageLinkClassName='page-link'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      nextClassName='page-item next rtl'
      nextLinkClassName='page-link rtl'
    />
  ), [pageNumber, rowsPerPage, userList])

  const dataToRender = () => {
    if (userList?.listUser?.length > 0) return userList.listUser
    return isLoading || isFetching ? [] : []
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='3'>
              <Label for='role-select'>نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={(data) => { setPageNumber(1); setCurrentRole(data) }}
              />
            </Col>
            <Col md='3'>
              <Label for='role-select'>تاریخ ثبت نام</Label>
              <Select
                isClearable={false}
                value={currentSort}
                options={sortOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={(data) => {
                    setPageNumber(1)
                    setSortOrder(data.value)
                    setSortColumn(data.type)
                    setCurrentSort(data)
                }}
              />
            </Col>
            <Col md='2'>
              <Label for='status-select'>وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setPageNumber(1)
                  setCurrentStatus(data)
                  handleSort(data)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

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
            paginationComponent={CustomPagination}
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
                handleFilter
                handleQuery={handleQuery}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                rowsPerPage={rowsPerPage}
              />
            }
          />
        </div>
      </Card>

      <Sidebar toggleSidebar={toggleSidebar} open={sidebarOpen} />
    </Fragment>
  )
}

export default UsersList
