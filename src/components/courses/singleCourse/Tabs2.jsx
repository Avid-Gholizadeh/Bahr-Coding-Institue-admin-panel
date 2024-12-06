import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {AtSign, Bell, DollarSign, Link, MessageSquare, ShoppingCart, Users} from 'react-feather'
import {SocialGroups} from './social-groups/SocialGroups'

export function Tabs2({active, toggleTab}) {
    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <AtSign className="font-medium-3 me-50" />
                        <span className="fw-bold">فضای مجازی</span>
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <SocialGroups />
                </TabPane>
            </TabContent>
        </>
    )
}
