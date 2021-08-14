import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return <div></div>;
};

export default PrivateRoute;
