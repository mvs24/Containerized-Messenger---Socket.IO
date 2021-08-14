import axios from "axios";
import React, { ReactElement } from "react";
import { useState } from "react";
import { getMe, signupRequest } from "../httpRequests/user";
import { User } from "../types";

interface IAuthContext {
  signup: (body: any) => void;
  user: null | User;
  setUserHandler: (user: User) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  signup: () => {},
  user: null,
  setUserHandler: () => {},
});

const AuthContextProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useState<null | User>(null);

  const setTokenOnRequestHeaders = function (token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const saveTokenInLocalStorage = function (token: string) {
    localStorage.setItem("jwt", token);
  };

  const signup = async function (body: any) {
    try {
      const { data } = await signupRequest(body);

      const user = {
        name: data.data.name,
        lastname: data.data.lastname,
        email: data.data.email,
      };
      setUser(user);

      setTokenOnRequestHeaders(data.token);
      saveTokenInLocalStorage(data.token);
    } catch (err) {
      throw err;
    }
  };

  const setUserHandler = function (user: User) {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUserHandler: setUserHandler, signup }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
