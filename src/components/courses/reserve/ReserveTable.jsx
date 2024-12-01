import DataTable from 'react-data-table-component'
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row, Spinner} from 'reactstrap'
import {ChevronDown} from 'react-feather'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {
    getAllCourseReserve,
    getCourseByIdAdmin,
    getSingleCourseGroup,
} from '@core/services/api/courses'
import Select from 'react-select'
import {selectThemeColors} from '@utils'
import {useMutation} from '@tanstack/react-query'
import {acceptReserve} from '@core/services/api/courses'

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {useReserveColumns} from './useReserveColumns'
import {CustomPagination} from '@Components/common/CustomPagination'
import {useRef, useState} from 'react'
import toast from 'react-hot-toast'
import {CustomHeader} from './CustomHeader'

export function ReserveTable({singleCourseId}) {
    const selectedGroup = useRef(null)
    const queryClient = useQueryClient()
    const [showEdit, setShowEdit] = useState({currentCourseId: null, show: false})
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const [sort, setSort] = useState({reserverDate: false, accept: false, direction: 'desc'})
    const columns = useReserveColumns({handleModalOpen, singleCourseId})

    let {data: reserves, isLoading} = useQuery({
        queryKey: ['all-course-reserve'],
        queryFn: getAllCourseReserve,
    })

    // console.log(reserves)

    if (singleCourseId && reserves) {
        reserves = reserves.filter(
            reserve => reserve.courseId === singleCourseId && !reserve.accept
        )
    }

    let filteredReserves = reserves ? [...reserves] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredReserves = reserves.filter(
            item => item.courseName.includes(searchTerm) || item.studentName?.includes(searchTerm)
        )
    }

    const {data: currentCourse, isLoading: courseLoading} = useQuery({
        queryKey: ['single-course', showEdit.currentCourseId?.courseId],
        queryFn: () => getCourseByIdAdmin(showEdit.currentCourseId.courseId),
        enabled: Boolean(showEdit.currentCourseId),
    })

    const {
        data: currentCourseGroups,
        isLoading: groupsLoading,
        error: singleCourseGroupError,
    } = useQuery({
        queryKey: ['single-course-groupe', showEdit.currentCourseId?.courseId],
        queryFn: () =>
            getSingleCourseGroup({
                TeacherId: currentCourse?.teacherId,
                CourseId: currentCourse?.courseId,
            }),
        enabled: Boolean(currentCourse?.teacherId && showEdit.currentCourseId),
    })

    if (singleCourseGroupError) {
        const data = JSON.parse(singleCourseGroupError.message).data
        toast.error(data.ErrorMessage.join(' - '))
        setShowEdit({currentCourseId: null, show: false})
    }

    const {mutate, isPending} = useMutation({
        mutationFn: acceptReserve,
        onSuccess: data => {
            if (data.success) {
                queryClient.invalidateQueries(['all-course-reserve'])
                toast.success(data.message)
                setShowEdit({currentCourseId: null, show: false})
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    function handleAcceptReserve() {
        if (!selectedGroup.current) {
            toast.error('لطفا یک گروه را انتخاب کنید')
            return
        }
        mutate({
            courseId: showEdit.currentCourseId.courseId,
            courseGroupId: selectedGroup.current,
            studentId: showEdit.currentCourseId.studentId,
        })
    }

    const singleCourseGroups = currentCourseGroups?.map(group => ({
        value: group.groupId,
        label: (
            <div className="d-flex justify-content-between">
                <span>{group.groupName}</span>
                <span>ظرفیت : {group.groupCapacity}</span>
            </div>
        ),
    }))

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    function handleModalOpen(course) {
        setShowEdit({currentCourseId: course, show: true})
    }

    const handleSort = (column, sortDirection) => {
        if (column.sortField === 'accept') {
            setSort({
                reserverDate: false,
                accept: true,
                direction: sortDirection,
            })
        } else {
            setSort({accept: false, reserverDate: true, direction: sortDirection})
        }
    }

    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }

    function dataToRender() {
        if (reserves) {
            let allData = [...filteredReserves]

            if (sort.accept || sort.reserverDate) {
                if (sort.accept) {
                    if (sort.direction === 'desc') {
                        allData.sort((a, b) => Number(a.accept) - Number(b.accept))
                    } else {
                        allData.sort((a, b) => Number(b.accept) - Number(a.accept))
                    }
                }

                if (sort.reserverDate) {
                    if (sort.direction === 'desc') {
                        allData.sort((a, b) => new Date(a.reserverDate) - new Date(b.reserverDate))
                    } else {
                        allData.sort((a, b) => new Date(b.reserverDate) - new Date(a.reserverDate))
                    }
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

    function Pagination() {
        return (
            <>
                {!singleCourseId && (
                    <CustomPagination
                        totalItem={filteredReserves.length}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        handlePagination={handlePagination}
                    />
                )}
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
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={rowsPerPage}
                                handlePerPage={handlePerPage}
                                singleCourseId={singleCourseId}
                                onSearch={handleSearch}
                                title="رزرو"
                            />
                        }
                    />
                </div>
            </Card>

            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentCourseId: null, show: false})}
                backdrop="static"
                className="modal-dialog-centered"
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentCourseId: null, show: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <h1 className="text-center mb-3">به کدام گروه اضافه شود؟</h1>

                    <Row className="mb-3">
                        {currentCourseGroups && (
                            <Select
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="گروه را‌ انتخاب کنید"
                                options={singleCourseGroups}
                                noOptionsMessage={() => 'گروهی یافت نشد'}
                                onChange={option => (selectedGroup.current = option.value)}
                                isClearable={false}
                            />
                        )}
                        {(courseLoading || groupsLoading) && (
                            <div className="text-center mt-5">
                                <Spinner color="primary" className="mx-auto" />
                            </div>
                        )}
                    </Row>

                    <Row>
                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                type="submit"
                                className="me-1"
                                color="primary"
                                onClick={handleAcceptReserve}
                                disabled={isPending}
                            >
                                تایید عملیات
                                {isPending && <Spinner className="ms-1" size="sm" />}
                            </Button>
                            <Button
                                color="danger"
                                outline
                                onClick={() => setShowEdit({currentCourseId: null, show: false})}
                            >
                                صرف نظر
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}
