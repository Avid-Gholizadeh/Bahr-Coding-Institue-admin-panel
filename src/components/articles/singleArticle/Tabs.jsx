import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {Bell, Link, MessageSquare, ShoppingCart, Users} from 'react-feather'
import {ArticleDetailsTab} from './ArticleDetailsTab'
/* import {ReserveTable} from '../reserve/ReserveTable'
import {StudentsTable} from './StudentsTable'
import {GroupsTable} from '../groups/GroupsTable'*/
import {CourseComment} from '@Components/commentMng/CourseComment'

export function Tabs({active, toggleTab, singleArticle}) {
    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <ShoppingCart className="font-medium-3 me-50" />
                        <span className="fw-bold"> جزئیات خبر</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <MessageSquare className="font-medium-3 me-50" />
                        <span className="fw-bold">نظرات</span>
                    </NavLink>
                </NavItem>
                {/* <NavItem>
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
                </NavItem> */}
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <ArticleDetailsTab singleArticle={singleArticle} />
                </TabPane>
                <TabPane tabId="2">
                    <CourseComment singleArticle={singleArticle} />
                </TabPane>
                {/* <TabPane tabId="3">
                    <GroupsTable course={course} />
                </TabPane>
                <TabPane tabId="4">
                    <CourseComment singleCourse />
                </TabPane> */}
            </TabContent>
        </>
    )
}
