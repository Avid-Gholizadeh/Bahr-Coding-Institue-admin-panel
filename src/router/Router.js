// ** Router imports
import {useRoutes} from 'react-router-dom'

// ** GetRoutes
import {getRoutes, Routes} from './routes'

// ** Hooks Imports
import {useLayout} from '@hooks/useLayout'

const Router = () => {
    // ** Hooks
    const {layout} = useLayout()

    const allRoutes = getRoutes(layout)

    const routes = useRoutes([...allRoutes])
    // const routes = useRoutes(Routes)

    return routes
}

export default Router
