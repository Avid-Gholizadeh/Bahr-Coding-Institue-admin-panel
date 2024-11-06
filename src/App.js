import React, {Suspense} from 'react'

// ** Router Import
import Router from './router/Router'

const App = () => {
    return (
        <Suspense fallback={null}>
            {/* <div dir="rtl">
                <Router />
            </div> */}
            <Router />
        </Suspense>
    )
}

export default App
