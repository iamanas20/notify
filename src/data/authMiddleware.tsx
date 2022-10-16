import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useData } from "./context";
import { PageLoader } from "../components";

type AuthMiddlewareProps = {
  children: any;
}

export function AuthMiddleware(props: AuthMiddlewareProps) {
  const navigate = useNavigate();
  const { state, update } = useData();
  const [cookies] = useCookies(['token']);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      if(!state.user){
        if(cookies["token"]){
          // make API call to get user
          axios.get(process.env.REACT_APP_API_URL + 'auth/me', {
            headers: { Authorization: `Bearer ${cookies["token"]}` }
          })
          .then(
            response => {
              update({
                token: cookies["token"],
                user: response.data
              });
            }
          )
          .finally(
            () => {
              setLoading(false);
            }
          );
        } else {
          navigate('/auth');
        }
      } else {
        setLoading(false);
      }
    }, []
  )
  return loading ? <PageLoader /> : props.children;
}

export function useUser() {
  const navigate = useNavigate();
  const { state, update } = useData();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  function logout() {
    removeCookie("token");
    update({
      token: '',
      user: null,
    });
    navigate('/auth');
  }

  function setUserToken(userToken: string) {
    update({
      token: userToken
    });
    setCookie("token", userToken, { path: '/' });
  }

  return {
    user: state.user,
    logout,
    setUserToken,
  }
}