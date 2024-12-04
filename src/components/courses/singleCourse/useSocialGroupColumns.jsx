import {Edit3, ExternalLink} from 'react-feather'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'

export function useSocialGroupColumns({handleModalOpen}) {
    //
    return [
        {
            name: 'نام گروه',
            minWidth: '200px',
            sortField: 'groupName',
            selector: row => row.groupName,
            cell: row => {
                return (
                    <p
                        className="fw-bolder fs-5 text-truncate "
                        onClick={() => handleModalOpen(row)}
                    >
                        {row.groupName}
                    </p>
                )
            },
        },
        {
            name: 'لینک گروه',
            minWidthWidth: '200px',
            sortable: true,
            sortField: 'groupLink',
            selector: row => row.groupLink,
            cell: row => (
                <Link to={row.groupLink} className="d-flex align-items-center gap-1 fs-6 text-info">
                    <span>لینک اتصال</span>
                    <ExternalLink size={18} />
                </Link>
            ),
        },
        {
            name: 'عملیات',
            minWidth: '100px',
            cell: row => (
                <Button.Ripple
                    className="btn-icon"
                    color="primary"
                    onClick={() => handleModalOpen(row)}
                >
                    <Edit3 size={14} />
                </Button.Ripple>
            ),
        },
    ]
}
