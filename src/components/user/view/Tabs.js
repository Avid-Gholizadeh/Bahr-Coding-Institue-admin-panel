// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Link, Target, Book } from 'react-feather'

// ** User Components

import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'
import { MoreDetail } from './MoreDetail'

const UserTabs = ({ active, toggleTab, user }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'> دوره ها </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Target className='font-medium-3 me-50' />
            <span className='fw-bold'> نقش ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'> اطلاعات بیشتر </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList user={user} />
        </TabPane>
        <TabPane tabId='2'>
          <Notifications user={user} />
        </TabPane>
        <TabPane tabId='3'>
          <MoreDetail user={user} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
