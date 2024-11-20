import { getUserComments } from '@core/services/api/User';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DataTable from 'react-data-table-component';
import { Badge, Card, Spinner } from 'reactstrap';

export function UserComment({ userId }) {
    console.log(userId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userDetailComment', userId],
        queryFn: () => getUserComments(userId),
    });

    console.log(data?.comments[0]);


    if (isError) {
        return <div>خطایی رخ داده است. لطفا دوباره تلاش کنید.</div>;
    }

    const columns = [
        {
            name: 'عنوان',
            maxWidth: '150px',
            selector: (row) => row.commentTitle, // Ensure this field exists in the API response
        },
        {
            name: 'شرح',
            maxWidth: '300px',
            selector: (row) => row.describe, // Ensure this field exists in the API response
        },
        {
            name: 'وضعیت',
            maxWidth: '100px',
            selector: (row) => row.accept ? (
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
            maxWidth: '150px',
            selector: (row) => row.courseTitle, // Ensure this field exists in the API response
        },
    ];

    return (
    <Card>
        <div className="react-dataTable">
            <DataTable
            responsive
            className='react-dataTable'
            columns={columns}
            data={data?.comments || []}
            progressPending={isLoading}
            progressComponent={<Spinner color="primary" />}
            noDataComponent={
                <div style={{ padding: '20px' }}>
                    دوره ای موجود نمی باشد
                </div>
            }
            />
        </div>
    </Card>
    );
}
