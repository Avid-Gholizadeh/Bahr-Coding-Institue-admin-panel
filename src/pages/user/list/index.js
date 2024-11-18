// // ** User List Component
// import Table from './Table'

// // ** Reactstrap Imports
// import { Row, Col } from 'reactstrap'

// // ** Custom Components
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// // ** Icons Imports
// import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// // ** Styles
// import '@styles/react/apps/app-users.scss'
// import { useQuery } from '@tanstack/react-query'
// import { GetUserList } from '../../../@core/services/api/User'
// import { useEffect, useState } from 'react'
// import { GetTotalCount } from '../../../@core/services/api/User'

// const UsersList = () => {
  
//   const {data: userList} = useQuery({queryKey: ['GetUserList'], queryFn: GetTotalCount})

//   return (
//     <div className='app-user-list'>
//       <Table hover data={userList} />
//     </div>
//   )
// }

// export default UsersList
