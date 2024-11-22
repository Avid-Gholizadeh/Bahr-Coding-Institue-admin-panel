// ** User List Component
import Table from './Table'
// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = ({selectable, onSelect}) => {
    return (
        <div className="app-user-list">
            <Table hover />
        </div>
    )
}

export default UsersList
