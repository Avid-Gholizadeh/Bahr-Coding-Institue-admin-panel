// ** User List Component
import Table from './Table'
import UsersListTable from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'


const UsersList = () => {
  
  return (
    <div className='app-user-list'>
      <UsersListTable />
    </div>
  )
}

export default UsersList
