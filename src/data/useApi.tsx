import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "./useUser";

type useApiReturn = {
  get: (endpoint: string) => Promise<AxiosResponse<any, any>>;
  post: (endpoint: string, data: any) => Promise<AxiosResponse<any, any>>;
  delete: (endpoint: string, data: any) => Promise<AxiosResponse<any, any>>;
}

export function useApi(authed = true): useApiReturn {
  const [cookies] = useCookies(['token']);

  function get(endpoint: string): Promise<AxiosResponse<any, any>> {
    return axiosInstance.get(
      endpoint,
      authed ? {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
      } : {}
    )
  }

  function post(endpoint: string, data: any): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post(
      endpoint,
      data,
      authed ? {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
      } : {}
    )
  }

  function deleteFunction(endpoint: string, data: any): Promise<AxiosResponse<any, any>> {
    return axiosInstance.delete(
      endpoint,
      authed ? {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
      } : {}
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

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const { logout } = useUser();
  useEffect(
    () => {
      const resInterceptor = (response: AxiosResponse<any, any>) => {
        return response;
      }
      const errInterceptor = (error: AxiosError) => {
        if (error.response!.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }

      const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);
      return () => axiosInstance.interceptors.response.eject(interceptor);
    }, []
  )

  return children;
}