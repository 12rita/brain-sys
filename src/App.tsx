import { Route, Routes } from 'react-router-dom';
import { ToasterProvider, WebSocketProvider } from './hooks';
import { Connect, Main, Admin } from './pages';
import { ERoutes } from './routes.ts';

function App() {
  return (
    <>
      <ToasterProvider>
        <WebSocketProvider>
          <Routes>
            <Route path={ERoutes.CONNECT} element={<Connect />} />
            <Route path={ERoutes.MAIN} element={<Main />} />
            <Route path={ERoutes.ADMIN} element={<Admin />} />
          </Routes>
        </WebSocketProvider>
      </ToasterProvider>
    </>
  );
}

export default App;
