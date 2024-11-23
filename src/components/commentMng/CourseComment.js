import React, {useEffect, useMemo, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Card, CardBody, CardHeader, CardTitle, Col, Input, Row, Spinner} from 'reactstrap'
import TableHover from './Table'
import {Pagination} from './Pagination'
import {TableCardHeader} from './TableCardHeader'
import {getCommentsForAddmin} from '../../@core/services/api/comments/ForAdmin'
import {getCourseComment} from '@core/services/api/courses'
import {useParams} from 'react-router-dom'
import {SingleCourse} from '@Components/courses/singleCourse/SingleCourse'

export function CourseComment({singleCourse}) {
    const {id} = useParams()
    const [sortingCol, setSortingCol] = useState('')
    const [sortType, setSortType] = useState('InsertDate')
    const [rowsOfPage, setRowsOfPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState('')
    const [isAccept, setIsAccept] = useState(null)

    const {
        data: commentsList,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        enabled: !Boolean(singleCourse),
        queryKey: ['comments'],
        queryFn: () =>
            getCommentsForAddmin(pageNumber, rowsOfPage, sortingCol, sortType, query, isAccept),
    })

    const {data: singleCourseComments, refetch: singleCourseRefetch} = useQuery({
        enabled: Boolean(singleCourse),
        queryKey: ['single-course-comment'],
        queryFn: () => getCourseComment(id),
    })

    // console.log(singleCourseComments)

    const totalCount = commentsList?.totalCount || 1

    useEffect(() => {
        refetch()
        if (singleCourse) {
            singleCourseRefetch()
        } else {
            refetch()
        }
    }, [pageNumber, rowsOfPage, sortingCol, sortType, query, isAccept, refetch])

    let filteredData = singleCourseComments ? [...singleCourseComments] : []
    if (isAccept !== null && singleCourse) {
        filteredData = singleCourseComments.filter(comment => comment.accept === isAccept)
    }

    function dataToRender() {
        if (singleCourseComments) {
            const allData = [...filteredData]

            return allData?.filter(
                (_, index) =>
                    index >= (pageNumber - 1) * rowsOfPage && index < pageNumber * rowsOfPage
            )
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <TableCardHeader
                        rowsOfPage={rowsOfPage}
                        setRowsOfPage={setRowsOfPage}
                        query={query}
                        setQuery={setQuery}
                        isAccept={isAccept}
                        setIsAccept={setIsAccept}
                        sortingCol={sortingCol}
                        setSortingCol={setSortingCol}
                        singleCourse={singleCourse}
                    />
                </CardHeader>
                {isLoading ? (
                    <div className="m-auto">
                        <Spinner color="primary" />
                    </div>
                ) : (
                    <TableHover
                        data={!singleCourse ? commentsList.comments : dataToRender()}
                        singleCourse={singleCourse}
                    />
                )}
                {isError && <p className="text-danger m-auto">مشکلی پیش آمد</p>}
                <Pagination
                    pageCount={
                        singleCourse
                            ? Math.ceil(filteredData?.length / rowsOfPage)
                            : Math.ceil(totalCount / rowsOfPage)
                    }
                    forcePage={pageNumber}
                    onPageChange={newPage => setPageNumber(newPage)}
                />
            </Card>
        </>
    )
}
