import React from 'react'
import {Card, CardHeader, Spinner} from 'reactstrap'
import DataTable from 'react-data-table-component'
import {ChevronDown} from 'react-feather'
import Avatar from '@components/avatar'
import courseFalbackImg from '@src/assets/images/courses-fallback.jpg'
import fMoment from 'moment-jalaali'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {Link} from 'react-router-dom'
import {isValidUrl} from '@core/utils/formatter.utils'

fMoment.loadPersian()

export const UserProjectsList = ({user}) => {
    const renderCourseAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={isValidUrl(row.tumbImageAddress) ? row.tumbImageAddress : courseFalbackImg}
                width="32"
                height="32"
            />
        )
    }

    const columns = [
        {
            sortable: true,
            minWidth: '300px',
            name: 'نام دوره',
            selector: row => row.title,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderCourseAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/courses/${row.courseId}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder">{row.title}</span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">{row.levelName}</small>
                    </div>
                </div>
            ),
        },
        {
            name: 'تاریخ دوره',
            selector: row =>
                row.lastUpdate
                    ? fMoment(row.lastUpdate).locale('fa').format('jD jMMMM jYYYY')
                    : 'نامشخص',
        },
    ]

    return (
        <Card>
            <CardHeader tag="h4"> دوره های کاربر: </CardHeader>
            <div className="react-dataTable user-view-account-projects app-user-list">
                <DataTable
                    noHeader
                    responsive
                    columns={columns}
                    data={user?.courses || []} // Ensure fallback for undefined data
                    className="react-dataTable"
                    sortIcon={<ChevronDown size={10} />}
                    noDataComponent={<div style={{padding: '20px'}}>دوره ای موجود نمی باشد</div>}
                />
            </div>
        </Card>
    )
}

export default UserProjectsList
