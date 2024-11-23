import React, {Suspense} from 'react'

// ** Router Import
import Router from './router/Router'

const App = () => {
    console.log(Router)
    return (
        <Suspense fallback={null}>
            <Router />
        </Suspense>
    )
}

export default App
