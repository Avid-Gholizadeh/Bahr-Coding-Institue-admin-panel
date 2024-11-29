// ** React Imports
import {Fragment} from 'react'

// ** Reactstrap Imports
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'

// ** Icons Imports
import {User, Lock, Bookmark, Link, Target, Book, FileText} from 'react-feather'

// ** User Components

import GiveRole from './GiveRole'
import UserProjectsList from './UserProjectsList'
import {MoreDetail} from './MoreDetail'
import {UserCourseReserve} from './UserCourseReserve'
import {UserComment} from './UserComment'

const UserTabs = ({active, toggleTab, user}) => {
    return (
        <Fragment>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <Book className="font-medium-3 me-50" />
                        <span className="fw-bold"> دوره ها </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <Book className="font-medium-3 me-50" />
                        <span className="fw-bold"> رزروی ها</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                        <Target className="font-medium-3 me-50" />
                        <span className="fw-bold"> نقش ها</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                        <FileText className="font-medium-3 me-50" />
                        <span className="fw-bold"> اطلاعات بیشتر </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                        <FileText className="font-medium-3 me-50" />
                        <span className="fw-bold"> کامنت های کاربر </span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <UserProjectsList user={user} />
                </TabPane>
                <TabPane tabId="2">
                    <UserCourseReserve user={user} />
                </TabPane>
                <TabPane tabId="3">
                    <GiveRole user={user} />
                </TabPane>
                <TabPane tabId="4">
                    <MoreDetail user={user} />
                </TabPane>
                <TabPane tabId="5">
                    <UserComment userId={user.id} />
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default UserTabs
