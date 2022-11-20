import { Navigate } from 'react-router-dom';
import { useUserContext } from './../components/userContext';

export const ProtectedRoute = ({ children }) => {
  const {
    user: { email },
  } = useUserContext();
  if (!email) {
    return <Navigate to="/login" />;
  }
  return children;
};
