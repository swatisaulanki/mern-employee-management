
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Contextsfetch } from "../context/AuthContext";

const RequiredAuth = ({ children }) => {
  const { isAuth } = useContext(Contextsfetch);

  if (isAuth || localStorage.getItem("authUser")) {
    return children;
  } else {
    return <Navigate to="/signin"/>;
  }
};

export default RequiredAuth;