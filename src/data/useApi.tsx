import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useUser } from "./useUser";

type useApiReturn = {
  get: (endpoint: string) => Promise<AxiosResponse<any>>;
  post: (endpoint: string, data: any) => Promise<AxiosResponse<any>>;
  delete: (endpoint: string) => Promise<AxiosResponse<any>>;
}

export function useApi(authed = true): useApiReturn {
  const [cookies] = useCookies(['token']);

  const authHeaders = authed ? { headers: { Authorization: `Bearer ${cookies["token"]}` } } : {}

  function get(endpoint: string): Promise<AxiosResponse<any>> {
    return axiosInstance.get(
      endpoint,
      authHeaders
    )
  }

  function post(endpoint: string, data: any): Promise<AxiosResponse<any>> {
    return axiosInstance.post(
      endpoint,
      data,
      authHeaders
    )
  }

  function deleteFunction(endpoint: string): Promise<AxiosResponse<any>> {
    return axiosInstance.delete(
      endpoint,
      authHeaders
    )
  }

  return {
    get,
    post,
    delete: deleteFunction,
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

type AxiosInterceptorProps = {
  children: JSX.Element;
}

export type ErrorData = {
  code: string; message: string
}

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const { logout } = useUser();
  useEffect(
    () => {
      const resInterceptor = (response: AxiosResponse<any>) => {
        return response;
      }
      const errInterceptor = (error: AxiosError) => {
        if (error.response!.status === 401) {
          logout();
        }
        toast.error(`Error: ${error.response?.status} — ${(error.response?.data as ErrorData).message}`);
        return Promise.reject(error);
      }

      const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);
      return () => axiosInstance.interceptors.response.eject(interceptor);
    }, []
  )

  return children;
}