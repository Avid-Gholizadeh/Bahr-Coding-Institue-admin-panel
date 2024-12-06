import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {AtSign, Bell, DollarSign, Link, MessageSquare, ShoppingCart, Users} from 'react-feather'
import {ReserveTable} from '../reserve/ReserveTable'
import {StudentsTable} from './StudentsTable'
import {GroupsTable} from '../groups/GroupsTable'
import {CoursePaymentStatus} from './CoursePaymentStatus'
import {CoursePaymentList} from './CoursePaymentList'
import {CourseComment} from '@Components/commentMng/CourseComment'
import {SocialGroups} from './social-groups/SocialGroups'

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
                        <MessageSquare className="font-medium-3 me-50" />
                        <span className="fw-bold">نظرات</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                        <Bell className="font-medium-3 me-50" />
                        <span className="fw-bold"> وضعیت پرداخت</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                        <DollarSign className="font-medium-3 me-50" />
                        <span className="fw-bold">لیست پرداخت</span>
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
                <TabPane tabId="4">
                    <CourseComment singleCourse />
                </TabPane>
                <TabPane tabId="5">
                    <CoursePaymentStatus singleCourseId={singleCourseId} />
                </TabPane>
                <TabPane tabId="6">
                    <CoursePaymentList singleCourseId={singleCourseId} />
                </TabPane>
            </TabContent>
        </>
    )
}
