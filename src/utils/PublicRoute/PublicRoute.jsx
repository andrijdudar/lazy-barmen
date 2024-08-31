import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStoreAuth from "../StoreAuth";

const PublicRoute = () => {
  // const navigate = useNavigate();
  // const accessToken = useStoreAuth((state) => state.access_token);
  // const setAuthenticated = useStoreAuth((state) => state.setAuthenticated);

  // if (accessToken) {
  //   setAuthenticated(true);
  //   navigate('/list');
  // }
  const authenticated = useStoreAuth((state) => state.authenticated);

  // Якщо користувач авторизований, перенаправити на головну сторінку
  return !authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
