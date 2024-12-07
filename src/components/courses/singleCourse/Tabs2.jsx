import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {AtSign, UserCheck} from 'react-feather'
import {SocialGroups} from './social-groups/SocialGroups'
import {CourseAssistaceAccardion} from './CourseAssistaceAccardion'

export function Tabs2({active, toggleTab, course}) {
    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <AtSign className="font-medium-3 me-50" />
                        <span className="fw-bold">فضای مجازی</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <UserCheck className="font-medium-3 me-50" />
                        <span className="fw-bold">دستیاران</span>
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <SocialGroups />
                </TabPane>
                <TabPane tabId="2">
                    <CourseAssistaceAccardion course={course} />
                </TabPane>
            </TabContent>
        </>
    )
}
