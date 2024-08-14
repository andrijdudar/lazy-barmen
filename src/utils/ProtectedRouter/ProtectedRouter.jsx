
import { Outlet, Navigate } from "react-router-dom";
import useStoreAuth from "../StoreAuth";

export const ProtectedRoutes = () => {
  const formLogin = useStoreAuth((state) => state.formLogin);

  return formLogin ? <Outlet /> : <Navigate to="/login" />
};
