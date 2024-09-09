import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStoreAuth from '../../../utils/StoreAuth'; // Ваш хук або функція для перевірки авторизації

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = useStoreAuth((state) => state.user);
  const location = useLocation();

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
