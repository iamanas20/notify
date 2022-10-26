import { Fragment, useState } from 'react';
import { Navbar } from './components';
import { AuthMiddleware } from './data/authMiddleware';
import { QueryClient, QueryClientProvider } from 'react-query'

import './styles/index.scss';
import { StateType } from './data/types';
import { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
      <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>`.trim()} />
      </Helmet>
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
      <Toaster position="bottom-center"/>
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