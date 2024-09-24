import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem('access_token');
  const location = useLocation();

  return accessToken ? (
    <Component {...rest} />
  ) : (
      <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
