import Avatar from '@core/components/avatar'
import CourseFallback from '../../../assets/images/courses-fallback.jpg'
import {Link} from 'react-router-dom'
import {Badge} from 'reactstrap'

export function useStudentColumns() {
    const renderUserAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={row.tumbImageAddress || row.imageAddress || CourseFallback}
                width="32"
                height="32"
            />
        )
    }
    return [
        {
            name: 'دانشجو',
            sortable: false,
            minWidth: '200px',
            sortField: 'studentName',
            selector: row => row.studentName,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderUserAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/user/view/${row.studentId}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder fs-5">{row.studentName || 'بدون نام'}</span>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            name: 'نمره درس',
            sortable: false,
            minWidth: '100px',
            sortField: 'courseGrade',
            selector: row => row.courseGrade,
            cell: row => <span className="fs-5 text-center w-25">{row.courseGrade}</span>,
        },
        {
            name: 'وضعیت پرداخت',
            sortable: false,
            minWidth: '172px',
            sortField: 'peymentDone',
            selector: row => row.peymentDone,
            cell: row => (
                <Badge
                    className="text-capitalize"
                    color={row.peymentDone ? 'light-success' : 'light-warning'}
                    pill
                >
                    <span className="fss-6">{row.peymentDone ? 'پرداخت شده' : 'پرداخت نشده'}</span>
                </Badge>
            ),
        },
    ]
}
