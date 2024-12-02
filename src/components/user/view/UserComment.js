import {getUserComments} from '@core/services/api/User'
import {useQuery} from '@tanstack/react-query'
import React from 'react'
import DataTable from 'react-data-table-component'
import {Badge, Card, Spinner} from 'reactstrap'

export function UserComment({userId}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDetailComment', userId],
        queryFn: () => getUserComments(userId),
    })

    if (isError) {
        return <div>خطایی رخ داده است. لطفا دوباره تلاش کنید.</div>
    }

    const columns = [
        {
            name: 'عنوان',
            minWidth: '150px',
            selector: row => row.commentTitle, // Ensure this field exists in the API response
        },
        {
            name: 'شرح',
            minWidth: '200px',
            selector: row => row.describe, // Ensure this field exists in the API response
        },
        {
            name: 'وضعیت',
            minWidth: '150px',
            selector: row =>
                row.accept ? (
                    <Badge pill color="light-success" className="me-1">
                        تایید شده
                    </Badge>
                ) : (
                    <Badge pill color="light-warning" className="me-1">
                        در انتظار
                    </Badge>
                ), // Ensure this field exists in the API response
        },
        {
            name: 'دوره',
            minWidth: '150px',
            selector: row => row.courseTitle, // Ensure this field exists in the API response
        },
    ]

    return (
        <Card>
            <div className="react-dataTable">
                <DataTable
                    responsive
                    className="react-dataTable"
                    columns={columns}
                    data={data?.comments || []}
                    progressPending={isLoading}
                    progressComponent={<Spinner color="primary" />}
                    noDataComponent={<div style={{padding: '20px'}}>کامنتی موجود نمی باشد</div>}
                />
            </div>
        </Card>
    )
}
