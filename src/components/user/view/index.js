// ** React Imports
import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// ** store? & Actions
import {getUser} from '../store?'
import {useSelector, useDispatch} from 'react-redux'

// ** Reactstrap Imports
import {Row, Col, Alert, Spinner} from 'reactstrap'

// ** User View Components
// import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import Tabs from './Tabs'

// ** Styles
import '@styles/react/apps/app-users.scss'
import {useQuery} from '@tanstack/react-query'
import {getDetailUser} from '../../../@core/services/api/User'
import {SecondTabs} from './SecondTabs'
import {getAllAssistance} from '@core/services/api/assistance'
// import {Tabs2} from ''

function UserView() {
    // ** Hooks
    const {id} = useParams()
    const [secondActive, setSecondActive] = useState('1')

    const [active, setActive] = useState('1')

    const toggleTab = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    function toggleSecondTab(tab) {
        if (secondActive !== tab) {
            setSecondActive(tab)
        }
    }

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['getDetailUser', id],
        queryFn: () => getDetailUser(id),
    })

    let {data: assistance} = useQuery({
        queryKey: ['all-assistance-list'],
        queryFn: getAllAssistance,
    })

    const isCurrentUserAssistance = assistance?.filter(item => item.userId === user?.id) || []

    // console.log(isCurrentUserAssistance)

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner color="primary" />
            </div>
        )
    }

    if (isError) {
        return (
            <Alert color="danger">
                <h4 className="alert-heading">خطا در بارگیری</h4>
                <div className="alert-body">
                    مشکلی در دریافت اطلاعات کاربر به وجود آمد. لطفاً دوباره امتحان کنید.
                </div>
            </Alert>
        )
    }
    return user?.id !== null && user?.id !== undefined ? (
        <div className="app-user-view">
            <Row>
                <Col xl="4" lg="5">
                    <UserInfoCard
                        selectedUser={user}
                        isCurrentUserAssistance={isCurrentUserAssistance}
                    />
                </Col>
                <Col xl="8" lg="7">
                    <Tabs user={user} active={active} toggleTab={toggleTab} />
                    <hr className="my-3" />
                    <SecondTabs
                        user={user}
                        active={secondActive}
                        toggleTab={toggleSecondTab}
                        isCurrentUserAssistance={isCurrentUserAssistance}
                    />
                </Col>
            </Row>
        </div>
    ) : (
        <Alert color="danger">
            <h4 className="alert-heading">کاربر پیدا نشد</h4>
            <div className="alert-body">
                کاربر با شناسه مورد نظر یافت نشد <Link to="/user/list">لیست کاربران</Link>
            </div>
        </Alert>
    )
}
export default UserView
