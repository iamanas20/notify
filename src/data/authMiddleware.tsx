import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useData } from "./context";
import { PageLoader } from "../components";
import { useQuery, useQueryClient } from "react-query";
import { useApi } from "./useApi";

type AuthMiddlewareProps = {
  children: JSX.Element;
}

export function AuthMiddleware(props: AuthMiddlewareProps) {
  const navigate = useNavigate();
  const { update } = useData();
  const [cookies] = useCookies(['token']);
  const api = useApi();

  const { isFetching } = useQuery(
    'userQuery',
    async () => {
      const { data } = await api.get('auth/me');
      return data;
    },
    {
      onSuccess: () => {
        update({
          token: cookies["token"],
        });
      },
      enabled: cookies["token"] !== undefined,
    }
  );

  useEffect(
    () => {
      if(!cookies["token"]) {
        navigate('/auth');
      }
    }, []
  );

  return isFetching ? <PageLoader /> : props.children;
}

export function useUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { update } = useData();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  function logout() {
    removeCookie("token");
    update({
      token: '',
    });
    navigate('/auth');
  }

  function setUserToken(userToken: string) {
    setCookie("token", userToken, { path: '/' });
  }

  return {
    user: queryClient.getQueryData('userQuery'),
    logout,
    setUserToken,
  }
}