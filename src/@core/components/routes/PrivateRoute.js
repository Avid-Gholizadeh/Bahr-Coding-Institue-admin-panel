// ** React Imports
import {Navigate} from 'react-router-dom'
import {useContext, Suspense} from 'react'

// ** Context Imports
import {AbilityContext} from '@src/utility/context/Can'

// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'
import {getLocalStroge} from '../../utils/localStorage.utils'

/* const PrivateRoute = ({children, route}) => {
    // ** Hooks & Vars
    // const ability = useContext(AbilityContext);
    const user = getLocalStroge('user')

    if (route) {
        let action = null
        let resource = null
        let restrictedRoute = false

        if (route.meta) {
            action = route.meta.action
            resource = route.meta.resource
            restrictedRoute = route.meta.restricted
        }
        if (!user) {
            return <Navigate to="/login" />
        }
        // if (user && restrictedRoute) {
        //   return <Navigate to="/" />;
        // }
        // if (user && restrictedRoute && user.role === "client") {
        //   return <Navigate to="/access-control" />;
        // }
        if (
            user &&
            restrictedRoute &&
            !user.roles.find(role => role === 'Administrator') &&
            !user.roles.find(role => role === 'Employee.Admin')
        ) {
            return <Navigate to="/access-control" />
        }
        // if (user && !ability.can(action || "read", resource)) {
        //   return <Navigate to="/misc/not-authorized" replace />;
        // }
    }

    return <Suspense fallback={<Spinner className="content-loader" />}>{children}</Suspense>
}

export default PrivateRoute
 */

export default function PrivateRoute(children, route) {
    console.log('r7')
    const user = getLocalStroge('user')

    if (route) {
        let action = null
        let resource = null
        let restrictedRoute = false

        if (route.meta) {
            action = route.meta.action
            resource = route.meta.resource
            restrictedRoute = route.meta.restricted
        }
        if (!user) {
            console.log('r1')
            return <Navigate to="/login" />
        }
        // if (user && restrictedRoute) {
        //   return <Navigate to="/" />;
        // }
        // if (user && restrictedRoute && user.role === "client") {
        //   return <Navigate to="/access-control" />;
        // }

        if (
            user &&
            restrictedRoute &&
            !user.roles.find(role => role === 'Administrator') &&
            !user.roles.find(role => role === 'Employee.Admin')
        ) {
            console.log('r2')
            return <Navigate to="/access-control" />
        }
        /*  if (
            user &&
            restrictedRoute &&
            (user.roles.find(role => role === 'Administrator') ||
                user.roles.find(role => role === 'Employee.Admin'))
        ) {
            console.log('r3')
            return <Navigate to="/" />
        } */
        // if (user && !ability.can(action || "read", resource)) {
        //   return <Navigate to="/misc/not-authorized" replace />;
        // }
    }

    // return <Suspense fallback={<Spinner className="content-loader" />}>{children}</Suspense>
    console.log('r4')
    return children
}

export function publicRoute(component) {
    const user = getLocalStroge('user')

    if (
        user &&
        (user.roles.find(role => role === 'Administrator') ||
            user.roles.find(role => role === 'Employee.Admin'))
    ) {
        console.log('r5')
        return <Navigate to="/" />
    } else if (!user) {
        console.log('r6')
        return component
    }
}
