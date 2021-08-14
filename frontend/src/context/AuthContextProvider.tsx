import axios from "axios";
import React, { ReactElement } from "react";
import { useState } from "react";
import {
  getMe,
  getMyFollowingsRequest,
  signupRequest,
} from "../httpRequests/user";
import { User } from "../types";

interface IAuthContext {
  signup: (body: any) => void;
  user: null | User;
  setUserHandler: (user: User) => void;
  getMyFollowings: () => void;
  followings: string[];
  followNewUser: (id: string) => void;
  unfollowUser: (id: string) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  signup: () => {},
  user: null,
  setUserHandler: () => {},
  getMyFollowings: () => {},
  followings: [],
  followNewUser: (id: string) => {},
  unfollowUser: (id: string) => {},
});

const AuthContextProvider = (props: { children: ReactElement }) => {
  const [user, setUser] = useState<null | User>(null);
  const [followings, setFollowings] = useState<string[]>([]);

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
        _id: data.data._id,
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

  const followNewUser = function (id: string) {
    setFollowings([...followings, id]);
  };

  const getMyFollowings = async function () {
    const { data } = await getMyFollowingsRequest();
    const myFollowings = data.data;

    setFollowings(myFollowings.map((el: any) => el.following._id));
  };

  const unfollowUser = function (id: string) {
    setFollowings(followings.filter((el) => el !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserHandler: setUserHandler,
        signup,
        getMyFollowings,
        followings,
        followNewUser,
        unfollowUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
