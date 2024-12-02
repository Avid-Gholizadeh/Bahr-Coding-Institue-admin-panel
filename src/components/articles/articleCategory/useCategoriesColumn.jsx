import Avatar from '@components/avatar'
import {Archive, CheckCircle, FileText, MoreVertical, Trash2, XCircle} from 'react-feather'
import {Link} from 'react-router-dom'
import {
    Badge,
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'
import {convertGrigorianDateToJalaali, isValidUrl} from '../../../@core/utils/formatter.utils'
import CategoriesFallback from '../../../assets/images/categories-fallback.jpeg'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createPortal} from 'react-dom'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function useCategoriesColumn({handleModalOpen}) {
    //
    const queryClient = useQueryClient()

    const renderCourseAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={isValidUrl(row.image) ? row.image : CategoriesFallback}
                width="32"
                height="32"
            />
        )
    }

    return [
        {
            name: 'دسته‌بندی',
            minWidth: '100px',
            sortField: 'categoryName',
            selector: row => row.categoryName,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderCourseAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={`/article-category/${row.id}`}
                            className="user_name text-truncate text-body"
                        >
                            <span className="fw-bolder">{row.categoryName}</span>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            name: <span className="text-success">تاریخ انتشار</span>,
            maxWidth: '150px',
            sortable: true,
            sortField: 'insertDate',
            selector: row => row.insertDate,
            cell: row => <span className="">{convertGrigorianDateToJalaali(row.insertDate)}</span>,
        },
        {
            name: 'عنوان گوگل',
            minWidth: '100px',
            sortField: 'googleTitle',
            selector: row => row.googleTitle,
            cell: row => <span className="text-truncate ">{row.googleTitle}</span>,
        },
        {
            name: 'توضیح گوگل',
            minWidth: '200px',
            sortField: 'googleDescribe',
            selector: row => row.googleDescribe,
            cell: row => (
                <span className="text-truncate" style={{maxWidth: 200}}>
                    {row.googleDescribe}
                </span>
            ),
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
                        <PortalDropdownMenu>
                            <DropdownMenu>
                                <DropdownItem
                                    tag={Link}
                                    className="w-100"
                                    to={`/article-category/${row.id}`}
                                >
                                    <FileText size={14} className="me-50" />
                                    <span className="align-middle">جزئیات</span>
                                </DropdownItem>

                                <DropdownItem
                                    className="w-100"
                                    onClick={() => handleModalOpen(row)}
                                >
                                    <Archive size={14} className="me-50" />
                                    <span className="align-middle">ویرایش</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </PortalDropdownMenu>
                    </UncontrolledDropdown>
                </div>
            ),
        },
    ]
}
