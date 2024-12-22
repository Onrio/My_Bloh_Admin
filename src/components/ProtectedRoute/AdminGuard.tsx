import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';

interface ProtectedRouteProps {
  requiredStatus?: 'admin' | 'user';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredStatus,
  children,
}) => {
  const { user } = useUserContext(); // Fetch user directly from context

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredStatus && user.status !== requiredStatus) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
