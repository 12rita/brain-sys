import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToasterProvider, WebSocketProvider} from "./hooks";
import {Connect, Main} from "./pages";
import {ERoutes} from "./routes.ts";


function App() {

    return (
        <>
            <WebSocketProvider>
                <BrowserRouter>
                    <ToasterProvider>
                        <Routes>
                            <Route path={ERoutes.CONNECT} element={<Connect/>}/>
                            <Route path={ERoutes.MAIN} element={<Main/>}/>
                        </Routes>
                    </ToasterProvider>
                </BrowserRouter>
            </WebSocketProvider>
        </>
    )
}

export default App
