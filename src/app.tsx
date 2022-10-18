import { Fragment, useState } from 'react';
import { Navbar } from './components';
import { AuthMiddleware } from './data/authMiddleware';
import { QueryClient, QueryClientProvider } from 'react-query'

import './styles/index.scss';
import { StateType } from './data/types';

import {
  state,
  AppContext,
  AppUpdateContext,
  AxiosInterceptor
} from './data';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  const [appState, setAppState] = useState<StateType>(state);
  console.log(process.env.REACT_APP_API_URL);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

function DashboardApp() {
  return (
    <Fragment>
      <Navbar />
      <AxiosInterceptor>
        <AuthMiddleware>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/note/*' element={<Note />} />
          </Routes>
        </AuthMiddleware>
      </AxiosInterceptor>
    </Fragment>
  )
}