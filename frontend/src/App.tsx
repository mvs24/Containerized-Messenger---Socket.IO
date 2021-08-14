import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import SocketProvider from "./context/SocketProvider";
import { getMe } from "./httpRequests/user";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<undefined | User>(undefined);
  const [error, setError] = useState<undefined | string>();
  const [checkedLoggedInUser, setCheckedLoggedInUser] = useState(true);

  useEffect(() => {
    const getLoggedInUser = async function () {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await getMe();
          const user = {
            name: data.data.name,
            lastname: data.data.lastname,
            email: data.data.email,
          };
          setUser(user);
          setCheckedLoggedInUser(false);
        } catch (err) {
          setError(err);
          setCheckedLoggedInUser(false);
        }
      }
      setCheckedLoggedInUser(false);
    };

    getLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <SocketProvider>
        <AuthContextProvider>
          {checkedLoggedInUser ? (
            <></>
          ) : (
            <>
              {!user ? (
                <Route
                  path="/"
                  exact
                  render={() => <Signup setUser={(user) => setUser(user)} />}
                />
              ) : (
                <Redirect to="/home/1" />
              )}
              {user ? (
                <Route
                  path="/home/:page"
                  exact
                  render={() => <Home user={user} />}
                />
              ) : (
                <Redirect to="/" />
              )}
            </>
          )}
        </AuthContextProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
