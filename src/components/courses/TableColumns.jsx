import Avatar from '@components/avatar'
import {Archive, FileText, MoreVertical, Trash2} from 'react-feather'
import {Link} from 'react-router-dom'
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import {convertGrigorianDateToJalaali, pirceFormatter} from '../../@core/utils/formatter.utils'

const renderCourseAvatar = row => {
    return (
        <Avatar
            className="me-1 overflow-hidden"
            img={row.tumbImageAddress}
            width="32"
            height="32"
        />
    )
}

function colorSelector(status) {
    if (status === 'شروع ثبت نام') return 'light-success'
    else if (status === 'منقضی شده') return 'light-danger'
    else if (status === 'درحال برگزاری') return 'light-warning'
}

export const Columns = [
    {
        name: 'دوره',
        sortable: true,
        minWidth: '230px',
        sortField: 'title',
        selector: row => row.title,
        cell: row => (
            <div className="d-flex justify-content-left align-items-center">
                {renderCourseAvatar(row)}
                <div className="d-flex flex-column">
                    <Link
                        to={`/courses/${row.courseId}`}
                        className="user_name text-truncate text-body"
                        // onClick={() => store.dispatch(getUser(row.id))}
                    >
                        <span className="fw-bolder">{row.title}</span>
                    </Link>
                    <small className="text-truncate text-muted mb-0">{row.levelName}</small>
                </div>
            </div>
        ),
    },
    {
        name: 'نوع کلاس',
        sortable: true,
        minWidth: '172px',
        sortField: 'typeName',
        selector: row => row.typeName,
        cell: row => <span className="">{row.typeName}</span>,
    },
    {
        name: 'قیمت',
        sortable: true,
        minWidth: '172px',
        sortField: 'cost',
        selector: row => row.cost,
        cell: row => (
            <span className="fs-4 ">
                {pirceFormatter(row.cost)}{' '}
                <span
                    className=" position-relative text-info "
                    style={{bottom: '-3px', fontSize: '13px'}}
                >
                    تومان
                </span>
            </span>
        ),
    },
    {
        name: 'وضعیت',
        minWidth: '138px',
        sortable: true,
        sortField: 'statusName',
        selector: row => row.statusName,
        cell: row => (
            <Badge className="text-capitalize" color={colorSelector(row.statusName)} pill>
                {row.statusName}
            </Badge>
        ),
    },
    {
        name: 'اخرین بروزرسانی',
        minWidth: '150px',
        sortable: true,
        sortField: 'lastUpdate',
        selector: row => row.lastUpdate,
        cell: row => <span className="">{convertGrigorianDateToJalaali(row.lastUpdate)}</span>,
    },
    {
        name: 'سایر',
        minWidth: '100px',
        cell: row => (
            <div className="column-action">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                        <MoreVertical size={14} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag={Link}
                            className="w-100"
                            to={`/apps/user/view/${row.id}`}
                            // onClick={() => store.dispatch(getUser(row.id))}
                        >
                            <FileText size={14} className="me-50" />
                            <span className="align-middle">جزئیات</span>
                        </DropdownItem>
                        <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={e => e.preventDefault()}
                        >
                            <Archive size={14} className="me-50" />
                            <span className="align-middle">ویرایش</span>
                        </DropdownItem>
                        <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={e => {
                                e.preventDefault()
                                // store.dispatch(deleteUser(row.id))
                            }}
                        >
                            <Trash2 size={14} className="me-50" />
                            <span className="align-middle">حذف دوره</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        ),
    },
]
