import React, { Fragment, useState } from 'react';
import { AppContext, AppUpdateContext } from './data/context';
import { state, StateType } from './data/state';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  Auth,
  Home,
  Note
} from './pages';

import './styles/index.scss';
import { AuthMiddleware } from './data/authMiddleware';
import { Navbar } from './components';

export default function App() {
  const [appState, setAppState] = useState<StateType>(state);
  console.log(process.env.REACT_APP_API_URL);
  return (
    <React.StrictMode>
      <AppContext.Provider value={appState}>
        <AppUpdateContext.Provider value={setAppState}>
          <BrowserRouter>
            <Routes>
              <Route path='/auth/*' element={<Auth />} />
              <Route path='/*' element={<DashboardApp />} />
            </Routes>
          </BrowserRouter>
        </AppUpdateContext.Provider>
      </AppContext.Provider>
    </React.StrictMode>
  )
}

function DashboardApp() {
  return (
    <Fragment>
      <Navbar />
      <AuthMiddleware>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/note/*' element={<Note />} />
        </Routes>
      </AuthMiddleware>
    </Fragment>
  )
}