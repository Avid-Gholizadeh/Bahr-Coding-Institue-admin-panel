import Avatar from '@core/components/avatar'
import ArticleFallback from '../../assets/images/article-fallback.jpg'
import {convertGrigorianDateToJalaali, isValidUrl} from '@core/utils/formatter.utils'
import {Archive, Check, Eye, FileText, MoreVertical} from 'react-feather'
import {Link} from 'react-router-dom'
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import {createPortal} from 'react-dom'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {activeDeactiveArticle} from '@core/services/api/article'
import userImageFallback from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import toast from 'react-hot-toast'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function useArticleColumn({selectable, setShowEdit, singleCategoryId}) {
    //
    const queryClient = useQueryClient()

    function handleArticleEdit(article) {
        // console.log(article)
        setShowEdit(prevS => ({currentArticleId: article.id, show: !prevS.show}))
    }

    const {mutate: activeDeactiveMutate, isPending} = useMutation({
        mutationFn: activeDeactiveArticle,
        onSuccess: data => {
            if (data.success) {
                toast.success('خبر با موفقیت فعال شد')
                if (!singleCategoryId) {
                    queryClient.invalidateQueries(['all-articles'])
                } else {
                    queryClient.invalidateQueries(['single-category-article', singleCategoryId])
                }
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    const renderArticleAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={
                    isValidUrl(row.currentImageAddressTumb)
                        ? row.currentImageAddressTumb
                        : ArticleFallback
                }
                width="32"
                height="32"
            />
        )
    }
    const renderUserAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={
                    isValidUrl(row.addUserProfileImage)
                        ? row.addUserProfileImage
                        : userImageFallback
                }
                width="32"
                height="32"
            />
        )
    }

    return [
        {
            name: 'خبر',
            minWidth: '230px',
            sortField: 'title',
            selector: row => row.title,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderArticleAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <Link
                            to={row.isActive ? `/article/${row.id}` : ''}
                            className="user_name text-truncate fs-5 text-body"
                        >
                            <span className="fw-bolder">{row.title}</span>
                        </Link>

                        <small className="text-truncate text-muted mb-0">
                            {row.newsCatregoryName}
                        </small>
                    </div>
                </div>
            ),
        },
        {
            name: 'تاریخ انتشار',
            minWidth: '80px',
            sortField: 'insertDate',
            selector: row => row.insertDate,
            cell: row => <span>{convertGrigorianDateToJalaali(row.insertDate)}</span>,
        },
        {
            name: 'نویسنده',
            minWidth: '230px',
            sortField: 'cost',
            selector: row => row.cost,
            cell: row => (
                <div className="d-flex justify-content-left align-items-center ">
                    {renderUserAvatar(row)}
                    <div className="d-flex flex-column overflow-hidden" style={{maxWidth: 170}}>
                        <p className="user_name text-truncate fs-6 text-body">
                            <span>{row.addUserFullName}</span>
                        </p>
                    </div>
                </div>
            ),
        },
        {
            name: 'بازدید',
            minWidth: '100px',
            sortField: 'currentView',
            selector: row => row.currentView,
            cell: row => (
                <span className="">
                    <Eye className="me-1" size={20} />
                    {row.currentView}
                </span>
            ),
        },
        {
            name: 'وضعیت',
            minWidth: '100px',
            sortField: 'isActive',
            selector: row => row.isActive,
            cell: row => (
                <Badge
                    className="text-capitalize"
                    color={row.isActive ? 'light-success' : 'light-danger'}
                    pill
                >
                    {row.isActive ? 'فعال' : 'غیر فعال'}
                </Badge>
            ),
        },

        {
            name: 'سایر',
            minWidth: '100px',
            omit: selectable,
            cell: row => (
                <div className="column-action ">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <PortalDropdownMenu>
                            <DropdownMenu>
                                {row.isActive && (
                                    <>
                                        <DropdownItem
                                            tag={Link}
                                            className="w-100"
                                            to={`/article/${row.id}`}
                                        >
                                            <FileText size={14} className="me-50" />
                                            <span className="align-middle">جزئیات</span>
                                        </DropdownItem>

                                        <DropdownItem
                                            className="w-100"
                                            onClick={() => handleArticleEdit(row)}
                                        >
                                            <Archive size={14} className="me-50" />
                                            <span className="align-middle">ویرایش</span>
                                        </DropdownItem>
                                    </>
                                )}

                                <DropdownItem
                                    className="w-100"
                                    onClick={() =>
                                        activeDeactiveMutate({Active: !row.isActive, Id: row.id})
                                    }
                                >
                                    <Check size={14} className="me-50" />
                                    <span className="align-middle">
                                        {row.isActive ? 'غیر فعال' : 'فعال'}
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </PortalDropdownMenu>
                    </UncontrolledDropdown>
                </div>
            ),
        },
    ]
}
