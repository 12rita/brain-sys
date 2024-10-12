import {FC} from 'react'
import './App.css'
import {
    BrowserRouter, useRoutes,
} from "react-router-dom";
import {routes} from "./routes.tsx";
import {AuthProvider, useAuth} from "./hooks";

const Routes: FC = () => {
    const {isConnected} = useAuth();
    const authRoutes = isConnected ? routes : routes.filter(route => route.path !== '/main');
    return useRoutes(authRoutes)
}

function App() {

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
