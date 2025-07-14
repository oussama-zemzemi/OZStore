import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';


const PrivateRoute = ({ children, roles = [] }) => {
  const { user } = useContext(AuthContext);

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user exists but role not authorized
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
