import Avatar from '@components/avatar'
import {Archive, CheckCircle, MoreVertical} from 'react-feather'
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'

import buildingFallback from '../../assets/images/building-fallback.jpg'
import {createPortal} from 'react-dom'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {activeDeactiveBuilding} from '@core/services/api/buildings'
import toast from 'react-hot-toast'
import {useRef} from 'react'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function useBuildingColumns({handleModalOpen}) {
    //

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: activeDeactiveBuilding,
        onSuccess: (data, variables) => {
            if (data.success) {
                queryClient.invalidateQueries(['all-buildings-list'])
                toast.success(`ساختمان با موفقیت ${variables.active ? 'فعال' : 'غیر فعال'} شد`)
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            const data = JSON.parse(err.message).data
            toast.error(data.ErrorMessage.join(' - '))
        },
    })

    const renderCourseAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={buildingFallback}
                width="32"
                height="32"
            />
        )
    }

    const loadingToastId = useRef(null)
    if (isPending) {
        loadingToastId.current = toast.loading('در حال انجام عملیات...')
    } else if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current)
        loadingToastId.current = null
    }

    function handleActiveDeactive(row) {
        mutate({active: !row.active, id: row.id})
        // toast.promise(
        //     new Promise((resolve, reject) =>
        //         mutate({active: !row.active, id: row.id}, {onSuccess: resolve, onError: reject})
        //     ),
        //     {
        //         loading: 'در حال ذخیره...',
        //     }
        // )
    }

    return [
        {
            name: 'ساختمان',
            minWidth: '100px',
            sortField: 'buildingName',
            selector: row => row.buildingName,
            cell: row => (
                <div className="d-flex align-items-center ">
                    {renderCourseAvatar(row)}
                    <div
                        className="d-flex flex-column overflow-hidden "
                        style={{maxWidth: 170, marginBottom: -13}}
                    >
                        <p
                            className="user_name text-truncate text-body cursor-pointer"
                            onClick={() => handleModalOpen(row)}
                        >
                            <span className="fw-bolder fs-5 groupName-hover">
                                {row.buildingName}
                            </span>
                        </p>
                    </div>
                </div>
            ),
        },
        {
            name: <span className="text-success">تاریخ کار</span>,
            پهدWidth: '1۰0px',
            sortable: true,
            sortField: 'workDate',
            selector: row => row.workDate,
            cell: row => <span className="">{convertGrigorianDateToJalaali(row.workDate)}</span>,
        },
        {
            name: <span className="text-success">وضعیت</span>,
            minWidth: '100px',
            sortable: true,
            sortField: 'active',
            selector: row => row.active,
            cell: row => (
                <Badge
                    className="text-capitalize"
                    color={row.active ? 'light-success' : 'light-danger'}
                    pill
                >
                    {row.active ? 'فعال' : 'غیر فعال'}
                </Badge>
            ),
        },
        {
            name: 'طبقه',
            minWidth: '100px',
            sortField: 'floor',
            selector: row => row.floor,
            cell: row => (
                <span className="text-truncate" /* style={{maxWidth: 200}} */>{row.floor}</span>
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
                                    className="w-100"
                                    onClick={() => handleModalOpen(row)}
                                >
                                    <Archive size={14} className="me-50" />
                                    <span className="align-middle">ویرایش</span>
                                </DropdownItem>

                                <DropdownItem
                                    className="w-100"
                                    onClick={() => handleActiveDeactive(row)}
                                >
                                    <CheckCircle size={14} className="me-50" />
                                    <span className="align-middle">
                                        {row.active ? 'غیر فعال' : 'فعال'}
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
