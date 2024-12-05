import DataTable from 'react-data-table-component'
import {useQuery} from '@tanstack/react-query'
import {useEffect, useMemo, useRef, useState} from 'react'
import {Card, Modal, ModalBody, ModalHeader, Row, Spinner} from 'reactstrap'
import {CustomPagination} from '@Components/common/CustomPagination'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {getCourseUserList} from '@core/services/api/courses'
import {useStudentColumns} from './useStudentColumns'
import {useParams} from 'react-router-dom'
import {CustomHeader} from '../CustomHeader'
import {AddStudentModal} from './AddStudentModal'

export function StudentsTable({course, singleGroup, onSetCount}) {
    const {id} = useParams()
    let filteredData = useRef()
    const [params, setParams] = useState({
        CourseId: id || null,
        PageNumber: 1,
        RowsOfPage: 10,
        Query: '',
    })
    const [groupParams, setGroupParams] = useState({
        PageNumber: 1,
        Query: '',
    })

    const [show, setShow] = useState(false)
    const columns = useStudentColumns()

    useEffect(() => {
        if (singleGroup) {
            setParams(prevS => ({
                ...prevS,
                PageNumber: 1,
                RowsOfPage: 200,
                CourseId: singleGroup.courseId,
            }))
        }
    }, [singleGroup])

    function handleToggleModal() {
        setShow(prevS => !prevS)
    }

    const {data: courseUsers, isLoading} = useQuery({
        enabled: Boolean(params.CourseId),
        queryKey: ['course-users', params],
        queryFn: () => getCourseUserList(params),
    })

    const groupStudents = useMemo(() => {
        if (singleGroup) {
            return courseUsers?.filter(user => user.courseGroupId === singleGroup.groupId)
        }
        return null
    }, [singleGroup, courseUsers])

    useEffect(() => {
        if (groupStudents) {
            onSetCount(groupStudents.length)
        }
    }, [groupStudents, onSetCount])

    useEffect(() => {
        if (singleGroup) {
            filteredData.current = groupStudents

            if (groupParams.Query) {
                filteredData.current = filteredData.current.filter(item =>
                    item.studentName.includes(groupParams.Query)
                )
            }
        }
    }, [singleGroup, groupParams.Query, groupStudents])

    function dataToRender() {
        if (filteredData.current) {
            const allData = [...filteredData.current]

            return allData?.filter(
                (_, index) =>
                    index >= (groupParams.PageNumber - 1) * 10 &&
                    index < groupParams.PageNumber * 10
            )
        }
    }

    function handleSearch(val) {
        setParams(prevState => ({...prevState, Query: val, PageNumber: 1}))
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setParams(prevState => ({...prevState, RowsOfPage: value, PageNumber: 1}))
    }

    const handlePagination = page => {
        if (!singleGroup) {
            setParams(prevState => ({...prevState, PageNumber: page.selected + 1}))
        } else {
            setGroupParams(prevS => ({...prevS, PageNumber: page.selected + 1}))
        }
    }

    function Pagination() {
        return (
            <CustomPagination
                totalItem={singleGroup ? filteredData.current?.length : course?.courseUserTotal}
                rowsPerPage={singleGroup ? 10 : params.RowsOfPage}
                currentPage={singleGroup ? groupParams.PageNumber : params.PageNumber}
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
                        // sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        paginationComponent={Pagination}
                        data={singleGroup ? dataToRender() : courseUsers}
                        subHeaderComponent={
                            <CustomHeader
                                RowsOfPage={params.RowsOfPage}
                                handleToggleModal={handleToggleModal}
                                handlePerPage={handlePerPage}
                                buttonText="اضافه کردن دانشجو"
                                pageTitle="دوره"
                                onSearch={handleSearch}
                                singleGroup={singleGroup}
                            />
                        }
                    />
                </div>
            </Card>

            {/* {course && (
                <AddStudentModal
                    show={show}
                    handleToggleModal={handleToggleModal}
                    course={course}
                />
            )} */}
            <AddStudentModal
                show={show}
                handleToggleModal={handleToggleModal}
                course={course}
                singleGroup={singleGroup}
            />
        </>
    )
}
