// ** React Imports
import {useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import bahrLongLogo from '@src/assets/images/logo/long-Logo.svg'

// ** Icons Imports
import {Disc, X, Circle} from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'

// ** Utils
import {getUserData, getHomeRouteForLoggedInUser} from '@utils'

const VerticalMenuHeader = props => {
    // ** Props
    const {menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover} = props

    // ** Vars
    const user = getUserData()

    // ** Reset open group
    useEffect(() => {
        if (!menuHover && menuCollapsed) setGroupOpen([])
    }, [menuHover, menuCollapsed])

    // ** Menu toggler component
    const Toggler = () => {
        if (!menuCollapsed) {
            return (
                <Disc
                    size={20}
                    data-tour="toggle-icon"
                    className="text-primary toggle-icon d-none d-xl-block"
                    onClick={() => setMenuCollapsed(true)}
                />
            )
        } else {
            return (
                <Circle
                    size={20}
                    data-tour="toggle-icon"
                    className="text-primary toggle-icon d-none d-xl-block"
                    onClick={() => setMenuCollapsed(false)}
                />
            )
        }
    }

    return (
        <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
                <li className="nav-item me-auto">
                    <NavLink to="/home" className="navbar-brand">
                        <span className="brand-logo" style={{marginTop: menuCollapsed ? -8 : -15}}>
                            <img src={themeConfig.app.appLogoImage} alt="logo" />
                        </span>
                        {!menuCollapsed && (
                            <div className="w-100 " style={{}}>
                                <img
                                    src={bahrLongLogo}
                                    alt="logo"
                                    width={130}
                                    height={30}
                                    style={{transform: 'scale(1.4)', paddingRight: 18}}
                                />
                            </div>
                        )}

                        {/* <h2 className="brand-text mb-0" style={{color: '#00B8D4'}}>
                            {themeConfig.app.appName}
                        </h2> */}
                    </NavLink>
                </li>
                <li className="nav-item nav-toggle">
                    <div className="nav-link modern-nav-toggle cursor-pointer">
                        <Toggler />
                        <X
                            onClick={() => setMenuVisibility(false)}
                            className="toggle-icon icon-x d-block d-xl-none"
                            size={20}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default VerticalMenuHeader
