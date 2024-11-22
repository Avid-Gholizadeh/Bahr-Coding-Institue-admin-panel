import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {Bell, Link, ShoppingCart, Users} from 'react-feather'
import {ReserveTable} from '../reserve/ReserveTable'
import {StudentsTable} from './StudentsTable'
import {GroupsTable} from '../groups/GroupsTable'

export function Tabs({active, toggleTab, singleCourseId, course}) {
    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <ShoppingCart className="font-medium-3 me-50" />
                        <span className="fw-bold">رزرو ها</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <Users className="font-medium-3 me-50" />
                        <span className="fw-bold">دانشجویان</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                        <Link className="font-medium-3 me-50" />
                        <span className="fw-bold">گروه ها</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                        <Bell className="font-medium-3 me-50" />
                        <span className="fw-bold">نظرات</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <ReserveTable singleCourseId={singleCourseId} />
                </TabPane>
                <TabPane tabId="2">
                    <StudentsTable course={course} />
                </TabPane>
                <TabPane tabId="3">
                    <GroupsTable course={course} />
                </TabPane>
                <TabPane tabId="4">{/* <Notifications /> */}</TabPane>
            </TabContent>
        </>
    )
}
