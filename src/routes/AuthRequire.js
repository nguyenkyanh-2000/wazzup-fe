import LoadingScreen from "../components/LoadingScreen";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AuthRequire = ({ children }) => {
  const { isInitialized, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  if (!isInitialized) return <LoadingScreen />;

  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default AuthRequire;
