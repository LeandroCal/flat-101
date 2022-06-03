import { BrowserRouter as Router } from 'react-router-dom'
import { RedirectContextProvider } from './context/RedirectContext'
import RootRoutes from './routes'

function App() {
    return (
        <Router basename="/">
            <RedirectContextProvider>
                <RootRoutes />
            </RedirectContextProvider>
        </Router>
    )
}

export default App
