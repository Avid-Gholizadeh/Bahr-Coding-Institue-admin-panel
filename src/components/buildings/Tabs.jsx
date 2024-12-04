import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {Codepen, Codesandbox, Database} from 'react-feather'
import {useState} from 'react'
import {BuildingTable} from '@Components/buildings/BuildingTable'
import {Department} from './Department'
import {ClassRoom} from './ClassRoom'

export function Tabs() {
    //
    const [active, setActive] = useState('1')

    function toggleTab(tab) {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <Codesandbox className="font-medium-3 me-50" />
                        <span className="fw-bold">ساختمان </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <Codepen className="font-medium-3 me-50" />
                        <span className="fw-bold">دپارتمان</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                        <Database className="font-medium-3 me-50" />
                        <span className="fw-bold">کلاس </span>
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <BuildingTable />
                </TabPane>
                <TabPane tabId="2">
                    <Department />
                </TabPane>
                <TabPane tabId="3">
                    <ClassRoom />
                </TabPane>
            </TabContent>
        </>
    )
}
