import {Label, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {Book, User} from 'react-feather'
import {Table} from '@Components/courses/Table'
import {useState} from 'react'
import UsersListTable from '@Components/user/list/Table'

export function SelectAssistaneTabs({setSelectedCourse, setSelectedUser, singleUser}) {
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
                        <Book className="font-medium-3 me-50" />
                        <span className="fw-bold">انتخاب دوره</span>
                    </NavLink>
                </NavItem>
                {!singleUser && (
                    <NavItem>
                        <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                            <User className="font-medium-3 me-50" />
                            <span className="fw-bold">انتخاب کاربر</span>
                        </NavLink>
                    </NavItem>
                )}
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    {/* <Label className="mb-1 fs-5">یک دوره را انتخاب کنید :</Label> */}
                    <Table selectable onSelect={course => setSelectedCourse(course)} />
                </TabPane>
                <TabPane tabId="2">
                    {/* <Label className="mb-1  fs-5">یک کاربر را انتخاب کنید :</Label> */}
                    <UsersListTable selectable onSelect={user => setSelectedUser(user)} />
                </TabPane>
            </TabContent>
        </>
    )
}
