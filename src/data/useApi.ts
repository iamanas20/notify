import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

type useApiReturn = {
  get: (endpoint: string) => Promise<AxiosResponse<any, any>>;
  post: (endpoint: string, data: any) => Promise<AxiosResponse<any, any>>;
}

export function useApi(authed = true): useApiReturn {
  const [cookies] = useCookies(['token']);

  function get(endpoint: string): Promise<AxiosResponse<any, any>> {
    return axios.get(
      process.env.REACT_APP_API_URL + endpoint,
      authed ? {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
      } : {}
    )
  }

  function post(endpoint: string, data: any): Promise<AxiosResponse<any, any>> {
    return axios.post(
      process.env.REACT_APP_API_URL + endpoint,
      data,
      authed ? {
        headers: { Authorization: `Bearer ${cookies["token"]}` }
      } : {}
    )
  }

  return {
    get,
    post
  }
}