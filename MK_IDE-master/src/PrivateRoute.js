import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }) => {
  const token = document.cookie.includes('jwt');
   
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
