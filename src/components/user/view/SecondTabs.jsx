import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {CheckCircle} from 'react-feather'
import {AssistanceWorkTable} from '@Components/courses/assistance-work/AssistanceWorkTable'

export function SecondTabs({active, toggleTab, user, isCurrentUserAssistance}) {
    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <CheckCircle className="font-medium-3 me-50" />
                        <span className="fw-bold">وظایف</span>
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <AssistanceWorkTable
                        user={user}
                        isCurrentUserAssistance={isCurrentUserAssistance}
                    />
                </TabPane>
            </TabContent>
        </>
    )
}
