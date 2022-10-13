import React, { useState } from 'react';
import { AppContext, AppUpdateContext } from './data';
import { state, StateType } from './data/state';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { Home } from './pages';
import './styles/index.scss';
import { Note } from './pages/note';

export default function App() {
  const [appState, setAppState] = useState<StateType>(state);
  return (
    <React.StrictMode>
      <AppContext.Provider value={appState}>
        <AppUpdateContext.Provider value={setAppState}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/note' element={<Note />} />
            </Routes>
          </BrowserRouter>
        </AppUpdateContext.Provider>
      </AppContext.Provider>
    </React.StrictMode>
  )
}