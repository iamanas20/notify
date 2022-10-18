import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useData } from "./context";

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