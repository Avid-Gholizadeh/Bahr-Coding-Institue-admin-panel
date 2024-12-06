// ** React Imports
import {Link} from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {User, Power, ExternalLink} from 'react-feather'

// ** Reactstrap Imports
import {UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner} from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import {useDispatch, useSelector} from 'react-redux'
import useRoleTranslations from '@core/utils/hooks/useRoleTranslation'
import {tokenActions} from '../../../../redux/auth'

const UserDropdown = ({profileData, profileLoading}) => {
    const user = useSelector(state => state.token.user)
    const {roleTranslations} = useRoleTranslations()

    const translatedRoles = user?.roles?.map(role => roleTranslations[role] || role)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(tokenActions.logout())
    }
    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            {profileLoading ? (
                <Spinner type="grow" size="sm" color="primary" />
            ) : (
                <>
                    <DropdownToggle
                        href="/"
                        tag="a"
                        className="nav-link dropdown-user-link"
                        onClick={e => e.preventDefault()}
                    >
                        <div className="user-nav d-sm-flex d-none">
                            <span className="user-name fw-bold fs-4" style={{marginBottom: 10}}>
                                {profileData?.fName} {profileData?.lName}{' '}
                            </span>
                            <span className="user-status">
                                {translatedRoles?.length > 0
                                    ? translatedRoles.join(' ، ')
                                    : 'نقش مشخص نشده'}
                            </span>
                        </div>
                        <Avatar
                            img={profileData?.currentPictureAddress || defaultAvatar}
                            imgHeight="40"
                            imgWidth="40"
                            status="online"
                        />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem tag={Link} to={`/user/view/${user.id}`}>
                            <User size={14} className="me-75" />
                            <span className="align-middle">صفحه من</span>
                        </DropdownItem>
                        <DropdownItem
                            tag="a"
                            href="http://localhost:5173"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink size={14} className="me-75" />
                            <span className="align-middle">سایت اصلی</span>
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout} tag={Link} to="/login">
                            <Power size={14} className="me-75" />
                            <span className="align-middle">خروج از حساب</span>
                        </DropdownItem>
                    </DropdownMenu>
                </>
            )}
        </UncontrolledDropdown>
    )
}

export default UserDropdown
// <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
// <MessageSquare size={14} className="me-75" />
// <span className="align-middle">Chats</span>
// </DropdownItem>
// <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
//   <Mail size={14} className="me-75" />
//   <span className="align-middle">Inbox</span>
// </DropdownItem>
// <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
//   <MessageSquare size={14} className="me-75" />
//   <span className="align-middle">Chats</span>
// </DropdownItem>
// <DropdownItem
//   tag={Link}
//   to="/pages/"
//   onClick={(e) => e.preventDefault()}
// >
//   <Settings size={14} className="me-75" />
//   <span className="align-middle">Settings</span>
// </DropdownItem>
