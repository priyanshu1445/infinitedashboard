import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check token

  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
