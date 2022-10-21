import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { ErrorData } from '../../data';
import { Login } from './login';
import { Signup } from './signup';

export function Auth() {
  return (
    <Routes>
      <Route index element={<Login />}/>
      <Route path='login' element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
    </Routes>
  )
}

export function onError(error: Error) {
  const axiosError = error as AxiosError;
  toast.error(`Error: ${axiosError.response?.status} — ${(axiosError.response?.data as ErrorData).message}`);
}