import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import  Spinner  from './ui/Spinner'; // Adjust the import path as necessary

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, loading } = useAuth();

  // 1) still checking auth? show nothing (or a spinner)
  if (loading) {
    return <Spinner/>; 
  }

  // 2) no user → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3) role-based guard
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // 4) all good
  return children;
};

export default ProtectedRoute;
